import React from "react";
import { connect } from "react-redux";
import { beginCountdown, highlightPose } from "../store/game";
import RoundPoseDisplay from "./RoundPoseDisplay";

const poses = [
  {
    name: "TreePose", //the images need to be updated
    imageUrl: "https://i.imgur.com/MWPBVms.png",
    highlight: "https://i.imgur.com/GoTbFCM.png"
  },
  {
    name: "GarlandPose",
    imageUrl: "https://i.imgur.com/aDSbScd.png",
    highlight: "https://i.imgur.com/KSdMqQT.png"
  },
  {
    name: "MountainPose",
    imageUrl: "https://i.imgur.com/2HvvGW0.png",
    highlight: "https://i.imgur.com/y4e9Sxj.png"
  },
  {
    name: "ShivaTwist", //the images need to be updated
    imageUrl: "https://i.imgur.com/LXeq1aU.png",
    highlight: "https://i.imgur.com/MGn4IU1.png"
  }
];

class AllPoses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      poseTimeframeMs: 2000 //this controls how long each pose is highlighted for
    };
  }

  componentDidUpdate(prevProps) {
    const { poseSequence } = this.props;
    const poseWasAdded = prevProps.poseSequence.length !== poseSequence.length;
    if (poseWasAdded) {
      this.showSequence();
    }
  }

  highlightPose() {}

  showSequence = () => {
    const { poseSequence, beginCountdown, highlightPose } = this.props;
    const { poseTimeframeMs } = this.state;
    const l = poseSequence.length;
    for (let i = 0; i < l; i++) {
      (i => {
        //this anon fn slows down the for loop
        setTimeout(() => {
          let currPose = poseSequence[i];
          highlightPose(currPose);
        }, poseTimeframeMs * i);
      })(i); //this invokes the outer anon fn
    }

    //will need to start the countdown once the sequence of poses is shown to the user
    (l => {
      setTimeout(() => {
        highlightPose("");
        beginCountdown();
      }, poseTimeframeMs * l);
    })(l);
  };

  render() {
    const { gameRound } = this.props;

    return (
      <div>
        {gameRound === 0 ? <div /> : <h1>Round {gameRound}</h1>}
        <RoundPoseDisplay />
        <div className="allPoseImages">
          <div className="poseContainer">
            {poses.map((pose, i) => {
              const { poseBeingHighlighted } = this.props;
              const isPoseHighlighted = poseBeingHighlighted === pose.name;
              return (
                <img
                  className="posesImage"
                  src={isPoseHighlighted ? pose.highlight : pose.imageUrl}
                  key={i}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  poseSequence: state.gameReducer.poseSequence,
  gameRound: state.gameReducer.gameRound,
  poseBeingHighlighted: state.gameReducer.poseBeingHighlighted
});

const mapDispatchToProps = dispatch => ({
  beginCountdown: () => dispatch(beginCountdown()),
  highlightPose: pose => dispatch(highlightPose(pose))
});

export default connect(
  mapState,
  mapDispatchToProps
)(AllPoses);
