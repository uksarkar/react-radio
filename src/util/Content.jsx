import React, { Component } from "react";
import Error from "../pages/Error";

class Content extends Component {
  componentDidMount() {
    if (this.props.match) {
      this.props.updateState(this.props.match.params.station);
    }
  }
  componentDidUpdate() {
    if (this.props.content) {
      document.title = this.props.content.title;
    }
  }
  render() {
    return !this.props.error ? (
      <div className="card-container">
        <h1 className="card-title">{this.props.content.title}</h1>
        <div
          className="card-text"
          dangerouslySetInnerHTML={{ __html: this.props.content.description }}
        ></div>
      </div>
    ) : (
      <Error />
    );
  }
}

export default Content;
