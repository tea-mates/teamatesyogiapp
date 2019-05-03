import React from "react";
import ReactDOM from "react-dom";
import Camera from "./CameraCapt";

ReactDOM.render(
  <div>
    Hello, world!
    <Camera>This is where the camera goes.</Camera>
  </div>,
  document.getElementById("root") // make sure this is the same as the id of the div in your index.html
);
