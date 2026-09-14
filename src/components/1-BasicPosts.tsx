import { useQuery } from '@tanstack/react-query';
import { fetchPosts } from '../api/posts';
import { postKeys } from '../lib/queryKeys';

export default function BasicPosts() {
  const { data, isPending, isError, error, isFetching } = useQuery({
    queryKey: postKeys.all,
    queryFn: fetchPosts,
  });

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error : {error.message}</p>;
  }

  return (
    <section>
      <h2>Data Posts</h2>
      {isFetching && <p>Updating...</p>}

      {data.map((post) => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </article>
      ))}
    </section>
  );
}
