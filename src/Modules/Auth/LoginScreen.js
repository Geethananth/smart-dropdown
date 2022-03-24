import React, { useState } from "react";
import { authenticate } from "../../Services/auth.service";


function LoginScreen(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState({
      name: "",
      message: ""
  });

  const errors = {
    email: "Invalid email",
    common: "Invalid email or password",
    password: "Invalid password",
    somethingWentWrong: "Something went wrong!"
  };

  const handleSubmit = () => {  

    if (email && password) {
        var regExpEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;      
      if (!email.match(regExpEmail)) {
        setErrorMessages({ name: "email", message: errors.email });        
      } else {
        setErrorMessages({})
        authenticate(email, password).then((isAuthenticated)=>{
            if (isAuthenticated) {
                props.history.push("/home")
            } else {
                setErrorMessages({ name: "common", message: errors.common });
            }
        }).catch((e)=> {
            setErrorMessages({ name: "common", message: errors.somethingWentWrong });      
        })
      }
    } else {
      setErrorMessages({ name: "common", message: errors.common });
    }
  };

  /**
   * 
   * @param {String} name Name of the element to show error
   * @returns 
   */
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

    /**
     * The login form
     */
  const renderLoginForm = (
    <div className="form">
      <div>
        <div className="input-container">
          <label>Username </label>
          <input type="email"  onChange={(e)=>setEmail(e.target.value)} required />
          {renderErrorMessage("email")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password"  onChange={(e)=>setPassword(e.target.value)} required />
          {renderErrorMessage("password")}
        </div>
        <div className="button-container">
          <button className="login-btn" onClick={handleSubmit}>Login</button>
        </div>
        {renderErrorMessage("common")}
      </div>
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
      {renderLoginForm}
      </div>
    </div>
  );
}


export default LoginScreen;