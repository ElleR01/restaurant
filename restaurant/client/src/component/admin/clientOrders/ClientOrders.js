import { useEffect, useState } from "react";
import useFirebase from "../../../connection/useFirebase";
import Card from "react-bootstrap/Card";
import OrderCard from "./OrderCard";

const ClientOrders = () => {

    const { readFirebase, isLoading } = useFirebase();
    const [toConfirmList, setToConfirmList] = useState([])

    useEffect( () => {
      //we get orders from firebase when the component is mounted
        getOrders();
    }, [])

    const getOrders= async () => {
      //url where my orders are inside my db
        const firebaseURLProduct =
      "{your path of your db}/orders.json";
    const listUsers = await readFirebase(firebaseURLProduct);
    const response = [];
    for (const key in listUsers) {
      response.push({
        key: key,
        cart: listUsers[key].cart,
        client: listUsers[key].client,
        confirm: listUsers[key].confirm,
      });
    }
    //we put the response in an array and we show the confirmed orders
    setToConfirmList(response.filter(order => order.confirm === false));
    }

    return <>
    <div className="text-center"><h1>ORDINI DEI CLIENTI</h1></div>
    {toConfirmList.length === 0 && !isLoading && <div className="text-center">NON CI SONO ANCORA ORDINI</div>}
    {isLoading ? <>
        <div className="text-center p-3">
            <div className="loagin1">
              <div className="text center">
                <Card.Img
                  className="loading"
                  src="https://i.pinimg.com/originals/8e/be/2a/8ebe2a4ffd8621a04b333b9f4bc306be.gif"
                />{" "}
              </div>
            </div>
          </div>
    </>:
    <>
    <div className="p-3">
    {toConfirmList.map ((order, key) => 

    <OrderCard key={key} order={order} />)}
    </div>
    </>}
    
    </>
}

export default ClientOrders;