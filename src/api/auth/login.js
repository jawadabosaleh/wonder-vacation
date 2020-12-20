import { send_post } from "../fetching";

const Login = async (email, password) => {
  const path = "users/login";
  const user = { mail: email, password: password };

  let res = await send_post(path, user, null);
  return res;
};

export default Login;
