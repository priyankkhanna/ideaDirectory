"use server";

import {auth} from "@/auth"
import {parseServerActionResponse} from "@/lib/utils";
import slugify from "slugify";
import {writeClient} from "@/sanity/lib/write-client";
import {client} from "@/sanity/lib/client";
import {AUTHOR_BY_EMAIL_QUERY} from "@/sanity/lib/queries";

export const createPitch = async (
    state: any,
    form: FormData,
    pitch: string,
) => {
    const session = await auth();
    if(!session)
        return parseServerActionResponse({error: "Not signed in", status: "ERROR"});

    const {title, description, category, link} = Object.fromEntries(Array.from(form).filter(([key])=> key!='pitch'));
    const slug = slugify(title as string, {lower:true, strict: true});

    const user = await client
        .withConfig({ useCdn: false })
        .fetch(AUTHOR_BY_EMAIL_QUERY, {
            email: session.user.email,
        });

    try{
        const idea={
            title,
            description,
            category,
            image: link,
            slug:{
                _type:slug,
                current: slug,
            },
            author:{
                _type: 'reference',
                _ref: user?._id,
            },
            pitch,
        }

        const result = await writeClient.create({_type:"idea", ...idea});
        return parseServerActionResponse({...result, error: "", status: "SUCCESS"});
    } catch(error){
        console.log(error);
        return parseServerActionResponse({error: JSON.stringify(error), status: "ERROR"});
    }
}