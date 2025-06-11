import { useEffect, useState } from 'react';

const useFiles = () => {
    const [files, setFiles] = useState<DriveFile[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchFiles() {
            try {
                const res = await fetch("/api/drive-files");
                const data = await res.json();
                setFiles(data.files || []);
            } catch (err) {
                console.error("Failed to load files", err);
            } finally {
                setLoading(false);
            }
        }

        fetchFiles();
    }, []);

    function getEditLink(file: DriveFile): string {
        const { id, mimeType } = file;

        if (mimeType === "application/vnd.google-apps.document") {
            return `https://docs.google.com/document/d/${id}/edit`;
        } else if (mimeType === "application/vnd.google-apps.spreadsheet") {
            return `https://docs.google.com/spreadsheets/d/${id}/edit`;
        } else if (mimeType === "application/vnd.google-apps.presentation") {
            return `https://docs.google.com/presentation/d/${id}/edit`;
        } else {
            return file.webViewLink;
        }
    }


    return {
        files,
        loading,
        getEditLink,
    }
}

export default useFiles


interface DriveFile {
    id: string;
    name: string;
    webViewLink: string;
    mimeType: string;
    createdTime: string;
}