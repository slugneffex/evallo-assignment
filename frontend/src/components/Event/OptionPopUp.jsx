import React from "react";

const OptionPopUp = ({ handlePopupClose, getEvents, popupRef }) => {
  return (
    <div
      className="fixed inset-0 bg-gray-800 bg-opacity-50  z-50"
      onClick={handlePopupClose}
    >
      <div
        className="absolute top-[50%] translate-y-[10%] right-[50%] bg-white p-3 rounded shadow flex flex-col "
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="text-blue-500 py-2 "
          onClick={() => {
            // setPopupState(false);
            // Add your edit handler here
          }}
        >
          Edit
        </button>
        <hr />
        <button
          className="text-red-500 py-2 "
          //   onClick={() => handleDelete(event, getData)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default OptionPopUp;
