import { useSelector } from "react-redux"
import { selectAllPosts, getPostStatus, getPostError } from "./postsSlice"
import PostExcerpt from "./PostExcerpt"

const PostsList = () => {

    const posts = useSelector(selectAllPosts);
    const postStatus = useSelector(getPostStatus);
    const postError = useSelector(getPostError);

    const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date));

    let content;
    if (postStatus === 'loading') {
        content = <p className="loader">Loading...</p>
    } else if (postStatus === 'succeeded') {
        content = orderedPosts.map(post => <PostExcerpt key={post.id} post={post} />)
    } else if (postStatus === 'failed') {
        content = <p>{postError}</p>
    } else {
        content = <p>Something went wrong</p>
    }

    return (
        <section className="PostsList">
            <h2>Posts</h2>
            <div className="posts">
                {content}
            </div>
        </section>
    )
}

export default PostsList