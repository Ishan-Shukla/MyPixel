import Link from "next/link";
import AppLink from "./AppLink";
import { useRouter } from "next/router";
import { RiPixelfedLine } from "react-icons/ri";
import { IoIosArrowBack } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import { FiLogIn } from "react-icons/fi";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
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
  return (
    <header>
      <div className="w-full h-14 lg:h-16 xl:h-20 2xl:h-24 z-10 flex items-center bg-slate-800 text-white fixed top-0">
        <div className="flex-none">
          <div className="w-14">
            <Link href={"/"}>
              <a>
                {/* <div className="pl-8 p-5 text-2xl">myPixel</div> */}
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
                <div className="pl-2 pr-2 pt-1 pb-1 font-semibold text-xs lg:text-base xl:text-xl whitespace-nowrap text-slate-800 bg-white cursor-pointer rounded-full">
                  Log In
                </div>
              </a>
            </Link>
          )}
          {user && (
            <div
              className="pl-2 pr-2 pt-1 pb-1 font-semibold text-xs lg:text-base xl:text-xl whitespace-nowrap text-slate-800 bg-white cursor-pointer rounded-full"
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
