import { useEffect, useState } from "react";
import useFirebase from "../../../connection/useFirebase";
import Card from "react-bootstrap/Card";
import HistoryCard from "./HistoryCard";

const History = () => {
  const { readFirebase, isLoading } = useFirebase();
  const [confirmedList, setConfirmedList] = useState([]);

  useEffect(() => {
    //we get orders from firebase when the component is mounted
    getOrders();
  }, []);

  const getOrders = async () => {
    const firebaseURLProduct =
      "{your db path}/orders.json";
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
    setConfirmedList(response.filter((order) => order.confirm === true));
  };
  return (
    <>
      <div className="text-center">
        <h1>CRONOLOGIA ORDINI DEI CLIENTI</h1>
      </div>
      {confirmedList.length === 0 && (
        <div className="text-center">NON CI SONO ANCORA ORDINI</div>
      )}
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
    {confirmedList.map ((order, key) => <>
    <HistoryCard key={key} order={order} />
    <br></br></>)}
    </div>
    </>}

    </>
  );
};

export default History;
