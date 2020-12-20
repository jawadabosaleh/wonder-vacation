import { send_post } from "../fetching";

const reLogin = async (user) => {
  const path = "users/user";

  let res = await send_post(path, user, null);

  return res;
};

export default reLogin;
