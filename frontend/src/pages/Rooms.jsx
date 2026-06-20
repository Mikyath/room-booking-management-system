import { useState, useEffect } from "react";
import axios from "axios";

function Rooms() {

  const [roomNumber, setRoomNumber] = useState("");
  const [roomType, setRoomType] = useState("");
  const [capacity, setCapacity] = useState("");
  const [price, setPrice] = useState("");
  const [rooms, setRooms] = useState([]);
  const [editingRoom, setEditingRoom] =
useState(null);

  const fetchRooms = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/rooms"
    );

    setRooms(res.data);
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const addRoom = async () => {

    try {

      await axios.post(
        "http://localhost:5000/api/rooms/add",
        {
          roomNumber,
          roomType,
          capacity,
          price
        }
      );

      alert("Room Added Successfully");

      setRoomNumber("");
      setRoomType("");
      setCapacity("");
      setPrice("");

      fetchRooms();

    } catch (error) {

      alert("Failed to Add Room");

    }

  };

  const deleteRoom = async (id) => {

  try {

    await axios.delete(
      `http://localhost:5000/api/rooms/${id}`
    );

    fetchRooms();

  } catch (error) {

    alert("Delete Failed");

  }

};

const bookRoom = async (room) => {

  const user =
  JSON.parse(
    localStorage.getItem("user")
  );

  try {

    await axios.post(
      "http://localhost:5000/api/bookings/add",
      {
        userName: user.name,
        roomNumber: room.roomNumber,
        bookingDate: new Date()
      }
    );

    alert(
      "Room Booked Successfully"
    );

  }

  catch(error){

    alert("Booking Failed");

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

  try{

    await axios.put(

      `http://localhost:5000/api/rooms/${editingRoom._id}`,

      {

        roomNumber,
        roomType,
        capacity,
        price

      }

    );

    alert(
      "Room Updated"
    );

    setEditingRoom(null);

    fetchRooms();

  }

  catch(error){

    alert(
      "Update Failed"
    );

  }

};

  return (
    <div>

      <h1>Add Room</h1>

      <input
        type="text"
        placeholder="Room Number"
        value={roomNumber}
        onChange={(e) => setRoomNumber(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Room Type"
        value={roomType}
        onChange={(e) => setRoomType(e.target.value)}
      />

      <br /><br />

      <input
        type="number"
        placeholder="Capacity"
        value={capacity}
        onChange={(e) => setCapacity(e.target.value)}
      />

      <br /><br />

      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <br /><br />

      {
editingRoom ? (

<button
onClick={updateRoom}
>
Update Room
</button>

) : (

<button
onClick={addRoom}
>
Add Room
</button>

)
}

      <hr />

      <h2>All Rooms</h2>

      <table border="1" cellPadding="10">

        <thead>
          <tr>
            <th>Room No</th>
            <th>Type</th>
            <th>Capacity</th>
            <th>Price</th>
<th>Status</th>
<th>Action</th>
          </tr>
        </thead>

        <tbody>

          {rooms.map((room) => (

            <tr key={room._id}>

              <td>{room.roomNumber}</td>
              <td>{room.roomType}</td>
              <td>{room.capacity}</td>
              <td>{room.price}</td>

<td>
{
room.isBooked
? "Booked"
: "Available"
}
</td>

<td>

  <button
onClick={() =>
editRoom(room)
}
>
Edit
</button>

  <button
    onClick={() =>
      deleteRoom(room._id)
    }
  >
    Delete
  </button>

  {
!room.isBooked && (

<button
onClick={() =>
bookRoom(room)
}
>
Book
</button>

)
}

</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default Rooms;