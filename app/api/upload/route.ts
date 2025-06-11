import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";
import formidable from "formidable";
import { Readable } from "stream";
import fs from "fs";

// Disable the built-in body parsing
export const config = {
    api: {
        bodyParser: false,
    },
};

// Helper to convert a Web Request to a Node.js-style IncomingMessage
async function convertToIncomingMessage(req: NextRequest) {
    const contentType = req.headers.get("content-type") || "";
    const contentLength = req.headers.get("content-length") || "";

    const buffer = Buffer.from(await req.arrayBuffer());
    const stream = Readable.from(buffer);

    const fakeReq: any = stream;
    fakeReq.headers = {
        "content-type": contentType,
        "content-length": contentLength,
    };

    return fakeReq;
}

// Handle POST
export async function POST(req: NextRequest) {
    try {
        const incomingReq = await convertToIncomingMessage(req);

        const form = formidable({ multiples: false });

        const parsed: any = await new Promise((resolve, reject) => {
            form.parse(incomingReq, (err, fields, files) => {
                if (err) reject(err);
                else resolve({ fields, files });
            });
        });

        const file = parsed.files.uploadFile?.[0];
        if (!file) return NextResponse.json({ error: "No file uploaded" }, { status: 400 });

        const auth = new google.auth.GoogleAuth({
            credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY!),
            scopes: ["https://www.googleapis.com/auth/drive.file"],
        });

        const drive = google.drive({ version: "v3", auth });

        const fileMetadata = {
            name: file.originalFilename,
            parents: [process.env.GOOGLE_DRIVE_FOLDER_ID!],
        };

        const media = {
            mimeType: file.mimetype,
            body: fs.createReadStream(file.filepath),
        };

        const response = await drive.files.create({
            requestBody: fileMetadata,
            media,
            fields: "id, name, webViewLink",
        });

        return NextResponse.json({ message: "Upload successful", data: response.data });
    } catch (err) {
        console.error("Upload error:", err);
        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
}
