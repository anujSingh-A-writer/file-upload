import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "./schema";
import { useState } from "react";

const useUpload = () => {

    const [loading, setLoading] = useState<boolean>(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            uploadFile: undefined,
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log("Submitted file:", values.uploadFile);
        setLoading(true)
        const formData = new FormData();
        formData.append("uploadFile", values.uploadFile);

        fetch("/api/upload", {
            method: "POST",
            body: formData,
        })
            .then(async (res) => {
                const result = await res.json();
                if (!res.ok) throw new Error(result.error || "Upload failed");
                console.log("File uploaded to Google Drive:", result.data);
                form.reset();
                alert("File uploaded successfully!");
            })
            .catch((err) => {
                console.error("Upload error:", err);
            })
            .finally(() => {
                setLoading(false);
            });

    }

    return { form, onSubmit, loading };
};

export default useUpload;
