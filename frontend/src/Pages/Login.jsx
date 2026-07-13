import { useState } from "react"

import { useNavigate } from "react-router-dom";


 

export default function Login() {

  const [login,setLogin] = useState("")
  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const navigate = useNavigate();

  async function loginhandler(e) {
    
    e.preventDefault()
    try {
      const response = await fetch(
        "https://viii-major-project-backend.vercel.app/user/login",
        {
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify({
            name:name,
            email:email,
            password:password,
      }),
    }
  )
  const loginData = await response.json()
  setLogin(loginData)
  if (response.ok) {
  navigate("/");
}
  console.log(loginData);

    } catch(err){
      console.log(err)

    }
  }

 


    return (
        <>
        <form onSubmit={loginhandler}>



          <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">
      Name
    </label>
    <input
      type="name"
      className="form-control"
      id="exampleInputEmail1"
      aria-describedby="emailHelp"
      onChange={(e) => setName(e.target.value)}
    />
    <div id="emailHelp" className="form-text">
      We'll never share your name with anyone else.
    </div>
  </div>



  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">
      Email address
    </label>
    <input
      type="email"
      className="form-control"
      id="exampleInputEmail1"
      aria-describedby="emailHelp"
      onChange={(e) => setEmail(e.target.value)}
    />
    <div id="emailHelp" className="form-text">
      We'll never share your email with anyone else.
    </div>
  </div>

  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">
      Password
    </label>
    <input
      type="password"
      className="form-control"
      id="exampleInputPassword1"
      onChange={(e) => setPassword(e.target.value)}
      
    />
  </div>

  <div className="mb-3 form-check">
    <input
      type="checkbox"
      className="form-check-input"
      id="exampleCheck1"
    />
    <label className="form-check-label" htmlFor="exampleCheck1">
      Check me out
    </label>
  </div>

  <button type="submit" className="btn btn-primary">
    Submit
  </button>
</form>
{login && <p>{login.message}</p>}
        </>
    )
}