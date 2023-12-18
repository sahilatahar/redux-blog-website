import { useSelector } from "react-redux"
import { selectPostIds, getPostStatus, getPostError } from "./postsSlice"
import PostExcerpt from "./PostExcerpt"

const PostsList = () => {

    const postIds = useSelector(selectPostIds);
    const postStatus = useSelector(getPostStatus);
    const postError = useSelector(getPostError);

    // No need already sorted in postSlice.js
    // const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date));

    let content;
    if (postStatus === 'loading') {
        content = <p className="loader">Loading...</p>
    } else if (postStatus === 'succeeded') {
        content = postIds.map(postId => <PostExcerpt key={postId} postId={postId} />)
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