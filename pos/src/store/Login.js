import * as dataServices from "../services/DataServices";
const requestDefRVCListType = "REQUEST_DEFRPVLIST";
const receiveDefRVCListType = "RECEIVE_DEFRPVLIST";

const initialState = { isLoading: false, defRVCList: "" };

export const actionCreators = {
  requestDefRVCList: () => async dispatch => {
    dispatch({ type: requestDefRVCListType });
    const res = await dataServices.get("api/DefRVCList/GetDefRVCLists");
    if (res.status === 200) {
      // var list = JSON.stringify(res.data[0])
      //   .toString()
      //   .replace("{", "")
      //   .replace("}", "")
      //   .split(",");
      // var aaa = [];
      // list.map(item => {
      //   console.log(item);
      // });
      // var obj = JSON.parse("[" + list + "]");

      // console.log(list);
      dispatch({ type: receiveDefRVCListType, defRVCList: res.data[0] });
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
