import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
  function Dashboard() {
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const user =
  JSON.parse(
    localStorage.getItem("user")
  );

  const fetchData = async () => {

  const roomRes =
  await axios.get(
    "https://hotel-management-system-ebhf.onrender.com/api/rooms"
  );

  const bookingRes =
  await axios.get(
    "https://hotel-management-system-ebhf.onrender.com/api/bookings"
  );

  const userRes =
  await axios.get(
  "https://hotel-management-system-ebhf.onrender.com/api/auth/users"
);

  setUsers(userRes.data);
  setRooms(roomRes.data);

  setBookings(bookingRes.data);

  

};

useEffect(() => {

  fetchData();

}, []);

const totalRooms =
rooms.length;

const totalBookings =
bookings.length;

const totalRevenue =
bookings.reduce(
  (sum, booking) =>
    sum + booking.totalAmount,
  0
);

const totalUsers =
users.length;

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

    <h1 className="text-4xl font-bold text-center mt-4">
  Hotel Management Dashboard
</h1>

    <h2>
      Welcome {user?.name}
    </h2>

    <button
onClick={logout}
>
Logout
</button>

    <hr />

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">

  <div className="bg-blue-500 text-white p-6 rounded-xl">
    <h2 className="text-3xl font-bold">
      {totalRooms}
    </h2>
    <p>Total Rooms</p>
  </div>

  <div className="bg-green-500 text-white p-6 rounded-xl">
    <h2 className="text-3xl font-bold">
      {totalBookings}
    </h2>
    <p>Total Bookings</p>
  </div>

  <div className="bg-purple-500 text-white p-6 rounded-xl">
    <h2 className="text-3xl font-bold">
      ₹{totalRevenue}
    </h2>
    <p>Total Revenue</p>
  </div>

  <div className="bg-orange-500 text-white p-6 rounded-xl">

    <h2 className="text-2xl font-bold mt-8 mb-4">
  Recent Bookings
</h2>

<table className="w-full bg-white shadow rounded">

  <thead>

    <tr className="bg-gray-200">

      <th className="p-3">User</th>
      <th className="p-3">Room</th>
      <th className="p-3">Check In</th>
      <th className="p-3">Check Out</th>
      <th className="p-3">Amount</th>

    </tr>

  </thead>

  <tbody>

    {
      bookings
      .slice()
      .reverse()
      .slice(0, 5)
      .map((booking) => (

        <tr
          key={booking._id}
          className="border-b"
        >

          <td className="p-3">
            {booking.userName}
          </td>

          <td className="p-3">
            {booking.roomNumber}
          </td>

          <td className="p-3">
            {
              new Date(
                booking.checkInDate
              ).toLocaleDateString()
            }
          </td>

          <td className="p-3">
            {
              new Date(
                booking.checkOutDate
              ).toLocaleDateString()
            }
          </td>

          <td className="p-3">
            ₹{booking.totalAmount}
          </td>

        </tr>

      ))
    }

  </tbody>

</table>
  <h2 className="text-3xl font-bold">
    {totalUsers}
  </h2>
  <p>Total Users</p>
</div>

</div>

  </div>

);

}

export default Dashboard;