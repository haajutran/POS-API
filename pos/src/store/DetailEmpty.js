import * as dataServices from "../services/DataServices";

// const requestNotiCashierType = "REQUEST_NOTI_CASHIERS";
// const receiveNotiCashierType = "RECEIVE_NOTI_CASHIERS";

const initialState = {
  isLoading: false
};

export const actionCreators = {
  getMealPeriod: () => async dispatch => {
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
  }
};

export const reducer = (state, action) => {
  state = state || initialState;

  //   if (action.type === requestNotiCashierType) {
  //     return {
  //       ...state,
  //       isLoading: true
  //     };
  //   }

  //   if (action.type === receiveNotiCashierType) {
  //     return {
  //       ...state,
  //       notiCashier: action.notiCashier,
  //       isLoading: false
  //     };
  //   }

  return state;
};
