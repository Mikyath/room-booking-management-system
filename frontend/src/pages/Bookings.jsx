import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Bookings() {

  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {

    const res = await axios.get(
      "http://localhost:5000/api/bookings"
    );

    setBookings(res.data);

  };

  useEffect(() => {

    fetchBookings();

  }, []);

  
  const cancelBooking = async (id) => {

  try {

    await axios.delete(
      `http://localhost:5000/api/bookings/${id}`
    );

    fetchBookings();

    alert("Booking Cancelled");

  } catch (error) {

    alert("Cancel Failed");

  }

};

  return (

    <div>
      <Navbar />

      <h1>Booking History</h1>

      <table border="1" cellPadding="10">

        <thead>

          <tr>

            <th>User</th>
            <th>Room Number</th>
            <th>Date</th>
<th>Action</th>

          </tr>

        </thead>

        <tbody>

          {bookings.map((booking) => (

            <tr key={booking._id}>

              <td>{booking.userName}</td>
              <td>{booking.roomNumber}</td>
              <td>
  {new Date(
    booking.bookingDate
  ).toLocaleDateString()}
</td>

<td>
  <button
    onClick={() =>
      cancelBooking(booking._id)
    }
  >
    Cancel
  </button>
</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}

export default Bookings;