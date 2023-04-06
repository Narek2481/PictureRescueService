import Footer from "../footer/Footer";
import {  useState } from "react";
import registrationSubmit from "../../action/registr";
import { useDispatch,  } from "react-redux";
import { editCurrentUser } from "../../reducers/user/userSlice";
import { useMemo } from "react";
import StickyInputLabel from "../sign_in/signInForm/StickyInputLabel/StickyInputLabel";
import { useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";

const Registration = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [validErr, setValidErr] = useState('');
  const [cookies, setCookie, removeCookie] = useCookies(['auth']);
  const dispach = useDispatch();
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/home');
  }

  const containsValidName = input => {
    return input.length >= 3 && /[A-Z]/.test(input) && /[a-z]/.test(input);
  }

  const validatePassword = password => {
    if (password.length < 8) {
      console.log("Password must be at least 8 characters long.");
      return false
    }
    return true;
  }
  return (
    <div className="registration">
      <h3>{validErr}</h3>
      <form >
        <StickyInputLabel
          props={useMemo(() => {
            return (
              {
                text: "Name",
                name: "name",
                type: "text",
                inputValue: name,
                setInputValue: setName
              }
            )
          }, [name])}
        />
        <StickyInputLabel
          props={
            useMemo(() => {
              return (
                {
                  text: "Last Name",
                  name: "Last_name",
                  type: "text",
                  inputValue: lastName,
                  setInputValue: setLastName
                }
              )
            }, [lastName])
          }
        />
        <StickyInputLabel
          props={
            useMemo(() => {
              return (
                {
                  text: "Email",
                  name: "Email",
                  type: "email",
                  inputValue: email,
                  setInputValue: setEmail
                }
              )
            }, [email])
          }
        />
        <StickyInputLabel
          props={
            useMemo(() => {
              return (
                {
                  text: "Password",
                  name: "Password",
                  type: "password",
                  inputValue: password,
                  setInputValue: setPassword
                }
              )
            }, [password])
          } />
        <button type="submit" onClick={(e) => {
          e.preventDefault();
          if (containsValidName(name) && validatePassword(password)) {
            setEmail("");
            setName("");
            setLastName("");
            setPassword("");
            registrationSubmit(name, lastName, email, password)
              .then((res) => {
                // console.log(res.data.token);
                if (res.status === 200) {
                  console.log(res.data)
                  dispach(editCurrentUser({ name, email, lastName, password, register_or_login: true }));
                  setCookie('auth', res.data, { maxAge: 3600, path: '/' });
                  goToHome();
                } else {
                  setValidErr("Something went wrong, Try again");
                }
              })
              .catch((eror) => {
                console.log(eror)
                setValidErr("Such user exists");
              });
            setValidErr("");
          } else {
            setValidErr("Err write corect");
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