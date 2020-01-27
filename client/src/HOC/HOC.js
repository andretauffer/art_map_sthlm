import Composer from "./Composer";
import LoginContainer from "./Login/LoginContainer";
import withLoginState from "./Login/withLoginState";
import FormContainer from "./Form/FormContainer";
import withFormState from "./Form/withFormState";
import withFetch from "./CommonLogic/withFetch";

export default {
  Composer,
  LoginHOCs: { LoginContainer, withLoginState },
  FormHOCs: { FormContainer, withFormState },
  CommonLogic: { withFetch }
};
