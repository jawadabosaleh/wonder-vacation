import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useHistory } from "react-router-dom";
import {
  tokenContext,
  UserContext,
  VacationContext,
} from "../../shared/context";
import Dashboard from "../../components/Dashboard";
import Add from "./modals/add";
import Edit from "./modals/edit";
import Details from "./modals/details";
import getVacations from "../../api/vacation/allVacations";
import addVacation from "../../api/vacation/addVacation";
import socketIOClient from "socket.io-client";
import editVacations from "../../api/vacation/editVacation";
import deleteVacation from "../../api/vacation/deleteVacation";

export function useForceUpdate(data) {
  const [, setVacations] = useState(data);
  const update = useCallback((data) => {
    setVacations((vac) => vac, data);
  }, []);
  return update;
}

const Admin = () => {
  const { user } = useContext(UserContext);
  const [error, setError] = useState("");
  const { vacations, setVacations } = useContext(VacationContext);
  const { token } = useContext(tokenContext);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const description = useRef();
  const Category = useRef();
  const destination = useRef();
  const price = useRef();
  const start_date = useRef();
  const end_date = useRef();
  const image = useRef(null);
  const socket = useRef();

  const loadVacation = useCallback(
    async (socket) => {
      const data = await getVacations(token);
      if (data.success === 1) {
        setVacations(undefined);
        setVacations(data.data);
        socket.emit("vacations", data.data);
      } else {
        setError(data.message);
        setLoading(false);
        return;
      }
      return data.data;
    },
    [setVacations, token]
  );

  useEffect(() => {
    let u = JSON.parse(localStorage.getItem("user"));
    if (!user && u) {
      history.push("/login");
    }
    if (user && error === "Invalid Token...") {
      history.push("/login");
    }
    socket.current = socketIOClient("localhost:4000/");
    if (socket) {
      loadVacation(socket.current);

      socket.current.on("vacations", (data) => {
        setVacations(undefined);
        setVacations(data);
      });
    }
  }, [error, history, loadVacation, setVacations, socket, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    var vacation = new FormData();
    vacation.append("description", description.current.value);
    vacation.append("destination", destination.current.value);
    vacation.append("Category", Category.current.value);
    vacation.append("price", price.current.value);
    vacation.append("start_date", start_date.current.value);
    vacation.append("end_date", end_date.current.value);

    for (let i = 0; i < image.current.files.length; i++) {
      vacation.append(
        "uploads[]",
        image.current.files[i],
        image.current.files[i].name
      );
    }

    try {
      let res = await addVacation(token, vacation);
      loadVacation(socket.current);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const handle_edit = async (vacation) => {
    let vac = new FormData();
    vac.append("description", vacation.description);
    vac.append("destination", vacation.destination);
    vac.append("Category", vacation.Category);
    vac.append("price", vacation.price);
    vac.append("start_date", vacation.start_date);
    vac.append("end_date", vacation.end_date);
    vac.append("Updated_At", new Date().toISOString());
    vac.append("vacation_id", vacation.id);

    for (let i = 0; i < vacation.image.length; i++) {
      vac.append("uploads[]", vacation.image[i], vacation.image[i].name);
    }
    try {
      let res = await editVacations(token, vac);
      if (!res) {
        setError(res.message);
      }
      loadVacation(socket.current);
    } catch (err) {
      console.log(err);
      setError(err);
    }
  };

  const delete_vacation = async (vac) => {
    try {
      let res = await deleteVacation(token, vac);
      console.log(res);
      if (!res) {
        setError(res.message);
      }
      loadVacation(socket.current);
    } catch (err) {
      console.log(err);
      setError(err);
    }
  };

  return (
    <React.Fragment>
      <Dashboard
        admin={true}
        add={Add}
        edit={Edit}
        details={Details}
        vacations={vacations}
        error={error}
        user={user}
        loading={loading}
        history={history}
        handleSubmit={handleSubmit}
        description={description}
        Category={Category}
        destination={destination}
        price={price}
        start_date={start_date}
        end_date={end_date}
        image={image}
        handle_edit={handle_edit}
        delete_vacation={delete_vacation}
      />
    </React.Fragment>
  );
};

export default Admin;
