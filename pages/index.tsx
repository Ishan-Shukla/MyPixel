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

type HomeProps = {
  initialPosts: Object[] | any;
};

const Home: React.FC<HomeProps> = ({ initialPosts }) => {
  const [posts, setPosts] = useState(initialPosts);
  const [end, setEnd] = useState(false);
  const loadMore = async () => {
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
    if (morePosts?.length < 3) {
      setEnd(true);
    }
  };
  return (
    <div>
      This is Home Page.
      {posts.map((post: any) => {
        return (
          <div key={post.createdAt}>
            <div>
              <Image
                width={100}
                height={100}
                src={post.imageUrl}
                alt={post.title}
              />
              <span>{post.title}</span>
            </div>
            <div>
              <p>{post.description}</p>
            </div>
            <div>
              <p>{post.postedBy}</p>
            </div>
          </div>
        );
      })}
      {end == false ? (
        <button
          className="btn #fb8c00 orange darken-1"
          onClick={() => loadMore()}>
          Load more
        </button>
      ) : (
        <h3>You have reached end</h3>
      )}
    </div>
  );
};

export default Home;

export async function getServerSideProps(context: any) {
  const q: any = query(
    collection(db, "posts"),
    orderBy("createdAt", "desc"),
    limit(3)
  );
  const querySnapshot = await getDocs(q);
  // querySnapshot.forEach((doc) => {
  //   // console.log(doc.id, " => ", doc.data());
  // });
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
