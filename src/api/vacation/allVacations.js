import { send_get } from "../fetching";

const getVacations = async (token) => {
  const path = "vacations/allVacations";

  let res = await send_get(path, token, null);
  return res;
};

export default getVacations;
