"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import useFiles from "./use-files";

export default function Files() {

    const { loading, files, getEditLink, selectedFile, setSelectedFile } = useFiles()

    return (
        <>
            {!selectedFile && <div className="w-full flex flex-col items-center gap-5 p-6">
                <h1 className="text-2xl font-bold mb-4">Uploaded Files</h1>
                <div className="w-full bg-white dark:bg-gray-900 rounded-lg shadow p-6">
                    {loading ? (
                        <p>Loading...</p>
                    ) : files.length === 0 ? (
                        <p>No files found.</p>
                    ) : (
                        <ul className="space-y-2">
                            {files.map((file) => (
                                <li key={file.id} className="flex flex-col gap-3 border p-4 rounded shadow-sm">
                                    <div className="font-medium">{file.name}</div>
                                    <div className="text-sm text-gray-500">Uploaded: {new Date(file.createdTime).toLocaleString()}</div>
                                    <Button className="w-fit text-blue-600 hover:underline text-sm" variant={"outline"} onClick={() => {
                                        getEditLink(file);
                                    }}>
                                        View
                                    </Button>
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

            </div>}
            {
                selectedFile &&
                <section className="">
                    <iframe
                        className="w-full h-screen max-h-[90vh]"
                        src={selectedFile?.webViewLink}
                        width="100%"
                        height="100vh"
                        title="Example Iframe"
                    />
                    <div className="flex justify-center items-center gap-5 p-4 bg-gray-100 dark:bg-gray-800">
                        <Button variant={"destructive"} onClick={() => {
                            setSelectedFile(null)
                        }}>Back</Button>
                        <Button variant={"default"} onClick={() => {
                            alert("The data has been saved successfully!")
                            setSelectedFile(null)
                        }}>Save</Button>
                    </div>
                </section>
            }
        </>
    );
}
