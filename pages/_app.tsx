import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { auth } from "../firebase";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<Object | null>(null);
  const router = useRouter();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) setUser(user);
      else {
        setUser(null);
        // router.push("/");
      }
    });

    return () => {
      console.log("Exiting");
    };
  }, []);

  return (
    <Layout pageTitle="MyPixel" user={user}>
      <Component {...pageProps} user={user} />
    </Layout>
  );
}

export default MyApp;
