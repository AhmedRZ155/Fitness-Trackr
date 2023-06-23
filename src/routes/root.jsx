import { useEffect, useState } from "react";
import Header from "../components/Header";
import Nav from "../components/Navbar";
import { Outlet } from "react-router-dom";
import { fetchMyProfile } from "../api";
import "./root.css";

function Root() {
  const [token, setToken] = useState("");
  const [myProfile, setMyProfile] = useState({});
  const [allRoutines, setAllRoutines] = useState([]);
  const [allActivities, setAllActivities] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }

    if (token !== "") {
      (async () => {
        const profileValues = await fetchMyProfile(token);
        setMyProfile(profileValues);
      })();
    }
  }, [token]);

  return (
    <>
      <Header myProfile={myProfile} />
      <Nav myProfile={myProfile} setMyProfile={setMyProfile} />
      <div id="main">
        <Outlet
          context={{
            allRoutines,
            setAllRoutines,
            allActivities,
            setAllActivities,
            token,
            setToken,
            myProfile,
            setMyProfile,
          }}
        />
      </div>
    </>
  );
}

export default Root;
