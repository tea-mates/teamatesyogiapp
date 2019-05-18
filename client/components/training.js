import React from 'react';
import { Link } from 'react-router-dom';

export const poses = [
  {
    name: 'MountainPose', //the images need to be updated
    imageUrl:
      'https://www.yogapedia.com/images/uploads/792b80fd0c884040bbcfaf14656788f7.png',
    select: '',
  },
  {
    name: 'ShivaTwist',
    imageUrl:
      'https://www.yogapedia.com/images/uploads/b4034436-61fe-4af4-9254-0bdbedeacd8f.png',
    select: '',
  },
  {
    name: 'GarlandPose',
    imageUrl:
      'https://cdn.yogapedia.com/images/uploads/logo-trademark-alphabet-ampersand-text-silhouette.png',
    select: '',
  },
  {
    name: 'TreePose', //the images need to be updated
    imageUrl:
      'https://www.yogapedia.com/images/uploads/8182ced0e2784fc1b5737f8bda1de28a.png',
    select: '',
  },
];

const SelectTrainingPose = props => {
  return (
    <div className="row">
      {poses.map((pose, i) => {
        return (
          <div key={i} className="col col-lg-6">
            <img className="trainingImage" id={i} src={pose.imageUrl} />
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
