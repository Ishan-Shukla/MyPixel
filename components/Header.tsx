import Link from "next/link";
import { useRouter } from "next/router";
import { RiPixelfedLine } from "react-icons/ri";
import { IoIosArrowBack } from "react-icons/io";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useEffect } from "react";
interface HeaderProps {
  user: any;
}

const Header: React.FC<HeaderProps> = ({ user }) => {
  const logOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Logged Out");
      })
      .catch((error) => {
        console.log("Error Occured During Log Out");
        console.log(error);
      });
  };
  const router = useRouter();
  useEffect(() => {
    if (user && router.pathname === "/auth") router.push("/");
    else if (!user && router.pathname === "/create") router.push("/");
    return () => {
      console.log("Logged in");
    };
  }, [user]);
  return (
    <header>
      <div className="w-full h-14 lg:h-16 xl:h-20 2xl:h-24 z-10 flex items-center bg-slate-800 text-white fixed top-0">
        <div className="flex-none">
          <div className="w-14">
            <Link href={"/"}>
              <a>
                {router.pathname === "/" && (
                  <RiPixelfedLine
                    className="ml-4 xl:ml-8 2xl:ml-10 mr-4 lg:scale-105 xl:scale-110 2xl:scale-150"
                    size={"2em"}
                  />
                )}
                {router.pathname !== "/" && (
                  <IoIosArrowBack
                    className="ml-4 xl:ml-8 2xl:ml-10 mr-4 lg:scale-105 xl:scale-110 2xl:scale-150"
                    size={"2em"}
                  />
                )}
              </a>
            </Link>
          </div>
        </div>
        <div className="text-xl xl:text-3xl 2xl:text-4xl ml-8 mr-4 text-center text-ellipsis whitespace-nowrap grow cursor-default">
          MyPixel
        </div>
        <div className="w-14 mr-4 xl:mr-8 2xl:mr-10 flex justify-end items-center">
          {!user && router.pathname !== "/auth" && (
            <Link href={"/auth"}>
              <a>
                <div className="pl-2 pr-2 lg:pl-4 lg:pr-4 pt-1 pb-1 lg:pt-2 lg:pb-2 font-semibold text-xs lg:text-base xl:text-xl whitespace-nowrap text-slate-800 bg-white cursor-pointer rounded-full">
                  Log In
                </div>
              </a>
            </Link>
          )}
          {user && (
            <div
              className="pl-2 pr-2 lg:pl-4 lg:pr-4 pt-1 pb-1 lg:pt-2 lg:pb-2 font-semibold text-xs lg:text-base xl:text-xl whitespace-nowrap text-slate-800 bg-white cursor-pointer rounded-full"
              onClick={logOut}>
              Log Out
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
