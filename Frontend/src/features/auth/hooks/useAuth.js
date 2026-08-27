import {
  setUser,
  setAccessToken,
  setError,
  setLoading,
} from "../state/auth.slice";
import { getCurrentUser, loginUser, registerUser } from "../services/auth.api";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

const useAuth = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  /**
   * Registers a new user and dispatches redux actions for updating redux store with user credentials and access token.
   * @param {object} payload - contains user details like username,email and password.
   * @returns {Promise<void>} A promise that resolves when the registration is complete.
   */
  const onRegisterSubmit = async (payload) => {
    try {
      const data = await registerUser(payload);

      dispatch(setUser(data.user));
      dispatch(setAccessToken(data.accessToken));
    } catch (error) {
      console.error("Error while registering user", error);
    }
  };

  /**
   * Logs a new user by dispatching actions to update redux store with the user credentials and access token.
   * @param {Object} payload - contains user details like email and password.
   * @returns {Promise<void>} A promise that resolves when the login is complete.
   */
  const onLoginSubmit = async (payload) => {
    try {
      const data = await loginUser(payload);

      dispatch(setUser(data.user));
      dispatch(setAccessToken(data.accessToken));
    } catch (error) {
      console.error("error while log in user", error);
    }
  };

  /**
   * Gets the current user details from server and updates redux store with user credentials.
   * @returns {Promise<void>} A promise that resolves when user data is fetched and redux store is updated.
   */
  const handleGetCurrentUser = async () => {
    try {
          dispatch(setLoading(true));
      const data = await getCurrentUser();
      dispatch(setUser(data.user))
      console.log(data)
    } catch (error) {
      console.error("error while fetching current user:", error);
    }
    finally{
      dispatch(setLoading(false));
    }
  };

  return {
    register,
    onRegisterSubmit,
    handleSubmit,
    errors,
    watch,
    onLoginSubmit,
    handleGetCurrentUser,
  };
};

export default useAuth;
