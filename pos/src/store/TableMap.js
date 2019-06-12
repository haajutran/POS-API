import * as dataServices from "../services/DataServices";

const requestTableTypesType = "REQUEST_TABLE_TYPES";
const receiveTableTypesType = "RECEIVE_TABLE_TYPES";

const requestTableAreasType = "REQUEST_TABLE_AREAS";
const receiveTableAreasType = "RECEIVE_TABLE_AREAS";

const initialState = { isLoading: false, tableTypes: [], tableAreas: [] };

export const actionCreators = {
  requestTableTypes: () => async dispatch => {
    try {
      dispatch({ type: requestTableTypesType });
      const ttsRes = await dataServices.get("api/GetTableMap/GetTableType");
      if (ttsRes.status === 200) {
        dispatch({ type: receiveTableTypesType, tableTypes: ttsRes.data });
      }
    } catch (e) {
      dispatch({ type: receiveTableTypesType, tableTypes: [] });
    }
  },
  requestTableAreas: () => async dispatch => {
    try {
      dispatch({ type: requestTableAreasType });
      const tasRes = await dataServices.get(
        "api/GetTableMap/GetTableAreas?RVCNo=33"
      );
      if (tasRes.status === 200) {
        for (var ta of tasRes.data) {
          var tmTemp = [];
          const tmsRes = await dataServices.get(
            `api/GetTableMap/GetTableMap?RVCNo=33&TableArea=${ta.tableArea1}`
          );
          if (tmsRes.status === 200) {
            tmTemp = tmsRes.data;
          }
          ta["tableMaps"] = tmTemp;
          // console.log(tms);
        }
        console.log(tasRes.data);

        dispatch({ type: receiveTableAreasType, tableAreas: tasRes.data });
      }
    } catch (e) {
      console.log(e);
      dispatch({ type: receiveTableAreasType, tableAreas: [] });
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

  if (action.type === requestTableTypesType) {
    return {
      ...state,
      isLoading: true
    };
  }

  if (action.type === receiveTableTypesType) {
    return {
      ...state,
      tableTypes: action.tableTypes,
      isLoading: false
    };
  }

  return state;
};
