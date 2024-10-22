import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../utility/Firebase";
import Spinner from "../components/Spinner";
export const ContextOfUser = createContext();

export const ContextOfUserProvider = ({ children }) => {
  const [userDetail, setUserDetail] = useState({ islogin: false });
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User logged in:", user)
        setUserDetail({
            islogin: true,
          ...user,
        });
      } else {
        console.log("User not found (logged out)");
        setUserDetail({
            islogin: false,
          ...user,
        });
      }
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <ContextOfUser.Provider value={userDetail}>
      {loading ? <Spinner /> : children}
    </ContextOfUser.Provider>
  );
};
