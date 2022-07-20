import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { actionLogin, storageName } from "../../store/restaurant-store";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

const OrderCard = (prop) => {
  const {  nome, prezzo, descrizione, quantita } = prop.item;
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: actionLogin.UPDATE_COUNT });
  }, []);

  //update total value
  const updateTotal = (price, action) => {
    if (action === "add") {
      const total = parseInt(sessionStorage.getItem(storageName.TOTAL)) + price;
      sessionStorage.setItem(storageName.TOTAL, total);
    } else {
      const total = parseInt(sessionStorage.getItem(storageName.TOTAL)) - price;
      sessionStorage.setItem(storageName.TOTAL, total);
    }
  };

  // we andle the addition of quantity on this item inside cart
  const addPortionHandler = () => {
    const cartList = JSON.parse(
      "[" + sessionStorage.getItem(storageName.CART) + "]"
    );
    const index = cartList.findIndex((item) => item.nome === nome);
    cartList[index].quantita++;// we find the index and encrease it by one
    if (cartList[index].quantita > 20) {// If the quantity is greater than 20 we show an error
      setError(true);
    } else {// if not we update the cart
      updateTotal(prezzo, "add");
      sessionStorage.setItem(
        storageName.CART,
        JSON.stringify(cartList).replace("[", "").replace("]", "")
      );
      dispatch({ type: actionLogin.ADD });
    }
    dispatch({ type: actionLogin.UPDATE_COUNT });
    dispatch({ type: actionLogin.UPDATE_CART });
  };

  // we andle the subtraction of quantity on this item inside cart
  const removePortionHandler = () => {
    setError(false);
    let cartList = JSON.parse(
      "[" + sessionStorage.getItem(storageName.CART) + "]"
    );
    const index = cartList.findIndex((item) => item.nome === nome);
    console.log(index);
    dispatch({ type: actionLogin.REMOVE });
    if (sessionStorage.getItem(storageName.COUNT) == 0) {// if the count is 0 we remove the cart and total is 0
      console.log("cart vuoto, lo elimino");
      sessionStorage.removeItem(storageName.CART);
      updateTotal(prezzo, "remove");
      dispatch({ type: actionLogin.UPDATE_COUNT });
    } else {// if not we update the quantity
      console.log("diminuisco quantità");
      cartList[index].quantita--;
      updateTotal(prezzo, "remove");
      if (cartList[index].quantita === 0) { // if the quantity is 0 we remove the item from the cart
        console.log("quantità 0, lo elimino dal carrello");
        cartList = cartList.filter((item) => item.nome !== nome);
        console.log("old cart List: " + JSON.stringify(cartList));
        sessionStorage.setItem(storageName.CART, JSON.stringify(cartList).replace("[", "").replace("]", ""));
        dispatch({ type: actionLogin.UPDATE_COUNT });
        dispatch({ type: actionLogin.UPDATE_CART });
      } else {// if not we update the cart with new value
        sessionStorage.setItem(
          storageName.CART,
          JSON.stringify(cartList).replace("[", "").replace("]", "")
        );
        dispatch({ type: actionLogin.UPDATE_COUNT });
        dispatch({ type: actionLogin.UPDATE_CART });
      }
    }
  };

  return (
    <>
      <div className="p-3">
        <Card border="warning" text="dark">
          <Card.Body>
            <Card.Title>{nome}</Card.Title>
            <Card.Text>
              {descrizione} -<strong> Piatti ordinati: {quantita}</strong>
            </Card.Text>
            <Card.Text>
              <Button variant="success" onClick={addPortionHandler}>
                AGGIUNGI PORIZONE
              </Button>{" "}
              <Button variant="danger" onClick={removePortionHandler}>
                RIMUOVI PORZIONE
              </Button>{" "}
              {error && (
                    <div className="alert alert-danger" role="alert">
                      Non puoi ordinare più di 20 porizoni
                    </div>
                  )}
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default OrderCard;
