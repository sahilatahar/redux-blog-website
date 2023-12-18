import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { selectPostById, updatePost, deletePostById } from "./postsSlice";
import AuthorsList from "./AuthorsList";
import { useParams, useNavigate } from "react-router-dom";

function EditPostForm() {

  const { postId } = useParams();
  const navigate = useNavigate();

  const post = useSelector(state => selectPostById(state, postId));

  const dispatch = useDispatch();
  const [updatedPost, setUpdatedPost] = useState({
    title: post?.title,
    body: post?.body,
    userId: post?.userId
  });

  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    )
  }

  const canSave = [updatedPost.title, updatedPost.body, updatedPost.userId].every(Boolean) && addRequestStatus === "idle";

  const handleChange = (e) => {
    setUpdatedPost(pre => {
      return { ...pre, [e.target.name]: e.target.value }
    })
  }

  const handleUserChange = (e) => setUpdatedPost(pre => {
    return { ...pre, userId: Number(e.target.value) }
  });

  const handleSave = (e) => {
    e.preventDefault();

    if (canSave) {
      try {
        setAddRequestStatus("pending");

        dispatch(
          updatePost({
            id: postId,
            title: updatedPost.title,
            body: updatedPost.body,
            userId: updatedPost.userId,
            reactions: post.reactions
          })
        ).unwrap();

        setUpdatedPost({
          title: "",
          body: "",
          userId: ""
        });

        navigate(`/`);
      } catch (err) {
        console.log("Failed to save the post", err);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  }

  const deletePost = () => {
    try {
      setAddRequestStatus("pending");

      dispatch(
        deletePostById(postId)
      ).unwrap();

      setUpdatedPost({
        title: "",
        body: "",
        userId: ""
      });

      navigate('/');
    } catch (err) {
      console.log("Failed to delete the post", err);
    } finally {
      setAddRequestStatus("idle");
    }
  }

  return (
    <div className="PostAddForm">
      <h2>Edit Post</h2>
      <form onSubmit={handleSave}>
        <div className="input-group">
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" value={updatedPost.title} onChange={handleChange} />
        </div>
        <div className="input-group">
          <label htmlFor="user">Author</label>
          <select name="user" id="user" onChange={handleUserChange} defaultValue={post.userId}>
            <option value={0} disabled>select</option>
            <AuthorsList />
          </select>
        </div>
        <div className="input-group">
          <label htmlFor="body">Content</label>
          <textarea type="text" id="body" name="body" value={updatedPost.body} onChange={handleChange} ></textarea>
        </div>
        <button type="submit">Save Post</button>
        <button onClick={deletePost} className="danger">Delete Post</button>
      </form>
    </div>
  )
}

export default EditPostForm