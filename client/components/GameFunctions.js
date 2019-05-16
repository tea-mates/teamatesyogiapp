import React from "react";
import CountdownTimer from "./CountdownTimer";
import { connect } from "react-redux";
import {
  nextRound,
  beginCountdown,
  poseToDo,
  gameOverThunk,
  disableCountdown,
  checkPoseSuccess,
  flipPoseSuccess,
  doEndFirstTimer
} from "../store/game";

class GameFunctions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nextPose: false
    };

    this.beginNextRound = this.beginNextRound.bind(this);
    // this.whichPoseIsBeingChecked = this.whichPoseIsBeingChecked.bind(this);
  }

  componentDidMount() {
    // 1. begin the first round
    // 2. make a sequence of 1 pose, and increment game round from 0 to 1
    // 3. display the sequence to the player
    //    - this happens in AllPoses.js
    // 4. once displayed, start countdown timer
    // 5. during the countdown, user does the pose
    //    a. complete the pose successfully
    //        i. the first pose box is checked off
    //        ii. the countdown resets, the user continues to try to do the next pose in the sequence
    //        iii. repeat 5's logic until they complete all poses in the sequence successfully
    //    b. timeout / failure

    this.props.nextRound();
    this.setState({ nextPose: true });
  }

  componentDidUpdate() {
    const {
      poseSuccess,
      countdown,
      beginCountdown,
      gameOverThunk,
      doEndFirstTimer,
      firstTimer
    } = this.props;
    console.log("the props", this.props);
    // if (this.state.nextPose === true) {
    //   this.setState({ nextPose: false });
    //   beginCountdown();
    // }

    // if (countdown === true) {
    //   this.whichPoseIsBeingChecked();
    // }
    if (countdown === false) {
      if (firstTimer) {
        doEndFirstTimer();
        beginCountdown();
      } else gameOverThunk();
      console.log(this.props);
      // disableCountdown();
      // gameOverThunk();
    }
    // if (poseSuccess) {
    //   this.props.flipPoseSuccess();
    //   // this.props.nextRound();
    // }
    // if (this.props.pose === this.props.poseName) {
    //   this.props.checkPoseSuccess();
    // }
    // else if (countdown === false) gameOverThunk();
    // else this.props.gameOverThunk();
  }

  beginNextRound() {
    if (this.props.countdown && !this.props.gameOver) {
      this.props.nextRound();
    }
  }

  // whichPoseIsBeingChecked() {
  //   const { poseSequence, poseToDo, poseSuccess } = this.props;
  //   const l = poseSequence.length;
  //   for (let i = 0; i < l; i++) {
  //     (i => {
  //       //this anon fn slows down the for loop
  //       setTimeout(() => {
  //         let currPose = poseSequence[i];
  //         poseToDo(currPose);
  //       }, 10000 * i);
  //     })(i);
  //   }
  // }

  render() {
    const { countdown, poseBeingHighlighted } = this.props;
    const startCountdown = countdown && !poseBeingHighlighted;
    return (
      <div>
        {startCountdown ? (
          <div className="countdownDiv">
            <h1>Do the pose!</h1>
            <CountdownTimer />
          </div>
        ) : (
          <div />
        )}
      </div>
    );
  }
}

const mapState = state => ({
  countdown: state.gameReducer.countdown,
  poseSuccess: state.gameReducer.poseSuccess,
  gameOver: state.gameReducer.gameOver,
  poseSequence: state.gameReducer.poseSequence,
  poseName: state.gameReducer.poseName, //a string
  gameRound: state.gameReducer.gameRound,
  pose: state.resultReducer.pose,
  firstTimer: state.gameReducer.firstTimer,
  poseBeingHighlighted: state.gameReducer.poseBeingHighlighted
});

const mapDispatch = dispatch => ({
  nextRound: poseSequence => dispatch(nextRound(poseSequence)),
  beginCountdown: () => dispatch(beginCountdown()),
  poseToDo: pose => dispatch(poseToDo(pose)),
  gameOverThunk: () => dispatch(gameOverThunk()),
  checkPoseSuccess: () => dispatch(checkPoseSuccess()),
  flipPoseSuccess: () => dispatch(flipPoseSuccess()),
  doEndFirstTimer: () => dispatch(doEndFirstTimer())
});

export default connect(
  mapState,
  mapDispatch
)(GameFunctions);
