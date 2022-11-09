import React from "react";
import {
  useLocation
} from "react-router-dom";
import axios from "axios";
import Signup from "./signup";

function SignupVerify() {
  let location = useLocation();
  const [errorMessage, setErrorMessage] = React.useState(null);
  const [signupData, setsignupData] = React.useState(null);
  let signUpToken = location.search;

  React.useEffect(() => {
    const baseURL = "http://localhost:3005/api/v1/user/verifySignupToken";
    axios
      .get(baseURL + signUpToken)
      .then((response) => {
        if (response.data.code === 400) {
          setErrorMessage(response.data.errorMessage);
          console.log(errorMessage);
        } else if (response.data.code === 200) {
          setsignupData(response.data.data);
        }
      })
      .catch((error) => setErrorMessage(error));
  }, [signUpToken])


  return (
    <div>
      {errorMessage && (
        <p className="error">{errorMessage} </p>
      )}
      {signupData && <Signup signupData={signupData} />}
    </div>
  );
}

export default SignupVerify;
