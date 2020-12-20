import { send_post } from "../fetching";

const follow = async (token, obj) => {
  const path = "vacations/follow";

  let res = await send_post(path, obj, token, null);
  return res;
};

export default follow;
