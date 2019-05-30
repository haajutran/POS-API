import * as dataServices from "../services/DataServices";
import * as qwest from "qwest";
import axios from "axios";
const requestDefRVCListType = "REQUEST_DEFRPVLIST";
const receiveDefRVCListType = "RECEIVE_DEFRPVLIST";

const initialState = { isLoading: false, defRVCList: "" };

export const actionCreators = {
  requestDefRVCList: () => async dispatch => {
    dispatch({ type: requestDefRVCListType });
    // const res = await dataServices.get("api/DefRVCList/GetDefRVCLists");
    qwest.setDefaultOptions({
      responseType: "json",
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Credentials": "true"
      }
    });
    qwest
      .get("http://180.148.1.165/POS/api/DefRVCList/GetDefRVCLists")
      .then(function(values) {
        /*
            Prints [ [xhr, response], [xhr, response], [xhr, response] ]
        */
        console.log(values);
      })
      .catch(function(e, xhr, response) {
        console.log(response);
      });
    // axios
    //   .get("http://180.148.1.165/POS/api/DefRVCList/GetDefRVCLists", {
    //     headers: {
    //       "Access-Control-Allow-Origin": "*",
    //       Access: "application/json"
    //     }
    //   })
    //   .then(res => console.log(res))
    //   .catch(function(error) {
    //     console.log(error);
    //   });

    // qwest.get();

    // headers: {
    //   'Access-Control-Allow-Origin': '*',
    //   'Content-Type': 'application/json',
    // },

    // fetch("https://jsonplaceholder.typicode.com/todos/1").then(res =>
    //   console.log(res)
    // );
    // console.log(aaa);
    // dispatch({ type: receiveDefRVCListType, defRVCList: res[0] });
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
