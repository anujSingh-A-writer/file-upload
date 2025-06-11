import { z } from "zod";

export const formSchema = z.object({
    uploadFile: z
        .instanceof(File)
        .refine((file) => file.size > 0, {
            message: "File is required",
        })
        .refine(
            (file) =>
                file.type === "application/msword" || // .doc
                file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
            {
                message: "Only .doc or .docx files are allowed",
            }
        ),
});