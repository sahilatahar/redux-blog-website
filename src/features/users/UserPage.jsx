import { useSelector } from "react-redux";
import { selectUserById } from "./usersSlice";
import { selectPostsByUserId } from "../posts/postsSlice";
import { useParams } from "react-router-dom";
import PostExcerpt from "../posts/PostExcerpt";

function UserPage() {

    const { userId } = useParams();

    // const user = useSelector(state => selectUserById(state, Number(userId)));
    // const posts = useSelector(selectAllPosts);
    // const userPosts = posts.filter(post => post.userId === Number(userId));

    const userPosts = useSelector(state => selectPostsByUserId(state, userId));
    const user = useSelector(state => selectUserById(state, Number(userId)));

    const renderedPosts = userPosts.map(post => <PostExcerpt key={post.id} post={post} />)

    return (
        <section className="UserPage">
            <h2>{user?.name} Posts</h2>
            <div className="posts">{renderedPosts}</div>
        </section>
    )
}

export default UserPage