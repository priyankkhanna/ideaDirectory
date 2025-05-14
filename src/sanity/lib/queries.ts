import {defineQuery} from "groq";

export const IDEAS_QUERY= defineQuery(`*[_type=="idea"&&defined(slug.current)] | order(_createdAt desc) {
  _id, _createdAt,
    author -> {_id, name, image, bio}
    ,category,description,image,title,views,slug
}`)