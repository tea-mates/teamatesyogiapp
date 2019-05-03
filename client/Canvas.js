import React from "react";

class Canvas extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   staticImage:
    //     "https://upload.wikimedia.org/wikipedia/commons/4/41/7-3-3_Hyperbolic_Honeycomb_Rotating.gif"
    // };
  }

  componentDidMount() {
    const canvas = this.refs.canvas;
    const context = canvas.getContext("2d");
    const img = this.refs.image;
    // const image = this.state.staticImage;

    img.onload = () => {
      context.drawImage(img, 0, 0);
      context.font = "40px Courier";
      context.fillText(this.props.text, 210, 75);
    };
  }

  render() {
    const imgStyle = {
      display: "none"
    };
    return (
      <div>
        <canvas ref="canvas" width={640} height={425} />
        <img ref="image" src={this.props.newPhoto} style={imgStyle} />
      </div>
    );
  }
}

export default Canvas;
