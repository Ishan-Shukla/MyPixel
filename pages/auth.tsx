import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useRouter } from "next/router";
import { db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect } from "react";
import { auth } from "../firebase";
import { FcGoogle } from "react-icons/fc";
import { FaGoogle } from "react-icons/fa";

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
          userProfilePic: user.photoURL,
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
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        console.log(token);
        console.log("---------");
        const user = result.user;
        console.log(user);
        saveUser(user);
        router.push("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };
  return (
    <div className="flex justify-start items-center flex-col h-screen w-full">
      <div className="flex flex-col items-center h-full w-full">
        <div className="mt-32 xl:mt-56 cursor-default ">
          <div className="flex bg-slate-300 rounded-full md:p-4 p-2 border-2 border-slate-500">
            <FcGoogle size={"2em"} />
          </div>
        </div>
        <h1 className="text-gray-600 mt-5 font-bold md:text-2xl text-xl">
          LOGIN
        </h1>
        <div
          onClick={handleLogin}
          className="flex mt-24 xl:mt-32 text-sm xl:text-lg cursor-pointer p-4 bg-slate-800 text-white items-center rounded-full">
          <FaGoogle className="mr-2" />
          <div>Login with google</div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
