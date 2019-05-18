import React from 'react';
import { Link } from 'react-router-dom';

class Home extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="homepage">
        **Please allow the camera access**
        <div className="row" justify="center">
          <div className="col col-lg-4">
            <div className="boxed">
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
          </div>
          <div className="col col-lg-4">
            <div className="boxed">
              <h3 className="card-title">Demo</h3>
              <img
                id="demogif"
                src="https://cdn.dribbble.com/users/919329/screenshots/2796076/better-yoga3-dribbble.gif"
              />
              <br />
              <Link to="/demo">
                <button className="button-warning">See Demo</button>
              </Link>
            </div>
          </div>

          <div className="col col-lg-4">
            <div className="boxed">
              <img
                className="game-card"
                src="https://i.imgur.com/id7JeTI.png"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
