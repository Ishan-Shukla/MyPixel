import Link from "next/link";
import AppLink from "./AppLink";
import { useRouter } from "next/router";

interface HeaderProps {
  user: Object | null;
}

const Header: React.FC<HeaderProps> = ({ user }) => {
  const router = useRouter();
  return (
    <header>
      <AppLink href="/" label="myPixel" />
      {!user && (
        <Link href={"/auth"}>
          <a>Login</a>
        </Link>
      )}
      {user && router.pathname !== "/create" && (
        <Link href={"/create"}>
          <a>Create New Post</a>
        </Link>
      )}
      {user && <button>Logout</button>}
    </header>
  );
};

export default Header;
