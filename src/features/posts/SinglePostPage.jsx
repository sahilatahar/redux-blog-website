import { useSelector } from "react-redux";
import { selectPostById } from "./postsSlice";
import PostAuthor from "./PostAuthor";
import TimeAgo from './TimeAgo';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const SinglePostPage = () => {

    const { postId } = useParams();

    const post = useSelector(state => selectPostById(state, Number(postId)))

    if (!post) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        )
    }

    return (
        <section className="SinglePostPage">
            <article>
                <h2>{post.title}</h2>
                <p className="post-content">{post.body}</p>
                <div className="postCredit">
                    <Link to={`/post/edit/${post.id}`} className="btn-accent">
                        Edit Post
                    </Link>
                    <PostAuthor userId={post.userId} />
                    <TimeAgo timestamp={post.date} />
                </div>
            </article>
        </section>
    )
}

export default SinglePostPage