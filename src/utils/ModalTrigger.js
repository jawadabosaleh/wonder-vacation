import React, { Component } from "react";
class ModalTrigger extends Component {
  render() {
    return (
      <>
        <button
          ref={this.props.buttonRef}
          onClick={this.props.showModal}
          className="modal-button btn"
          style={{ fontSize: "x-large" }}
        >
          {this.props.triggerText}
          <i className="material-icons">{this.props.icon}</i>
        </button>
      </>
    );
  }
}

export default ModalTrigger;
