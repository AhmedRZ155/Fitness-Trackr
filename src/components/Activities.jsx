import { useEffect, useState } from "react";
import { getAllActivities } from "../api/index";
import { useOutletContext } from "react-router";
import Activity from "./Activity";
import NewActivity from "./NewActivity";
import "./Activities.css";
const Activities = () => {
  const { allActivities, setAllActivities, myProfile, token } =
    useOutletContext();
  const [displayedActivities, setDisplayedActivities] = useState([]);
  const [createWindowOpen, setCreateWindowOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const allActivities = await getAllActivities();
      setAllActivities(allActivities);
      setDisplayedActivities(allActivities);
    })();
  }, []);

  return (
    <>
      <Activity
        createWindowOpen={createWindowOpen}
        setCreateWindowOpen={setCreateWindowOpen}
        allActivities={allActivities}
        setDisplayedActivities={setDisplayedActivities}
        displayedActivities={displayedActivities}
        myProfile={myProfile}
      />
      <NewActivity createWindowOpen={createWindowOpen} token={token} />
      <div id="activities-list">
        {displayedActivities.map((activity) => {
          return (
            <div key={activity.id} className="activity-card">
              <h4>{activity.name}</h4>
              <p>Description: {activity.description}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Activities;
