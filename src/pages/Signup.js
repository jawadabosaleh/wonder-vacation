import React, { useContext, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Register from "../api/auth/register";
import { tokenContext, UserContext } from "../shared/context";
import email from "../utils/validation";

const Signup = () => {
  const { setUser } = useContext(UserContext);
  const mail = useRef();
  const password = useRef();
  const passwordConfirm = useRef();
  const first_name = useRef();
  const last_name = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { setToken } = useContext(tokenContext);

  const Validate = () => {
    if (!mail.current.value || email(mail.current.value)) {
      setError("Please Enter A Valid Email");
      setLoading(false);
      return false;
    } else return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const email = mail.current.value;
    const pass = password.current.value;
    const passWordConfirm = passwordConfirm.current.value;
    const fn = first_name.current.value;
    const ln = last_name.current.value;

    if (pass !== passWordConfirm) {
      setLoading(false);
      return setError("Passwords do not match");
    }
    if (!Validate()) return;

    try {
      const data = await Register(email, pass, fn, ln);
      if (data.success === 1) {
        setUser(data.data);
        setToken(data.token);
        localStorage.setItem("user", JSON.stringify(data.data));
        localStorage.setItem("token", JSON.stringify(data.token));
      } else {
        setError(data.message);
        setLoading(false);
        return;
      }

      setLoading(false);
      if (data.data.role === "admin") {
        history.push("/admin");
      } else {
        history.push("/home");
      }
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  return (
    <React.Fragment>
      <div className="row">
        <form
          className="col offset-s4 s4"
          onSubmit={handleRegister}
          style={{ marginTop: "6em", backgroundColor: "lightcyan" }}
        >
          <div className="col offset-s4 s4">
            <h1>SignUp</h1>
            <br />
          </div>
          <div className="row">
            <div className="input-field col s6">
              <input
                name="first_name"
                id="first_name"
                type="text"
                className="validate"
                required
                ref={first_name}
              />
              <label htmlFor="first_name">First Name</label>
              <span
                className="helper-text"
                data-error="wrong"
                data-success="right"
              >
                Helper text
              </span>
            </div>
            <div className="input-field col s6">
              <input
                name="last_name"
                id="last_name"
                type="text"
                className="validate"
                required
                ref={last_name}
              />
              <label htmlFor="last_name">Last Name</label>
              <span
                className="helper-text"
                data-error="wrong"
                data-success="right"
              >
                Helper text
              </span>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                name="mail"
                id="email"
                type="email"
                className="validate"
                required
                ref={mail}
              />
              <label htmlFor="email">Email</label>
              <span
                className="helper-text"
                data-error="wrong"
                data-success="right"
              >
                Helper text
              </span>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                name="password"
                id="password"
                type="password"
                className="validate"
                required
                ref={password}
              />
              <label htmlFor="password">Password</label>
              <span
                className="helper-text"
                data-error="wrong"
                data-success="right"
              >
                Helper text
              </span>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                name="confirm-password"
                id="confirm-password"
                type="password"
                className="validate"
                required
                ref={passwordConfirm}
              />
              <label htmlFor="confirm-password">Confirm Password</label>
              <span
                className="helper-text"
                data-error="wrong"
                data-success="right"
              >
                Helper text
              </span>
            </div>
          </div>
          <div className="row">
            <small className="col offset-s4 s4">
              already a member ? <Link to="/Login">SignIn</Link>
            </small>
          </div>
          <br />
          {error && (
            <div className="row">
              <div
                className="col red offset-s4 s4"
                style={{
                  justifyContent: "center",
                  alignContent: "center",
                  textAlign: "center",
                }}
              >
                {error}
              </div>
            </div>
          )}
          <br />
          <div className="row">
            <button
              className="col btn waves-effect waves-light offset-s4 s4"
              type="submit"
              name="action"
              disabled={loading}
            >
              Submit
              <i className="material-icons right">send</i>
            </button>
            {loading && (
              <div className="progress">
                <div className="indeterminate"></div>
              </div>
            )}
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default Signup;
