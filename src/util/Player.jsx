import React from "react";

const Player = props => (
  <div className="player">
    <div className="title col-sm-6">
      <div className="light-parent">
        <div className="text-effect">
          <h1 className="title-lighting" data-text={props.content.title}>
            {props.content.title}
          </h1>
          <div className="gradient"></div>
          <div className="spotlight"></div>
        </div>
      </div>
    </div>
    <div className="col-sm-6 rangeButton">
      <button
        onClick={props.btnClick}
        className={
          !props.content.playing || props.status === "loaderror"
            ? "play-btn"
            : props.status === "loaded"
            ? "pause-btn"
            : "loading-btn"
        }
      >
        &nbsp;
      </button>
      <input
        onChange={props.volume}
        value={props.range}
        type="range"
        min="0"
        max="100"
      />
    </div>
  </div>
);

export default Player;
