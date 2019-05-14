import React from 'react';
import { connect, dispatch } from 'react-redux';
import { beginCountdown, poseToDo } from '../store/game';

const poses = [
  {
    name: 'TreePose', //the images need to be updated
    imageUrl: 'https://i.imgur.com/MWPBVms.png',
    highlight: 'https://i.imgur.com/GoTbFCM.png',
  },
  {
    name: 'GarlandPose',
    imageUrl: 'https://i.imgur.com/aDSbScd.png',
    highlight: 'https://i.imgur.com/KSdMqQT.png',
  },
  {
    name: 'MountainPose',
    imageUrl: 'https://i.imgur.com/2HvvGW0.png',
    highlight: 'https://i.imgur.com/y4e9Sxj.png',
  },
  {
    name: 'ShivaTwist', //the images need to be updated
    imageUrl: 'https://i.imgur.com/LXeq1aU.png',
    highlight: 'https://i.imgur.com/MGn4IU1.png',
  },
];

class AllPoses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      poseBeingHighlighted: '',
      poseTimeframeMs: 2000, //this controls how long each pose is highlighted for
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
        this.setState({ poseBeingHighlighted: '' });
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
  gameRound: state.gameReducer.gameRound,
});

const mapDispatchToProps = dispatch => ({
  beginCountdown: () => dispatch(beginCountdown()),
});

export default connect(
  mapState,
  mapDispatchToProps
)(AllPoses);
