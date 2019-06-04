import * as dataServices from "../services/DataServices";
const requestDefRVCListType = "REQUEST_DEFRPVLIST";
const receiveDefRVCListType = "RECEIVE_DEFRPVLIST";

const initialState = { isLoading: false, defRVCList: "" };

export const actionCreators = {
  requestDefRVCList: () => async dispatch => {
    dispatch({ type: requestDefRVCListType });
    const res = await dataServices.get("api/DefRVCList/GetDefRVCLists");
    if (res.status === 200) {
      dispatch({ type: receiveDefRVCListType, defRVCList: res.data });
    }
  },
  login: data => async () => {
    // console.log(data);
    const res = await dataServices.get(
      `api/LoginPOS/GetUserName?RVCNo=${data.rvcNo}&Password=${data.password}`
    );
    if (res.status === 200) {
      return res.data[0];
    }
  }
};

export const reducer = (state, action) => {
  state = state || initialState;

  if (action.type === requestDefRVCListType) {
    return {
      ...state,
      isLoading: true
    };
  }

  if (action.type === receiveDefRVCListType) {
    return {
      ...state,
      defRVCList: action.defRVCList,
      isLoading: false
    };
  }

  return state;
};
