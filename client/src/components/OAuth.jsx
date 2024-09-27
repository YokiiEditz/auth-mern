import { GoogleAuthProvider, signInWithPopup, getAuth } from "@firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice.js";
import { useNavigate } from "react-router-dom";

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      // console.log("result", result);
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });

      const data = await res.json();
      console.log("userdata", data);

      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      console.log("Could not logined in!", error.message);
    }
  };

  return (
    <>
      <button
        onClick={handleGoogleClick}
        type="button"
        className="p-3 bg-red-700 text-white rounded-md uppercase hover:opacity-95"
      >
        Contine with Google
      </button>
    </>
  );
};

export default OAuth;
