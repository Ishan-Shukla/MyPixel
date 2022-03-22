import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useRouter } from "next/router";
import { storage, db, timestamp } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { FunctionComponent, useEffect } from "react";
import { auth } from "../firebase";
import { type } from "os";
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
    <div className="flex justify-start items-center flex-col h-screen w-full">
      <div className="flex flex-col items-center h-full w-full">
        <div className="mt-32 cursor-default ">
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

{
  /* <div className="relative flex bg-gray-200 items-center justify-center mb-32">
<div className=" absolute top-24 h-4/6 flex flex-col bg-white rounded-lg shadow-xl w-11/12 md:w-9/12 lg:w-1/2">
  <div className="flex justify-center py-4">
    <div className="flex bg-slate-300 rounded-full md:p-4 p-2 border-2 border-slate-500">
      <FcGoogle size={"2em"} />
    </div>
  </div>
  <div className="flex justify-center">
    <div className="flex">
      <h1 className="text-gray-600 font-bold md:text-2xl text-xl">
        LOGIN
      </h1>
    </div>
  </div>
  <div className="flex items-center justify-center  pt-5 pb-5">
    <button className="w-auto bg-gray-800 hover:bg-gray-700 rounded-lg shadow-xl font-medium text-white px-4 py-2">
      Cancel
    </button>
  </div>
</div>
</div> */
}
