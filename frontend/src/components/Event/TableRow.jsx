import { useState, useRef, useEffect } from "react";
import { HiDotsVertical } from "react-icons/hi";
import api from "../../api/index";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import DeleteModal from "../DeleteModal";

const handleDelete = async (info, getData) => {
  try {
    await api.delete(`/event/${info._id}`);
    toast.success("Deleted Successfully");
    getData();
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data.message || "Try Again");
  }
};

const TableRow = ({ event, getEvents }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const openDeleteModal = () => setIsDeleteModalOpen(true);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  return (
    <>
      <tr className="bg-white">
        <td>{event?.title}</td>
        <td className="py-4 relative">
          <button
            onClick={(e) => {
              setMenuOpen(!menuOpen);
              e.stopPropagation();
            }}
          >
            <HiDotsVertical size={23} className="mt-2" />
          </button>
          {menuOpen && (
            <div
              ref={menuRef}
              className="absolute right-[50%] mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg z-10"
            >
              <button
                className="block w-full text-left px-4 py-2 text-blue-500 hover:bg-gray-100"
                onClick={() => {
                  setMenuOpen(false);
                  navigate(`/event/edit/${event?._id}`);
                }}
              >
                Edit
              </button>
              <button
                className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                onClick={() => {
                  setMenuOpen(false);
                  openDeleteModal(true);
                }}
              >
                Delete
              </button>
            </div>
          )}
        </td>
      </tr>

      <DeleteModal
        title="Remove Event"
        message="Are you sure you want to delete this event?"
        action={() => {
          handleDelete(event, getEvents); // Pass your event and getData function here
          closeDeleteModal();
        }}
        close={closeDeleteModal}
        isOpen={isDeleteModalOpen}
      />
    </>
  );
};

export default TableRow;
