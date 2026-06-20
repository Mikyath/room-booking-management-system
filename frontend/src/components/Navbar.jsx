import { Link } from "react-router-dom";

function Navbar() {

  return (
    <nav style={{
      padding: "10px",
      background: "#333",
      color: "white"
    }}>

      <Link to="/" style={{color:"white",marginRight:"15px"}}>
        Home
      </Link>

      <Link to="/dashboard" style={{color:"white",marginRight:"15px"}}>
        Dashboard
      </Link>

      <Link to="/rooms" style={{color:"white",marginRight:"15px"}}>
        Rooms
      </Link>

      <Link to="/bookings" style={{color:"white"}}>
        Bookings
      </Link>

    </nav>
  );
}

export default Navbar;