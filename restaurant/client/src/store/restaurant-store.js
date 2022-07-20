
import { legacy_createStore } from "redux";
//storage name i used
export const storageName = {
  USER: "USER",
  USER_INFO: "USER_INFO",
  ERROR_MSG: "ERROR_MSG",
  DETAILS: "DETAILS",
  COUNT: "COUNT",
  CART: "CART",
  TOTAL: "TOTAL",
  ADMIN: "ADMIN",
};

//action of dispatchers
export const actionLogin = {
  LOGIN: "LOGIN",
  ADMIN_LOGGED:"ADMIN_LOGGED",
  LOGOUT: "LOGOUT",
  START: "START",
  UPDATE: "UPDATE",
  ERROR: "ERROR",
  ADD: "ADD",
  REMOVE: "REMOVE",
  UPDATE_COUNT: "UPDATE_COUNT",
  UPDATE_CART: "UPDATE_CART",
};
//reducer with all componets
const restaurantReducer = (
  state = {
    loggedIn: false,
    admingLoggedIn: false,
    errorMsg: "",
    userName: "",
    count: 0,
    cartList: [],
    total:0,
  },
  action
) => {
  //all action of update
  switch (action.type) {
    case actionLogin.LOGIN:
      sessionStorage.setItem(storageName.USER, true);
      const userInfo = sessionStorage.getItem(storageName.USER_INFO);
      const nome = JSON.parse(userInfo).nome;
      return {
        ...state,
        userName: nome,
        loggedIn: sessionStorage.getItem(storageName.USER),
      };
      case actionLogin.ADMIN_LOGGED:
      sessionStorage.setItem(storageName.ADMIN, true);
      const adminInfo = sessionStorage.getItem(storageName.USER_INFO);
      const nomeAdmin = JSON.parse(adminInfo).nome;
      return {
        ...state,
        userName: nomeAdmin,
        loggedIn: sessionStorage.getItem(storageName.USER),
        admingLoggedIn: sessionStorage.getItem(storageName.ADMIN),
      };
    case actionLogin.LOGOUT:
      sessionStorage.removeItem(storageName.USER_INFO);
      sessionStorage.removeItem(storageName.USER);
      sessionStorage.removeItem(storageName.DETAILS);
      sessionStorage.removeItem(storageName.COUNT);
      sessionStorage.removeItem(storageName.CART);
      sessionStorage.removeItem(storageName.TOTAL);
      sessionStorage.removeItem(storageName.ADMIN);
      return {
        ...state,
        loggedIn: sessionStorage.getItem(storageName.USER),
        admingLoggedIn: sessionStorage.getItem(storageName.ADMIN),
      };
    case actionLogin.START:
      let nomeStart = "";
      if (!sessionStorage.getItem(storageName.USER_INFO)) {
        sessionStorage.setItem(storageName.USER_INFO, "");
      } else {
        const userInfoStart = sessionStorage.getItem(storageName.USER_INFO);
        nomeStart = JSON.parse(userInfoStart).nome;
      }
      return {
        ...state,
        userName: nomeStart,
        loggedIn: sessionStorage.getItem(storageName.USER),
        admingLoggedIn: sessionStorage.getItem(storageName.ADMIN),
      };
    case actionLogin.UPDATE:
      return {
        ...state,
        loggedIn: sessionStorage.getItem(storageName.USER),
        admingLoggedIn: sessionStorage.getItem(storageName.ADMIN),
      };
    case actionLogin.ERROR:
      return {
        ...state,
        errorMsg: sessionStorage.getItem(storageName.ERROR_MSG),
      };
    case actionLogin.ADD:
      if (!sessionStorage.getItem(storageName.COUNT)) {
        sessionStorage.setItem(storageName.COUNT, 1);
      } else {
        const count = sessionStorage.getItem(storageName.COUNT);
        sessionStorage.setItem(storageName.COUNT, parseInt(count) + 1);
      }
      return {
        ...state,
        count: sessionStorage.getItem(storageName.COUNT),
        cartList: JSON.parse("["+sessionStorage.getItem(storageName.CART)+"]"),
        total: sessionStorage.getItem(storageName.TOTAL),
      };
      case actionLogin.REMOVE:
        const count = sessionStorage.getItem(storageName.COUNT);
        sessionStorage.setItem(storageName.COUNT, parseInt(count) - 1);
      return {
        ...state,
        count: sessionStorage.getItem(storageName.COUNT),
        cartList: JSON.parse("["+sessionStorage.getItem(storageName.CART)+"]"),
        total: sessionStorage.getItem(storageName.TOTAL),
      };
    case actionLogin.UPDATE_COUNT:
      if (!sessionStorage.getItem(storageName.COUNT)) {
        sessionStorage.setItem(storageName.COUNT, 0);
      }
      return {
        ...state,
        count: sessionStorage.getItem(storageName.COUNT),
      };
      case actionLogin.UPDATE_CART:
      if (!sessionStorage.getItem(storageName.CART)) {
        //console.log("store cart update, cart empty");
        sessionStorage.setItem(storageName.CART, []);
        sessionStorage.setItem(storageName.TOTAL, 0);
      }else{
        //console.log("store cart update, cart exist");
      }
      return {
        ...state,
        cartList: JSON.parse("["+sessionStorage.getItem(storageName.CART)+"]"),
        total: sessionStorage.getItem(storageName.TOTAL),
      };
    default:
      return state;
  }
};

const restaurantStore = legacy_createStore(restaurantReducer);
export default restaurantStore;