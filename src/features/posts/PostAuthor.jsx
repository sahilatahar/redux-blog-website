import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersSlice";

const PostAuthor = ({ userId }) => {
    const users = useSelector(selectAllUsers);

    const user = users.find(user => user.id == userId);

    if (!user) {
        return <span>by Unknown User</span>
    }

    return <span>by {user.name}</span>
}

export default PostAuthor