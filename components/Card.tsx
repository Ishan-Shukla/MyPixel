/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
type CardProps = {
  post: any;
};
const Card: React.FC<CardProps> = ({ post }) => {
  const [loaded, setLoaded] = useState(false);
  const datePosted = new Date(post.createdAt);
  return (
    <div className=" mb-10 md:ml-4 md:mr-4 shadow-lg text-xs md:text-sm lg:text-sm 2xl:text-base">
      <div className="relative">
        <div className=" shadow-xl">
          <div className="bg-slate-700 rounded-t-lg text-white flex items-center">
            <div className="w-6 m-3">
              <img
                src={post.userProfilePic}
                alt="Profile Pic"
                className="rounded-full object-contain shadow-xl"
              />
            </div>
            <div className="relative">
              <div className="truncate">{post.postedBy}</div>
              <div className=" text-neutral-400 lg:-mt-1">
                {datePosted.toLocaleDateString()}
              </div>
            </div>
          </div>
          {!loaded && (
            <div className=" w-full h-32 sm:h-44 md:h-48 lg:h-56 2xl:h-64 border-l-2 border-r-2 border-slate-700 animate-pulse bg-slate-400"></div>
          )}
          <div className="w-full border-l-2 border-r-2 border-slate-700">
            <img
              src={post.imageUrl}
              onLoad={() => setLoaded(true)}
              loading="lazy"
              alt={post.title}
              className={`w-full`}
            />
          </div>
          <div className="pl-2 pr-2 rounded-b-lg border-t-0 border-2 border-slate-700 ">
            <div className=" pt-2">
              <div className="text-light -mt-1 font-bold">{post.title}</div>
            </div>
            <div className=" pt-2">
              <div className="text-light leading-snug font-semibold">
                {post.description}
              </div>
            </div>
            <div className="flex flex-wrap mb-3 leading-snug">
              {post.tags.map((tag: any) => (
                <div
                  key={tag}
                  className=" text-light font-semibold
                   pr-1">{`#${tag}`}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
