export type Comment = {
  comment: string;
  username: string;
  image: string;
};

/**
 * 포스트 목록 화면(홈)에서 사용할 타입
 */
export type SimplePost = Omit<FullPost, "comments"> & {
  comments: number;
};

/**
 * 포스트 상세 화면에서 사용할 타입
 */
export type FullPost = {
  id: string;
  username: string;
  userImage: string; // url
  image: string; // url
  text: string;
  createdAt: string;
  likes: string[]; // 누가 좋아요를 눌렀는지
  comments: Comment[];
};
