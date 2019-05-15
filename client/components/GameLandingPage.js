import React from "react";
import { connect } from "react-redux";
import AllPoses from "./AllPoses";
import CountdownTimer from "./CountdownTimer";
import Camera from "./Camera";
import GameFunctions from "./GameFunctions";
import ResultPage from "./ResultPage";
import { gameOverThunk } from "../store/game";

class GameLandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startGame: false,
      loadCamera: false
    };
    this.displayCamera = this.displayCamera.bind(this);
    this.disableGameStartCountdown = this.disableGameStartCountdown.bind(this);
  }

  componentDidMount() {
    setTimeout(this.displayCamera, 8000);
  }

  displayCamera() {
    this.setState({ loadCamera: true });
    setTimeout(this.disableGameStartCountdown, 3000);
  }

  disableGameStartCountdown() {
    //   //remove the countdown from view and begin running the game in gameFunctions component
    this.setState({ startGame: true });
  }

  render() {
    const isGameRound11 = this.props.gameRound === 11;
    const showResultPage = isGameRound11 || this.props.gameOver;
    return (
      <div>
        {showResultPage ? (
          <ResultPage />
        ) : (
          /* only when the countdown is done and the camera has loaded, do we want the game functions to begin running */
          <div>
            <div className="countdownDiv">
              {this.state.startGame ? (
                <GameFunctions />
              ) : (
                <div>
                  <h1>Get ready!</h1>
                  <CountdownTimer />
                </div>
              )}
            </div>

            <div className="cameraDiv">
              {this.state.loadCamera && this.props.poseName !== "" ? (
                <Camera mode="game" poseName={this.props.poseName} />
              ) : (
                <div />
              )}
            </div>

            <div className="allPosesDiv">
              <AllPoses />
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapState = state => ({
  gameOver: state.gameReducer.gameOver,
  gameRound: state.gameReducer.gameRound,
  poseName: state.gameReducer.poseName
});

const mapDispatch = dispatch => ({
  gameOverThunk: () => dispatch(gameOverThunk())
});

export default connect(
  mapState,
  mapDispatch
)(GameLandingPage);
