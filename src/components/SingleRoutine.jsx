/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/no-unescaped-entities */
import { useOutletContext, useParams } from "react-router";
import { useEffect, useState } from "react";
import { getAllRoutines, seeUserPublicRoutines } from "../api/index";
import "./SingleRoutine.css";

const SingleRoutine = () => {
  const { routineId } = useParams();
  const { allRoutines, setAllRoutines, myProfile, token } = useOutletContext();
  const [routine, setRoutine] = useState({});

  useEffect(() => {
    if (!allRoutines[0]) {
      (async () => {
        const routines = await getAllRoutines();
        setAllRoutines(routines);
      })();
    } else {
      let routineValue = allRoutines.find((routine) => routine.id == routineId);
      if (routineValue) {
        setRoutine(routineValue);
      }
    }

    if (!routine.id && myProfile.id) {
      (async () => {
        const routines = await seeUserPublicRoutines(token, myProfile.username);
        for (let r of routines) {
          if (r.id == routineId) {
            console.log(r);
            setRoutine(r);
          }
        }
      })();
    }
  }, [
    allRoutines,
    routine.id,
    myProfile.id,
    myProfile.username,
    setAllRoutines,
    routineId,
    token,
  ]);

  return (
    <>
      {routine.id ? (
        <div id="single-routine">
          <div id="single-routine-header">
            <h2 id="single-routine-name">{routine.name}</h2>
            {!routine.isPublic && (
              <p>
                {"("}This routine is set to "Private" and cannot be shared with
                others{")"}
              </p>
            )}
            <h3 id="single-routine-creator">
              Created by {routine.creatorName}
            </h3>
            <h4 id="single-routine-description">
              description: {routine.description}
            </h4>
          </div>
          <h3 id="activity-details-label">Activity Details:</h3>
          <div id="single-routine-activity-list">
            {routine.activities.map((activity, idx) => {
              return (
                <div className="single-routine-activity" key={activity.id}>
                  <p>
                    {idx + 1}. {activity.name}
                  </p>
                  <p>Description: {activity.description}</p>
                  <p>Count: {activity.count}</p>
                  <p>Duration: {activity.duration}</p>
                  {routine.creatorName === myProfile.username && <div></div>}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <h4>
          A Routine with that ID does not exist or is a Private routine of
          another user{" "}
        </h4>
      )}
    </>
  );
};

export default SingleRoutine;
