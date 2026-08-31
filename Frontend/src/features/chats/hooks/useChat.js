import { searchUsers } from "../../shared/global.api"
import {useDispatch} from "react-redux";
import {setSearchUserResult} from "../state/chat.slice";
const useChat = () => {

    let dispatch = useDispatch();

    const handleSearchUser = async (query) => {
        try {
            const users = await searchUsers(query)
            dispatch(setSearchUserResult(users))
        } catch (error) {
            console.error("Error searching users:",error)
            return []
        }
    }

    return {
        handleSearchUser
    }
}

export default useChat;