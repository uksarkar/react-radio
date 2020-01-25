import React, { Component } from "react";

class Error extends Component {
  componentDidMount() {
    document.title = "Error 404 | Page not found.";
  }
  render() {
    return (
      <div className="card-container">
        <h1 className="card-title" style={{ textAlign: "center" }}>
          Error 404!
        </h1>
        <div className="big-box">
          <div className="box-middle">
            <h1>
              I am really sorry! but I can't find what you are looking for.
            </h1>
            <ul>
              <li>Maybe you enter a wrong URL.</li>
              <li>Probably I don't have this page.</li>
              <li>Or something wrong please try again.</li>
            </ul>
            <small>
              <strong>
                If you think I am messing something or you find a new radio
                station then let me know this.
              </strong>
            </small>
          </div>
        </div>
      </div>
    );
  }
}

export default Error;
