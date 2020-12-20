import Modal from "../../../components/Modal";
import React, { Component, Fragment } from "react";
class Add extends Component {
  modalProps = {
    triggerText: "New ",
    icon: "add",
  };
  modalContent = (
    <Fragment>
      <p>
        Press <code>Esc</code> or click Outside the Modal to exit.
      </p>
      <div className="row">
        <form
          className="col offset-s4 s4"
          onSubmit={this.props.handleSubmit}
          encType="multipart/form-data"
          style={{ marginTop: "6em", backgroundColor: "lightcyan" }}
        >
          <div className="col offset-s4 s4">
            <h6>Add Vacation</h6>
            <br />
          </div>
          <div className="row">
            <div className="input-field col s6">
              <input
                name="description"
                id="description"
                type="text"
                className="validate"
                required
                ref={this.props.description}
              />
              <label htmlFor="description">Description</label>
            </div>
            <div className="input-field col s6">
              <input
                name="Category"
                id="Category"
                type="text"
                className="validate"
                required
                ref={this.props.Category}
              />
              <label htmlFor="Category">Category</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                name="destination"
                id="destination"
                type="text"
                className="validate"
                required
                ref={this.props.destination}
              />
              <label htmlFor="destination">Destination</label>
            </div>
          </div>
          <div className="row">
            <div className="file-field input-field">
              <div className="btn">
                <span>Image</span>
                <input type="file" multiple ref={this.props.image} />
              </div>
              <div className="file-path-wrapper">
                <input className="file-path validate" type="text" />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                type="text"
                className="datepicker"
                ref={this.props.start_date}
              />

              <label htmlFor="start_date">Start Date: dd/mm/yyyy</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                type="text"
                className="datepicker"
                ref={this.props.end_date}
              />

              <label htmlFor="end_date">End Date: dd/mm/yyyy</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                name="price"
                id="price"
                type="text"
                className="validate"
                required
                ref={this.props.price}
              />
              <label htmlFor="price">Price</label>
            </div>
          </div>

          <br />
          {this.props.error && (
            <div className="row">
              <div
                className="col red offset-s4 s4"
                style={{
                  justifyContent: "center",
                  alignContent: "center",
                  textAlign: "center",
                }}
              >
                {this.props.error}
              </div>
            </div>
          )}
          <br />
          <div className="row">
            <button
              className="col btn waves-effect waves-light offset-s4 s4"
              type="submit"
              name="action"
              disabled={this.props.loading}
            >
              ADD
              <i className="material-icons right">send</i>
            </button>
            {this.props.loading && (
              <div className="progress">
                <div className="indeterminate"></div>
              </div>
            )}
          </div>
        </form>
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

export default Add;
