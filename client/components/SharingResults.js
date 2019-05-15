import React from "react";

export default class SharingResults extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const script = document.createElement("script");

    script.src = `//platform-api.sharethis.com/js/sharethis.js#property=5cd32b213f59c700126bad69&product=sticky-share-buttons`;
    script.async = true;

    document.body.appendChild(script);
  }

  render() {
    return (
      <div>
        <div className="sharethis-inline-share-buttons" />
      </div>
    );
  }
}
