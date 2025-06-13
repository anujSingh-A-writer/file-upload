import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";
import { Readable } from "stream";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("uploadFile") as File;

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());

        const auth = new google.auth.GoogleAuth({
            credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY!),
            scopes: ["https://www.googleapis.com/auth/drive.file"],
        });

        const drive = google.drive({ version: "v3", auth });

        const response = await drive.files.create({
            requestBody: {
                name: file.name,
                parents: [process.env.GOOGLE_DRIVE_FOLDER_ID!],
            },
            media: {
                mimeType: file.type,
                body: Readable.from(buffer),
            },
            fields: "id, name, webViewLink, mimeType",
        });

        return NextResponse.json({ message: "Upload successful", data: response.data });
    } catch (err) {
        console.error("Upload error:", err);
        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
}
