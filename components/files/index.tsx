"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import useFiles from "./use-files";

export default function Files() {

    const { loading, files, getEditLink } = useFiles()

    return (
        <div className="w-full flex flex-col items-center gap-5 p-6">
            <h1 className="text-2xl font-bold mb-4">Uploaded Files</h1>
            <div className="w-full bg-white dark:bg-gray-900 rounded-lg shadow p-6">
                {loading ? (
                    <p>Loading...</p>
                ) : files.length === 0 ? (
                    <p>No files found.</p>
                ) : (
                    <ul className="space-y-2">
                        {files.map((file) => (
                            <li key={file.id} className="border p-4 rounded shadow-sm">
                                <div className="font-medium">{file.name}</div>
                                <div className="text-sm text-gray-500">Uploaded: {new Date(file.createdTime).toLocaleString()}</div>
                                <a
                                    href={getEditLink(file)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline text-sm"
                                >
                                    Open in Editor
                                </a>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <Link href="/upload" className="w-fit">
                <Button type="button" variant={"default"} className="w-fit">
                    Upload a new file
                </Button>
            </Link>
        </div>
    );
}
