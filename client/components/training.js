import React from 'react';
import { Link } from 'react-router-dom';

const poses = [
  {
    name: 'MountainPose', //the images need to be updated
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Mr-yoga-mountain-pose-bound_hands.jpg/747px-Mr-yoga-mountain-pose-bound_hands.jpg',
    select: ''
  },
  {
    name: 'ShivaTwist',
    imageUrl: 'https://i.imgur.com/VKn1Z7q.png',
    select: ''
  },
  {
    name: 'GarlandPose',
    imageUrl: 'https://i.imgur.com/16JLzA4.png',
    select: ''
  },
  {
    name: 'TreePose', //the images need to be updated
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Tree_pose.JPG/428px-Tree_pose.JPG',
    select: ''
  }
];

const SelectTrainingPose = props => {
  return (
    <div className="row">
      {poses.map((pose, i) => {
        return (
          <div key={i} className="col col-lg-6">
            <img className="trainingImage" id={i} src={pose.imageUrl} />
            {/* <Link
              to={{
                pathname: '/singlePose',
                state: {
                  pose: pose.name
                }
              }}
            > */}
            <Link to={`/train/${pose.name}`}>
              <button className="button-primary-outlined">{pose.name} </button>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default SelectTrainingPose;
