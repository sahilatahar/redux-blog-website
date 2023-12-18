import { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewPost } from "./postsSlice";
import AuthorsList from "./AuthorsList";
import { useNavigate } from "react-router-dom";

const PostAddForm = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const [post, setPost] = useState({
        title: "",
        body: "",
        userId: "1"
    });
    const [addRequestStatus, setAddRequestStatus] = useState("idle");

    const canSave = [post.title, post.body, post.userId].every(Boolean) && addRequestStatus === "idle";

    const handleChange = (e) => {
        setPost({
            ...post,
            [e.target.name]: e.target.value
        })
    }

    const handleUserChange = (e) => setPost(pre => {
        return { ...pre, userId: e.target.value }
    });

    const handleSave = (e) => {
        e.preventDefault();

        if (canSave) {
            console.log("valid", post)
            try {
                setAddRequestStatus("pending");
                dispatch(
                    addNewPost({
                        title: post.title,
                        body: post.body,
                        userId: post.userId
                    }
                    )
                );
                setPost({
                    title: "",
                    body: "",
                    userId: ""
                });
                navigate("/");
            } catch (err) {
                console.log("Failed to save the post", err);
            } finally {
                setAddRequestStatus("idle");
            }
        }
    }

    return (
        <div className="PostAddForm">
            <h2>Add a New Post</h2>
            <form onSubmit={handleSave}>
                <div className="input-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" name="title" value={post.title} onChange={handleChange} />
                </div>
                <div className="input-group">
                    <label htmlFor="user">User</label>
                    <select name="user" id="user" onChange={handleUserChange} value={0}>
                        <option value={0} disabled>select</option>
                        <AuthorsList />
                    </select>
                </div>
                <div className="input-group">
                    <label htmlFor="body">Content</label>
                    <textarea type="text" id="body" name="body" value={post.body} onChange={handleChange} ></textarea>
                </div>
                <button type="submit">Save Post</button>
            </form>
        </div>
    )
}

export default PostAddForm