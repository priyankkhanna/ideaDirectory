//import Image from "next/image";

import SearchForm from "@/components/SearchForm";

export default async function Home({searchParams} : {searchParams: Promise<{query?:string}>}) {
    const query = (await searchParams).query;
  return (
    <>
        <section className="pink_container pattern">
            <h1 className="heading">Pitch Your Ideas</h1>

            <p className="sub-heading !max-w-3xl">
                Submit Ideas, Vote and Get Noticed.
            </p>
            <SearchForm query={query}/>
        </section>
    </>
  );
}
