import { useState } from "react";
import axios from "axios";

function Register() {

const [name,setName] = useState("");
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const registerUser = async () => {

try{

await axios.post(
"http://localhost:5000/api/auth/register",
{
name,
email,
password
}
);

alert("Registration Successful");

}

catch(error){

alert("Registration Failed");

}

};

return (

<div>

<h2>Register</h2>

<input
type="text"
placeholder="Name"
onChange={(e)=>
setName(e.target.value)}
/>

<br/><br/>

<input
type="email"
placeholder="Email"
onChange={(e)=>
setEmail(e.target.value)}
/>

<br/><br/>

<input
type="password"
placeholder="Password"
onChange={(e)=>
setPassword(e.target.value)}
/>

<br/><br/>

<button
onClick={registerUser}
>
Register
</button>

</div>

);

}

export default Register;