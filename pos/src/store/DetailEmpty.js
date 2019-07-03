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
  getTmpID: () => async () => {
    try {
      const tmpID = await dataServices.get(`api/TableInfo/GetTmpIDTableJoin`);

      if (tmpID.status === 200) {
        return tmpID.data[0].tmpIDTableJoin;
      }
    } catch (e) {
      console.log(e.message);
    }
  },
  addTablesJoin: (tmpIDTableJoin, tableMain, joined) => async () => {
    try {
      const posDate = new Date(sessionStorage.getItem("posDate"));
      const posDay = posDate.getDay();
      const posMonth = posDate.getMonth();
      const posYear = posDate.getFullYear();
      for (var i = 0; i < joined.length; i++) {
        // const table = {
        //   RVCNo: parseInt(sessionStorage.getItem("rvcNo")),
        //   UserLogin: sessionStorage.getItem("posUser"),
        //   TableMain: tableMain,
        //   TableJoin: joined[i],
        //   TmpIDTableJoin: parseFloat(tmpIDTableJoin),
        //   POSDay: posDay,
        //   POSMonth: posMonth,
        //   POSYear: posYear
        // };
        const rvcNo = parseInt(sessionStorage.getItem("rvcNo"));
        const params = `?RVCNo=${rvcNo}&UserLogin=${sessionStorage.getItem(
          "posUser"
        )}&TableMain=${tableMain}&TableJoin=${
          joined[i]
        }&TmpIDTableJoin=${parseFloat(
          tmpIDTableJoin
        )}&POSDay=${posDay}&POSMonth=${posMonth}&POSYear=${posYear}`;
        // console.log(table);
        const res = await dataServices.post(
          "api/TableInfo/AddTableJoin" + params
        );
        console.log(res);
      }
      return 200;
    } catch (e) {
      console.log(e.message);
    }
  },
  deleteTableJoin: tableCode => async () => {
    try {
      const rvcNo = sessionStorage.getItem("rvcNo");
      const res = await dataServices.get(
        `api/TableInfo/DeleteTableJoin?rvcNo=${rvcNo}&tableCode=${tableCode}`
      );

      return res.status;
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
