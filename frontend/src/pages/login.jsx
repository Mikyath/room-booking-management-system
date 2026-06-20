import { useState } from "react";
import axios from "axios";

function Login() {

const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const loginUser = async () => {

try{

const res =
await axios.post(
"http://localhost:5000/api/auth/login",
{
email,
password
}
);

localStorage.setItem(
"token",
res.data.token
);

localStorage.setItem(
"user",
JSON.stringify(
res.data.user
)
);

alert("Login Successful");

window.location.href =
"/dashboard";
}

catch(error){

alert("Login Failed");

}

};

return (

<div>

<h2>Login</h2>

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
onClick={loginUser}
>
Login
</button>

</div>

);

}

export default Login;