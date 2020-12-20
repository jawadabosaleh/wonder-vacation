import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { tokenContext, UserContext } from "../shared/context";
import login from "../api/auth/login";
import email from "../utils/validation";
import reLogin from "../api/auth/reLogin";

const Login = () => {
  const { user, setUser } = useContext(UserContext);
  const mail = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { setToken } = useContext(tokenContext);

  useEffect(() => {
    return () => {
      let u = JSON.parse(localStorage.getItem("user"));
      if (u) {
        try {
          reLogin(u).then((res) => {
            if (res.success === 1) {
              localStorage.setItem("user", JSON.stringify(res.data));
              localStorage.setItem("token", JSON.stringify(res.token));
              setUser(res.data);
              setToken(res.token);
            } else {
              localStorage.clear();
            }
          });
          if (user) {
            if (user.role === "admin") history.push("/admin");
            else {
              history.push("/home");
            }
          }
        } catch (err) {
          console.log(err);
        }
      }
    };
  }, [history, setToken, setUser, user]);

  const Validate = () => {
    if (!mail.current.value || email(mail.current.value)) {
      setError("Please Enter A Valid Email");
      setLoading(false);
      return false;
    } else return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    if (!Validate()) return;
    const email = mail.current.value;
    const password = passwordRef.current.value;

    await send(email, password);
  };

  const send = async (email, password) => {
    try {
      const data = await login(email, password);
      if (data.success === 1) {
        setUser(data.data);
        setToken(data.token);
        localStorage.setItem("user", JSON.stringify(data.data));
        localStorage.setItem("token", JSON.stringify(data.token));
      } else {
        setError(data.message || data.data);
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
      <>
        <div className="row">
          <form
            className="col offset-s4 s4"
            onSubmit={handleLogin}
            style={{ marginTop: "6em", backgroundColor: "lightcyan" }}
          >
            <div className="col offset-s4">
              <h1>Login</h1>
              <br />
            </div>
            <div className="row">
              <div className="input-field col offset-s3 s6">
                <i className="material-icons prefix">account_circle</i>
                <input
                  id="icon_prefix"
                  type="email"
                  className="validate"
                  name="mail"
                  ref={mail}
                  required
                />
                <label htmlFor="icon_prefix"> Email </label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s6 offset-s3">
                <i className="material-icons prefix">lock</i>
                <input
                  id="icon_telephone"
                  type="password"
                  className="validate"
                  name="password"
                  ref={passwordRef}
                  required
                />
                <label htmlFor="icon_telephone">Password</label>
              </div>
            </div>

            <div className="row">
              <small className="col offset-s4 s4">
                Don't have an account ? <Link to="/signup">SignUp</Link>
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
                SignIn
                <i className="material-icons right">arrow_forward</i>
              </button>
              {loading && (
                <div className="progress">
                  <div className="indeterminate"></div>
                </div>
              )}
            </div>
          </form>
        </div>
      </>
    </React.Fragment>
  );
};

export default Login;
