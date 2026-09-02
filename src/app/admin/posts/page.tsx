import React from "react";
import { getAdminPosts } from "../actions";
import PostsListClient from "./PostsListClient";

export const revalidate = 0;

export default async function AdminPostsPage() {
  const posts = await getAdminPosts();

  return <PostsListClient initialPosts={posts} />;
}
