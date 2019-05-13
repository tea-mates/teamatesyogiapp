import { drawKeyPoints, drawSkeleton } from './components/utils';
import { compareObj, flatImageData, parts } from './Data/finalData';
import { normArrGen } from './Data/flatArrGen';
import { compare, cosineDistanceMatching } from './cosineFunc';
import { stop } from './components/Camera';
import {gotResult} from './store/trainer'
import store from './store';

export function detectPose(
  props,
  argcanvas,
  poseDetectionFrame,
  posenet,
  video
) {
  const { videoWidth, videoHeight } = props;
  const canvas = argcanvas;

  const canvasContext = canvas.getContext('2d');

  canvas.width = videoWidth;
  canvas.height = videoHeight;

  poseDetectionFrame(canvasContext, props, posenet, video);
}

export function poseDetectionFrame(canvasContext, props, posenet, argvideo) {
  const {
    algorithm,
    imageScaleFactor,
    flipHorizontal,
    outputStride,
    minPoseConfidence,
    minPartConfidence,
    maxPoseDetections,
    nmsRadius,
    videoWidth,
    videoHeight,
    showVideo,
    showPoints,
    showSkeleton,
    skeletonColor,
    skeletonLineWidth
  } = props;

  const posenetModel = posenet;
  const video = argvideo;
  const findPoseDetectionFrame = async () => {
    let poses = [];

    switch (algorithm) {
      case 'single-pose': {
        const pose = await posenetModel.estimateSinglePose(
          video,
          imageScaleFactor,
          flipHorizontal,
          outputStride
        );
        poses.push(pose);
        let refPoses = [
          'TreePose',
          'GarlandPose',
          'MountainPose',
          'ShivaTwist'
        ];

        let index = refPoses.indexOf('TreePose');

        let flatRefImage = flatImageData[index];

        let normArray1 = normArrGen(poses);

        let minCosineDistance = compare(normArray1, flatRefImage);
        if (minCosineDistance > 0.4) {
          store.dispatch(gotResult('BadPose',minCosineDistance))
          console.log(`Bad Pose`);
        } else {
          store.dispatch(gotResult(compareObj[index].pose,minCosineDistance))
          console.log(
            `Pose is ${compareObj[index].pose} and points ${minCosineDistance}`
          );
        }
        break;
      }
    }
    canvasContext.clearRect(0, 0, videoWidth, videoHeight);

    if (showVideo) {
      canvasContext.save();
      canvasContext.scale(-1, 1);
      canvasContext.translate(-videoWidth, 0);
      canvasContext.drawImage(video, 0, 0, videoWidth, videoHeight);
      canvasContext.restore();
    }

    poses.forEach(({ score, keypoints }) => {
      if (score >= minPoseConfidence) {
        if (showPoints) {
          drawKeyPoints(
            keypoints,
            minPartConfidence,
            skeletonColor,
            canvasContext
          );
        }
        if (showSkeleton) {
          drawSkeleton(
            keypoints,
            minPartConfidence,
            skeletonColor,
            skeletonLineWidth,
            canvasContext
          );
        }
      }
    });
    if (!stop) requestAnimationFrame(findPoseDetectionFrame);
  };

  findPoseDetectionFrame();
}

