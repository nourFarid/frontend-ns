import { removeAuthUser } from "./Storage";
import { useNavigate } from "react-router-dom";

export const CheckExpired = () => {
  const navigate = useNavigate(); // Move inside a React function component

  const sessionData = JSON.parse(localStorage.getItem("session"));
  if (sessionData && sessionData.expireAt) {
    if (new Date(sessionData.expireAt) < new Date()) {
      // Session has expired, remove user data from localStorage
      removeAuthUser();
      navigate("/home");
    } else {
      // Session is still valid, redirect to home page
      navigate("/home");
    }
  }
};
