import React, { useState } from "react";
import { TrashIcon, PencilAltIcon, CheckIcon } from "@heroicons/react/solid";
import moment from "moment";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSelector } from "react-redux";
import { selectChannelId } from "../features/channelSlice";
import { auth, db } from "../firebase";

function Message({ id, message, timestamp, name, email, photoURL }) {
  const channelId = useSelector(selectChannelId);
  const [user] = useAuthState(auth);
  const [isEditing, setIsEditing] = useState(false);
  const [editedMessage, setEditedMessage] = useState(message);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedMessage(message);
  };

  const handleUpdateMessage = () => {
    if (editedMessage.trim() !== "") {
      db.collection("channels")
        .doc(channelId)
        .collection("messages")
        .doc(id)
        .update({
          message: editedMessage,
        })
        .then(() => {
          setIsEditing(false);
        })
        .catch((error) => {
          console.error("Error updating message: ", error);
        });
    }
  };

  return (
    <div className="flex items-center p-1 pl-5 my-5 mr-2 hover:bg-[#32353B] group">
      <img
        src={photoURL}
        alt=""
        className="h-10 rounded-full cursor-pointer mr-3 hover:shadow-2xl"
      />
      <div>
        <h4>
          <span className="hover:underline text-white text-sm cursor-pointer">
            {name}
          </span>
          <span className="text-[#72767d] px-1 text-xs">
            {moment(timestamp?.toDate().getTime()).format("lll")}
          </span>
        </h4>
        {isEditing ? (
          <>
            <textarea
              value={editedMessage}
              onChange={(e) => setEditedMessage(e.target.value)}
              className="text-sm text-[#030303] border rounded-md p-1 my-1 w-full"
            />
            <div className="flex">
              <button
                onClick={handleUpdateMessage}
                className="text-green-500 cursor-pointer"
              >
                <CheckIcon className="h-5" />
              </button>
              <button
                onClick={handleCancelEdit}
                className="text-red-500 cursor-pointer ml-1"
              >
                <TrashIcon className="h-5" />
              </button>
            </div>
          </>
        ) : (
          <p className="text-sm text-[#dcddde]">{message}</p>
        )}
      </div>
      {user?.email === email && !isEditing && (
        <div className="flex ml-auto">
          <button
            className="hover:bg-[#38a169] p-1 rounded-sm text-[#38a169] hover:text-white cursor-pointer"
            onClick={handleEdit}
          >
            <PencilAltIcon className="h-5" />
          </button>
          <button
            className="hover:bg-[#ed4245] p-1 ml-1 rounded-sm text-[#ed4245] hover:text-white cursor-pointer"
            onClick={() =>
              db
                .collection("channels")
                .doc(channelId)
                .collection("messages")
                .doc(id)
                .delete()
            }
          >
            <TrashIcon className="h-5" />
          </button>
        </div>
      )}
    </div>
  );
}

export default Message;
