import Head from "next/head";
import Header from "./Header";
interface LayoutProps {
  pageTitle: string;
  user: Object | null;
}

const Layout: React.FC<LayoutProps> = ({ pageTitle, user, children }) => {
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <div>
        <Header user={user} />
        <main>{children}</main>
      </div>
    </>
  );
};

export default Layout;
