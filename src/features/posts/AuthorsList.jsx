import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersSlice";

function AuthorsList() {

    const users = useSelector(selectAllUsers);

    const authorList = users.map(user => {
        return (
            <option value={user.id} key={user.id}>{user.name}</option>
        )
    })

    return authorList;
}

export default AuthorsList