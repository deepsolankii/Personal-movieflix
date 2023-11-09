import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO } from "../utils/constants";

const Header = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => navigate("/error"));
  };

  useEffect(() => {
    console.log("Header");
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("reached", user);
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(
          addUser({
            uid,
            email,
            displayName,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="absolute w-screen bg-gradient-to-b from-black z-10 flex justify-between">
      <img className="w-52 ml-7 my-1" src={LOGO} alt="logo" />
      {user && (
        <div className="p-8">
          <button onClick={handleSignOut} className="bg-yellow-50">
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
