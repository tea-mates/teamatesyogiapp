import React from "react";
import Webcam from "react-webcam";
import Canvas from "./Canvas";

class Camera extends React.Component {
  constructor(props) {
    [super(props)];
    this.state = {
      capturedImage: ""
    };
  }

  setRef = webcam => {
    this.webcam = webcam;
    console.log("the webcam was initialized");
    console.log("this.refs is: ", this.refs);
  };

  capture = () => {
    const imageSrc = this.webcam.getScreenshot();
    console.log("the capture was triggered");
    console.log("the imageSrc is: ", imageSrc);
    this.setState({ capturedImage: imageSrc });
  };

  render() {
    return (
      <div>
        <Webcam ref={this.setRef} screenshotFormat="image/jpeg" />
        <button id="button" onClick={this.capture}>
          Take photo
        </button>
        {/* <img src={this.state.capturedImage} /> */}
        <Canvas newPhoto={this.state.capturedImage} text="TEAmates" />
      </div>
    );
  }
}

export default Camera;
