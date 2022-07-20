import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { actionLogin, storageName } from "../../store/restaurant-store";

const ModalCard = (props) => {
  const { nome, prezzo, descrizione } = props.item;
  const [quantity, setQuantity] = useState(0);
  const [error, setError] = useState(false);
  const [msgError, setMsgError] = useState("");
  const dispatch = useDispatch();

    //update total value
    const updateTotal = (price, action) => {
      if (action === "add") {
        if (!sessionStorage.getItem(storageName.TOTAL)) {
          sessionStorage.setItem(storageName.TOTAL, price * quantity);
        } else {
          const total =
            parseInt(sessionStorage.getItem(storageName.TOTAL)) + price * quantity;
          sessionStorage.setItem(storageName.TOTAL, total);
        }
      }
    };

    // we handle the add inside cart
  const addToCartHandler = () => {
    setError(false);
    if (quantity != 0) {
      //add to cart the product
      if (!sessionStorage.getItem(storageName.CART)) {//cart doesn't exist
        //create a new cart
        const singleItem = props.item;
        singleItem.quantita = quantity;
        sessionStorage.setItem(storageName.CART, JSON.stringify(singleItem));
        for (let i = 0; i < quantity; i++) {
          dispatch({ type: actionLogin.ADD });
        }
        updateTotal(prezzo, "add");
        props.onHide();
      } else {// cart exist
        //search if item is already in the cart
        let cart = JSON.parse(
          "[" + sessionStorage.getItem(storageName.CART) + "]"
        );
        const index = cart.findIndex((item) => item.nome === nome);
        if (index === -1) {//if not in the cart
          //add to cart
          const singleItem = props.item;
          singleItem.quantita = quantity;
          cart.push(singleItem);
          sessionStorage.setItem(storageName.CART,JSON.stringify(cart).replace("[", "").replace("]", ""))
          // increse the quantity
          for (let i = 0; i < quantity; i++) {
            dispatch({ type: actionLogin.ADD });
          }
          dispatch({ type: actionLogin.UPDATE_CART });
          updateTotal(prezzo, "add");
          props.onHide();
        } else { // if in the cart
          //update quantity
          if (cart[index].quantita + quantity > 20) {//you can order max 20 dishes
            setError(true);
            setMsgError("Non puoi inserire più di 20 porzioni per piatto");
          } else {
            cart[index].quantita = quantity;
            sessionStorage.setItem(
              storageName.CART,
              JSON.stringify(cart).replace("[", "").replace("]", "")
            );
            for (let i = 0; i < quantity; i++) {
              dispatch({ type: actionLogin.ADD });
            }
            dispatch({ type: actionLogin.UPDATE_CART });
            updateTotal(prezzo, "add");
            props.onHide();
          }
        }
      }
    } else {
      setError(true);
      setMsgError("Inserisci un valore valido");
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {nome} - {prezzo}€
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{descrizione}</p>
        <p>
          Seleziona quantità: {"  "}
          <input
            type="number"
            min="1"
            max="20"
            onChange={(e) => setQuantity(e.target.value)}
          ></input>{" "}
          <Button size="sm" variant="success" onClick={addToCartHandler}>
            CONFERMA
          </Button>
        </p>
        {error && (
          <div className="alert alert-danger" role="alert">
            {msgError}
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalCard;
