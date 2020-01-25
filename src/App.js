import React, { Component } from 'react';
import Container from './components/Container'
import Player from './util/Player';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { Howl, Howler } from "howler";
import LeftSide from "./util/LeftSide";
import Axios from "axios";
import Logo from './util/Logo';
import Alert from './util/Alert';

class App extends Component {
  state = {
    stations: [
      {
        title: ""
      },
      {
        title: ""
      },
      {
        title: ""
      },
      {
        title: ""
      },
      {
        title: ""
      }
    ],
    playingStation: {},
    currentData: {
      title: "Loading data",
      description: "Please wait..."
    },
    currentState: null,
    range: 100
  };

  /**
   * get data from server
   */
  componentDidMount() {
    Axios.get("https://asia-east2-rtuner.cloudfunctions.net/api/stations").then(res => {
      this.setState({ stations: res.data });
      if (this.state.currentState) {
        this.updateByState(this.state.currentState);
      }
    }).catch(err => this.setState({ stations: [], currentData: { title: "Loading failed", description: "Please try again." }, status: "loaderror" }));
    Axios.post("https://asia-east2-rtuner.cloudfunctions.net/api/addViews").then(res => {
      this.setState({ views: res.data });
    });
    let volume = localStorage.getItem("volume");
    if (volume) {
      this.setState({ range: volume });
      Howler.volume(volume / 100);
    }
  }

  /**
   * It will set the current playing station and Howl to get start the radio station
   * and set playing property to true or false based on user
   * @param object
   * the object comes from user's click event
   * @return undefined
   */
  Play = data => {
    this.setState({ status: "stopped" });
    let stations = this.state.stations.map((v, i) => {
      if (v.title === data.title) {
        let current = { ...v, playing: !v.playing };
        if (!current.howl && current.playing) {
          current = {
            ...current,
            howl: new Howl({
              src: current.url,
              html5: true,
              format: ["mp3", "aac"]
            })
          };
        }
        this.setState({
          playingStation: current
        });
        if (current.playing) {
          current.howl.on("load", () => {
            this.setState({ status: "loaded" });
          });
          current.howl.on("loaderror", () => {
            this.setState({ status: "loaderror", playingStation: { ...this.state.playingStation, playing: false } });
          });
          current.howl.play();
        } else {
          current.howl.on("stop", () => {
            this.setState({ status: "stopped" });
          });
          current.howl.unload();
        }
        return current;
      }
      if (v.playing) {
        v.howl.unload();
        this.setState({ status: "stopped" });
      }
      return { ...v, playing: false };
    });
    this.setState({ stations });
  };

  /**
   * Set data what the user wants to view
   * the data will bo showing on Content component
   * @param int
   * it will come from the user's click event
   * @return undefined
   */
  changeData = index => {
    let currentData = this.state.stations[index];
    this.setState({ currentData });
    this.setState({ error: false });
  };

  /**
   * It will fire on page load if user enter a valid url
   * from Content component by react-router
   * to know currently on what state we are right now
   * @param string
   * current path to match with one of station
   * @return undefined
   */
  updateByState = path => {
    let currentData = this.state.stations.filter(v => v.path === path)[0];
    if (currentData) {
      this.setState({ currentData, playingStation: currentData });
      this.setState({ error: false });
    } else {
      this.setState({ error: 404 });
    }
  };

  setOffset = () => {
    let offset = this.state.offset ? false : true;
    this.setState({ offset });
  }

  updateState = currentState => this.setState({ currentState });
  closeAlert = () => this.setState({ status: "hold" });
  volume = (e) => {
    this.setState({ range: e.target.value });
    Howler.volume(e.target.value / 100);
    localStorage.setItem("volume", e.target.value);
  }

  render() {

    let cards = this.state.stations.map((v, i) => (
      <Link to={"/" + (v.path || '')} key={i}>
        <LeftSide
          divClick={() => this.changeData(i)}
          onPlay={() => this.Play(v)}
          content={v}
          status={this.state.status}
        />
      </Link>
    ));

    return (
      <React.Fragment>
        <Router>
          <header className="header">
            <div className="row">
              <div className="col-sm-3">
                <div className={this.state.offset ? "station-toggler left-toggler" : "station-toggler right-toggler"} onClick={this.setOffset}>
                  &nbsp;
                </div>
                <Link to="/">
                  <span className="logo">
                    <Logo />
                  </span>
                </Link>
              </div>
              <div className="col-sm-9">
                {this.state.playingStation.title && <Player btnClick={() => this.Play(this.state.playingStation)} status={this.state.status} volume={this.volume} range={this.state.range} content={this.state.playingStation} />}
              </div>
            </div>
          </header>
          <Container views={this.state.views} currentData={this.state.currentData} onMargin={!!this.state.playingStation.title} error={this.state.error} updateState={this.updateState} togglerData={this.state.offset}>
            {cards}
          </Container>
          {this.state.status === "loaderror" ? <Alert close={this.closeAlert} /> : null}
        </Router>
      </React.Fragment>
    );
  }
}

export default App;