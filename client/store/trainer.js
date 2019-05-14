const GET_RESULT = "GET_RESULT";

export const gotResult = (result, score) => ({
  type: GET_RESULT,
  result,
  score
});

let initialState = {
  pose: "",
  score: 0
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_RESULT:
      return { pose: action.result, score: action.score };
    default:
      return state;
  }
}
