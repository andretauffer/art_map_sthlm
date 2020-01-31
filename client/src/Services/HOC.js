import Composer from "./Composer";
import LoginContainer from "./Login/LoginContainer";
import withLoginState from "./Login/withLoginState";
import FormContainer from "./Form/FormContainer";
import withFormState from "./Form/withFormState";
import withFetch from "./CommonLogic/withFetch";
import withNavState from './Navbar/withNavState';

export default {
  Composer,
  LoginHOCs: { LoginContainer, withLoginState },
  FormHOCs: { FormContainer, withFormState },
  Navbar: { withNavState },
  CommonLogic: { withFetch },
};
