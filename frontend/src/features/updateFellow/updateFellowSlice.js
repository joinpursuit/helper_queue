import axios from "axios";
import { apiURL } from "../../util/apiURL";
import { getNewFirebaseIdToken } from "../auth/authSlice";


const API = apiURL();

export const updateFellow =  (user) => async (dispatch, getState) => {
    try {
        await dispatch(getNewFirebaseIdToken());
        const token = getState().auth.token;
        const res = await axios({
        method: "patch",
        url: `${API}/api/users/update_users_class`,
        headers: {
            AuthToken: token,
        },
        data: user,
        });

    } catch (error) {
        throw Error(error.message)
    }
}
