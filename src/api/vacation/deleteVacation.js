import { send_delete } from "../fetching";

const deleteVacation = async (token, vacation) => {
  const path = "vacations/deleteVacation";

  let res = await send_delete(path, vacation, token);
  return res;
};

export default deleteVacation;
