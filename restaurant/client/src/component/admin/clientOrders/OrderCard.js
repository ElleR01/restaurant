import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import emailjs from "emailjs-com";
import React, { useRef } from "react";
import useFirebase from "../../../connection/useFirebase";
import Axios from "axios";

const OrderCard = (prop) => {
  const { cart, client, key } = prop.order;
  const { nome, cognome, email } = client;
  const form = useRef();

  //here you have to configure emailjs
  const sendMailHandler = (e) => {
    e.preventDefault();
    console.log("test");
    //you can find these keys in your emailjs account, follow this: https://www.youtube.com/watch?v=NgWGllOjkbs
    //IMPORTANT: in my template i put {{{reply_to}}} in "To Email" field.
    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form.current, 'YOUR_PUBLIC_KEY')
    .then((result) => {
        console.log(result.text);
    }, (error) => {
        console.log(error.text);
    });

    moveToHistory();
  };

  //when i confirm the order, i move it to the history by make his confirm attribute true
  const moveToHistory = async () => {
    Axios.post(
      "{your db path}/updateOrder",
      {
        orderId: key,
      }
    ).then((response) => {
      console.log(response);
    });
    //refresh page
    window.location.reload();
  };

  return (
    <>
      <Card>
        <Card.Body>
          <Card.Text>
            Ordine di{" "}
            <strong>
              {nome} {cognome}
            </strong>
            . Descrizione:
          </Card.Text>
          <Card.Text>
            {cart.map((item, key) => (
              <label key={key}>
                -{item.nome} - {item.quantita} porzioni/e
              </label>
            ))}
          </Card.Text>
          <form ref={form} onSubmit={sendMailHandler}>
            <Button type="submit" variant="success" onClick={sendMailHandler}>
              CONFERMA ORDINE
            </Button>{" "}
            <div className="col-4">
              <input
                type="hidden"
                className="form-control"
                name="reply_to"
                defaultValue={email}
              />
              <input
                type="hidden"
                className="form-control"
                name="name"
                defaultValue={nome}
              />
            </div>
          </form>
        </Card.Body>
      </Card>
    </>
  );
};

export default OrderCard;
