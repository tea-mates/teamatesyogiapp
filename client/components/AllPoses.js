import React from "react";
import { connect, dispatch } from "react-redux";
import { beginCountdown, poseToDo } from "../store/game";

const poses = [
  {
    name: "MountainPose", //the images need to be updated
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Mr-yoga-mountain-pose-bound_hands.jpg/747px-Mr-yoga-mountain-pose-bound_hands.jpg",
    highlight: ""
  },
  {
    name: "HalfMoonPose",
    imageUrl: "https://i.imgur.com/VKn1Z7q.png",
    highlight: ""
  },
  {
    name: "GarlandPose",
    imageUrl: "https://i.imgur.com/16JLzA4.png",
    highlight: ""
  },
  {
    name: "TreePose", //the images need to be updated
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Tree_pose.JPG/428px-Tree_pose.JPG",
    highlight: ""
  }
];

class AllPoses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      poseBeingHighlighted: "",
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
    const { poseSequence, beginCountdown } = this.props;
    const { poseTimeframeMs } = this.state;
    const l = poseSequence.length;
    for (let i = 0; i < l; i++) {
      (i => {
        //this anon fn slows down the for loop
        setTimeout(() => {
          let currPose = poseSequence[i];
          this.setState({ poseBeingHighlighted: currPose });
        }, poseTimeframeMs * i);
      })(i); //this invokes the outer anon fn
    }

    //will need to state the countdown once sequence of poses is show to the user
    (l => {
      setTimeout(() => {
        this.setState({ poseBeingHighlighted: "" });
        beginCountdown();
      }, poseTimeframeMs * l);
    })(l); //this invokes the outer anon fn
  };

  render() {
    const { gameRound } = this.props;

    return (
      <div>
        {gameRound === 0 ? <div /> : <h1>Round {gameRound}</h1>}
        <div className="allPoseImages">
          <div className="poseContainer">
            {poses.map((pose, i) => {
              const { poseBeingHighlighted } = this.state;
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
  gameRound: state.gameReducer.gameRound
});

const mapDispatchToProps = dispatch => ({
  beginCountdown: () => dispatch(beginCountdown())
});

export default connect(
  mapState,
  mapDispatchToProps
)(AllPoses);
