import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const auth = new google.auth.GoogleAuth({
            credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY!),
            scopes: ["https://www.googleapis.com/auth/drive.readonly"],
        });

        const drive = google.drive({ version: "v3", auth });

        const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID!;
        if (!folderId) throw new Error("GOOGLE_DRIVE_FOLDER_ID is not set");

        const response = await drive.files.list({
            q: `'${folderId}' in parents and trashed = false`,
            fields: "files(id, name, webViewLink, mimeType, createdTime)",
        });

        return NextResponse.json({ files: response.data.files });
    } catch (err) {
        console.error("Drive fetch error:", JSON.stringify(err, null, 2));
        return NextResponse.json({ error: "Failed to list files" }, { status: 500 });
    }
}
