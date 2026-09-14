import type { Post, CreatePostInput, InfinitePage } from '../types/post.type';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export async function fetchPosts(): Promise<Post[]> {
  const response = await fetch(`${BASE_URL}/posts?_limit=10`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error(`Gagal mengambil data Posts : ${response.status}`);
  }

  return response.json();
}

export async function createPost(input: CreatePostInput) {
  const response = await fetch(`${BASE_URL}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    throw new Error(`Gagal membuat post : ${response.status}`);
  }

  return response.json();
}

export async function updatePost(post: Post) {
  const response = await fetch(`${BASE_URL}/posts/${post.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  });

  if (!response.ok) {
    throw new Error(`Gagal update post : ${response.status}`);
  }

  return response.json();
}

export async function deletePost(id: number) {
  const response = await fetch(`${BASE_URL}/posts/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(`Gagal delete post : ${response.status}`);
  }

  return response.json();
}

export async function fetchPaginatedPosts(
  page: number,
  limit = 8
): Promise<Post[]> {
  const response = await fetch(
    `${BASE_URL}/posts?_page=${page}&_limit=${limit}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  if (!response.ok) {
    throw new Error(`Fetch gagal : ${response.status}`);
  }

  return response.json();
}

export async function fetchInfinitePosts(page: number): Promise<InfinitePage> {
  const items = await fetchPaginatedPosts(page, 10);
  return {
    items,
    nextPage: items.length === 10 ? page + 1 : undefined,
  };
}
