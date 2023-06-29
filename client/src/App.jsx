import { useEffect } from "react";
import Nav from "./components/nav/Nav";
import { useDispatch } from "react-redux";
import { editCurrentUser } from "./redux/user/userSlice";
import checkeAuth from "./action/refresh";
import { downloudProfileImage } from "./redux/imageProfile/imageProfile";


function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(downloudProfileImage())
    if (localStorage.getItem("token")) {
      checkeAuth(dispatch, editCurrentUser)
    }
  })
  return (
    <Nav />
  );
}

export default App;
