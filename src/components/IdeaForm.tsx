"use client"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"

import React, {useActionState, useState} from 'react';
import {Textarea} from "@/components/ui/textarea";
import MDEditor from '@uiw/react-md-editor';
import {Send} from "lucide-react";
import {formSchema} from "@/lib/validation";
import {z} from "zod";
import {toast} from 'sonner'
import {useRouter} from "next/navigation";
import {createPitch} from "@/lib/actions";

const IdeaForm = () => {
    const [error, setError] = useState<Record<string, string>>({});
    const [pitch, setPitch] = useState("");
    const router = useRouter();

    const handleFormSubmit=async (prevState: any, formData: FormData)=>{
        try {
            const formValues = {
                title: formData.get("title") as string,
                description: formData.get("description") as string,
                category: formData.get("category") as string,
                link: formData.get("link") as string,
                pitch,
            };
            await formSchema.parseAsync(formValues);

            const result = await createPitch(prevState, formData, pitch);
            if(result.status === "SUCCESS"){
                toast.success("Your idea has been submitted successfully.");
                router.push(`/idea/${result._id}`);
            }
            return result;
        } catch (e) {
            if(e instanceof z.ZodError){
                const fieldErrors = e.flatten().fieldErrors;
                setError(fieldErrors as unknown as Record<string, string>);
                toast.error("Please check your input and try again");

                return {...prevState, error: "Validation failed", status: "ERROR"};
            }
            toast.error("An unexpected error has occurred");
            return {...prevState, error: "An unexpected error has occurred", status: "ERROR"};

        } finally {

        }
    };
    const [state, formAction, isPending] = useActionState(handleFormSubmit, {error:"", status:"initial"});

    return (
        <form action={formAction} className="startup-form">
            <div>
                <label htmlFor="title" className="startup-form_label">Title</label>
                <Input id="title" name="title" className="startup-form_input" required placeholder="Idea title" />
                {error.title &&<p className="startup-form_error">{error.title}</p>}
            </div>

            <div>
                <label htmlFor="description" className="startup-form_label">Description</label>
                <Textarea id="description" name="description" className="startup-form_textarea" required placeholder="Idea description" />
                {error.description &&<p className="startup-form_error">{error.description}</p>}
            </div>
            <div>
                <label htmlFor="category" className="startup-form_label">Category</label>
                <Input id="category" name="category" className="startup-form_input" required placeholder="Idea category (IT, Book, Design ...)" />
                {error.category &&<p className="startup-form_error">{error.category}</p>}
            </div>
            <div>
                <label htmlFor="link" className="startup-form_label">Image URL</label>
                <Input id="link" name="link" className="startup-form_input" required placeholder="Idea Image URL" />
                {error.link &&<p className="startup-form_error">{error.link}</p>}
            </div>
            <div data-color-mode="light">
                <label htmlFor="pitch" className="startup-form_label">Pitch</label>
                <MDEditor
                    value={pitch}
                    onChange={(value)=>setPitch(value as string)}
                    id="pitch"
                    preview="edit"
                    height="300"
                    style={{borderRadius: "20", overflow: "hidden"}}
                    textareaProps={{
                        placeholder: "Briefly describe your idea",
                    }}
                    previewOptions={{
                        disallowedElements:["style"]
                    }}
                />
                {error.pitch &&<p className="startup-form_error">{error.pitch}</p>}
            </div>
            <Button type="submit" className="startup-form_btn text-white" disabled={isPending}>
                {isPending? "Submitting..." : "Submit your Idea"}
                <Send className="size-6-ml-2" />
            </Button>
        </form>
    );
};

export default IdeaForm;