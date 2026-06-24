import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Bookings() {

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {

      const res = await axios.get(
        "https://hotel-management-system-ebhf.onrender.com/api/bookings"
      );

      setBookings(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  const cancelBooking = async (id) => {

    try {

      await axios.delete(
        `https://hotel-management-system-ebhf.onrender.com/api/bookings/${id}`
      );

      alert("Booking Cancelled");

      fetchBookings();

    } catch (error) {

      alert("Cancel Failed");

    }

  };

  if (!user) {

    return (
      <div>
        <Navbar />
        <h2>Please Login First</h2>
      </div>
    );

  }

  return (

    <div className="p-6">

      <Navbar />

      <h1 className="text-3xl font-bold mb-6">
        Booking History
      </h1>

      <table
        border="1"
        cellPadding="10"
        className="w-full bg-white"
      >

        <thead>

          <tr>

            <th>User</th>
            <th>Room Number</th>
            <th>Check In</th>
            <th>Check Out</th>
            <th>Total Amount</th>
            <th>Payment Method</th>
            <th>Booking Date</th>
            <th>Action</th>

          </tr>

        </thead>

        <tbody>

          {bookings

            .filter((booking) => {

              if (user.role === "admin") {
                return true;
              }

              return (
                booking?.userEmail &&
                booking.userEmail === user?.email
              );

            })

            .map((booking) => (

              <tr key={booking._id}>

                <td>{booking.userName}</td>

                <td>{booking.roomNumber}</td>

                <td>
                  {
                    booking.checkInDate
                      ? new Date(
                          booking.checkInDate
                        ).toLocaleDateString()
                      : "-"
                  }
                </td>

                <td>
                  {
                    booking.checkOutDate
                      ? new Date(
                          booking.checkOutDate
                        ).toLocaleDateString()
                      : "-"
                  }
                </td>

                <td>
                  ₹{booking.totalAmount || 0}
                </td>

                <td>
                  {booking.paymentMethod || "Cash"}
                </td>

                <td>
                  {
                    booking.bookingDate
                      ? new Date(
                          booking.bookingDate
                        ).toLocaleDateString()
                      : "-"
                  }
                </td>

                <td>

                  {(user.role === "admin" ||
                    booking.userEmail === user.email) && (

                    <button
                      onClick={() =>
                        cancelBooking(
                          booking._id
                        )
                      }
                    >
                      Cancel
                    </button>

                  )}

                </td>

              </tr>

            ))}

        </tbody>

      </table>

    </div>

  );

}

export default Bookings;