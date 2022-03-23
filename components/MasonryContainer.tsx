import React from "react";
import Masonry from "react-masonry-css";
import Card from "./Card";

const breakpointColumnsObj = {
  default: 5,
  1536: 4,
  1280: 3,
  1024: 2,
  768: 1,
  640: 1,
};

type MasonaryProps = {
  posts: any[];
};

const MasonryContainer: React.FC<MasonaryProps> = ({ posts }) => {
  return (
    <div className="p-6 pt-8 lg:pt-14 md:pl-12 md:pr-12">
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
