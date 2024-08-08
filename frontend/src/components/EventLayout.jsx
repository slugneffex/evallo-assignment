import { Outlet } from "react-router-dom";

const EventLayout = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Events</h2>
      <Outlet /> {/* This is where nested routes will be rendered */}
    </div>
  );
};

export default EventLayout;
