'use client'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import useUpload from "./use-upload";
import Link from "next/link";

const Upload = () => {
    const { form, onSubmit, loading } = useUpload();

    return (
        <section className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
            <div className="w-full max-w-md rounded-xl bg-white dark:bg-gray-900 shadow-md p-8 space-y-6">
                <h2 className="text-xl font-semibold text-center">Upload a DOC file</h2>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                        <FormField
                            control={form.control}
                            name="uploadFile"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Choose .doc or .docx File</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="file"
                                            accept=".doc,.docx"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                field.onChange(file);
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button disabled={loading} type="submit" className="w-full">
                            {loading ? "Uploading" : "Upload"}
                        </Button>
                        <hr />
                        {
                            !loading && (
                                <Link href="/files" className="w-full">
                                    <Button type="button" variant={"link"} className="w-full">
                                        View Uploaded Files
                                    </Button>
                                </Link>
                            )
                        }

                    </form>
                </Form>
            </div>
        </section>
    );
};

export default Upload;
