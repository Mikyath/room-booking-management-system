import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Login() {

const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const loginUser = async () => {

try{

const res =
await axios.post(
"https://hotel-management-system-ebhf.onrender.com/api/auth/login",
{
email,
password
}
);

if (
  res.data.user.role === "admin"
) {

  alert(
    "Please use Admin Login"
  );

  return;

}

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

alert(
  "Login Successful"
);

window.location.href =
"/dashboard";
}

catch(error){

alert("Login Failed");

}

};

return (
<div className="min-h-screen flex items-center justify-center bg-gray-100">

<div className="bg-white p-8 rounded-xl shadow-lg w-96">

<h2 className="text-3xl font-bold text-center mb-6">
User Login
</h2>

<input
type="email"
placeholder="Email"
value={email}
onChange={(e) =>
setEmail(e.target.value)
}
className="border p-3 rounded-lg w-full mb-4"
/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e) =>
setPassword(e.target.value)
}
className="border p-3 rounded-lg w-full mb-4"
/>

<button
onClick={loginUser}
className="bg-blue-600 text-white w-full py-3 rounded-lg hover:bg-blue-700"
>
Login
</button>

<div className="mt-4 text-center">

<p className="text-gray-600">
Don't have an account?
</p>

<Link
to="/register"
className="text-blue-600 font-semibold"
>
Create Account
</Link>

</div>

<div className="mt-4 text-center">

<Link
to="/admin-login"
className="bg-red-600 text-white px-5 py-2 rounded-lg inline-block hover:bg-red-700"
>
Admin Login
</Link>

</div>

</div>

</div>

);

}

export default Login;