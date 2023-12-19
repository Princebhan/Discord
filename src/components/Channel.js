import React from "react";
import { HashtagIcon, TrashIcon } from "@heroicons/react/outline";
import { setChannelInfo } from "../features/channelSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";

function Channel({ id, channelName }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleDeleteChannel = () => {
      db.collection("channels")
        .doc(id)
        .delete()
        .then(() => {
          console.log(`Channel ${channelName} deleted successfully.`);
        })
        .catch((error) => {
          console.error("Error deleting channel: ", error);
        });
    };

    const setChannel = () => {
        dispatch(
          setChannelInfo({
            channelId: id,
            channelName: channelName,
          })
        );
    
        navigate(`/channels/${id}`);
      };
  return (
    <div className="font-medium flex items-center cursor-pointer hover:bg-[#3A3C43] p-1 rounded-md  hover:text-white"
    onClick={setChannel}
    >
      <HashtagIcon className="h-5 mr-2" /> {channelName}
      <TrashIcon
        onClick={handleDeleteChannel}
        className="absolute left-72 h-5  focus:outline-none text-red-500 hover:text-white"
      />
    </div>
  );
}

export default Channel;
