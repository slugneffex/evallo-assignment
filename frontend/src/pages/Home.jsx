import { DesignContext } from "../contexts/DesignIndexContext";
import { useContext, useEffect, useState } from "react";
import { authApi } from "../api";
import { toast } from "react-hot-toast";

const Home = () => {
  const { designIndex } = useContext(DesignContext);
  const [profile, setProfile] = useState();

  useEffect(() => {
    (async () => {
      try {
        const {
          data: { data },
        } = await authApi.get("/profile");
        setProfile(data);
      } catch (error) {
        toast.error("Could not fetch data");
      }
    })();
  }, []);

  function renderDesign(index) {
    switch (index) {
      case 0:
        return <></>;
      case 1:
        return <></>;
      case 2:
        return <></>;
    }
  }

  return renderDesign(designIndex);
};

export default Home;
