import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { tokenContext, UserContext, VacationContext } from "../shared/context";
import getVacations from "../api/vacation/allVacations";
import { useHistory } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import Details from "./admin/modals/details";
import socketIOClient from "socket.io-client";
import getFavs from "../api/vacation/getFavs";
import follow from "../api/vacation/follow";
import unfollow from "../api/vacation/unfollow";

const User = () => {
  const { user } = useContext(UserContext);
  const [error, setError] = useState("");
  const { vacations, setVacations } = useContext(VacationContext);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const socket = useRef();
  const [favorite, setFavorite] = useState([]);
  const { token } = useContext(tokenContext);

  const loadVacation = useCallback(async () => {
    const data = await getVacations(token);
    if (data) {
      if (data.success === 1) {
        setVacations(undefined);
        setVacations(data.data);
      } else {
        setError(data.message);
        setLoading(false);
        return;
      }
      return data;
    }
    return null;
  }, [token, setVacations]);

  useEffect(() => {
    let u = JSON.parse(localStorage.getItem("user"));
    if (!user && u) {
      history.push("/login");
    }
    if (user && error === "Invalid Token...") {
      history.push("/login");
    }
    if (user) {
      getFavs(token, user.id).then((res) => {
        setFavorite(undefined);
        setFavorite(res.data);
      });
    }
    socket.current = socketIOClient("localhost:4000/");
    if (socket) {
      loadVacation(socket.current);

      socket.current.on("vacations", (data) => {
        setVacations(undefined); //force children render
        setVacations(data);
      });
    }
  }, [error, history, loadVacation, setVacations, token, user]);

  const handle_follow = async (option, id, followers) => {
    let body = { user_id: user.id, vacation_id: id, followers: followers };
    if (option === 1) {
      let res = await unfollow(token, body);
      setVacations(undefined);
      setVacations(res.data);
      res = await getFavs(token, user.id);
      setFavorite(undefined);
      setFavorite(res.data);
    }
    if (option === 2) {
      let res = await follow(token, body);
      setVacations(undefined);
      setVacations(res.data);
      res = await getFavs(token, user.id);
      setFavorite(undefined);
      setFavorite(res.data);
    }
  };

  return (
    <React.Fragment>
      <Dashboard
        vacations={vacations}
        admin={false}
        details={Details}
        error={error}
        user={user}
        loading={loading}
        history={history}
        fav={favorite}
        handle_follow={handle_follow}
      />
    </React.Fragment>
  );
};

export default User;
