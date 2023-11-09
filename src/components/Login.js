import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { isValidUser } from "../utils/validate";
import { AlertCircle } from "lucide-react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import { addUser } from "../utils/userSlice";
import Header from "./Header";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";

const Login = () => {
  const dispath = useDispatch();
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessge] = useState("");
  const email = useRef();
  const password = useRef();
  const username = useRef();

  const toggleSignInForm = () => {
    setIsSignInForm((prev) => !prev);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const message = isValidUser(email.current.value, password.current.value);
    if (!isSignInForm && !username.current.value) {
      return setErrorMessge("Please enter user name");
    }
    if (message) return setErrorMessge(message);
    if (!isSignInForm) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, { displayName: username.current.value }).then(
            () => {
              const { uid, email, displayName } = auth.currentUser;
              dispath(addUser(uid, email, displayName));
            }
          );
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("Error", error);
          setErrorMessge(errorCode + "-" + errorMessage);
          // ..
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const { uid, email, displayName } = userCredential.user;
          dispath(addUser({ uid, email, displayName }));
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(error);
          setErrorMessge(errorCode + "-" + errorMessage);
        });
    }
  };
  return (
    <div>
      <Header />
      <div className="absolute bg-black">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/ab4b0b22-2ddf-4d48-ae88-c201ae0267e2/0efe6360-4f6d-4b10-beb6-81e0762cfe81/IN-en-20231030-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="background"
          className="opacity-50"
        />
      </div>
      <form
        className="absolute max-w-md p-16 pt-14 my-24 mx-auto right-0 left-0 bg-black/75 text-white"
        onSubmit={onSubmitHandler}
      >
        <h1 className="font-semibold text-[32px] mb-5">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            ref={username}
            type="text"
            placeholder="Full name"
            className="p-3.5 my-2 w-full bg-gray-750 rounded placeholder:text-gray-550 placeholder:text-sm placeholder:p-2 "
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email or phone number"
          className="p-3.5 my-2 w-full bg-gray-750 rounded placeholder:text-gray-550 placeholder:text-sm placeholder:p-2 "
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-3.5 my-2 w-full bg-gray-750 rounded placeholder:text-gray-550 placeholder:text-sm placeholder:p-2"
        />
        {errorMessage && (
          <p className="text-orange-500 text-xs flex mt-2 ">
            <AlertCircle className="mr-3 w-5" />
            {errorMessage}
          </p>
        )}
        <button className="font-semibold p-3 my-6 bg-red-600 w-full rounded">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="text-gray-550">
          {isSignInForm ? "New to Netflix? " : "Already Registered? "}
          <Link to={"/"} onClick={toggleSignInForm} className="text-white">
            {isSignInForm ? "Sign up now." : "Sign In"}
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
