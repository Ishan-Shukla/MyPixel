/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useState } from "react";
type CardProps = {
  post: any;
};
const Card: React.FC<CardProps> = ({ post }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <Link href={`/post/${post.id}`}>
      <a>
        <div className="relative m-2 mb-4">
          {!loaded && (
            <div className=" w-24 h-32 sm:w-32 sm:h-44 md:w-40 md:h-48 lg:w-44 lg:h-56 xl:w-44 2xl:w-52 2xl:h-64 animate-pulse rounded-lg bg-slate-400"></div>
          )}
          <img
            src={post.imageUrl}
            onLoad={() => setLoaded(true)}
            loading="lazy"
            alt={post.title}
            className={`rounded-lg w-56 shadow-xl`}
          />
        </div>
      </a>
    </Link>
  );
};

export default Card;
