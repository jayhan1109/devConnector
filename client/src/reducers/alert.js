import uuid from "uuid";

const SET_ALERT = "alert/SET_ALERT";
const REMOVE_ALERT = "alert/REMOVE_ALERT";

export const setAlert = (msg, alertType,time) => dispatch => {
  const id = uuid.v4();
  dispatch({
    type: SET_ALERT,
    payload: {
      msg,
      alertType,
      id
    }
  });

  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), time);
};

export const removeAlert = () => ({ type: REMOVE_ALERT });

const initialState = [];

export default function alert(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_ALERT:
      return [...state, payload];
    case REMOVE_ALERT:
      return state.filter(alert => alert.id !== payload);
    default:
      return state;
  }
}
