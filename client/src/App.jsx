import { useEffect } from "react";
import Nav from "./components/nav/Nav";
import { useDispatch } from "react-redux";
import { editCurrentUser } from "./redux/user/userSlice";
import checkeAuth from "./action/refresh";


function App() {
  const dispatch = useDispatch()
  useEffect(()=>{
    if(localStorage.getItem("token")){
      checkeAuth(dispatch,editCurrentUser)
    }
  },[])
  return (
    <Nav />
  );
}

export default App;
