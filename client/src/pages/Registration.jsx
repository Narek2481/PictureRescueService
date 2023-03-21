import Footer from "../components/footer/Footer";
import Input_lable_component from "../components/Registration/Input_lable_component/Input_lable_component";
import { useEffect, useState } from "react";
import registration_submit from "../action/registr";
import { useDispatch, useSelector } from "react-redux";
import { edit_current_user, select_current_user } from "../reducers/user/user_slice";

const Registration = () => {
  const state = useSelector(select_current_user);
  const [email, set_email] = useState(state.email);
  const [name, set_name] = useState(state.name);
  const [last_name, set_last_name] = useState(state.last_name);
  const [password, set_password] = useState(state.password);
  const [valid_err, setValid_err] = useState('');
  const dispach = useDispatch();
  useEffect(() => {
    console.log("redux state ++")
  },[state])
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
            setValue: set_name
          }}
        />
        <Input_lable_component
          props={{
            text: "Last Name",
            name: "Last_name",
            type: "text",
            value: last_name,
            setValue: set_last_name
          }}
        />
        <Input_lable_component
          props={{
            text: "Email",
            name: "Email",
            type: "email",
            value: email,
            setValue: set_email
          }}
        />
        <Input_lable_component
          props={{
            text: "Password",
            name: "Password",
            type: "password",
            value: password,
            setValue: set_password
          }} />
        <button type="submit" onClick={(e) => {
          e.preventDefault();
          if (contains_valid_name(name) && validate_password(password)) {
            let pyload = {
              type: "current_user_registration",
              pyload: {
                register_or_login: false,
                name,
                last_name,
                email,
                password
              }
            }

            // console.log(dispach_obj);
            dispach((pyload));

            // set_email("");
            // set_name("");
            // set_last_name("");
            // set_password("");
            registration_submit(name, last_name, email, password)
            setValid_err("")
            console.log(state);
          } else {
            setValid_err("Err write corect");
            console.log("err write corect");
          }
          console.log(state);
        }
        } >Submit</button>
        <Footer></Footer>
      </form>
    </div>
  );
};

export default Registration;