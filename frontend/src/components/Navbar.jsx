import { Link } from "react-router-dom";

function Navbar() {

  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/";

  };

  return (

    <div>

      <Link to="/dashboard">
        Dashboard
      </Link>

      {" | "}

      <Link to="/rooms">
        Rooms
      </Link>

      {" | "}

      <Link to="/bookings">
        Bookings
      </Link>

      {" | "}

      <button onClick={logout}>
        Logout
      </button>

      <hr />

    </div>

  );

}

export default Navbar;