import { useNavigate } from "react-router-dom";
import TableRow from "../components/Event/TableRow";
import LoadingPage from "../components/loading/loading";

const ManageCalendarEvent = ({ isFetching, events, getEvents }) => {
  const navigate = useNavigate();

  const tableHeaders = [
    { _id: "name", name: "Name" },
    { _id: "action", name: "Action" },
  ];

  return (
    <section className="h-screen bg-gray-100 p-10 pt-8">
      <div className=" flex flex-row items-center justify-end">
        <button
          className="bg-blue-400 text-white px-4 py-2 font-semibold rounded-3xl "
          onClick={() => {
            navigate("/event/add");
          }}
        >
          Add
        </button>
      </div>

      <div className="my-10">
        {!isFetching ? (
          <table className={`data-table w-full text-center  `} id="table-size">
            <thead className="text-lg font-semibold ">
              <tr className="bg-[#e3e3e386]">
                {tableHeaders.map((item) => (
                  <th key={item._id}>
                    <span className="inline-flex items-center gap-4">
                      {item?.name}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody id="table-body">
              {!isFetching && Array.isArray(events) && events.length > 0 ? (
                <>
                  {events?.map((event) => (
                    <TableRow
                      key={event._id}
                      event={event}
                      getEvents={getEvents}
                    />
                  ))}
                </>
              ) : (
                <tr className="my-2 col-span-2">
                  <td className="col-span-2">No Data Found</td>
                </tr>
              )}
            </tbody>
          </table>
        ) : (<LoadingPage />)}
      </div>
    </section>
  );
};

export default ManageCalendarEvent;
