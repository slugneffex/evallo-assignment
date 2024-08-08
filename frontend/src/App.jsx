import "./App.css";
import { Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import EventForm from "./pages/EventForm";
import NavLayout from "./components/layouts/NavLayout";
import { DesignProvider } from "./contexts/DesignIndexContext";
import { Toaster } from "react-hot-toast";
import EventLayout from "./components/EventLayout";
import Events from "./pages/Events";

function App() {
  return (
    <DesignProvider>
      <Toaster />
      <Routes>
        <Route path="/" element={<NavLayout />}>
          <Route index element={<Home />} />
          <Route path="event" element={<EventLayout />}>
            <Route path="add" element={<EventForm />} />
            <Route path="edit/:id" element={<EventForm />} />
            <Route path="calendar" element={<Events />} />
          </Route>
        </Route>
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </DesignProvider>
  );
}

export default App;
