/* eslint-disable react/prop-types */
import "./Header.css";
const Header = ({ myProfile }) => {
  return (
    <div id="header">
      {myProfile.id && (
        <span id="logged-in-declaration">
          Logged in as {myProfile.username}
        </span>
      )}

      <h1 id="company-name">Fitness Trackr</h1>
    </div>
  );
};

export default Header;
