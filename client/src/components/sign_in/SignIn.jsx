import Footer from "../footer/Footer";
import SignInForm from "./signInForm/SignInForm";

const SignIn = () => {
  return (
    <>
      <div className="sign_in">
        <h2>Sign In</h2>
        <SignInForm />
      </div>
      <Footer/>
    </>
  );
};

export default SignIn;