import styles from "./google-login-button.module.scss";
import { FcGoogle } from "react-icons/fc";
// import { auth, googleProvider } from "#firebase/firebase.config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "#firebase/firebase.config.js";
import PropTypes from "prop-types";
import { googleLogin } from "#api/auth.req";
import { useState } from "react";
import LoadingPage from "#components/loading/loading";
import { useNavigate } from "react-router-dom";
const googleProvider = new GoogleAuthProvider();

ConnectedGoogleLoginButton.propTypes = {
  pushFlash: PropTypes.func,
  setCurrentUser: PropTypes.func,
};
function ConnectedGoogleLoginButton({ className }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const navigate = useNavigate();
  const handleGoogleLogin = async () => {
    setIsPopupOpen(true);
    try {
      const authResponse = await signInWithPopup(auth, googleProvider);
      console.log({ authResponse });
      const user = authResponse?.user;
      if (authResponse?.user) {
        try {
          const { data } = await googleLogin({
            uid: user?.uid,
            email: user?.email,
            displayName: user?.displayName,
          });
          if (data?.user) {
            navigate("/", {
              replace: true,
            });
            localStorage.setItem("USER", JSON.stringify(user));
          }
        } catch (apiGoogleLoginError) {
          console.log({ apiGoogleLoginError });
        }
      }
    } catch (googleError) {
      console.error({ googleError });
    }
  };
  return (
    <button
      disabled={isPopupOpen}
      className={styles["google-login-button"] + " " + className}
      onClick={handleGoogleLogin}
    >
      {isPopupOpen ? (
        <LoadingPage.Loader style={{ fontSize: "12px" }} />
      ) : (
        <FcGoogle className={styles.icon} />
      )}
    </button>
  );
}

export default ConnectedGoogleLoginButton;
