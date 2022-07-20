
import { actionLogin, storageName} from "../../store/restaurant-store";
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import useFirebase from "../../connection/useFirebase";
import Card from 'react-bootstrap/Card';
import { useDispatch } from "react-redux";


const Pay = () => {

    //const [time, setTime] = useState(0);
    const [paymentDone, setPaymentDone] = useState(false);
    const { readFirebase, isLoading } = useFirebase();
    const firebaseURLOrder = "{your db path}/orders.json"
    const dispatch = useDispatch();

    //send order to db with client info, his cart, and confirmed false
    const payment = async () => {
        setPaymentDone(true);
        const cart = JSON.parse("["+sessionStorage.getItem(storageName.CART)+"]");
        const client = JSON.parse(sessionStorage.getItem(storageName.USER_INFO));
        const order = {
            client: client,
            cart: cart,
            confirm:false,
        }
        const response = await readFirebase(firebaseURLOrder, {
            method: "POST",
            body: JSON.stringify(order),
          });
          //remove cart from session
          sessionStorage.removeItem(storageName.CART);
          sessionStorage.removeItem(storageName.COUNT);
          sessionStorage.removeItem(storageName.TOTAL);
          dispatch({ type: actionLogin.UPDATE_COUNT });
    }

    return <>
    <div className="text-center"> <h1>PAGAMENTO</h1></div><br></br>
    {paymentDone ? <>
        { isLoading ? <>
            <div className="text-center p-3" ><div className="loagin1"><div className="text center"><Card.Img className="loading" src="https://i.pinimg.com/originals/8e/be/2a/8ebe2a4ffd8621a04b333b9f4bc306be.gif" /> </div></div></div>
        </>:
        <p className="fs-4 text-center">Ordine inviato al ristorante, riceverai una mail di conferma</p>}
     </> 
    :
    <div className="text-center">
        <p className="fs-4">Stai per confermare l'ordine e pagare. Controlla e accetta il totale</p>
        <p className="fs-4">Totale: {sessionStorage.getItem(storageName.TOTAL)}€</p><Button onClick={payment} variant="success">ORDINA E PAGA</Button >{' '}
    </div>}
    </>
}

export default Pay;