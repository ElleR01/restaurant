import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import OrderCard from './OrderCard';
import { actionLogin, storageName } from "../../store/restaurant-store";
import Button from "react-bootstrap/Button";

const Orders = () => {
    const dispatch = useDispatch();
    const cartList = useSelector(state => state.cartList);
    const total = useSelector(state => state.total);
    const count = useSelector(state => state.count);
    const navigate = useNavigate();

    const goToMenuHandler= () => {
        navigate("/menu");
    }

    //we remove the cart and count
    const emptyCartHandler = () => {
        sessionStorage.removeItem(storageName.CART);
        sessionStorage.removeItem(storageName.COUNT);
        dispatch({ type: actionLogin.UPDATE_COUNT });
        dispatch({ type: actionLogin.UPDATE_CART });
    }

    const goToPay= () => {
        navigate("/pay");
    }

    useEffect( ()=>{
        dispatch({ type: actionLogin.UPDATE_COUNT });
        dispatch({ type: actionLogin.UPDATE_CART });
    }, []);

    return (
        <>
        <div className="text-center"><h1>I TUOI ORDINI</h1></div>
        
        {count>0 ? <>
            <div className="text-center">
        <Button variant="outline-success" onClick={emptyCartHandler}>
                SVUOTA
              </Button>{" "}
              <Button variant="outline-danger" onClick={goToPay}>
                ORDINA E PAGA: {total} €
              </Button>{" "}</div>
            {cartList.map(
            (item, index) => <OrderCard  key={index} item={item} />
       )}
        </>
        :
        <>
        <div className="text-center"><br></br> <p className="fs-4">Il carrello è vuoto! Inizia ad ingrassare!</p>
        <p><a onClick={goToMenuHandler} className=" fs-5"> {'  '}<strong>VAI AL MENU'</strong> </a></p>
        </div>
        </>}
        </>
    );
}

export default Orders;