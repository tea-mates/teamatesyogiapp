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
  firstTimer: true,
  countdown: false,
  gameRound: 0,
  poseBeingHighlighted: "default",
  poseSequence: [],
  currentPoseSequenceIdx: -1, //the index of the current pose within a game round
  poseSuccess: false, //did they succeed to do the current pose
  poseName: "",
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
      return {
        ...state,
        poseName: action.pose,
        currentPoseSequenceIdx: state.currentPoseSequenceIdx + 1
      };
    case SUCCESS:
      return { ...state, poseSuccess: true };
    case RESET_POSE_SUCCESS:
      return { ...state, poseSuccess: false };
    case END_GAME:
      return { ...state, gameOver: true };
    case END_FIRST_TIMER:
      return { ...state, firstTimer: false };
    case HIGHLIGHT_POSE:
      return { ...state, poseBeingHighlighted: action.pose };
    // eslint-disable-next-line no-case-declarations
    case UPDATE_SEQUENCE:
      const newPose = _getRandomPose();
      return {
        ...state,
        poseSequence: [...state.poseSequence, newPose],
        gameRound: state.gameRound + 1,
        currentPoseSequenceIdx: 0,
        poseName: newPose
      };
    default:
      return state;
  }
}
