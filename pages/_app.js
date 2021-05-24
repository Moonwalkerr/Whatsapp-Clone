import "../styles/globals.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import { auth, firestore } from "../firebaseConfig";
import LoginPage from "./login";
import Loading from "../comps/loading";
import firebase from "firebase";

function MyApp({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth);
  useEffect(() => {
    if (user) {
      firestore.collection("users").doc(user.uid).set(
        {
          userName: user.displayName,
          photoURL: user.photoURL,
          userEmail: user.email,
          lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
        },
        { merge: true }
      );
    }
  }, [user]);

  if (!user) return <LoginPage />;
  if (loading) return <Loading />;

  return <Component {...pageProps} />;
}

export default MyApp;
