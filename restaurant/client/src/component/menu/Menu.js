import { useState, useEffect } from "react";
import useFirebase from "../../connection/useFirebase";
import Row from "react-bootstrap/Row";
import MenuCard from "./MenuCard";
import Card from "react-bootstrap/Card";
import { actionLogin } from "../../store/restaurant-store";
import { useDispatch } from "react-redux";
import Form from "react-bootstrap/Form";

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [firstMenu, setFirstMenu] = useState([]);
  const [secondMenu, setSecondMenu] = useState([]);
  const [thirdMenu, setThirdMenu] = useState([]);
  const [sweetMenu, setSweetMenu] = useState([]);
  const [drinkMenu, setDrinkMenu] = useState([]);
  const [primo, setPrimo] = useState(true);
  const [secondo, setSecondo] = useState(true);
  const [contorno, setContorno] = useState(true);
  const [dessert, setDessert] = useState(true);
  const [bevanda, setBevanda] = useState(true);

  const dispatch = useDispatch();
  const { readFirebase, isLoading } = useFirebase();
  const firebaseURLMenu =
    "{your db path}/menu.json";
  useEffect(() => {
    getMenu();
    dispatch({ type: actionLogin.UPDATE_COUNT });
  }, []);

  const getMenu = async () => {
    const listUsers = await readFirebase(firebaseURLMenu);
    const response = [];
    for (const key in listUsers) {
      response.push({
        categoria: listUsers[key].categoria,
        descrizione: listUsers[key].descrizione,
        nome: listUsers[key].nome,
        prezzo: listUsers[key].prezzo,
      });
    }
    setMenu(response);
    // set filtered list of categories
    setFirstMenu(response.filter((item) => item.categoria === "Primo"));
    setSecondMenu(response.filter((item) => item.categoria === "Secondo"));
    setThirdMenu(response.filter((item) => item.categoria === "Contorni"));
    setSweetMenu(response.filter((item) => item.categoria === "Dolci"));
    setDrinkMenu(response.filter((item) => item.categoria === "Bibite"));
  };

  //show categories selected
  const filterHandler = (e) => {
    //console.log(e.target.value);
    if (e.target.value === "0") {
      setPrimo(true);
      setSecondo(true);
      setContorno(true);
      setDessert(true);
      setBevanda(true);
    }
    if (e.target.value === "1") {
      setPrimo(true);
      setSecondo(false);
      setContorno(false);
      setDessert(false);
      setBevanda(false);
    }
    if (e.target.value === "2") {
      setPrimo(false);
      setSecondo(true);
      setContorno(false);
      setDessert(false);
      setBevanda(false);
    }
    if (e.target.value === "3") {
      setPrimo(false);
      setSecondo(false);
      setContorno(true);
      setDessert(false);
      setBevanda(false);
    }
    if (e.target.value === "4") {
      setPrimo(false);
      setSecondo(false);
      setContorno(false);
      setDessert(true);
      setBevanda(false);
    }
    if (e.target.value === "5") {
      setPrimo(false);
      setSecondo(false);
      setContorno(false);
      setDessert(false);
      setBevanda(true);
    }
  };

  return (
    <>
      <div className="text-center">
        <h1>MENU</h1>
      </div>
      <div className="text-center p-3">
        {isLoading ? (
          <div className="loagin1">
            <div className="text center">
              <Card.Img
                className="loading"
                src="https://i.pinimg.com/originals/8e/be/2a/8ebe2a4ffd8621a04b333b9f4bc306be.gif"
              />{" "}
            </div>
          </div>
        ) : (
          <>
            <div className="p-3">
              <Form.Select
                onChange={filterHandler}
                aria-label="Default select example"
              >
                <option value="0">
                  Apri questo menu e selezion la categoria per filtrare il menù
                </option>
                <option value="1">Primi</option>
                <option value="2">Secondi</option>
                <option value="3">Contorni</option>
                <option value="4">Dolci</option>
                <option value="5">Bevande</option>
              </Form.Select>
            </div>
            {primo && (
              <>
                <hr className="text-warning border-warning opacity-75"></hr>
                <h2>Primi</h2>
                <hr className="text-warning border-warning opacity-75"></hr>
                <Row xs={1} md={2} className="g-4">
                  {Array.from({ length: 1 }).map((_, idx) =>
                    firstMenu.map((item, index) => (
                      <MenuCard key={index} item={item} />
                    ))
                  )}
                </Row>
              </>
            )}
            {secondo && (
              <>
                <hr className="text-warning border-warning opacity-75"></hr>
                <h2>Secondi</h2>
                <hr className="text-warning border-warning opacity-75"></hr>
                <Row xs={1} md={2} className="g-4">
                  {Array.from({ length: 1 }).map((_, idx) =>
                    secondMenu.map((item, index) => (
                      <MenuCard key={index} item={item} />
                    ))
                  )}
                </Row>
              </>
            )}
            {contorno && (
              <>
                <hr className="text-warning border-warning opacity-75"></hr>
                <h2>Contorni</h2>
                <hr className="text-warning border-warning opacity-75"></hr>
                <Row xs={1} md={2} className="g-4">
                  {Array.from({ length: 1 }).map((_, idx) =>
                    thirdMenu.map((item, index) => (
                      <MenuCard key={index} item={item} />
                    ))
                  )}
                </Row>
              </>
            )}
            {dessert && (
              <>
                <hr className="text-warning border-warning opacity-75"></hr>
                <h2>Dolci</h2>
                <hr className="text-warning border-warning opacity-75"></hr>
                <Row xs={1} md={2} className="g-4">
                  {Array.from({ length: 1 }).map((_, idx) =>
                    sweetMenu.map((item, index) => (
                      <MenuCard key={index} item={item} />
                    ))
                  )}
                </Row>
              </>
            )}
            {bevanda && (
              <>
                <hr className="text-warning border-warning opacity-75"></hr>
                <h2>Bevande</h2>
                <hr className="text-warning border-warning opacity-75"></hr>
                <Row xs={1} md={2} className="g-4">
                  {Array.from({ length: 1 }).map((_, idx) =>
                    drinkMenu.map((item, index) => (
                      <MenuCard key={index} item={item} />
                    ))
                  )}
                </Row>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Menu;
