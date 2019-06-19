/* eslint-disable no-case-declarations */
/**
 * ACTION TYPES
 */
const START_GAME = "START_GAME";
const END_GAME = "END_GAME";
const SUCCESS = "SUCCESS";
// const FAILED = "FAILED";
const RESET_POSE_SUCCESS = "RESET_POSE_SUCCESS";
const DISABLE_COUNTDOWN = "DISABLE_COUNTDOWN";
const UPDATE_SEQUENCE = "UPDATE_SEQUENCE";
const NEXT_POSE_TO_DO = "NEXT_POSE_TO_DO";
const END_FIRST_TIMER = "END_FIRST_TIMER";
const HIGHLIGHT_POSE = "HIGHLIGHT_POSE";
const END_OF_ROUND = "END_OF_ROUND";

/**
 * ACTION CREATORS
 */
const nextPoseToDo = () => ({
  type: NEXT_POSE_TO_DO
});

const poseSuccess = () => ({
  type: SUCCESS
});

const resetPoseSuccess = () => ({
  type: RESET_POSE_SUCCESS
});

const gameOver = () => ({
  type: END_GAME
});

const updateSequence = () => ({
  type: UPDATE_SEQUENCE
});

const startCountdown = () => ({
  type: START_GAME
});

const endCountdown = () => ({
  type: DISABLE_COUNTDOWN
});

export const endRound = () => ({
  type: END_OF_ROUND
});

const endFirstTimer = () => ({
  type: END_FIRST_TIMER
});

const highlightPoseAction = pose => ({
  type: HIGHLIGHT_POSE,
  pose
});

/**
 * THUNKS
 */

function _getRandomPose() {
  const poses = ["TreePose", "GarlandPose", "MountainPose", "ShivaTwist"];
  const poseToShowNum = Math.floor(Math.random() * 4);
  const poseToShow = poses[poseToShowNum];
  return poseToShow;
}

export const beginCountdown = () => {
  return dispatch => {
    dispatch(startCountdown());
    // setTimeout(() => {
    //   dispatch({
    //     type: DISABLE_COUNTDOWN
    //   });
    // }, 10000);
  };
};

export const disableCountdown = () => {
  return dispatch => {
    dispatch(endCountdown());
  };
};

export const poseToDo = () => {
  return dispatch => {
    dispatch(nextPoseToDo());
  };
};

export const checkPoseSuccess = () => {
  return dispatch => {
    dispatch(poseSuccess());
  };
};

export const flipPoseSuccess = () => {
  return dispatch => {
    dispatch(resetPoseSuccess());
  };
};

export const gameOverThunk = () => {
  return dispatch => {
    dispatch(gameOver());
  };
};

export const nextRound = () => {
  return dispatch => {
    dispatch(updateSequence());
  };
};

export const doEndFirstTimer = () => {
  return dispatch => {
    dispatch(endFirstTimer());
  };
};

export const highlightPose = pose => {
  return dispatch => {
    dispatch(highlightPoseAction(pose));
  };
};

/**
 * INITIAL STATE
 */
const defaultGame = {
  poses: ["TreePose", "GarlandPose", "MountainPose", "ShivaTwist"],
  // poses: ["MountainPose"],
  firstTimer: true,
  countdown: false,
  gameRound: 0,
  poseBeingHighlighted: "default",
  poseSequence: [],
  currentPoseSequenceIdx: -1, //the index of the current pose within a game round
  poseSuccess: false, //did they succeed to do the current pose
  poseName: "",
  roundInProgress: false,
  gameOver: false //set this to true if you reach 10 poses or you fail a pose
};

/**
 * REDUCER
 */
export default function(state = defaultGame, action) {
  switch (action.type) {
    case START_GAME: //starts game or starts checking for next pose
      return { ...state, countdown: true };
    case DISABLE_COUNTDOWN:
      if (!state.poseSuccess && state.countdown && state.roundInProgress) {
        return { ...state, countdown: false, roundInProgress: false };
      }
      return { ...state, countdown: false };
    // eslint-disable-next-line no-case-declarations
    case END_OF_ROUND:
      return { ...state, roundInProgress: false, countdown: false };
    case NEXT_POSE_TO_DO:
      const nextPoseIdx = state.currentPoseSequenceIdx + 1;
      return {
        ...state,
        poseName: state.poseSequence[nextPoseIdx],
        currentPoseSequenceIdx: nextPoseIdx,
        poseSuccess: false,
        countdown: true
      };
    case SUCCESS:
      return {
        ...state,
        poseSuccess: true,
        countdown: false
      };
    case RESET_POSE_SUCCESS:
      return { ...state, poseSuccess: false };
    case END_GAME:
      return { ...state, gameOver: true };
    case END_FIRST_TIMER:
      return { ...state, firstTimer: false };
    case HIGHLIGHT_POSE:
      return {
        ...state,
        poseBeingHighlighted: action.pose,
        roundInProgress: true
      };
    // eslint-disable-next-line no-case-declarations
    case UPDATE_SEQUENCE:
      const newPose = _getRandomPose();
      const newPoseSequence = [...state.poseSequence, newPose];
      return {
        ...state,
        poseSequence: newPoseSequence,
        gameRound: state.gameRound + 1,
        // countdown: false, // removing because countdown should be false before updateSequence
        currentPoseSequenceIdx: 0,
        poseName: newPoseSequence[0],
        poseSuccess: false,
        roundInProgress: true
      };
    default:
      return state;
  }
}
