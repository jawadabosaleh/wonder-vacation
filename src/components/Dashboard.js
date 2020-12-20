import React from "react";
import Card from "./vacationCard";

const Dashboard = (props) => {
  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <h5 className="col offset-s4 s4">Welcome {props.user.full_name}</h5>
        </div>
        {props.error && (
          <div className="row">
            <div
              className="col red offset-s4 s4"
              style={{
                justifyContent: "center",
                alignContent: "center",
                textAlign: "center",
              }}
            >
              {props.error}
            </div>
          </div>
        )}
        {props.loading ?? (
          <div className="progress">
            <div className="indeterminate"></div>
          </div>
        )}
        {props.admin ? (
          <div className="row ">
            <div className="col offset-s5 s6">
              <div className="col right modal-trigger ">
                <props.add
                  description={props.description}
                  Category={props.Category}
                  destination={props.destination}
                  price={props.price}
                  image={props.image}
                  start_date={props.start_date}
                  end_date={props.end_date}
                  handleSubmit={props.handleSubmit}
                  handleChange={props.handleChange}
                />
              </div>
            </div>
          </div>
        ) : null}
      </div>
      {!props.vacations ? (
        <div className="row"> No Available Vacations </div>
      ) : (
        <div className="row">
          {props.vacations.map((vacation, idx) => (
            <Card
              key={idx}
              image={vacation.image}
              title={vacation.description}
              description={vacation.description}
              fav={props.fav}
              admin={props.admin}
              id={idx}
              vacation={vacation}
              delete_vacation={props.delete_vacation}
              edit={props.edit}
              details={props.details}
              followers={vacation.followers}
              handle_edit={props.handle_edit}
              handle_follow={props.handle_follow}
            />
          ))}
        </div>
      )}
    </React.Fragment>
  );
};

export default Dashboard;
