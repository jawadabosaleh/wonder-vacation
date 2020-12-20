import { send_put } from "../fetching";

const editVacations = async (token, vacation) => {
  const path = "vacations/updateVacation";

  let res = await send_put(path, vacation, token, 1);
  return res;
};

export default editVacations;
