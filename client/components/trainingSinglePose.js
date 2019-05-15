import React from 'react';
import CountdownTimer from './CountdownTimer';
import Camera from './Camera';
import {connect} from 'react-redux'
import store from '../store';
import {reset} from '../store/trainer'
import ResultPage from './ResultPage'


class TrainingSinglePose extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stopTraining: false,
      loadCamera: false
    };
    this.displayCamera = this.displayCamera.bind(this);
  }

  componentDidMount() {
    store.dispatch(reset())
    setTimeout(this.displayCamera, 8000);
  }

  displayCamera() {
    this.setState({ loadCamera: true });
  }

  render() {
    return (
      <div>
        {!this.props.stop ?
        <div>
          {!this.state.loadCamera ?
          <div className="countdownDiv">
            <div>
              <h1>Get ready!</h1>
              <CountdownTimer />
            </div>
          </div> :
          <div className="cameraDiv">
            {stop = null}
            <Camera poseName={this.props.match.params.poseName} />
          </div>}
        </div> :
        <div>
          <p>pose name : {this.props.pose}</p>
          {this.props.score > 0 && this.props.score <= 1 ?
          <div>
            <div>
              <p>Score : {parseInt((1-this.props.score)*100)}%</p>
            </div>
            <div>
              <ResultPage percentage = {parseInt((1-this.props.score)*100)}/>
            </div>
          </div> :
          <div>
            <div>
              <p>Score : 0</p>
            </div>
            <div>
              <ResultPage percentage = {0}/>
            </div>
          </div>}
        </div>}
      </div>
    );
  }
}

const mapState = state => ({
  pose: state.resultReducer.pose,
  score: state.resultReducer.score,
  stop:state.resultReducer.stop
})

export default connect(mapState)(TrainingSinglePose);
