import groq from "groq";
import { client } from "./sanity";

export async function getFollowingPostsOf(username: string) {
  /**
   * ... : 포스트를 그냥 다 가져옴
   */
  const simplePostProjection = groq`
    ...,
    "username": author->username,
    "userImage": author->image,
    "image": photo,
    "likes": likes[]->username,
    "text": comments[0].comment,
    "comments": count(comments),
    "id": _id,
    "createdAt": _createdAt,
  `; // post.author.username -> post.username

  /**
   * 작성자의 이름이 username이거나
   * 로그인한 사용자안에 있는 배열(로그인한 사용자가 팔로잉하고 있는 사용자들의 배열)에 포함되어 있다면 ref(id)를 가져온다
   * 최근 생성일 기준으로 정렬한다
   */
  return client.fetch(
    groq`
      *[_type == "post" && author->username == "${username}"
      || author._ref in *[_type == "user" && username == "${username}"].following[]._ref]
      | order(_createdAt desc){${simplePostProjection}}
    `
  );
}
