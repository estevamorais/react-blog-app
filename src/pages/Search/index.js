import styles from "./index.module.css";

import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useQuery } from "../../hooks/useQuery";
import { Link } from "react-router-dom";

import PostItem from "../../components/PostItem";

const Search = () => {
  const query = useQuery();
  const search = query.get("q");

  const { documents: posts, loading } = useFetchDocuments("posts", search);

  return (
    <div className={styles.search}>
      <h1>
        Results for <span>{search}</span>
      </h1>
      {loading && <p>Loading...</p>}
      {posts && posts.map((post) => <PostItem key={post.id} post={post} />)}
      {posts && posts.length === 0 && (
        <div className={styles.noResults}>
          <p>No results found</p>
          <Link to="/" className="btn btn-dark">
            Return to Home
          </Link>
        </div>
      )}
    </div>
  );
};

export default Search;
