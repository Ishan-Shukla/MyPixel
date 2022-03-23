import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

type postProp = {
  post: Object[] | any;
};

const post: React.FC<postProp> = ({ post }) => {
  return (
    <div className="flex flex-col mt-20 xl:mt-28 h-full w-full items-center justify-center">
      <div className="pl-4 font-semibold text-2xl lg:text-3xl lg:mb-4 xl:text-4xl xl:mb-8 w-full ">
        {post.title}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 justify-items-center mb-8">
        <div className="shadow-lg shadow-slate-500 w-5/6 mb-4 mt-4">
          <div className=" flex items-center justify-center">
            <img src={post.imageUrl} alt={post.title} className="w-full " />
          </div>
          <div className="flex items-center justify-center">
            <div className="flex items-center w-full">
              <div className="w-6 m-4">
                <img
                  src={post.userProfilePic}
                  alt="Profile Pic"
                  className="rounded-full object-contain shadow-xl"
                />
              </div>
              <div className="font-semibold text-gray-800 md:text-sm lg:text-lg xl:text-xl">
                {post.postedBy}
              </div>
            </div>
          </div>
        </div>
        <div className="w-5/6 mt-8 mb-4 md:text-sm lg:text-lg xl:text-xl">
          <label className="uppercase text-gray-800 text-light font-semibold">
            Description
          </label>
          <div className="mt-2 text-gray-500 text-light font-semibold">
            {post.description}
          </div>
          <div className="flex">
            {post.tags.map((tag: any) => (
              <div
                key={tag}
                className="text-gray-500 text-light font-semibold pr-1">{`#${tag}`}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default post;

export async function getServerSideProps({ params }: { params: any }) {
  const docRef = doc(db, "posts", params.post);
  const docSnap: any = await getDoc(docRef);
  const post = {
    ...docSnap.data(),
    createdAt: docSnap.data().createdAt.toMillis(),
    id: docSnap.id,
  };
  return {
    props: { post },
  };
}
