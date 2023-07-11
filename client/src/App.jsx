import { useEffect } from "react";
import Nav from "./components/nav/Nav";
import { useDispatch, useSelector } from "react-redux";
import { editCurrentUser } from "./redux/user/userSlice";
import checkeAuth from "./action/refresh";
import { downloudProfileImage } from "./redux/imageProfile/imageProfile";


function App() {
  const dispatch = useDispatch();
  const loginState = useSelector((state) => state.currentUser.register_or_login)
  
  useEffect(() => {
    if (localStorage.getItem("token")) {
      checkeAuth(dispatch, editCurrentUser)
    }
    // dispatch(downloudProfileImage())
  })
  useEffect(()=>{
    dispatch(downloudProfileImage())
  },[dispatch,loginState])
  return (
    <Nav />
  );
}

export default App;
