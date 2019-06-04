import * as dataServices from "../services/DataServices";

const requestTableAreasType = "REQUEST_DEFRPVLIST";
const receiveTableAreasType = "RECEIVE_DEFRPVLIST";

const initialState = { isLoading: false, tableAreas: "" };

export const actionCreators = {
  requestTableAreas: () => async dispatch => {
    dispatch({ type: requestTableAreasType });
    const tasRes = await dataServices.get(
      "api/TableArea/GetTableAreas?RVCNo=33"
    );
    if (tasRes.status === 200) {
      for (var ta of tasRes.data) {
        var tmTemp = [];
        const tmsRes = await dataServices.get(
          `api/TableMap/GetTableMap?RVCNo=33&TableArea=${ta.tableArea1}`
        );
        if (tmsRes.status === 200) {
          tmTemp = tmsRes.data;
        }
        ta["tableMaps"] = tmTemp;
        // console.log(tms);
      }
      // tas.data.forEach(ta => {

      //   const tms = await dataServices.get(
      //     `api/TableMap/GetTableMap?RVCNo=33&TableArea=${ta.tableArea1}`
      //   );
      //   console.log(tms);
      // });
      console.log(tasRes.data);
      dispatch({ type: receiveTableAreasType, tableAreas: tasRes.data });
    }
  }
};

export const reducer = (state, action) => {
  state = state || initialState;

  if (action.type === requestTableAreasType) {
    return {
      ...state,
      isLoading: true
    };
  }

  if (action.type === receiveTableAreasType) {
    return {
      ...state,
      tableAreas: action.tableAreas,
      isLoading: false
    };
  }

  return state;
};
