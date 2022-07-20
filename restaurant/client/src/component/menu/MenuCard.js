import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import { useSelector } from 'react-redux';
import ModalCard from './ModalCard';

const MenuCard = (prop) => {
    const { nome, prezzo, descrizione } = prop.item;
    const loggedIn = useSelector(state => state.loggedIn);
    const [classCard, setClassCard] = useState("");
    const [modalShow, setModalShow] = useState(false);

    useEffect( () => {
        if(loggedIn) {
            setClassCard("pietanza");
        }
    }, [])

    const cardHandler = () => {
        if(loggedIn) {
            setModalShow(true);
        }
    }

    const hideModal = () => {
        setModalShow(false);
    }

    return <>
     <Col onClick={cardHandler}>
          <Card className={classCard}>
            <Card.Body>
              <Card.Title>{nome}</Card.Title>
              <Card.Text>
                {descrizione}
              </Card.Text>
              <Card.Text>
                {prezzo}€
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <ModalCard
        item={prop.item}
        show={modalShow}
        onHide={hideModal}
      />
    </>
}

export default MenuCard;