//import Image from "next/image";

import SearchForm from "@/components/SearchForm";
import StartupCard from "@/components/StartupCard";

export default async function Home({searchParams} : {searchParams: Promise<{query?:string}>}) {
    const query = (await searchParams).query;
    const posts=[{
        _createdAt: new Date(),
        views:55,
        author:{_id:1, name:"Helsing"},
        _id:1,
        description:"This is a description",
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvifERbB5_rzAElZ6mOW9asAQH-Et07Js06A&s",
        category:"Bulb",
        title:"Bulb glowing"
    }]
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
                    posts.map((post: StartupCardType, index: number)=>(
                        <StartupCard key={post?._id} post={post} />
                    ))
                ): (
                    <p className="no-results">No ideas found</p>
                )
                }
            </ul>

        </section>
    </>
  );
}
