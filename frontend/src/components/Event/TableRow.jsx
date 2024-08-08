// import dots from "../../assets/3dots.png";
import api from "../../api/index";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import OptionPopUp from "./OptionPopUp";

const TableRow = ({ getData, event, getEvents }) => {
  const navigate = useNavigate();
  const [popupState, setPopupState] = useState(false);

  const handleDelete = async (info, getData) => {
    try {
      const {
        data: { playlist },
      } = await api.delete(`/school-admin/playlist/delete/${info?._id}`);
      getData();
      if (typeof playlist == "string") {
        toast.error(playlist);
      } else {
        toast.success("Playlist Deleted Succesfully");
      }
    } catch (error) {
      toast.success("something went Wrong");
      console.log(error);
    }
  };

  return (
    <>
      <tr className="bg-white">
        <td>{event?.name}</td>

        <td className="  py-4 relative">
          <button onClick={() => setPopupState(true)}>
            <HiDotsVertical size={23} />
          </button>
          {popupState && (
            <OptionPopUp
              handlePopupClose={() => setPopupState(false)}
              getEvents={getEvents}
              handleDelete={handleDelete}
            />
          )}
        </td>
      </tr>
    </>
  );
};

export default TableRow;
