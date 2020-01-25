import React from "react";

const LeftSide = props => (
  <div
    className={props.content.playing ? "card-accent-green" : "card-accent-grey"}
    onClick={props.divClick}
  >
    <div
      className={
        props.content.imageUrl ? "card-logo fm" : "card-logo fm bg-loader"
      }
      style={
        props.content.imageUrl
          ? {
              backgroundImage: "url(" + props.content.imageUrl + ")",
              backgroundColor: props.content.bgColor
            }
          : { border: "none" }
      }
    >
      &nbsp;
    </div>
    <button
      className={
        !props.content.playing && !props.content.imageUrl
          ? "play card-btn-sm bg-loader"
          : !props.content.playing ||
            props.status === "loaderror" ||
            props.status === "hold"
          ? "play card-btn-sm"
          : props.status === "loaded"
          ? "pause card-btn-sm"
          : "running-circle"
      }
      onClick={props.content.imageUrl ? props.onPlay : null}
    >
      &nbsp;
    </button>
    <button
      className={props.content.imageUrl ? "love" : "love bg-loader"}
      disabled={!props.content.imageUrl}
    >
      &nbsp;
    </button>
    <div
      className={
        props.content.imageUrl ? "card-content" : "card-content bg-loader"
      }
      style={props.content.imageUrl ? null : { width: "90px" }}
    >
      {props.content.title}
    </div>
    <div className="star-block">
      <div className="Stars" style={{ "--rating": props.content.rating }}></div>
    </div>
  </div>
);

export default LeftSide;
