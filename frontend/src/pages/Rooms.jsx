import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Rooms() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [roomNumber, setRoomNumber] = useState("");
  const [roomType, setRoomType] = useState("");
  const [capacity, setCapacity] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState(null);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");
  const [rooms, setRooms] = useState([]);
  const [editingRoom, setEditingRoom] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [currentImage, setCurrentImage] = useState({});
  const [availability, setAvailability] = useState({});
  const fetchRooms = async () => {
  const checkAvailability = async (
  roomId,
  checkIn,
  checkOut
) => {

  if (!checkIn || !checkOut) return;

  try {

    const res = await axios.post(
      "http://localhost:5000/api/bookings/check-availability",
      {
        roomId,
        checkInDate: checkIn,
        checkOutDate: checkOut
      }
    );

    setAvailability(prev => ({
      ...prev,
      [roomId]: res.data.available
    }));

  }

  catch (error) {

    console.log(error);

  }

};

    try {

      const res = await axios.get(
        "http://localhost:5000/api/rooms"
      );

      setRooms(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchRooms();

  }, []);

  const addRoom = async () => {

    try {

      const formData = new FormData();

formData.append("roomNumber", roomNumber);
formData.append("roomType", roomType);
formData.append("capacity", capacity);
formData.append("price", price);

if (images) {
  for (let i = 0; i < images.length; i++) {
    formData.append("images", images[i]);
  }
}

console.log(images);
console.log(images.length);

await axios.post(
  "http://localhost:5000/api/rooms/add",
  formData,
  {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  }
);

setRoomNumber("");
setRoomType("");
setCapacity("");
setPrice("");
setImages(null);
      fetchRooms();

    }

    catch (error) {

      alert(
        "Failed to Add Room"
      );

    }

  };

  const deleteRoom = async (id) => {

    try {

      await axios.delete(
        `http://localhost:5000/api/rooms/${id}`
      );

      fetchRooms();

    }

    catch (error) {

      alert(
        "Delete Failed"
      );

    }

  };

  const editRoom = (room) => {

    setEditingRoom(room);

    setRoomNumber(
      room.roomNumber
    );

    setRoomType(
      room.roomType
    );

    setCapacity(
      room.capacity
    );

    setPrice(
      room.price
    );

  };

  const updateRoom = async () => {

    try {

      await axios.put(

        `http://localhost:5000/api/rooms/${editingRoom._id}`,

        {
          roomNumber,
          roomType,
          capacity,
          price,
      }

      );

      alert(
        "Room Updated"
      );

      setEditingRoom(null);

      setRoomNumber("");
      setRoomType("");
      setCapacity("");
      setPrice("");
      setImages(null);

      fetchRooms();

    }

    catch (error) {

      alert(
        "Update Failed"
      );

    }

  };

  const bookRoom = async (room) => {

    try {

      if (
        !checkInDate ||
        !checkOutDate
      ) {

        alert(
          "Please select Check-In and Check-Out dates"
        );

        return;

      }

      const days = Math.ceil(

        (
          new Date(checkOutDate) -
          new Date(checkInDate)
        )

        /

        (
          1000 * 60 * 60 * 24
        )

      );

      const totalAmount =
        days * room.price;

      await axios.post(

  "http://localhost:5000/api/bookings/add",

  {

    userName: user.name,

    userEmail: user.email,

    roomNumber: room.roomNumber,

    roomId: room._id,

    bookingDate: new Date(),

    checkInDate,

    checkOutDate,

    totalAmount,

    paymentMethod

  }

);
      alert(
  `Payment Successful Method: ${paymentMethod}
   Total Amount: ₹${totalAmount}
   Room Booked Successfully`
);

      setSelectedRoom(null);

      setCheckInDate("");
      setCheckOutDate("");

      fetchRooms();

    }

    catch (error) {

  console.log(error.response?.data);

  alert(
    error.response?.data?.message ||
    "Booking Failed"
  );

}

  };
   return (

    <div className="min-h-screen bg-gray-100 p-6">

      <Navbar />

      {
      user?.role === "admin" && (

      <div className="bg-white p-6 rounded-xl shadow-lg mb-8">

        <h1 className="text-4xl font-bold mb-6 text-center">
          Room Management
        </h1>

        <input
          className="border p-3 rounded-lg w-full mb-3"
          type="text"
          placeholder="Room Number"
          value={roomNumber}
          onChange={(e) =>
            setRoomNumber(e.target.value)
          }
        />

        <input
          className="border p-3 rounded-lg w-full mb-3"
          type="text"
          placeholder="Room Type"
          value={roomType}
          onChange={(e) =>
            setRoomType(e.target.value)
          }
        />

        <input
          className="border p-3 rounded-lg w-full mb-3"
          type="number"
          placeholder="Capacity"
          value={capacity}
          onChange={(e) =>
            setCapacity(e.target.value)
          }
        />

        <input
          className="border p-3 rounded-lg w-full mb-3"
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) =>
            setPrice(e.target.value)
          }
        />

<input
  type="file"
  accept="image/*"
  multiple
  onChange={(e) => {

    console.log(
      "Selected Files:",
      e.target.files
    );

    console.log(
      "Count:",
      e.target.files.length
    );

    setImages(
      e.target.files
    );

  }}
/>

        {
        editingRoom ? (

        <button
          onClick={updateRoom}
          className="bg-green-600 text-white px-6 py-3 rounded-lg"
        >
          Update Room
        </button>

        ) : (

        <button
          onClick={addRoom}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          Add Room
        </button>

        )
        }

      </div>

      )
      }

      <h2 className="text-3xl font-semibold mb-4">
        Available Rooms
      </h2>

      <div className="flex gap-4 mb-6">

        <input
          type="text"
          placeholder="Search Room Number"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="border p-3 rounded-lg"
        />

        <select
          value={filterType}
          onChange={(e) =>
            setFilterType(e.target.value)
          }
          className="border p-3 rounded-lg"
        >

          <option value="">
            All Types
          </option>

          <option value="Deluxe">
            Deluxe
          </option>

          <option value="Standard">
            Standard
          </option>

          <option value="Suite">
            Suite
          </option>

        </select>

      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

      {rooms

      .filter((room) => {

        const matchesSearch =
        String(room.roomNumber)
        .toLowerCase()
        .includes(
          search.toLowerCase()
        );

        const matchesType =
        filterType === "" ||
        room.roomType === filterType;

        return (
          matchesSearch &&
          matchesType
        );

      })

      .map((room) => (

      <div
        key={room._id}
        className="bg-white rounded-xl shadow-lg overflow-hidden"
      >

     <div className="relative">

  <img
    src={
      room.images &&
      room.images.length > 0
        ? `http://localhost:5000${
            room.images[
              currentImage[room._id] || 0
            ]
          }`
        : "https://via.placeholder.com/400x250"
    }
    alt="Room"
    className="w-full h-56 object-cover"
  />

  {
  room.images &&
  room.images.length > 1 && (

  <>

    <button
      className="absolute left-2 top-1/2 bg-black text-white px-2 py-1 rounded"
      onClick={() =>
        setCurrentImage({
          ...currentImage,
          [room._id]:
            (
              (currentImage[room._id] || 0)
              - 1 +
              room.images.length
            )
            %
            room.images.length
        })
      }
    >
      ❮
    </button>

    <button
      className="absolute right-2 top-1/2 bg-black text-white px-2 py-1 rounded"
      onClick={() =>
        setCurrentImage({
          ...currentImage,
          [room._id]:
            (
              (currentImage[room._id] || 0)
              + 1
            )
            %
            room.images.length
        })
      }
    >
      ❯
    </button>

    <div className="absolute bottom-2 right-2 bg-black text-white px-2 py-1 rounded text-sm">
      {(currentImage[room._id] || 0) + 1}
      /
      {room.images.length}
    </div>

  </>

  )
  }

</div>

{
room.images &&
room.images.length > 1 && (

<div className="flex gap-2 p-2 overflow-x-auto">

  {
  room.images.map(
    (img, index) => (

    <img
      key={index}
      src={`http://localhost:5000${img}`}
      alt="Room"
      className="w-16 h-16 object-cover rounded"
    />

    )
  )
  }

</div>

)
}
        <div className="p-4">

          <h3 className="text-xl font-bold">
            Room {room.roomNumber}
          </h3>

          <p className="text-gray-600">
            {room.roomType}
          </p>

          <p>
            Capacity: {room.capacity}
          </p>

          <p className="font-semibold text-lg">
            ₹{room.price}
          </p>

         <p className="text-green-600 font-bold">
  Available for selected dates
</p>

          <div className="mt-3 flex gap-2 flex-wrap">

            {
            user?.role === "admin" && (

            <button
              onClick={() =>
                editRoom(room)
              }
              className="bg-yellow-500 text-white px-3 py-2 rounded"
            >
              Edit
            </button>

            )
            }

            {
            user?.role === "admin" && (

            <button
              onClick={() =>
                deleteRoom(room._id)
              }
              className="bg-red-600 text-white px-3 py-2 rounded"
            >
              Delete
            </button>

            )
            }

            <button
  onClick={() =>
    setSelectedRoom(room._id)
  }
  className="bg-blue-600 text-white px-3 py-2 rounded"
>
  Book Room
</button>
          </div>

          {
          selectedRoom === room._id && (

          <div className="mt-4 space-y-2">

            <input
              type="date"
              value={checkInDate}
              onChange={(e) =>
                setCheckInDate(
                  e.target.value
                )
              }
              className="border p-2 rounded w-full"
            />

            <input
              type="date"
              value={checkOutDate}
              onChange={(e) =>
                setCheckOutDate(
                  e.target.value
                )
              }
              className="border p-2 rounded w-full"
            />

            <select
  value={paymentMethod}
  onChange={(e) =>
    setPaymentMethod(e.target.value)
  }
  className="border p-2 rounded w-full"
>

  <option value="Cash">
    Cash
  </option>

  <option value="UPI">
    UPI
  </option>

  <option value="Card">
    Card
  </option>

</select>

            <button
              onClick={() =>
                bookRoom(room)
              }
              className="bg-green-600 text-white px-4 py-2 rounded w-full"
            >
              Confirm Booking
            </button>

          </div>

          )
          }

        </div>

      </div>

      ))}

      </div>

    </div>

  );
}

export default Rooms;