import Head from "next/head";
import Header from "./Header";
import Link from "next/link";
import { useRouter } from "next/router";
import { BsPlusCircleFill } from "react-icons/bs";

interface LayoutProps {
  pageTitle: string;
  user: Object | null;
}

const Layout: React.FC<LayoutProps> = ({ pageTitle, user, children }) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <div className="relative">
        <Header user={user} />
        <main>
          <div className=" relativew-full">{children}</div>
        </main>
        {user &&
          !(
            router.pathname === "/create" || router.pathname.includes("/post/")
          ) && (
            <Link href={"/create"}>
              <a>
                <BsPlusCircleFill
                  className="fixed bottom-6 right-2 xl:scale-150 xl:right-4 xl:bottom-12 z-20"
                  size={"2em"}
                />
              </a>
            </Link>
          )}
      </div>
    </>
  );
};

export default Layout;
