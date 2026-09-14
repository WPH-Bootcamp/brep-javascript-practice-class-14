import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchInfinitePosts } from '../api/posts';

export default function InfinitePosts() {
  const {
    data,
    isPending,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['posts', 'infinite'],
    queryFn: ({ pageParam }) => fetchInfinitePosts(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  if (isPending) return <p>Loading...</p>;
  if (isError) return <p>{error.message}</p>;

  return (
    <>
      {data.pages.map((page) =>
        page.items.map((post) => <p key={post.id}>{post.title}</p>)
      )}
      <button
        disabled={!hasNextPage || isFetchingNextPage}
        onClick={() => fetchNextPage()}
      >
        {isFetchingNextPage
          ? 'Loading more...'
          : hasNextPage
            ? 'Load More'
            : 'No More Data'}
      </button>
    </>
  );
}
