import styles from "./index.module.css";

import { Link } from "react-router-dom";

import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useDeleteDocument } from "../../hooks/useDeleteDocument";

const Dashboard = () => {
  const { user } = useAuthValue();
  const uid = user.uid;

  const { documents: posts, loading } = useFetchDocuments("posts", null, uid);

  const { deleteDocument } = useDeleteDocument("posts");

  return (
    <div className={styles.dashboard}>
      <h1>Dashboard</h1>
      <p>Manage your posts</p>
      {loading && <p>Loading...</p>}
      {posts &&
        (posts.length === 0 ? (
          <div className={styles.noResults}>
            <p>You don't have any posts yet</p>
            <Link to="/posts/create" className="btn">
              Create first post
            </Link>
          </div>
        ) : (
          <>
            <div className={styles.postHeader}>
              <span>Title</span>
              <span>Actions</span>
            </div>
            {posts.map((post) => (
              <div key={post.id} className={styles.postRow}>
                <p>{post.title}</p>
                <div>
                  <Link to={`/posts/${post.id}`} className="btn btn-outline">
                    View
                  </Link>
                  <Link
                    to={`/posts/edit/${post.id}`}
                    className="btn btn-outline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteDocument(post.id)}
                    className="btn btn-outline btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </>
        ))}
    </div>
  );
};

export default Dashboard;
