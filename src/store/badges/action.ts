
import { SERVER_URL } from "../../util/constant";
import { badgeAction } from "./index";
import axios from "axios";

export const getUserBadgesAction = (userId: string) => async (dispatch: any) => {
  try {
    dispatch(badgeAction.setIsLoading(true));
    dispatch(badgeAction.setError(null));

    const response = await axios.get(`${SERVER_URL}/${userId}`);
    
    if (response.data.status === 200) {
      dispatch(badgeAction.setUserBadges(response.data.data));
      return {
        type: true,
        data: response.data.data
      };
    } else {
      dispatch(badgeAction.setError(response.data.message));
      return {
        type: false,
        error: response.data.message
      };
    }
  } catch (error: any) {
    dispatch(badgeAction.setError(error.message));
    return {
      type: false,
      error: error.message
    };
  } finally {
    dispatch(badgeAction.setIsLoading(false));
  }
}; 