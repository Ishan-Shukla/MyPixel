import { type } from "os";
import React from "react";
import Masonry from "react-masonry-css";
import Card from "./Card";

const breakpointColumnsObj = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 4,
  1000: 3,
  500: 2,
};

type MasonaryProps = {
  posts: any[];
};

const MasonryContainer: React.FC<MasonaryProps> = ({
  posts,
}) => {
  return (
    <div className="p-10">
      <Masonry
        className="flex animate-slide-fwd"
        breakpointCols={breakpointColumnsObj}>
        {posts?.map((post) => (
          <Card key={post.id} post={post} />
        ))}
      </Masonry>
    </div>
  );
};

export default MasonryContainer;
