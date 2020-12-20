import Modal from "../../../components/Modal";
import React, { Component, Fragment } from "react";
class Details extends Component {
  modalProps = {
    triggerText: "more info ",
    icon: "info_outline",
  };
  modalContent = (
    <Fragment>
      <div className="container">
        <p className="row">
          Press <code>Esc</code> or click Outside the Modal to exit.
        </p>
        <p className="row">
          Pressing Return also exits the Modal if you haven't changed the focus!
        </p>
        <div className="row">
          <div className="col offset-s2 s8">
            <div>
              <img
                src={"http://localhost:4000/" + this.props.vacation.image}
                alt="smily"
                width="100%"
              />
            </div>
            <div className="card">
              <div className="center">
                <span className="center" style={{ fontSize: "25px" }}>
                  {this.props.vacation.Category}
                </span>
              </div>
              <div className="card-content">
                <div className="row">
                  description :{this.props.vacation.description}
                </div>
                <div className="row">
                  destination :{this.props.vacation.destination}
                </div>
                <div className="row">
                  start date :{this.props.vacation.start_date}
                </div>
                <div className="row">
                  end date :{this.props.vacation.end_date}
                </div>
                <div className="row">price :{this.props.vacation.price}</div>
                <div className="right" style={{ paddingBottom: "2em" }}>
                  Followers: {this.props.vacation.followers}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
  render() {
    return (
      <div className="App">
        <Modal modalProps={this.modalProps} modalContent={this.modalContent} />
      </div>
    );
  }
}

export default Details;
