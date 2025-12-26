import crypto from "crypto";
import { NextResponse } from "next/server";

const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME!;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY!;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET!;

/**
 * Generate Cloudinary signature for signed uploads
 */
function generateSignature(params: Record<string, string>): string {
    const sortedParams = Object.keys(params)
        .sort()
        .map(key => {
            return `${key}=${params[key]}`;
        })
        .join("&");

    return crypto
        .createHash("sha1")
        .update(sortedParams + CLOUDINARY_API_SECRET)
        .digest("hex");
}

export async function POST(req: Request) {
    try {
        // Check environment variables
        if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
            const missing = [];
            if (!CLOUDINARY_CLOUD_NAME) {
                missing.push("CLOUDINARY_CLOUD_NAME");
            }
            if (!CLOUDINARY_API_KEY) {
                missing.push("CLOUDINARY_API_KEY");
            }
            if (!CLOUDINARY_API_SECRET) {
                missing.push("CLOUDINARY_API_SECRET");
            }
            return NextResponse.json(
                { error: `Missing required environment variables: ${missing.join(", ")}` },
                { status: 500 },
            );
        }

        const { script } = await req.json();

        if (!script || typeof script !== "string") {
            return NextResponse.json({ error: "Script content missing or invalid" }, { status: 400 });
        }

        // Prepare upload parameters
        // Note: When using /raw/upload endpoint, resource_type is NOT needed as a parameter
        // All parameters except 'file' and 'api_key' must be included in signature
        const timestamp = Math.round(Date.now() / 1000).toString();
        const publicId = "auto-connect-widget";

        const uploadParams: Record<string, string> = {
            public_id: publicId,
            timestamp,
        };

        // Generate signature for signed upload
        // The signature must include all parameters that will be sent (except file and api_key)
        const signature = generateSignature(uploadParams);

        // Create FormData for Cloudinary upload
        // Cloudinary accepts data URIs for raw file uploads
        const scriptBuffer = Buffer.from(script, "utf-8");
        const base64Script = scriptBuffer.toString("base64");
        const dataUri = `data:application/javascript;base64,${base64Script}`;

        const formData = new FormData();
        formData.append("file", dataUri);
        formData.append("public_id", publicId);
        // Note: resource_type is NOT needed when using /raw/upload endpoint
        formData.append("timestamp", timestamp);
        formData.append("api_key", CLOUDINARY_API_KEY);
        formData.append("signature", signature);

        // Upload to Cloudinary
        const uploadUrl = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/raw/upload`;

        const cloudinaryRes = await fetch(uploadUrl, {
            body: formData,
            method: "POST",
        });

        if (!cloudinaryRes.ok) {
            let errorDetails;
            try {
                errorDetails = await cloudinaryRes.json();
            } catch {
                errorDetails = { message: await cloudinaryRes.text() };
            }
            // eslint-disable-next-line no-console
            console.error("Cloudinary upload error:", errorDetails);
            return NextResponse.json(
                {
                    details: errorDetails.error?.message || errorDetails.message || "Unknown error",
                    error: "Failed to upload to Cloudinary",
                },
                { status: 500 },
            );
        }

        const uploadData = await cloudinaryRes.json();

        // Cloudinary returns secure_url for the uploaded file
        const cdnUrl = uploadData.secure_url || uploadData.url;
        if (!cdnUrl) {
            return NextResponse.json({ error: "No CDN URL returned from Cloudinary" }, { status: 500 });
        }

        return NextResponse.json({
            cdnUrl,
            scriptTag: `<script src="${cdnUrl}"></script>`,
            success: true,
        });
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Upload API error:", error);
        return NextResponse.json(
            {
                details: error instanceof Error ? error.message : "Unknown error",
                error: "Internal server error",
            },
            { status: 500 },
        );
    }
}
