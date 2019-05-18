//import { drawKeyPoints, drawSkeleton } from './utils';
import React, { Component } from "react";
import * as posenet from "@tensorflow-models/posenet";
import { detectPose, poseDetectionFrame } from "../poseNetFunc";
import { connect } from "react-redux";
import { updateStop } from "../store/trainer";
import store from "../store";
import {
  nextRound,
  checkPoseSuccess,
  flipPoseSuccess,
  poseToDo
} from "../store/game";

let stream = null;
export let stop = null;

class Camera extends Component {
  static defaultProps = {
    //video sizing variables
    videoWidth: 900,
    videoHeight: 700,
    flipHorizontal: true, // we dont flip, in canvas it is drawing on the other half
    algorithm: "single-pose",
    showVideo: true,
    showSkeleton: true,
    minPoseConfidence: 0.1, // at what accuracy of estimation you want to draw
    minPartConfidence: 0.5,
    maxPoseDetections: 2,
    nmsRadius: 20,
    outputStride: 16,
    imageScaleFactor: 0.5,
    skeletonColor: "#ffadea",
    skeletonLineWidth: 6,
    loadingText: "Loading...please be patient..."
  };

  constructor(props) {
    super(props, Camera.defaultProps);
    this.state = {
      flag: true
    };
    this.detectPose = detectPose.bind(this);
    // this.promptCamera = this.promptCamera.bind(this);
    this.setupCamera = this.setupCamera.bind(this);
    this.getCanvas = this.getCanvas.bind(this);
    this.getVideo = this.getVideo.bind(this);
  }

  getCanvas = elem => {
    this.canvas = elem;
  };

  getVideo = elem => {
    this.video = elem;
    // console.log("in getVideo fn this refers to: ", this);
  };

  async componentDidMount() {
    try {
      stop = null;
      await this.setupCamera();
    } catch (error) {
      throw new Error(
        "This browser does not support video capture, or this device does not have a camera"
      );
    }
    try {
      this.posenet = await posenet.load();
    } catch (error) {
      throw new Error("PoseNet failed to load");
    } finally {
      setTimeout(() => {
        this.setState({ loading: false });
      }, 200);
    }
    if (this.canvas) {
      this.detectPose(
        this.props,
        this.canvas,
        poseDetectionFrame,
        this.posenet,
        this.video,
        this.props.poseName
      );
    }
    /**
     * ! IMPORTANT :
     * Teammates need this so come back to it
     */
    // setTimeout(toggleStop, 11000);
  }

  // async promptCamera() {
  //   try {
  //     await this.setupCamera();
  //   } catch (error) {
  //     throw new Error(
  //       "This browser does not support video capture, or this device does not have a camera"
  //     );
  //   }
  //   try {
  //     this.posenet = await posenet.load();
  //   } catch (error) {
  //     throw new Error("PoseNet failed to load");
  //   } finally {
  //     setTimeout(() => {
  //       this.setState({ loading: false });
  //     }, 200);
  //   }

  //   this.detectPose(
  //     //is this where we know if it's successful?
  //     this.props,
  //     this.canvas,
  //     poseDetectionFrame,
  //     this.posenet,
  //     this.video,
  //     this.props.currentPoseInARound
  //   );
  //   if (this.props.pose === this.props.poseName) {
  //     this.props.checkPoseSuccess();
  //     this.props.flipPoseSuccess();
  //   }
  //   setTimeout(toggleStop, 11000);
  // }

  async setupCamera() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error(
        "Browser API navigator.mediaDevices.getUserMedia not available"
      );
    }
    const { videoWidth, videoHeight } = this.props;
    const video = this.video;
    video.width = videoWidth;
    video.height = videoHeight;

    stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        facingMode: "user",
        width: videoWidth,
        height: videoHeight
      }
    });

    video.srcObject = stream;
    return new Promise(resolve => {
      video.onloadedmetadata = () => {
        //code from PoseNet, not sure how it works
        video.play();
        resolve(video);
      };
    });
  }

  componentWillUnmount() {
    let track = stream.getTracks()[0];
    track.stop();
    stop = true;
  }

  render() {
    return (
      <div>
        <video id="videoNoShow" playsInline ref={this.getVideo} />
        <canvas className="webcam" ref={this.getCanvas} />
      </div>
    );
  }
}

const mapState = (state, ownProps) => ({
  countdown: state.gameReducer.countdown,
  poseSequence: state.gameReducer.poseSequence,
  poseSuccess: state.gameReducer.poseSuccess,
  poseName: state.gameReducer.poseName,
  pose: state.resultReducer.pose
});

const mapDispatch = dispatch => ({
  checkPoseSuccess: () => dispatch(checkPoseSuccess()),
  nextRound: poseSequence => dispatch(nextRound(poseSequence)),
  flipPoseSuccess: () => dispatch(flipPoseSuccess()),
  poseToDo: () => dispatch(poseToDo())
});

export default connect(
  mapState,
  mapDispatch
)(Camera);

export function toggleStop() {
  stop = true;
}

function togglePlayVideo() {
  stop = false;
  play = true; // not declared, but this might be something to implement to restart the camera when checking a 2nd/sequential pose in a single round
}
