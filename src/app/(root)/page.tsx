//import Image from "next/image";

import SearchForm from "@/components/SearchForm";
import StartupCard, {StartupTypeCard} from "@/components/StartupCard";
import {IDEAS_QUERY} from "@/sanity/lib/queries";
import {sanityFetch, SanityLive} from "@/sanity/lib/live";

export default async function Home({searchParams} : {searchParams: Promise<{query?:string}>}) {
    const query = (await searchParams).query;
    const params = {search: query || null};


    const { data: posts } = await sanityFetch({query: IDEAS_QUERY, params});

  return (
    <>
        <section className="pink_container pattern">
            <h1 className="heading">Pitch Your Ideas</h1>

            <p className="sub-heading !max-w-3xl">
                Submit Ideas, Vote and Get Noticed.
            </p>
            <SearchForm query={query}/>
        </section>

        <section className="section_container">
            <p className="text-30-semibold">
                {query ? `seach result for ${query}`: "All Ideas"}
            </p>
            <ul className="mt-7 card_grid">
                {posts?.length>0?(
                    posts.map((post: StartupTypeCard, index: number)=>(
                        <StartupCard key={post?._id} post={post} />
                    ))
                ): (
                    <p className="no-results">No ideas found</p>
                )
                }
            </ul>

        </section>
        <SanityLive />
    </>
  );
}
