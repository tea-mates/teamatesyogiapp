import React from "react";
import { Button } from "./Buttons";
import AllPoses from "./AllPoses";
import CountdownTimer from "./CountdownTimer";
import Camera from "./Camera";
import GameFunctions from "./GameFunctions";

class GameLandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startGame: false,
      loadCamera: false
    };
    this.displayCamera = this.displayCamera.bind(this);
    this.disableCountdown = this.disableCountdown.bind(this);
  }

  componentDidMount() {
    setTimeout(this.displayCamera, 8000);
  }

  displayCamera() {
    this.setState({ loadCamera: true });
    setTimeout(this.disableCountdown, 3000);
  }

  disableCountdown() {
    //remove the countdown from view and begin running the game in gameFunctions component
    this.setState({ startGame: true });
  }

  render() {
    return (
      <div>
        <audio ref="audio_tag" loop id="SlowHeat">
          <source src="http://chirb.it/NHffPL" crossOrigin="anonymous" />
        </audio>
        {this.state.gameOver ? (
          <ResultPage />
        ) : (
          /* only when the countdown is done and the camera has loaded, do we want the game functions to begin running */
          <div>
            <div className="countdownDiv">
              {this.state.startGame ? <GameFunctions /> : <CountdownTimer />}
            </div>

            <div>{this.state.loadCamera ? <Camera /> : <div />}</div>

            <div className="allPosesDiv">
              <AllPoses />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default GameLandingPage;
