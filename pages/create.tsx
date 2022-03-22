import { NextPage } from "next";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { storage, db, timestamp } from "../firebase";
import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { error } from "console";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { BsFilePost } from "react-icons/bs";

type Create = {
  user: Object | null | any;
};

const Create: React.FC<Create> = ({ user }) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [url, setUrl] = useState<string>("");
  const [tag, setTag] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const router = useRouter();

  const [isNameFilled, checkName] = useState(true);
  const [isDescriptionFilled, checkDescription] = useState(true);
  const [isFileSelected, checkFile] = useState(true);
  const [assetInput, updateAssetInput] = useState({
    name: "",
    description: "",
  });
  const [file, setFile] = useState("");
  const [fileError, setFileError] = useState("");
  const [isOpen, setModal] = useState(false);
  const [errorcode, setErrorcode] = useState(0);
  const refFileInput = useRef(null);
  const Bvalid = "border-gray-200 placeholder-gray-400";
  const Binvalid = "border-red-600 placeholder-red-600";
  const Ovalid = "ring-black";
  const Oinvalid = "ring-red-400";

  useEffect(() => {
    const uploadPost = async () => {
      if (url) {
        try {
          const serverTimestamp = timestamp().toMillis();
          const postData = {
            title: title,
            description: description,
            imageUrl: url,
            userLocation: `/users/${user?.uid}`,
            createdAt: timestamp(),
            tags: tags,
            postedBy: user.displayName,
            userProfilePic: user.photoURL,
          };
          // console.log(db);
          const docRef = doc(db, "posts", uuidv4());
          // console.log(docRef);
          // const postRef = await addDoc(collection(db, "posts"), postData);
          const postRef = await setDoc(docRef, postData);
          console.log("Post Created Succesfully");
          console.log(postRef);
          router.push("/");
        } catch (error) {
          console.log("An Unexpected Error Occurred while uploading post: ");
          console.log(error);
        }
      }
    };
    uploadPost();
  }, [url]);

  const formatBytes = (bytes: number, decimals: number = 2) => {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  const handleFile = (e: any) => {
    try {
      const file = e?.target.files[0];
      console.log(file);
      var reader: FileReader = new FileReader();
      // Read the cotents of Image File.
      reader.readAsDataURL(file);
      reader.onload = async function (e) {
        //Initiate the JavaScript Image object.
        var image = new Image();
        //Set the Base64 string return from FileReader as source.
        image.src = e?.target?.result as string;
        image.onload = () => {
          setImage(file);
          // checkFile(true);
          // setFileError("");
          console.log("Loaded Successfully");
          console.log("Height: " + image.height);
          console.log("Width: " + image.width);
          console.log("File Name: " + file.name);
          console.log("File Size: " + formatBytes(file.size));
        };
        image.onerror = () => {
          console.error("Error Occurred on Loading");
        };
      };
    } catch (error) {
      console.log("Error while Handling File");
      console.log(error);
    }
  };

  const SubmitDetails = () => {
    if (!title || !description || !image) {
      console.log("Incomplete form");

      return;
    }
    const path = `images/${uuidv4()}`;
    const imageRef = ref(storage, path);
    uploadBytes(imageRef, image)
      .then((snapshot) => {
        console.log("Upload Complete Sucessfully");
        console.log("snapshot:");
        console.log(snapshot);
        getDownloadURL(ref(storage, snapshot.ref.fullPath))
          .then((url) => {
            console.log("File Available at: " + url);
            setUrl(url);
          })
          .catch((error) => {
            switch (error.code) {
              case "storage/object-not-found":
                console.log("File doesn't exist");
                break;
              case "storage/unauthorized":
                console.log(
                  "User doesn't have permission to access the object"
                );
                break;
              case "storage/canceled":
                // User canceled the upload
                console.log("User canceled the upload");
                break;
              case "storage/unknown":
                console.log("An Unexpected Error Occurred");
                console.log(error);
                break;
            }
          });
      })
      .catch((error) => {
        console.log("An Unexpected Error Occurred");
        console.log(error);
      });
  };

  return (
    <div className="relative top-32 flex h-screen bg-gray-200 items-center justify-center mb-32">
      <div className="grid bg-white rounded-lg shadow-xl w-11/12 md:w-9/12 lg:w-1/2">
        <div className="flex justify-center py-4">
          <div className="flex bg-slate-300 rounded-full md:p-4 p-2 border-2 border-slate-500">
            <BsFilePost size={"2em"} />
          </div>
        </div>
        <div className="flex justify-center">
          <div className="flex">
            <h1 className="text-gray-600 font-bold md:text-2xl text-xl">
              Create New Post
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 mt-5 mx-7">
          <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
            Title
          </label>
          <input
            className="py-2 px-3 rounded-lg border-2 border-slate-300 mt-1 focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-transparent"
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mt-5 mx-7">
          <div className="grid grid-cols-1">
            <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
              Description
            </label>
            <textarea
              className="py-2 px-3 rounded-lg border-2 border-slate-300 mt-1 focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-transparent"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1">
            <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
              Add Tags
            </label>
            <input
              className="py-2 px-3 rounded-lg border-2 border-slate-300 mt-1 focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-transparent"
              type="text"
              placeholder="#newPost"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 mt-5 mx-7">
          <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold mb-1">
            Upload Photo
          </label>
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col border-4 border-dashed w-full h-32 hover:bg-gray-100 hover:border-slate-300 group">
              <div className="flex flex-col items-center justify-center pt-7">
                <svg
                  className="w-10 h-10 text-slate-400 group-hover:text-slate-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                <p className="lowercase text-sm text-gray-400 group-hover:text-slate-600 pt-1 tracking-wider">
                  Select a photo
                </p>
              </div>
              <input
                type="file"
                className="hidden"
                onChange={(e) => handleFile(e)}
                accept="image/*"
              />
            </label>
          </div>
        </div>

        <div className="flex items-center justify-center  md:gap-8 gap-4 pt-5 pb-5">
          <button className="w-auto bg-gray-500 hover:bg-gray-700 rounded-lg shadow-xl font-medium text-white px-4 py-2">
            Cancel
          </button>
          <button className="w-auto bg-slate-500 hover:bg-slate-700 rounded-lg shadow-xl font-medium text-white px-4 py-2">
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default Create;

// <div classNameName=" flex pl-auto pr-auto justify-center">
// <div classNameName="flex flex-col items-center relative top-20">
//   <div classNameName="text-center text-xl">Create new Post</div>
//   <input
//     type="text"
//     value={title}
//     placeholder="Title"
//     classNameName="mt-5 w-full border-2 border-slate-800 p-1 text-sm rounded-sm"
//     onChange={(e) => setTitle(e.target.value)}
//   />
//   <textarea
//     value={description}
//     placeholder="Description"
//     classNameName="mt-5 w-full h-24 border-2 border-slate-800 p-1 text-sm rounded-sm"
//     onChange={(e) => setDescription(e.target.value)}
//   />
//   <textarea
//     value={tag}
//     placeholder="new Tag"
//     classNameName="mt-5 w-full border-2 border-slate-800 p-1 text-sm rounded-sm"
//     onChange={(e) => setTag(e.target.value)}
//   />
//   <button
//     onClick={() => {
//       setTags((prev) => [...prev, tag]);
//       setTag("");
//     }}>
//     Add Tag
//   </button>
//   <input
//     type="file"
//     placeholder="Select Image"
//     onChange={(e) => handleFile(e)}
//     ref={refFileInput}
//     accept="image/*"
//     classNameName=""
//   />
//   <div>
//     {/* <div>
//       <span>File</span>
//       <input type="file" onChange={(e) => handleFile(e)} />
//     </div> */}
//     <div>
//       <button onClick={() => SubmitDetails()}>Submit</button>
//     </div>
//   </div>
// </div>
// </div>
