/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { useState } from "react";
import placeHolder from "../public/grey.png";
type CardProps = {
  post: any;
};
const Card: React.FC<CardProps> = ({ post }) => {
  const [loaded, setLoaded] = useState(false);
  const [hover, setHover] = useState(false);
  return (
    <div className="relative m-2 mb-4">
      {!loaded && (
        <div className=" w-24 h-32 sm:w-32 sm:h-44 md:w-40 md:h-48 lg:w-44 lg:h-56 xl:w-44 2xl:w-52 2xl:h-64 animate-pulse rounded-lg bg-slate-400"></div>
      )}
      <img
        src={post.imageUrl}
        onLoad={() => setLoaded(true)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        loading="lazy"
        alt={post.title}
        className={`rounded-lg w-56 shadow-xl`}
      />
      {/* {loaded && hover && (
        <div className="absolute bottom-2 left-2 text-xs flex items-center">
          <div className="w-8">
            <img
              src={post.userProfilePic}
              alt="Profile Pic"
              className="rounded-full object-contain shadow-xl"
            />
          </div>
          <div className="ml-2 text-ellipsis w-5/6 text-primary2">
            {post.postedBy}
          </div>
        </div>
      )} */}
    </div>
  );
};

export default Card;
