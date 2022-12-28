import styles from "./index.module.css";

import { Link } from "react-router-dom";

const PostItem = ({ post }) => {
  return (
    <div className={styles.postItem}>
      <img src={post.image} alt={post.title} />
      <h3>{post.title}</h3>
      <p className={styles.createdBy}>{post.createdBy}</p>
      <div className={styles.tags}>
        {post.tags.map((tag) => (
          <p key={tag}>
            <span>#</span>
            {tag}
          </p>
        ))}
      </div>
      <Link to={`/posts/${post.id}`} className="btn btn-outline">
        Read More
      </Link>
    </div>
  );
};

export default PostItem;
