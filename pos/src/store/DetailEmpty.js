import * as dataServices from "../services/DataServices";

const requestClientListType = "REQUEST_CLIENT_LIST";
const receiveClientListType = "RECEIVE_CLIENT_LIST";

const initialState = {
  isLoading: false,
  clientList: []
};

export const actionCreators = {
  getMealPeriod: () => async () => {
    try {
      const rvcNo = sessionStorage.getItem("rvcNo");
      const res = await dataServices.get(
        `api/TableInfo/GetMealPeriod?RVCNo=${rvcNo}`
      );
      if (res.status === 200) {
        return res.data;
      }
    } catch (e) {
      console.log(e.message);
    }
  },
  getUserDefineDef: () => async () => {
    try {
      const res = await dataServices.get(`api/TableInfo/GetUserDefineDef`);
      console.log(res);
      if (res.status === 200) {
        return res.data;
      }
    } catch (e) {
      console.log(e.message);
    }
  },
  getStatistic: length => async () => {
    try {
      var statistic = [];
      for (var i = 1; i <= length; i++) {
        const s = await dataServices.get(`api/TableInfo/GetStatistic${i}`);
        statistic.push(s.data);
      }
      return statistic;
    } catch (e) {
      console.log(e.message);
    }
  },
  requestClientList: ClientInfo => async dispatch => {
    try {
      dispatch({ type: requestClientListType });
      const res = await dataServices.get(
        `api/TableInfo/GetListClient?ClientInfo=${ClientInfo}`
      );
      if (res.status === 200) {
        dispatch({ type: receiveClientListType, clientList: res.data });
      }
    } catch (e) {
      console.log(e.message);
      dispatch({ type: receiveClientListType, clientList: [] });
    }
  }
};

export const reducer = (state, action) => {
  state = state || initialState;

  if (action.type === requestClientListType) {
    return {
      ...state,
      isLoading: true
    };
  }

  if (action.type === receiveClientListType) {
    return {
      ...state,
      clientList: action.clientList,
      isLoading: false
    };
  }

  return state;
};
