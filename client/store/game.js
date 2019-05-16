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

/**
 * ACTION CREATORS
 */
const nextPoseToDo = pose => ({
  //pose must be a string
  type: NEXT_POSE_TO_DO,
  pose
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

const endFirstTimer = () => ({
  type: END_FIRST_TIMER
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

export const poseToDo = pose => {
  return dispatch => {
    dispatch(nextPoseToDo(pose));
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

/**
 * INITIAL STATE
 */
const defaultGame = {
  poses: ["TreePose", "GarlandPose", "MountainPose", "ShivaTwist"],
  countdown: false,
  gameRound: 0,
  poseSequence: [],
  poseSuccess: false, //did they succeed to do the current pose
  poseName: "",
  firstTimer: true,
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
      return { ...state, countdown: false };
    case NEXT_POSE_TO_DO:
      return { ...state, poseName: action.pose };
    case SUCCESS:
      return { ...state, poseSuccess: true };
    case RESET_POSE_SUCCESS:
      return { ...state, poseSuccess: false };
    case END_GAME:
      return { ...state, gameOver: true };
    case END_FIRST_TIMER:
      return { ...state, firstTimer: false };
    case UPDATE_SEQUENCE:
      return {
        ...state,
        poseSequence: [...state.poseSequence, _getRandomPose()],
        gameRound: state.gameRound + 1
      };
    default:
      return state;
  }
}
