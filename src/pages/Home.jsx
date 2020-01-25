import React, { Component } from "react";

class Content extends Component {
  componentDidMount() {
    document.title = "RTuner | Listen live radio station";
  }
  render() {
    return (
      <div className="card-container">
        <h1 className="card-title">RTuner (Radio Tuner)</h1>
        <div className="card-text">
          <p>
            <strong>RTuner</strong> is pronounced as{" "}
            <strong>Radio Tuner</strong>. It&#39;s a self-hosted web-based radio
            player, developed and maintained by <em>Utpal Kumar Sarkar</em>.
            &nbsp;You can listen live to your favorite radio station. And even
            for more activity you should log in or register to this website.
            Registered users can rate stations, comment, and many more things.
            <br />
            <strong>
              If you have any word for me then please poke me anytime.
            </strong>
          </p>
        </div>
      </div>
    );
  }
}

export default Content;
