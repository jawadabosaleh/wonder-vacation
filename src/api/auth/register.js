import { send_post } from "../fetching";

const Register = async (email, password, first_name, last_name) => {
  const path = "users/register";
  const user = {
    mail: email,
    password: password,
    first_name: first_name,
    last_name: last_name,
  };

  let res = await send_post(path, user, null);
  return res;
};

export default Register;
