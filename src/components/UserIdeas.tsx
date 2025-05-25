import React from 'react';
import {IDEAS_BY_AUTHOR_QUERY} from "@/sanity/lib/queries";
import {client} from "@/sanity/lib/client";
import StartupCard, {StartupTypeCard} from "@/components/StartupCard";

const UserIdeas = async ({id}: {id: string}) => {

    const ideas = await client.fetch(IDEAS_BY_AUTHOR_QUERY, {id});



    return (
        <>
            {ideas.length > 0 ? ideas.map((idea: StartupTypeCard)=>(
                <StartupCard key={idea._id} post={idea} />
            )):<p className="no-result">No Ideas Submitted</p> }
        </>
    );
};

export default UserIdeas;