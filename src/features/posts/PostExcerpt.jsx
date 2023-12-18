import PostAuthor from "./PostAuthor";
import TimeAgo from './TimeAgo';
import ReactionButtons from "./ReactionButtons";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

const PostExcerpt = ({ post }) => {

    return (
        <article className="post">
            <h3>{post.title}</h3>
            <p >{post.body.substring(0, 75)}</p>
            <div className="postCredit">
                <Link to={`post/${post.id}`} className="btn-accent">View Post</Link>
                <PostAuthor userId={post.userId} />
                <TimeAgo timestamp={post.date} />
            </div>
            <ReactionButtons post={post} />
        </article>
    )
}

PostExcerpt.propTypes = {
    post: PropTypes.object.isRequired
}

export default PostExcerpt