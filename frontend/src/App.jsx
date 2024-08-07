import "./App.css";
import { Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import NavLayout from "./components/layouts/NavLayout";
import { DesignProvider } from "./contexts/DesignIndexContext";
import { Toaster } from "react-hot-toast";

function App() {
    return (
        <DesignProvider>
            <Toaster />
            <Routes>
                <Route path="/" element={<NavLayout />}>
                    <Route index element={<Home />} />
                    {/* <Route path="edit" element={<EditProfile />}>
                        <Route path="basic" element={<BasicDetails />} />
                        <Route path="contact" element={<ContactDetails />} />
                        <Route path="experience" element={<PastExperience />} />
                        <Route
                            path="qualification"
                            element={<QualificationForm />}
                        />
                        <Route
                            path="skills"
                            element={<SkillsForm />}
                        />
                    </Route> */}
                </Route>
                <Route path="/auth" element={<Auth />} />
            </Routes>
        </DesignProvider>
    );
}

export default App;
