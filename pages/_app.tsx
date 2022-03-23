import "../styles/globals.css";
import type { AppProps } from "next/app";
import { auth } from "../firebase";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<Object | null>(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) setUser(user);
      else {
        setUser(null);
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
