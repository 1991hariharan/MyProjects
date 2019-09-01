import React, { Component } from "react";
class CardProperty extends Component {
  render() {
    return (
      <div className="card-content">
        <div className="row">
          <div className="col-lg-7 col-xs-6">{this.props.name}</div>
          <div className="col-lg-5 col-xs-6">
            <span>{this.props.value}</span>
          </div>
        </div>
      </div>
    );
  }
}
export default CardProperty;
