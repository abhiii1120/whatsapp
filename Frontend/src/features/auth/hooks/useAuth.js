import {
  setUser,
  setAccessToken,
  setError,
  setLoading,
} from "../state/auth.slice";
import { registerUser } from "../services/auth.api";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import {useNavigate} from "react-router"

const useAuth = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm();

  const onRegisterSubmit = async (payload) => {
    const data = await registerUser(payload);
    dispatch(setUser(data.user));
    dispatch(setAccessToken(data.accessToken));
  };

  return {
    register,
    onRegisterSubmit,
    handleSubmit,
    navigate,
    errors,
    watch
  };
};

export default useAuth;
