import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);

  const fileRef = useRef(null);

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = async (image) => {
    // console.log("image", image);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on("state_changed", (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setImagePercent(Math.round(progress));
    });
    (error) => {
      setImageError(true);
    };
    (error) => {
      getDownloadURL(uploadTask.snapshot.ref).then(() => {});
    };
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="my-7 text-3xl text-center font-semibold">Profile</h1>

      <form className="flex flex-col gap-5">
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <img
          className="size-24 self-center cursor-pointer rounded-full object-cover mt-2"
          src={currentUser.profilePicture}
          alt="profile-img"
          onClick={() => fileRef.current.click()}
        />

        <input
          defaultValue={currentUser.username}
          type="text"
          id="username"
          placeholder="'Username"
          className="bg-slate-100 rounded-md p-3"
        />
        <input
          defaultValue={currentUser.email}
          type="text"
          id="email"
          placeholder="'E-mail"
          className="bg-slate-100 rounded-md p-3"
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="bg-slate-100 rounded-md p-3"
        />

        <button className="bg-slate-700 text-white p-3 rounded-md uppercase opacity-95 disabled:opacity-80">
          Update
        </button>
      </form>

      <div className="flex justify-between items-center mt-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
};

export default Profile;
