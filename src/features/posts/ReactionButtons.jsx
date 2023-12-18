import { reactionAdded } from "./postsSlice";
import { useDispatch } from "react-redux";

const reactionsList = {
    thumbsUp: '👍',
    hooray: '🎉',
    heart: '❤️',
    rocket: '🚀',
    eyes: '👀'
}

const ReactionButtons = ({ post }) => {
    const dispatch = useDispatch();

    const handleOnClick = (reactionName) => {
        dispatch(reactionAdded({ postId: post.id, reaction: reactionName }))
    }

    const reactionButtons = Object.entries(reactionsList).map(([name, emoji]) => {
        return (
            <button key={name} type="button" onClick={() => handleOnClick(name)}>
                {emoji} {post.reactions[name]}
            </button>
        )
    })

    return <div className="ReactionButtons">{reactionButtons}</div>;
}

export default ReactionButtons