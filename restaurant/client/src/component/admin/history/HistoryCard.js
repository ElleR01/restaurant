
import Card from "react-bootstrap/Card";

const HistoryCard = (prop) => {
    const { cart, client } = prop.order;
    const { nome, cognome, email } = client;
    return <>
      <Card border="success">
        <Card.Body>
          <Card.Text>
              Ordine di  <strong>{nome} {cognome} - {email}
            </strong>
            . 
          </Card.Text>
          
          <Card.Text>Descrizione:</Card.Text>
          <Card.Text>
            
            {cart.map((item, key) => (
              <label key={key}>
                -{item.nome} - {item.quantita} porzioni/e
              </label>
            ))}
          </Card.Text>
         
        </Card.Body>
      </Card>

    </>
}

export default HistoryCard;