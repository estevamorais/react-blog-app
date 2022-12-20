import styles from "./index.module.css";

import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className={styles.about}>
      <h1>
        About React <span>Blog</span>
      </h1>
      <p>
        This project consists of a blog made with React on the front-end and
        Firebase on the back-end.
      </p>
      <Link to="/posts/create" className="btn">
        New Post
      </Link>
    </div>
  );
};

export default About;
