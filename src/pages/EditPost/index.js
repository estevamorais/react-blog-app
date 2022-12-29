import styles from "./index.module.css";

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";
import { useFetchDocument } from "../../hooks/useFetchDocument";

const EditPost = () => {
  const { id } = useParams();
  const { document: post } = useFetchDocument("posts", id);

  const [title, setTitle] = useState();
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setImage(post.image);
      setBody(post.body);

      const textTags = post.tags.join(", ");
      setTags(textTags);
    }
  }, [post]);

  const { updateDocument, response } = useUpdateDocument("posts");

  const navigate = useNavigate();

  const { user } = useAuthValue();

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    // validade image URL
    try {
      new URL(image);
    } catch (error) {
      setFormError("The image needs to be a URL");
    }

    // create tags array
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

    // check all values
    if (!title || !image || !body || !tags) {
      setFormError("Please fill in all fields");
    }

    if (formError) return;

    const data = {
      title,
      image,
      body,
      tags: tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    };

    updateDocument(id, data);

    // redirect to home page
    navigate("/dashboard");
  };

  return (
    <div className={styles.editPost}>
      <h2>Edit Post</h2>
      {post && (
        <form onSubmit={handleSubmit}>
          <label>
            <span>Title:</span>
            <input
              type="text"
              name="title"
              placeholder="Insert your post title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label>
            <span>Image URL:</span>
            <input
              type="text"
              name="image"
              placeholder="Insert your post image url"
              required
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </label>
          {image && (
            <>
              <p className={styles.previewTitle}>Image Preview:</p>
              <img className={styles.previewImage} src={image} alt={title} />
            </>
          )}
          <label>
            <span>Content:</span>
            <textarea
              type="text"
              name="body"
              placeholder="Insert your post content"
              required
              value={body}
              rows="8"
              onChange={(e) => setBody(e.target.value)}
            ></textarea>
          </label>
          <label>
            <span>Tags:</span>
            <input
              type="text"
              name="tags"
              placeholder="enter the tags separated by a comma"
              required
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </label>
          {!response.loading ? (
            <button className="btn" type="submit">
              Update
            </button>
          ) : (
            <button className="btn" type="submit" disabled>
              Loading...
            </button>
          )}
          {response.error && <p className="error">{response.error}</p>}
          {formError && <p className="error">{formError}</p>}
        </form>
      )}
    </div>
  );
};

export default EditPost;
