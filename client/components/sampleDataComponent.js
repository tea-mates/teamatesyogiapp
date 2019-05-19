import React, { Component } from "react";
import butterflyPoseUrls from "../../SampleButterflyPoseData";

export default class DataViewer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const imgStyle = {
      height: "140"
    };
    return (
      <div>
        {butterflyPoseUrls.map((picUrl, idx) => {
          return (
            <img
              id={idx}
              src={picUrl}
              alt={`the index is: `.concat(idx)}
              style={imgStyle}
            />
          );
        })}
      </div>
    );
  }
}
