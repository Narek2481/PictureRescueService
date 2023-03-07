import Footer from "../footer/Footer";
import Input_lable_component from "./Input_lable_component/Input_lable_component";
import { useState } from "react";
import registration_submit from "../../action/registr";
const Registration = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [valid_err, setValid_err] = useState('');

  function contains_valid_name(input) {
    return input.length >= 3 && /[A-Z]/.test(input) && /[a-z]/.test(input);
  }
  function validate_password(password) {
    if (password.length < 8) {
      console.log("Password must be at least 8 characters long.");
      return false
    }
    return true;
  }
  return (
    <div className="registration">
      <h2>Registration</h2>
      <h3>{valid_err}</h3>
      <form >
        <Input_lable_component
          props={{
            text: "Name",
            name: "name",
            type: "text",
            value: name,
            setValue: setName
          }}
        />
        <Input_lable_component
          props={{
            text: "Email",
            name: "Email",
            type: "email",
            value: email,
            setValue: setEmail
          }}
        />
        <Input_lable_component
          props={{
            text: "Login",
            name: "Login",
            type: "login",
            value: login,
            setValue: setLogin
          }}
        />
        <Input_lable_component
          props={{
            text: "Password",
            name: "Password",
            type: "password",
            value: password,
            setValue: setPassword
          }} />
        <button type="submit" onClick={(e) => {
          e.preventDefault()
          if (contains_valid_name(name) && validate_password(password)) {
            setEmail("");
            setName("");
            setLogin("");
            setPassword("");
            registration_submit(name, email, login, password)
              // .then(Response => console.log(Response));
          } else {
            setValid_err("Err write corect")
            console.log("err write corect");
          }
        }
        } >Submit</button>
        <Footer></Footer>
      </form>
    </div>
  );
};

export default Registration;