import { send_post } from "../fetching";

const unfollow = async (token, obj) => {
  const path = "vacations/unfollow";

  let res = await send_post(path, obj, token, null);
  return res;
};

export default unfollow;
