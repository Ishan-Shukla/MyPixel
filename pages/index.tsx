import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { db } from "../firebase";
import {
  collection,
  query,
  orderBy,
  startAfter,
  limit,
  getDocs,
} from "firebase/firestore";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import MasonryContainer from "../components/MasonryContainer";
import { MdOutlineExpandMore } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { BeatLoader } from "react-spinners";

type HomeProps = {
  initialPosts: Object[] | any;
};

const Home: React.FC<HomeProps> = ({ initialPosts }) => {
  const [posts, setPosts] = useState(initialPosts);
  const [end, setEnd] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadMore = async () => {
    setLoading(true);
    const lastVisible = posts[posts?.length - 1];
    const next = query(
      collection(db, "posts"),
      orderBy("createdAt", "desc"),
      startAfter(new Date(lastVisible.createdAt)),
      limit(3)
    );
    const querySnapshot = await getDocs(next);
    const morePosts: any = querySnapshot.docs.map((docSnap: any) => {
      return {
        ...docSnap.data(),
        createdAt: docSnap.data().createdAt.toMillis(),
        id: docSnap.id,
      };
    });
    setPosts(posts.concat(morePosts));
    setLoading(false);
    if (morePosts?.length < 3) {
      setEnd(true);
    }
  };

  return (
    <>
      <div className="relative top-10 w-full lg:top-20 min-h-screen h-fit ">
        <MasonryContainer posts={posts} />
        {!loading && end == false ? (
          <div className="w-full" onClick={loadMore}>
            <div className="absolute bottom-5 left-1/2">
              <MdOutlineExpandMore scale={"5em"} />
            </div>
          </div>
        ) : null}
        {loading && (
          <div className="absolute bottom-5 left-1/2">
            <BeatLoader size={15} margin={2} />
          </div>
        )}
      </div>
    </>
  );
};

export default Home;

export async function getServerSideProps(context: any) {
  const q: any = query(
    collection(db, "posts"),
    orderBy("createdAt", "desc"),
    limit(20)
  );
  const querySnapshot = await getDocs(q);
  const initialPosts: any = querySnapshot.docs.map((docSnap: any) => {
    return {
      ...docSnap.data(),
      createdAt: docSnap.data().createdAt.toMillis(),
      id: docSnap.id,
    };
  });
  // console.log(initialPosts);

  return {
    props: { initialPosts }, // will be passed to the page component as props
  };
}
