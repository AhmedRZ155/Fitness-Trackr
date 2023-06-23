import { useEffect, useState } from "react";
import { getAllRoutines, createRoutine } from "../api/index";
import { useNavigate, useOutletContext } from "react-router";
import CreateRoutineForm from "./RoutineForm";
import RoutinesHeader from "./Routine";
import "./Routines.css";
const Routines = () => {
  const { allRoutines, setAllRoutines, myProfile, token } = useOutletContext();
  const [createWindowOpen, setCreateWindowOpen] = useState(false);
  const [displayedRoutines, setDisplayedRoutines] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const allRoutines = await getAllRoutines();
      setAllRoutines(allRoutines);
      setDisplayedRoutines(allRoutines);
    })();
  }, []);

  const handleRoutineSelect = (routine) => {
    navigate(`/routines/${routine.id}`);
  };

  return (
    <>
      <RoutinesHeader
        allRoutines={allRoutines}
        displayedRoutines={displayedRoutines}
        setDisplayedRoutines={setDisplayedRoutines}
        myProfile={myProfile}
        createWindowOpen={createWindowOpen}
        setCreateWindowOpen={setCreateWindowOpen}
      />

      <CreateRoutineForm
        createWindowOpen={createWindowOpen}
        createRoutine={createRoutine}
        getAllRoutines={getAllRoutines}
        setAllRoutines={setAllRoutines}
        token={token}
      />

      <div id="routines-list">
        {displayedRoutines.map((routine) => {
          return (
            <div className="routine-card" key={routine.id}>
              <div className="routine-card-top">
                <div className="routine-details">
                  <h4 className="routine-name">{routine.name}</h4>
                  <p className="routine-creator">
                    Created by {routine.creatorName}
                  </p>
                  {myProfile.username === routine.creatorName && (
                    <p className="your-routine-message">
                      This is your Routine!
                    </p>
                  )}
                  <p className="routine-description">
                    description: {routine.description}
                  </p>
                </div>
                <div
                  className="try-routine-button"
                  onClick={() => handleRoutineSelect(routine)}
                >
                  Try{myProfile.username === routine.creatorName && "/Edit"}{" "}
                  Now!
                </div>
              </div>
              {routine.activities.length > 0 && (
                <div>
                  <p className="routine-activities-header">
                    Activities Included:{" "}
                  </p>

                  <div className="routine-activity-bubble-container">
                    {routine.activities.map((activity) => (
                      <span
                        key={activity.id}
                        className="routine-activity-bubble"
                      >
                        {activity.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Routines;
