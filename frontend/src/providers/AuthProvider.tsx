import React, { createContext, useEffect, useState } from "react";
import { getFirebaseIdToken } from "../util/firebaseFunctions";
import firebase from "../firebase";
import axios from "axios";
import { apiURL } from "../util/apiURL";
import { useDispatch } from "react-redux";
import { updateCurrentUser, logoutUser } from "../features/auth/authSlice";
import { PropsChildren, User } from "../interfaces/interfaces";



interface Auth {
  currentUser: User | null;
  token: string | null;
}

export const AuthContext = createContext<Auth>({
  currentUser: null,
  token: null,
});

const AuthProvider = ({ children }: PropsChildren) => {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const API = apiURL();
  const dispatch = useDispatch();

  useEffect(() => {
    const updateUser = (user: firebase.User | null) => {
      setLoading(true);
      if (user) {
        const { email, uid } = user;
        const lastLogin = user.metadata.lastSignInTime;
        setCurrentUser({ email, uid, lastLogin });
        getFirebaseIdToken()?.then((token) => {
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
        dispatch(logoutUser());
        setCurrentUser(null);
        setLoading(false);
      }
    };

    const unsubscribe = firebase.auth().onAuthStateChanged(updateUser);
    return unsubscribe;
  }, [API, dispatch]);

  if (loading) return <div>Loading...</div>;

  return (
    <AuthContext.Provider value={{ currentUser, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
