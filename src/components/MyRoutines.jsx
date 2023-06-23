/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
import { useOutletContext } from "react-router";
import { seeUserPublicRoutines, deleteRoutine } from "../api/index";
import { useEffect, useState } from "react";
import "./MyRoutines.css";

const MyRoutines = () => {
  const { myProfile, token } = useOutletContext();
  const [userRoutines, setUserRoutines] = useState([]);

  useEffect(() => {
    if (token && myProfile.id) {
      (async () => {
        const routines = await seeUserPublicRoutines(token, myProfile.username);
        setUserRoutines(routines);
      })();
    }
  }, [myProfile]);

  const handleDelete = async (routineId) => {
    await deleteRoutine(token, routineId);
    const routines = await seeUserPublicRoutines(token, myProfile.username);
    setUserRoutines(routines);
  };

  return (
    <>
      <div id="my-routines-body">
        <h2>Welcome to your Routines, {myProfile.username}!</h2>

        {userRoutines[0] ? (
          <>
            <h3>Your Routines:</h3>
          </>
        ) : (
          <h4>You do not have any routines yet. </h4>
        )}
        <div id="my-routines-list">
          {userRoutines[0] &&
            userRoutines.map((routine) => {
              console.log(routine);
              return (
                <div className="my-routine-cards" key={routine.id}>
                  <h4>{routine.name}</h4>
                  <p>description: {routine.description}</p>
                  <p>Privacy: {routine.isPublic ? "Public" : "Private"}</p>
                  <p>
                    Activities Included:{" "}
                    {routine.activities[0]
                      ? routine.activities
                          .map((activity) => activity.name)
                          .join(", ")
                      : "None"}
                  </p>

                  <button onClick={() => handleDelete(routine.id)}>
                    Delete
                  </button>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default MyRoutines;
