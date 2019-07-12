import * as dataServices from "../services/DataServices";

const requestMenusType = "REQUEST_MENUS";
const receiveMenusType = "RECEIVE_MENUS";

const requestMainMenusType = "REQUEST_MAIN_MENUS";
const receiveMainMenusType = "RECEIVE_MAIN_MENUS";

const requestCourseType = "REQUEST_COURSE";
const receiveCourseType = "RECEIVE_COURSE";

const initialState = {
  isLoading: false,
  menus: [],
  mainMenus: [],
  course: []
};

export const actionCreators = {
  requestMenus: menuNo => async dispatch => {
    try {
      dispatch({ type: requestMenusType });
      const rvcNo = sessionStorage.getItem("rvcNo");
      var res;
      var menus = [];
      var mainMenus = [];
      if (menuNo === 0) {
        res = await dataServices.get(`api/Order/GetMenu?RVCNo=${rvcNo}`);
        menus = res.data;
      } else {
        res = await dataServices.get(
          `api/Order/GetMenu?RVCNo=${rvcNo}&sMenuID=${menuNo}`
        );
        const menusTemp = res.data;
        console.log(menusTemp);
        if (menusTemp[0].dataReturn === "ITEM") {
          const res2 = await dataServices.get(
            `api/Order/GetItemByMenu?RVCNo=${rvcNo}&sMenuID=${menuNo}&MyPeriod=1`
          );
          if (res2.status === 200) {
            menus = [];
            mainMenus = res2.data;
          }
        } else {
          menus = menusTemp;
        }
      }

      if (res.status === 200) {
        dispatch({ type: receiveMenusType, menus, mainMenus });
      }
    } catch (e) {
      console.log(e.message);
      dispatch({ type: receiveMenusType, menus: [], mainMenus: [] });
    }
  },
  requestCourse: () => async dispatch => {
    try {
      dispatch({ type: requestCourseType });
      const res = await dataServices.get(`api/Order/GetCourse`);
      if (res.status === 200) {
        dispatch({ type: receiveCourseType, course: res.data });
      }
    } catch (e) {
      console.log(e.message);
      dispatch({ type: receiveCourseType, course: [] });
    }
  },
  getTableDetail: checkNo => async (dispatch, getState) => {
    try {
      // console.log(getState());
      const rvcNo = sessionStorage.getItem("rvcNo");
      const posUser = sessionStorage.getItem("posUser");
      const getDetailRes = await dataServices.get(
        `api/Order/GetInfoCheckNo?CheckNo=${checkNo}&RVCNo=${rvcNo}&UserLogin=${posUser}&WSID=hau`
      );
      if (getDetailRes.status === 200) {
        return getDetailRes.data[0];
      }
    } catch (e) {
      console.log(e.message);
    }
  }
};

export const reducer = (state, action) => {
  state = state || initialState;

  if (action.type === requestMenusType) {
    return {
      ...state,
      isLoading: true
    };
  }

  if (action.type === receiveMenusType) {
    return {
      ...state,
      menus: action.menus,
      mainMenus: action.mainMenus,
      isLoading: false
    };
  }

  if (action.type === requestCourseType) {
    return {
      ...state,
      isLoading: true
    };
  }

  if (action.type === receiveCourseType) {
    return {
      ...state,
      course: action.course,
      isLoading: false
    };
  }
  return state;
};
