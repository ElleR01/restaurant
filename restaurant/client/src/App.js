import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import NavbarRestaurant from "./component/navbar/NavbarRestaurant";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./component/home/Home";
import Menu from "./component/menu/Menu";
import Orders from "./component/orders/Orders";
import Login from "./component/login/Login";
import Signin from "./component/signin/Signin";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionLogin } from "./store/restaurant-store";
import Pay from "./component/payment/Pay";
import ClientOrders from "./component/admin/clientOrders/ClientOrders";
import History from "./component/admin/history/History";

function App() {
  const loggedIn = useSelector((state) => state.loggedIn);
  const admingLoggedIn = useSelector((state) => state.admingLoggedIn);
  const dispatch = useDispatch();
  let mybutton = document.getElementById("btn-back-to-top");

  //when the user scrolls down, show the button
  window.onscroll = function () {
    scrollFunction();
  };
  useEffect(() => {
    dispatch({ type: actionLogin.START });
    dispatch({ type: actionLogin.UPDATE_COUNT });
  }, []);

  function scrollFunction() {
    //if the user scrolls down 100px from the top of the document, show the button
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      mybutton.style.display = "block";
    } else {
      mybutton.style.display = "none";
    }
  }

  //when the user clicks on the button, scroll to the top of the document
  function backToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  return (
    <>
      <NavbarRestaurant />
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        {loggedIn && (
          <>
            <Route path="/orders" element={<Orders />} />
            <Route path="/pay" element={<Pay />} />
          </>
        )}
        {admingLoggedIn && (
          <>
            <Route path="/clientOrders" element={<ClientOrders />} />
            <Route path="/history" element={<History />} />
          </>
        )}
        {!loggedIn && (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/signin" element={<Signin />} />
          </>
        )}
      </Routes>
      <button
        type="button"
        class="btn btn-warning  btn-lg rounded-pill"
        id="btn-back-to-top"
        onClick={backToTop}
      >
        <i>&#8593;</i>
      </button>
    </>
  );
}

export default App;
