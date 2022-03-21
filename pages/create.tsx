import { NextPage } from "next";
import { useState, useEffect } from "react";
import { storage, db, serverTimestamp } from "../firebase";
import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { error } from "console";

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

  //   useEffect(() => {
  //     if (url) {
  //       try {
  //         db.collection("posts").add({
  //           title,
  //           description,
  //           imageUrl: url,
  //           postedBy: user?.uid,
  //           createdAt: serverTimestamp,
  //         });
  //         console.log("Post Created Succesfully");
  //       } catch (error) {
  //         console.log("An Unexpected Error Occurred: ");
  //         console.log(error);
  //       }
  //     }
  //   }, [url]);

  const formatBytes = (bytes: number, decimals: number = 2) => {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  const handleFile = (e: any) => {
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
        getDownloadURL(ref(imageRef, path))
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
    <div>
      <h1>Create Post</h1>
      <input
        type="text"
        value={title}
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        value={description}
        placeholder="description"
        onChange={(e) => setDescription(e.target.value)}
      />
      <textarea
        value={tag}
        placeholder="new Tag"
        onChange={(e) => setTag(e.target.value)}
      />
      <button
        onClick={() => {
          setTags((prev) => [...prev, tag]);
          setTag("");
        }}>
        Add Tag
      </button>
      {tags.map((hashTag) => {
        <div>{hashTag}</div>;
      })}
      <div>
        <div>
          <span>File</span>
          <input type="file" onChange={(e) => handleFile(e)} />
        </div>
        <div>
          <input type="text" />
        </div>
      </div>
    </div>
  );
};

export default Create;
