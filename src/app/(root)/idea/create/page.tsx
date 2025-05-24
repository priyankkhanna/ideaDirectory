import React from 'react';
import IdeaForm from "@/components/IdeaForm";
import {auth} from "@/auth";
import {redirect} from "next/navigation";

const Page = async () => {
    const session = await auth();
    if(!session){
        redirect("/");
    };

    return (
        <>
            <section className="pink_container !min-h-[230px]">
                <h1 className="heading">Submit your Idea</h1>
            </section>
            <IdeaForm />

        </>
    );
};

export default Page;