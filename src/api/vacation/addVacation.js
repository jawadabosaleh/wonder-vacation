import { send_post } from "../fetching";

const addVacation = async (token, vacation) => {
  const path = "vacations/addVacation";

  let res = await send_post(path, vacation, token, 1);
  return res;
};

export default addVacation;
