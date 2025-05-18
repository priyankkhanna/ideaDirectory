import {defineQuery} from "groq";

export const IDEAS_QUERY= defineQuery(`*[_type=="idea" && defined(slug.current) && !defined($search) || title match $search || category match $search || author->name match $search] | order(_createdAt desc) {
  _id, _createdAt,
    author -> {_id, name, image, bio}
    ,category,description,image,title,views,slug
}`);

export const IDEA_BY_ID_QUERY=defineQuery(`*[_type=="idea"&& _id==$id][0] {
  _id, _createdAt,
    author -> {_id, name, image, bio,username}
    ,category,description,image,title,views,slug,pitch
}`);

export const IDEA_VIEW_QUERY = defineQuery(`
    *[_type=="idea"&& _id==$id][0] {
    _id, views,}
    `);