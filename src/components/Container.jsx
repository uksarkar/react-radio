import React, { Component } from "react";
import Content from "../util/Content";
import { Switch, Route } from "react-router-dom";
import Error from "../pages/Error";
import Home from "../pages/Home";

class Container extends Component {
  /**
   * Here we rendering Container component
   * @return JSX
   */
  render() {
    return (
      <div
        className={
          this.props.onMargin
            ? "container-fluid mt-5 res-mt"
            : "container-fluid mt-5"
        }
      >
        <div className="row">
          <div className="col-md-6 col-lg-4 col-xl-3">
            <div
              className={
                this.props.togglerData ? "sidebar show-sidebar" : "sidebar"
              }
            >
              <div className="overflow"></div>
              {this.props.children}
            </div>
          </div>
          <div className="col-md-6 col-lg-8 col-xl-9">
            <div className="row">
              <div className="col-lg-9">
                <Switch>
                  <Route exact path="/" children={<Home />} />
                  <Route
                    exact
                    path="/:station"
                    render={props => (
                      <Content
                        {...props}
                        updateState={this.props.updateState}
                        content={this.props.currentData}
                        error={this.props.error}
                      />
                    )}
                  />
                  <Route children={<Error />} />
                </Switch>
              </div>
              <div className="col-lg-3">Views: {this.props.views}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Container;
