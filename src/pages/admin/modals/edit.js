import Modal from "../../../components/Modal";
import React, { Component, Fragment } from "react";
class Edit extends Component {
  state = {
    description: this.props.description,
    destination: this.props.destination,
    Category: this.props.Category,
    start_date: this.props.start_date,
    end_date: this.props.end_date,
    image: this.props.image,
    price: this.props.price,
    id: this.props.id,
  };
  onChange(e) {
    if (e.target.files) {
      this.setState({ image: e.target.files });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    var vacation = { ...this.state };
    this.props.handle_edit(vacation);
  }

  modalProps = {
    triggerText: "",
    icon: "mode_edit",
  };
  modalContent = (
    <Fragment>
      <p>
        Press <code>Esc</code> or click Outside the Modal to exit.
      </p>
      <div className="row">
        <form
          className="col offset-s4 s4"
          onSubmit={(e) => this.handleSubmit(e)}
          encType="multipart/form-data"
          style={{ marginTop: "6em", backgroundColor: "lightcyan" }}
        >
          <div className="col offset-s4 s4">
            <h6>Edit Vacation</h6>
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
                defaultValue={this.state.description}
                onChange={(e) => this.onChange(e)}

                //ref={this.props.desc}
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
                defaultValue={this.state.Category}
                onChange={(e) => this.onChange(e)}
                //ref={this.props.Cate}
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
                defaultValue={this.state.destination}
                // ref={this.props.dest}
                onChange={(e) => this.onChange(e)}
              />
              <label htmlFor="destination">Destination</label>
            </div>
          </div>
          <div className="row">
            <div className="file-field input-field">
              <div className="btn">
                <span>Image</span>
                <input
                  name="image"
                  type="file"
                  multiple
                  //value={this.props.image}
                  // ref={this.props.img}
                  onChange={(e) => this.onChange(e)}
                  //onChange={this.props.handleChange}
                />
              </div>
              <div className="file-path-wrapper">
                <input
                  className="file-path validate"
                  type="text"
                  defaultValue={this.state.image}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                type="text"
                name="start_date"
                className="datepicker"
                defaultValue={this.state.start_date || ""}
                // ref={this.props.start}
                onChange={(e) => this.onChange(e)}
              />

              <label htmlFor="start_date">Start Date: dd/mm/yyyy</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                type="text"
                name="end_date"
                className="datepicker"
                defaultValue={this.state.end_date || ""}
                // ref={this.props.end}
                onChange={(e) => this.onChange(e)}
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
                defaultValue={this.state.price}
                // ref={this.props.pri}
                onChange={(e) => this.onChange(e)}
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
              Save
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

export default Edit;
