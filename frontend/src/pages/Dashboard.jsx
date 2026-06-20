import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
function Dashboard() {
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);

  const user =
  JSON.parse(
    localStorage.getItem("user")
  );

  const fetchData = async () => {

  const roomRes =
  await axios.get(
    "http://localhost:5000/api/rooms"
  );

  const bookingRes =
  await axios.get(
    "http://localhost:5000/api/bookings"
  );

  setRooms(roomRes.data);

  setBookings(bookingRes.data);

  

};

useEffect(() => {

  fetchData();

}, []);

const totalRooms =
rooms.length;

const bookedRooms =
rooms.filter(
room => room.isBooked
).length;

const availableRooms =
rooms.filter(
room => !room.isBooked
).length;

const totalBookings =
bookings.length;

const logout = () => {

  localStorage.removeItem(
    "token"
  );

  localStorage.removeItem(
    "user"
  );

  window.location.href =
  "/login";

};

  return (

  <div>
    <Navbar />

    <h1>Dashboard</h1>

    <h2>
      Welcome {user?.name}
    </h2>

    <button
onClick={logout}
>
Logout
</button>

    <hr />

    <h3>
      Total Rooms: {totalRooms}
    </h3>

    <h3>
      Available Rooms: {availableRooms}
    </h3>

    <h3>
      Booked Rooms: {bookedRooms}
    </h3>

    <h3>
      Total Bookings: {totalBookings}
    </h3>

  </div>

);

}

export default Dashboard;