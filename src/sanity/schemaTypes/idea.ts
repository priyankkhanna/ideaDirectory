import {defineField, defineType} from "sanity";
import {UserIcon} from "lucide-react";

export const idea = defineType({
    name: "idea",
    title: "Ideas",
    type: 'document',
    icon: UserIcon,
    fields:[defineField({
        name: 'title',
        type: "string",
    }),
        defineField({
        name: 'slug',
        type: "slug",
        options:{
            source:'title'
        }
    }),
        defineField({
            name: 'author',
            type: "reference",
            to:{
                type:'author'
            }
        }),
        defineField({
            name: 'views',
            type: "number",
        }),
        defineField({
            name: 'description',
            type: "text",
        }),
        defineField({
            name: 'category',
            type: "string",
            validation: (Rule)=> Rule.min(1).max(20).required().error("Please enter a category"),
        }),
        defineField({
            name: 'image',
            type: "url",
            validation:(Rule)=>Rule.required().error("Please enter a valid image"),
        }),
        defineField({
            name: 'pitch',
            type: "markdown",
        }),
    ],
    preview:{
        select:{
            title:"title",
        }
    }
})