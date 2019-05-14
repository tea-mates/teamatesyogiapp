import React from "react";
import { connect } from "react-redux";
import { poseToDo } from "../store/game";

class RoundPoseDisplay extends React.Component {
  componentDidUpdate() {
    const { poseToDo } = this.props;
    poseToDo();
  }

  render() {
    const { poseSequence, currentPoseInARound } = this.props;
    return (
      <div>
        <h1 className="h2">You're on pose:</h1>

        {poseSequence.map((singlePose, idx) => {
          return (
            <div key={idx} keyname={singlePose}>
              {singlePose === currentPoseInARound ? (
                <button className="button-primary button-round button-small">
                  {singlePose}
                  {idx}
                </button>
              ) : (
                <button
                  className="button-primary-outlined button-round button-small"
                  sendthedispatch={() => this.props.poseToDo(singlePose)}
                >
                  {singlePose}
                  {idx}
                </button>
              )}
            </div>
          );
        })}
      </div>
    );
  }
}

const mapState = state => ({
  poseSequence: state.gameReducer.poseSequence,
  currentPoseInARound: state.gameReducer.currentPoseInARound
});

const mapDispatch = dispatch => ({
  poseToDo: pose => dispatch(poseToDo(pose))
});

export default connect(
  mapState,
  mapDispatch
)(RoundPoseDisplay);
