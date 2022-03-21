import { NextPage } from "next";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useRouter } from "next/router";
import { FunctionComponent, useEffect } from "react";
import { auth } from "../firebase";
import { type } from "os";

type User = {
  user: Object | null;
};

const Auth: React.FC<User> = ({ user }) => {
  const router = useRouter();
  useEffect(() => {
    console.log(user);
    if (user) router.push("/");
    return () => {
      console.log("Already Logged in");
    };
  }, []);

  const handleLogin = () => {
    const provider = new GoogleAuthProvider();
    // const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        console.log(token);
        console.log("---------");

        // The signed-in user info.
        const user = result.user;
        console.log(user);
        router.push("/");
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
  return (
    <div>
      <div>Login</div>
      <button onClick={handleLogin}>Login with Google</button>
    </div>
  );
};

export default Auth;
