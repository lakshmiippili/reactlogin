import React, {
  useState,
  useEffect,
  useReducer,
  useContext,
  useRef,
} from "react";
import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import Input from "../UI/Text/Input";
import AuthContext from "../../store/authcontext";

const emailReducer = (state, action) => {
  if (action.type === "user_input") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "input_blur") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};
const passwordReducer = (state, action) => {
  if (action.type === "user_input") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "input_blur") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
};
const collegeReducer = (state, action) => {
  if (action.type === "user_input") {
    return { value: action.val, isValid: action.val.trim().length > 0 };
  }
  if (action.type === "input_blur") {
    return { value: state.value, isValid: state.value.trim().length > 0 };
  }
  return { value: "", isValid: false };
};
const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: undefined,
  });
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: undefined,
  });
  // const [enteredCollege, setEnteredCollege] = useState("");
  // const [collegeIsValid, setCollegeIsValid] = useState();
  const [collegeState, dispatchCollege] = useReducer(collegeReducer, {
    value: "",
    isValid: undefined,
  });
  const [formIsValid, setFormIsValid] = useState(false);

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;
  const { isValid: collegeIsValid } = collegeState
  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(
        emailState.isValid && passwordState.isValid && collegeState.isValid
      );
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [emailState, passwordState, collegeState]); //dependencies

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const collegeInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "user_input", val: event.target.value });
  };

  const collegeChangeHandler = (e) => {
    dispatchCollege({ type: "user_input", val: e.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "user_input", val: event.target.value });
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "input_blur" });
  };

  const validateCollegeHandler = () => {
    dispatchCollege({ type: "input_blur" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "input_blur" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      authCtx.onLogin(emailState.value, passwordState.value);
    } else if (!emailIsValid) {
      emailInputRef.current.focus();
    } else {
      passwordInputRef.current.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          type="email"
          label="Email"
          id="email"
          isValid={emailIsValid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />

        <Input
          ref={passwordInputRef}
          type="password"
          label="Password"
          id="password"
          isValid={passwordIsValid}
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />

        <Input
          ref={collegeInputRef}
          type="text"
          label="College"
          id="college"
          isValid={collegeIsValid}
          value={collegeState.value}
          onChange={collegeChangeHandler}
          onBlur={validateCollegeHandler}
        />

        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
