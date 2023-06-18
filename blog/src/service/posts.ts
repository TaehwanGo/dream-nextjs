import { readFile } from "fs/promises";
import path from "path";
import { cache } from "react";

export type Post = {
  title: string;
  description: string;
  date: Date;
  category: string;
  path: string;
  featured: boolean;
};

export interface PostData extends Post {
  content: string;
  next: Post | null;
  prev: Post | null;
}

// 10.18 성능 개선을 위한 코드
export const getAllPosts = cache(async () => {
  console.log("getAllPosts");
  const filePath = path.join(process.cwd(), "data", "posts.json");
  return readFile(filePath, "utf-8")
    .then<Post[]>(JSON.parse) // then의 return type을 제네릭으로 명시할 수 있다
    .then((posts) => posts.sort((a, b) => (a.date > b.date ? -1 : 1)));
});

// 10.18 이전 성능 개선 전 코드
// export async function getAllPosts(): Promise<Post[]> {
//   const filePath = path.join(process.cwd(), "data", "posts.json");
//   return readFile(filePath, "utf-8")
//     .then<Post[]>(JSON.parse) // then의 return type을 제네릭으로 명시할 수 있다
//     .then((posts) => posts.sort((a, b) => (a.date > b.date ? -1 : 1)));
// }

export async function getFeaturedPosts(): Promise<Post[]> {
  return getAllPosts() //
    .then((posts) => posts.filter((post) => post.featured));
}

export async function getNonFeaturedPosts(): Promise<Post[]> {
  return getAllPosts() //
    .then((posts) => posts.filter((post) => !post.featured));
}

export async function getPostData(fileName: string): Promise<PostData> {
  const filePath = path.join(process.cwd(), "data", "posts", `${fileName}.md`);
  const posts = await getAllPosts();
  const post = posts.find((post) => post.path === fileName);

  if (!post) {
    throw new Error(`${fileName}에 해당하는 포스트가 없습니다`);
  }
  const index = posts.indexOf(post);
  const next = index > 0 ? posts[index - 1] : null; // index가 앞에 있을 수록 최신 포스트
  const prev = index < posts.length - 1 ? posts[index + 1] : null; // index가 뒤에 있을 수록 오래된 포스트
  const content = await readFile(filePath, "utf-8");
  return { ...post, content, next, prev };
}
