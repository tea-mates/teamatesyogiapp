import React from "react";
import { disableCountdown } from "../store/game";
import { connect } from "react-redux";

class CountdownTimer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      secondsLeft: 10
    };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    this.killTimer = this.killTimer.bind(this);
  }

  componentDidMount() {
    this.startTimer();
  }

  componentWillUnmount() {
    console.log("@ component will unmount", this.timer);
    this.killTimer();
  }

  startTimer() {
    if (this.timer == 0 && this.state.secondsLeft > 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  countDown() {
    console.log("@ counting down", this.timer);
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.secondsLeft - 1;
    this.setState({
      secondsLeft: seconds
    });

    // Check if we're at zero.
    if (seconds == 0) {
      console.log("@ seconds reached 0", this.timer);
      this.killTimer();
    }
  }

  killTimer() {
    console.log("@ KILLING COUNTDOWN", this.timer);
    clearInterval(this.timer);
    // only kill the countdown if
    // 1) the pose success is false
    // 2) the round in progress is false
    this.props.disableCountdown();
  }

  render() {
    return <div className="countdown">{this.state.secondsLeft}</div>;
  }
}

const mapDispatchToProps = dispatch => ({
  disableCountdown: () => dispatch(disableCountdown())
});

const mapState = state => ({
  gameRound: state.gameReducer.gameRound
});

export default connect(
  mapState,
  mapDispatchToProps
)(CountdownTimer);
