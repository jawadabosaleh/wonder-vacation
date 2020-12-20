import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import resetPassword from "../api/auth/forgotPassword";

const ForgotPassword = () => {
  const mail = useRef();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    const email = mail.current.value;

    try {
      await resetPassword(email);
      setLoading(false);
      setSuccess(true);
      setMessage(`A password reset email has been sent to ${email}`);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <>
      <div className="card">
        <div className="card-body">
          <h2 className="col offset-s4 s4">Reset Password</h2>
          {error && <alert variant="danger">{error}</alert>}
          {message && <alert variant="success">{message}</alert>}
          {!success && (
            <form onSubmit={handleSubmit}>
              <div id="email">
                <label>Email</label>
                <input type="email" ref={mail} required></input>
              </div>
              <button disabled={loading} className="btn" type="submit">
                {loading && (
                  <div className="progress">
                    <div className="indeterminate"></div>
                  </div>
                )}
              </button>
            </form>
          )}
          <div className="col offset-s4 s4">
            <Link to="/login">Log In</Link>
          </div>
        </div>
      </div>
      <div className="col offset-s4 s4">
        You do not have an account? {<Link to="/signup">Sign Up</Link>}
      </div>
    </>
  );
};

export default ForgotPassword;
