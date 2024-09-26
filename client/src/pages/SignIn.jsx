import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth";

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  // console.log("msg", loading, error, error.message);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(signInStart());

      const res = await fetch(`/api/auth/SignIn`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      // console.log("data", data);
      if (data.success === false) {
        dispatch(signInFailure(data));
        return;
      }

      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error));
      //  console.log("Error!", error);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="my-7 text-3xl text-center font-semibold">
        Sign In(Login)
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 justify-center"
      >
        <input
          type="text"
          placeholder="enter email"
          id="email"
          className="bg-slate-100 p-3 rounded-md"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="enter password"
          id="password"
          className="bg-slate-100 p-3 rounded-md"
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 py-5 rounded-md uppercase hover:opacity-90 disabled:opacity-80"
        >
          {loading ? "Loading..." : " Sign In"}
        </button>
        <OAuth />
      </form>

      <div className="flex gap-2 mt-5 items-center">
        <p>Create new account?</p>

        <Link to="/sign-up">
          <span className="text-blue-500">Sign Up</span>
        </Link>
      </div>

      <p className="text-red-700 mt-5">
        {error ? error?.message || "Something went wrong!" : ""}
      </p>
    </div>
  );
};

export default SignIn;
