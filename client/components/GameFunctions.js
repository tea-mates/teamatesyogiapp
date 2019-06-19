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
  doEndFirstTimer,
  endRound
} from "../store/game";
import { reset } from "../store/trainer";

class GameFunctions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nextPose: false
    };

    this.beginNextRound = this.beginNextRound.bind(this);
    this.handlePoseSuccess = this.handlePoseSuccess.bind(this);
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

    // this.props.nextRound();
    this.setState({ nextPose: true });
  }

  componentDidUpdate(prevProps) {
    const {
      poseSuccess,
      countdown,
      beginCountdown,
      gameOverThunk,
      doEndFirstTimer,
      firstTimer,
      detectedPose,
      expectedPose,
      poseBeingHighlighted,
      checkPoseSuccess,
      poseToDo,
      poseSequence,
      currentPoseSequenceIdx,
      nextRound,
      roundInProgress
    } = this.props;
    // if (this.state.nextPose === true) {
    //   this.setState({ nextPose: false });
    //   beginCountdown();
    // }

    // if (countdown === true) {
    //   this.whichPoseIsBeingChecked();
    // }
    console.log("cdm", this.props);

    //%%%%%% might need one more comparison here if we want round 2 to succeed %%%%%%
    if (!countdown && !poseSuccess && poseBeingHighlighted === "default") {
      if (firstTimer) {
        doEndFirstTimer();
        nextRound();
      } else if (!roundInProgress) gameOverThunk();
    }

    /**
     * FOR SIMULATION -
     * This will auto-trigger successful poses through each round.
     * Comment this section out if you're using a real camera.
     */
    // const l = this.props.poseSequence.length;
    // if (l !== prevProps.poseSequence.length) {
    //   for (let i = 1; i <= l; i++) {
    //     (i => {
    //       setTimeout(() => {
    //         this.handlePoseSuccess();
    //       }, 7000 * i);
    //     })(i);
    //   }
    // }

    /**
     * FOR REAL -
     * This will use the actual poses detected via the webcam.
     * Comment this section out in simulation mode.
     */
    const poseMatch = detectedPose === expectedPose;
    console.log({ detectedPose, expectedPose });
    if (poseMatch && !poseSuccess && expectedPose) {
      this.handlePoseSuccess();
    }
  }

  handlePoseSuccess() {
    const {
      currentPoseSequenceIdx,
      poseSequence,
      checkPoseSuccess,
      nextRound,
      endRound,
      poseToDo,
      disableCountdown,
      resetTrainer
    } = this.props;

    checkPoseSuccess();
    resetTrainer();
    const isLastPose = currentPoseSequenceIdx === poseSequence.length - 1;
    console.log({ isLastPose });
    disableCountdown();
    if (isLastPose) {
      endRound();
      nextRound();
    } else poseToDo();
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
    const startCountdown = countdown && poseBeingHighlighted === "default";
    console.log({ countdown, poseBeingHighlighted });
    console.log("should display countdown", startCountdown);
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
  detectedPose: state.resultReducer.pose, // detected pose
  expectedPose: state.gameReducer.poseName, // expected pose
  gameRound: state.gameReducer.gameRound,
  firstTimer: state.gameReducer.firstTimer,
  poseBeingHighlighted: state.gameReducer.poseBeingHighlighted,
  currentPoseSequenceIdx: state.gameReducer.currentPoseSequenceIdx,
  roundInProgress: state.gameReducer.roundInProgress
});

const mapDispatch = dispatch => ({
  nextRound: poseSequence => dispatch(nextRound(poseSequence)),
  beginCountdown: () => dispatch(beginCountdown()),
  disableCountdown: () => dispatch(disableCountdown()),
  poseToDo: () => dispatch(poseToDo()),
  gameOverThunk: () => dispatch(gameOverThunk()),
  checkPoseSuccess: () => dispatch(checkPoseSuccess()),
  flipPoseSuccess: () => dispatch(flipPoseSuccess()),
  doEndFirstTimer: () => dispatch(doEndFirstTimer()),
  endRound: () => dispatch(endRound()),
  resetTrainer: () => dispatch(reset())
});

export default connect(
  mapState,
  mapDispatch
)(GameFunctions);
