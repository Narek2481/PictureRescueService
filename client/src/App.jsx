import Nav from "./components/nav/Nav";
import Cookies from 'js-cookie';

function App() {
  const token = Cookies.get('access_token');
  console.log(token)
  return (

    <div>
      <Nav></Nav>
    </div>
  );
}

export default App;
