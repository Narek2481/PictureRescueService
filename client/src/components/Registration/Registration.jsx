import Footer from "../footer/Footer";
import { useState } from "react";
import registrationSubmit from "../../action/registr";
import { useDispatch, } from "react-redux";
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
  const [inputValidStyle, setInputValidStyle] = useState({ name: {}, lastName: {}, email: {}, password: {} });
  const goToHome = () => {
    navigate('/home');
  }

  const containsValidNameOrLastName = input => {
    return input.length >= 2 && /[A-Z]/.test(input) && /[a-z]/.test(input);
  }
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  const validatePassword = password => {
    if (password.length < 8) {
      console.log("Password must be at least 8 characters long.");
      return "Password must be at least 8 characters long."
    }
    return "ok";
  }
  const submitThen = res => {
    if (res.status === 200) {
      console.log(res.data)
      dispach(editCurrentUser({ name, email, lastName, password, register_or_login: true }));
      setCookie('auth', res.data, { maxAge: 3600, path: '/' });
      goToHome();
    } else {
      setValidErr("Something went wrong, Try again");
    }
  }
  const submitData = e => {
    e.preventDefault();
    if (
      containsValidNameOrLastName(name) &&
      validatePassword(password) === "ok" &&
      containsValidNameOrLastName(lastName) &&
      validateEmail(email)
    ) {
      registrationSubmit(name, lastName, email, password)
        .then(res => {
          setInputValidStyle({ name: {}, lastName: {}, email: {}, password: {} });
          submitThen(res)
        })
        .catch((eror) => {
          console.log(eror)
          setValidErr(eror.response.data);
        });
      setEmail("");
      setName("");
      setLastName("");
      setPassword("");
      setValidErr("");
    } else {
      if (!containsValidNameOrLastName(name)) {
        setInputValidStyle(
          { name: { borderBottom: "1px solid red" }, lastName: {}, email: {}, password: {} }
        );
        setValidErr("In the name, the bit is 1 capital letter and no less than 2 characters");
      }
      else if (validatePassword(password) !== "ok") {
        setInputValidStyle(
          { name: {}, lastName: {}, email: {}, password: { borderBottom: "1px solid red" } }
        );
        setValidErr("Err write corect");
      } else if (!containsValidNameOrLastName(lastName)) {
        setInputValidStyle(
          { name: {}, lastName: { borderBottom: "1px solid red" }, email: {}, password: {} }
        );
        setValidErr("In the lastName, the bit is 1 capital letter and no less than 2 characters");
      } else if (!validateEmail(email)) {
        setInputValidStyle(
          { name: {}, lastName: {}, email: { borderBottom: "1px solid red" }, password: {} }
        );
        setValidErr(`The email address must not contain spaces, contain the "@" symbol,
        contain "." symbol,"." must be followed by at least one character.`);
      }
    }

  }
  return (
    <div className="registration">
      <h3 className="container">{validErr}</h3>
      <form >
        <StickyInputLabel
          props={useMemo(() => {
            return (
              {
                text: "Name",
                name: "name",
                type: "text",
                inputValue: name,
                setInputValue: setName,
                style: inputValidStyle.name
              }
            )
          }, [name, inputValidStyle])}
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
                  setInputValue: setLastName,
                  style: inputValidStyle.lastName
                }
              )
            }, [lastName, inputValidStyle])
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
                  setInputValue: setEmail,
                  style: inputValidStyle.email
                }
              )
            }, [email, inputValidStyle])
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
                  setInputValue: setPassword,
                  style: inputValidStyle.password
                }
              )
            }, [password, inputValidStyle])
          } />
        <button type="submit" onClick={submitData} >Submit</button>
        <Footer></Footer>
      </form>
    </div>
  );
};

export default Registration;