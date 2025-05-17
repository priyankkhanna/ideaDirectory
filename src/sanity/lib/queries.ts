import {defineQuery} from "groq";

export const IDEAS_QUERY= defineQuery(`*[_type=="idea" && defined(slug.current) && !defined($search) || title match $search || category match $search || author->name match $search] | order(_createdAt desc) {
  _id, _createdAt,
    author -> {_id, name, image, bio}
    ,category,description,image,title,views,slug
}`)