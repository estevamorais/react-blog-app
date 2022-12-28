import styles from "./index.module.css";

import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";

import PostItem from "../../components/PostItem";

const Home = () => {
  const [query, setQuery] = useState("");
  const { documents: posts, loading } = useFetchDocuments("posts");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (query) {
      return navigate(`/search?q=${query}`);
    }
  };

  return (
    <div className={styles.home}>
      <h1>See our recent posts</h1>
      <form className={styles.searchForm} onSubmit={handleSubmit}>
        <input
          type="text"
          name="s"
          placeholder="Or search for tags..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-dark">Search</button>
      </form>
      <section>
        {loading && <p>Loading...</p>}
        {posts && posts.map((post) => <PostItem key={post.id} post={post} />)}
        {posts && posts.length === 0 && (
          <div className={styles.noResults}>
            <p>No results found</p>
            <Link to="/posts/create" className="btn">
              New Post
            </Link>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
