export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type CreatePostInput = {
  userId: number;
  title: string;
  body: string;
};

export type InfinitePage = {
  items: Post[];
  nextPage: number | undefined;
};
