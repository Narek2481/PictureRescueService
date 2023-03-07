import Footer from "../footer/Footer";
import Sign_in_form from "./sign_in_form/Sign_in_form";

const Sign_in = () => {
  return (
    <>
      <div className="sign_in">

        <h2>Sign in</h2>
        <Sign_in_form />
      </div>
      <Footer></Footer>
    </>
  );
};

export default Sign_in;