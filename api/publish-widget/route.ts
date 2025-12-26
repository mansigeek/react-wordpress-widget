import { NextResponse } from "next/server";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN!;
const GITHUB_USERNAME = process.env.GITHUB_USERNAME!;
const GITHUB_REPO = process.env.GITHUB_REPO!;

export async function POST(req: Request) {
    try {
        const { script } = await req.json();

        if (!script) {
            return NextResponse.json({ error: "Script content missing" }, { status: 400 });
        }

        // simple version using timestamp (safe + unique)
        const version = `v${Date.now()}`;
        const fileName = "auto-connect-widget.js";
        const filePath = `dist/${fileName}`;

        const githubApiUrl = `https://api.github.com/repos/${GITHUB_USERNAME}/${GITHUB_REPO}/contents/${filePath}`;

        const encodedContent = Buffer.from(script).toString("base64");

        const githubResponse = await fetch(githubApiUrl, {
            body: JSON.stringify({
                branch: "main",
                content: encodedContent,
                message: `publish widget ${version}`,
            }),
            headers: {
                Accept: "application/vnd.github+json",
                Authorization: `Bearer ${GITHUB_TOKEN}`,
                "Content-Type": "application/json",
            },
            method: "PUT",
        });

        if (!githubResponse.ok) {
            const error = await githubResponse.json();
            // eslint-disable-next-line no-console
            console.error(error);
            return NextResponse.json({ error: "Failed to upload to GitHub" }, { status: 500 });
        }

        const cdnUrl = `https://cdn.jsdelivr.net/gh/${GITHUB_USERNAME}/${GITHUB_REPO}@main/dist/${fileName}`;

        return NextResponse.json({
            cdnUrl,
            scriptTag: `<script src="${cdnUrl}"></script>`,
            success: true,
            version,
        });
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
