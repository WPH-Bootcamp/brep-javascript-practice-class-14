import BasicPosts from './components/1-BasicPosts';
import PostMutation from './components/2-PostMutation';
import PagePosts from './components/3-PagePosts';
import InfinitePosts from './components/4-InfinitePosts';

function App() {
  return (
    <div>
      <h1>Class 14 - Tanstack Query</h1>
      <PostMutation />
      <hr />
      <BasicPosts />
      <hr />
      <PagePosts />
      <hr />
      <InfinitePosts />
    </div>
  );
}

export default App;
