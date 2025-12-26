import { NextResponse } from "next/server";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN!;
const GITHUB_USERNAME = process.env.GITHUB_USERNAME!;
const GITHUB_REPO = process.env.GITHUB_REPO!;

const BRANCH = "main";

// 🔒 ONE fixed file (always overwritten)
const FILE_PATH = "dist/auto-connect-widget.js";

export async function POST(req: Request) {
    try {
        const { script } = await req.json();

        if (!script) {
            return NextResponse.json({ error: "Script missing" }, { status: 400 });
        }

        const apiUrl = `https://api.github.com/repos/${GITHUB_USERNAME}/${GITHUB_REPO}/contents/${FILE_PATH}`;

        // 1️⃣ Check if file already exists (to get SHA)
        const existingFileRes = await fetch(`${apiUrl}?ref=${BRANCH}`, {
            headers: {
                Accept: "application/vnd.github+json",
                Authorization: `Bearer ${GITHUB_TOKEN}`,
            },
        });

        let sha: string | undefined;

        if (existingFileRes.ok) {
            const existingFile = await existingFileRes.json();
            sha = existingFile.sha;
        }

        // 2️⃣ Create or update file
        const uploadRes = await fetch(apiUrl, {
            body: JSON.stringify({
                branch: BRANCH,
                content: Buffer.from(script).toString("base64"),
                message: "publish widget",
                ...(sha && { sha }),
            }),
            headers: {
                Accept: "application/vnd.github+json",
                Authorization: `Bearer ${GITHUB_TOKEN}`,
                "Content-Type": "application/json",
            },
            method: "PUT",
        });

        if (!uploadRes.ok) {
            const error = await uploadRes.json();
            // eslint-disable-next-line no-console
            console.error("GitHub upload failed:", error);

            return NextResponse.json({ error: "GitHub upload failed" }, { status: 500 });
        }

        // 3️⃣ 🔥 Purge jsDelivr cache (CRITICAL PART)
        await fetch(`https://purge.jsdelivr.net/gh/${GITHUB_USERNAME}/${GITHUB_REPO}@${BRANCH}/${FILE_PATH}`, {
            method: "GET",
        });

        const cdnUrl = `https://cdn.jsdelivr.net/gh/${GITHUB_USERNAME}/${GITHUB_REPO}@${BRANCH}/${FILE_PATH}`;

        return NextResponse.json({
            cdnUrl,
            scriptTag: `<script src="${cdnUrl}"></script>`,
            success: true,
        });
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Publish API error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
