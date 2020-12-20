import { send_post } from "../fetching";

const getFavs = async (token, id) => {
  const path = "vacations/userVacations";
  let obj = { id: id };

  let res = await send_post(path, obj, token, null);
  return res;
};

export default getFavs;
