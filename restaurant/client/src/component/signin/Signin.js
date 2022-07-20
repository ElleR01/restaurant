import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";
import useFirebase from "../../connection/useFirebase";
import { useState } from "react";
import { actionLogin, storageName } from "../../store/restaurant-store";
import { useDispatch, useSelector } from "react-redux";
import Card from 'react-bootstrap/Card';

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { readFirebase, isLoading } = useFirebase();
  const errorMsg = useSelector((state) => state.errorMsg);
  const [error, setError] = useState(false);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [userCode, setUserCode] = useState("");
  const [email, setEmail] = useState("");
  const [signed, setSigned] = useState(false);
  const validUserCode = new RegExp("[a-zA-Z]+[0-9]{1,5}");
  const validSurname = new RegExp("[a-zA-Z]");
  const validEmail = new RegExp("[w@]+.+[a-z]{2,4}");
  const firebaseURLProduct =
      "{your db path}/users.json";

      //handle the signing form
  const registerHandler = async (e) => {
    e.preventDefault();
    if (name.length === 0 || surname.length === 0 || userCode.length === 0 || email.length === 0 ) {
      //empty fields
      setError(true);
      sessionStorage.setItem(storageName.ERROR_MSG, "Compila tutti i campi");
      dispatch({ type: actionLogin.ERROR });
    } else {//not empty so we check if fields are valid for regex
      if (validSurname.test(name)) {
        if(validSurname.test(surname)){
            if(validEmail.test(email)){
                if(validUserCode.test(userCode)){// all gucci
                    setError(false);
                    //create a post to insert new user
                    const isUserNew = await checkNewUser(e);
                    if(isUserNew){//check if user is new
                      console.log("inserito")
                    }
                }else{//userCode not valid
                    setError(true);
                    sessionStorage.setItem(storageName.ERROR_MSG, "Codice utente non valido");
                    dispatch({ type: actionLogin.ERROR });
                }
            }else{//email not valid
                setError(true);
                sessionStorage.setItem(storageName.ERROR_MSG, "Email non valida");
                dispatch({ type: actionLogin.ERROR });
            }
        }else{//surname not valid
            setError(true);
            sessionStorage.setItem(storageName.ERROR_MSG, "Cognome non valido");
            dispatch({ type: actionLogin.ERROR });
        }
      } else {//name not valid
        setError(true);
        sessionStorage.setItem(storageName.ERROR_MSG, "Nome invalido");
        dispatch({ type: actionLogin.ERROR });
      }
    }
  };

//get user from db and check if it's alredy inside
  const checkNewUser = async (e) => {
    e.preventDefault();
    const firebaseURLProduct =
    "{your db path}/users.json";
  const listUsers = await readFirebase(firebaseURLProduct);
  const response = [];
  for (const key in listUsers) {
    response.push({
      nome: listUsers[key].nome,
      cognome: listUsers[key].cognome,
      codiceCliente: listUsers[key].codiceCliente,
      email: listUsers[key].email,
    });
  }

  if(response.findIndex((user) => user.cognome === surname) !== -1){
    setError(true);
    sessionStorage.setItem(storageName.ERROR_MSG, "Utente già registrato");
    dispatch({ type: actionLogin.ERROR });
    return false;
  }
  insertNewUser()
  setSigned(true);
  return true;
  }

//insert new user inside db
  const insertNewUser = async () => {
    const newUsers = {
      nome: name,
      cognome: surname,
      codiceCliente: userCode,
      email: email,
    }
    const response = await readFirebase(firebaseURLProduct, {
      method: "POST",
      body: JSON.stringify(newUsers),
    });
  }

  const goToLogin = () => {
    navigate("/login");
  }
  return (
    <>
      <h1 className="text-center">REGISTRATI</h1>
      {isLoading ? <>
      <div className="text-center">
        <Card.Img className="loading" src="https://i.pinimg.com/originals/8e/be/2a/8ebe2a4ffd8621a04b333b9f4bc306be.gif" />
        </div>
      </>
      :
      <Container>
        <Row className="justify-content-md-center">
          <Col xs lg="2"></Col>
          <Col className="text-center" bg="primary" sm={8}>
            <div className="d-flex justify-content-center p-4">
               <form>
                <div className="row g-3 align-items-center">
                 <div className="text-center">
                    {!signed && <label className="col-form-label">
                      Compila i seguenti campi
                    </label>}
                  </div>
                  {!signed && <div className="">
                    <input
                      type="text"
                      id="inputName"
                      className="form-control"
                      aria-describedby="passwordHelpInline"
                      placeholder="Nome"
                      onChange={(e) => setName(e.target.value)}
                    />
                    <br></br>
                    <input
                      type="text"
                      id="inputSurname"
                      className="form-control"
                      aria-describedby="passwordHelpInline"
                      placeholder="Cognome"
                      onChange={(e) => setSurname(e.target.value)}
                    />
                    <br></br>
                    <input
                      type="email"
                      id="inputEmail"
                      className="form-control"
                      aria-describedby="passwordHelpInline"
                      placeholder="E-mail"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <br></br>
                    <input
                      type="password"
                      id="inputUserCode"
                      className="form-control"
                      aria-describedby="passwordHelpInline"
                      placeholder="Codice Utente, testo+ numeri (da 1 a 5 numeri)"
                      onChange={(e) => setUserCode(e.target.value)}
                    />
                  </div>}
                  {error && (
                    <div className="alert alert-danger" role="alert">
                      {errorMsg}
                    </div>
                  )}
                  {!signed && <button
                    type="submit"
                    className="btn btn-warning"
                    onClick={registerHandler}
                  >
                    Registrati
                  </button>}
                  {signed && <><div className="alert alert-info" role="alert">
                      Registrazione avvenuta con successo, <a onClick={goToLogin}>CLICCCA QUI PER ACCEDERE</a>
                    </div></>}
                </div>
              </form>
            </div>
          </Col>
          <Col xs lg="2"></Col>
        </Row>
      </Container>}
    </>
  );
};

export default Signin;
