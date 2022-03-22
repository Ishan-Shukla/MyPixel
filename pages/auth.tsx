import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useRouter } from "next/router";
import { storage, db, timestamp } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
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
      console.log("Logged in");
    };
  }, []);

  const saveUser = async (user: any) => {
    try {
      const docRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(docRef);
      if (userSnap.exists()) {
        console.log("User Already in server");
      } else {
        const userData = {
          name: user.displayName,
          email: user.email,
          uid: user.uid,
        };
        await setDoc(docRef, userData);
        console.log("User Created Succesfully");
      }
    } catch (error) {
      console.log("An Unexpected Error Occurred while uploading user data: ");
      console.log(error);
    }
  };
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
        saveUser(user);
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
