import groq from "groq";
import { client, urlFor } from "./sanity";
import { SimplePost } from "@/model/post";

const simplePostProjection = groq`
...,
"username": author->username,
"userImage": author->image,
"likes": likes[]->username,
"image": photo,
"text": comments[0].comment,
"comments": count(comments),
"id": _id,
"createdAt": _createdAt,
`; // post.author.username -> post.username

export async function getFollowingPostsOf(username: string) {
  return client
    .fetch(
      groq`
      *[_type == "post" && author->username == "${username}"
      || author._ref in *[_type == "user" && username == "${username}"].following[]._ref]
      | order(_createdAt desc){${simplePostProjection}}
    `
    )
    .then(mapPosts);
}

export async function getPost(id: string) {
  return client
    .fetch(
      groq`
    *[_type == "post" && _id == "${id}"][0]{
      ...,
      "username": author->username,
      "userImage": author->image,
      "image": photo,
      "likes": likes[]->username,
      comments[]{
        comment, "username": author->username, "image": author->image
      },
      "id": _id,
      "createdAt": _createdAt,
    }
    `
    )
    .then((post) => ({
      ...post,
      image: urlFor(post.image),
    }));
}

export async function getPostsOf(username: string) {
  return client
    .fetch(
      groq`*[_type == "post" && author->username == "${username}"]
      | order(_createdAt desc){
        ${simplePostProjection}
      }`
    )
    .then(mapPosts);
}

export async function getLikedPostsOf(username: string) {
  return client
    .fetch(
      groq`*[_type == "post" && "${username}" in likes[]->username]
      | order(_createdAt desc){
        ${simplePostProjection}
      }`
    )
    .then(mapPosts);
}

export async function getSavedPostsOf(username: string) {
  return client
    .fetch(
      groq`*[_type == "post" && _id in *[_type == "user" && username == "${username}"].bookmarks[]._ref]
      | order(_createdAt desc){
        ${simplePostProjection}
      }`
    )
    .then(mapPosts);
}

function mapPosts(posts: SimplePost[]) {
  return posts.map((post) => ({
    ...post,
    image: urlFor(post.image),
    likes: post.likes ?? [],
  }));
}

// 특정 포스트를 좋아요, 좋아요 취소
export async function likePost(postId: string, userId: string) {
  return client
    .patch(postId)
    .setIfMissing({ likes: [] }) // likes가 없으면 빈 배열로 초기화
    .append("likes", [
      {
        _ref: userId,
        _type: "reference",
      },
    ])
    .commit({
      autoGenerateArrayKeys: true,
    });
}

export async function unlikePost(postId: string, userId: string) {
  return client
    .patch(postId)
    .unset([groq`likes[_ref == "${userId}"]`]) // likes 배열에서 userId를 가진 요소를 삭제
    .commit();
}

// 코멘트
export async function addComment(
  postId: string,
  userId: string,
  comment: string
) {
  return client
    .patch(postId)
    .setIfMissing({ comments: [] }) // likes가 없으면 빈 배열로 초기화
    .append("comments", [
      {
        comment,
        author: {
          _ref: userId,
          _type: "reference",
        },
      },
    ])
    .commit({
      autoGenerateArrayKeys: true,
    });
}
