import * as dataServices from "../services/DataServices";
const requestDefRVCListType = "REQUEST_DEFRPVLIST";
const receiveDefRVCListType = "RECEIVE_DEFRPVLIST";

const initialState = { isLoading: false, defRVCList: "" };

export const actionCreators = {
  requestDefRVCList: () => async dispatch => {
    try {
      dispatch({ type: requestDefRVCListType });
      const res = await dataServices.get("api/Login/GetDefRVCLists");
      console.log(res);
      if (res.status === 200) {
        dispatch({ type: receiveDefRVCListType, defRVCList: res.data });
      }
    } catch (e) {
      console.log(e);
    }
  },
  login: data => async () => {
    // console.log(data);
    const res = await dataServices.get(
      `api/Login/GetUserName?RVCNo=${data.rvcNo}&Password=${data.password}`
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
