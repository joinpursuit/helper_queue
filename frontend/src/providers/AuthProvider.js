import React, { createContext, useEffect, useState } from "react";
import { getFirebaseIdToken } from "../util/firebaseFunctions";
import firebase from "../firebase";
import axios from "axios";
import { apiURL } from "../util/apiURL";
import { useDispatch } from "react-redux";
import { updateCurrentUser, logoutUser } from "../features/auth/authSlice";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(null);
  const API = apiURL();
  const dispatch = useDispatch();

  const updateUser = (user) => {
    setLoading(true);
    if (user) {
      const { email, uid } = user;
      const lastLogin = user.metadata.lastSignInTime;
      setCurrentUser({ email, uid, lastLogin });
      getFirebaseIdToken().then((token) => {
        setToken(token);
        setLoading(false);
        axios({
          method: "get",
          url: `${API}/api/users/current_user`,
          headers: {
            AuthToken: token,
          },
        })
          .then((res) => {
            dispatch(
              updateCurrentUser({
                email,
                uid,
                lastLogin,
                token,
              })
            );

            setCurrentUser((prevCurrentUser) => ({
              ...res.data.user,
              ...prevCurrentUser,
            }));
          })
          .catch((err) => {
            console.log(err);
          });
      });
    } else {
      dispatch(updateCurrentUser(null));
      dispatch(logoutUser())
      setCurrentUser(null);
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(updateUser);
    return unsubscribe;
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <AuthContext.Provider value={{ currentUser, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
