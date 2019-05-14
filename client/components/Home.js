import React from "react";
import { Link } from "react-router-dom";

class Home extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="homepage" align="center">
        **Please allow the camera access**
        <div className="row">
          <div className="col col-lg-1" />
          <div className="col col-lg-3" className="boxed">
            <h3 className="card-title">Practice Mode</h3>
            <img
              id="demogif"
              src="http://www.mariasfarmcountrykitchen.com/wp-content/uploads/2015/11/How-to-Practice-Yoga-Lotus-Pose-768x480.jpg"
            />
            <br />
            <Link to="/train">
              <button className="button-warning">Train</button>
            </Link>
          </div>
          <div className="col col-lg-3" className="boxed">
            <h3 className="card-title">Demo</h3>
            {/* //placeholder for animated demo */}
            <img
              id="demogif"
              src="https://cdn.dribbble.com/users/919329/screenshots/2796076/better-yoga3-dribbble.gif"
            />
            <br />
            <Link to="/demo">
              <button className="button-warning">See Demo</button>
            </Link>
          </div>

          <div className="col col-lg-3" className="boxed">
            <h3 className="card-title">Game Mode</h3>
            <img
              id="demogif"
              src="https://cdn3.iconfinder.com/data/icons/retro-tech/60/Retro_Tech_-_Flat_-_054_-_Simon_Says-512.png"
            />
            <br />
            <Link to="/start">
              <button className="button-warning">Play</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
