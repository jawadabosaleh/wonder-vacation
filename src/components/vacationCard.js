import React from "react";

const Card = (props) => {
  const checkFav = (arr) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].vacation_id === props.vacation.id) {
        return true;
      }
    }
    return false;
  };
  return (
    <div className="">
      <div className="col s4">
        <div className="card">
          <div className="card-image">
            <img
              src={"http://localhost:4000/" + props.image}
              alt="smily"
              style={{ width: "100%", maxHeight: "20vh" }}
            />
            <span className="card-title">{props.title}</span>

            {!props.admin ? (
              <div>
                {props.fav && checkFav(props.fav) ? (
                  <button
                    className="btn red right"
                    onClick={() => {
                      props.handle_follow(
                        1,
                        props.vacation.id,
                        props.vacation.followers
                      );
                    }}
                  >
                    <i className="material-icons">favorite</i>
                  </button>
                ) : (
                  <button
                    className="btn red right"
                    onClick={() => {
                      props.handle_follow(
                        2,
                        props.vacation.id,
                        props.vacation.followers
                      );
                    }}
                  >
                    <i className="material-icons">favorite_border</i>
                  </button>
                )}
              </div>
            ) : (
              <div>
                <div
                  className="btn-floating right waves-effect waves-light"
                  style={{ margin: "2em", alignContent: "center" }}
                >
                  <props.edit
                    image={props.vacation.image}
                    description={props.vacation.description}
                    destination={props.vacation.destination}
                    price={props.vacation.price}
                    start_date={props.vacation.start_date}
                    end_date={props.vacation.end_date}
                    Category={props.vacation.Category}
                    id={props.vacation.id}
                    handle_edit={props.handle_edit}
                  />
                </div>
                <div>
                  <button
                    className="btn-floating halfway-fab waves-effect waves-light red"
                    onClick={(e) => {
                      props.delete_vacation(props.vacation);
                    }}
                  >
                    <i className="material-icons">delete_forever</i>
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="card-content">
            <p>{props.description}</p>
          </div>
          <div className="card-action">
            <div>
              <props.details vacation={props.vacation} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
