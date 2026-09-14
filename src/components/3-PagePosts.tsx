import { useState } from 'react';
import { fetchPaginatedPosts } from '../api/posts';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

const LIMIT = 8;

export default function PagePosts() {
  const [page, setPage] = useState(1);

  const { data, isPending, isPlaceholderData, isError, error, isFetching } =
    useQuery({
      queryKey: ['posts', page, LIMIT],
      queryFn: () => fetchPaginatedPosts(page, LIMIT),
      placeholderData: keepPreviousData,
    });

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (isError) return <p>{error.message}</p>;

  return (
    <div>
      {isFetching && <p>Fetching...</p>}
      {data?.map((post) => (
        <p key={post.id}>{post.title}</p>
      ))}

      <button
        disabled={page === 1}
        onClick={() => setPage((current) => current - 1)}
      >
        Previous
      </button>

      <span>Page {page}</span>

      <button
        disabled={isPlaceholderData}
        onClick={() => setPage((current) => current + 1)}
      >
        Next
      </button>
    </div>
  );
}
