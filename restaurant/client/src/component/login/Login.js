import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import useFirebase from "../../connection/useFirebase";
import { actionLogin, storageName } from "../../store/restaurant-store";
import Card from "react-bootstrap/Card";

const Login = () => {
  //variables
  const { readFirebase, isLoading } = useFirebase();
  const errorMsg = useSelector((state) => state.errorMsg);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userList, setUserlist] = useState([]);
  const [userCode, setUserCode] = useState("");
  const [surname, setSurname] = useState("");
  const [error, setError] = useState(false);
  const [adminList, setAdminList] = useState([]);

  //get users from DB and set it to userList
  const getUsers = async () => {
    const firebaseURLUsers =
      "{yout db path}/users.json";
    const listUsers = await readFirebase(firebaseURLUsers);
    const response = [];
    for (const key in listUsers) {
      response.push({
        nome: listUsers[key].nome,
        cognome: listUsers[key].cognome,
        codiceCliente: listUsers[key].codiceCliente,
        email: listUsers[key].email,
      });
    }
    setUserlist(response);
  };

  useEffect(()=>{
    //on mount get users from DB and Admin
    getAdmin()
    getUsers()
  },[])

  //check if usercode is inside DB, true if find the surname
  const checkUser = async (surname) => {
    await getUsers();
    const userBack = userList.find((p) => p.cognome === surname);
    if (userBack) {
      if (userBack.codiceCliente === userCode) {
        sessionStorage.setItem(storageName.USER_INFO, JSON.stringify(userBack));
        return true;
      }
    }
    return false;
  };

  //check if usercode is inside DB, true if finded
  const checkAdmin = async (surname) => {
    await getAdmin();
    const userBack = adminList.find((p) => p.cognome === surname);
    if (userBack) {
      if (userBack.codiceAdmin === userCode) {
        sessionStorage.setItem(storageName.USER_INFO, JSON.stringify(userBack));
        return true;
      }
    }
    return false;
  };

  //get admin from DB and set it to userList
  const getAdmin = async () => {
    const firebaseURLAdmin =
      "{yout db path}/admin.json";
    const listUsers = await readFirebase(firebaseURLAdmin);
    const response = [];
    for (const key in listUsers) {
      response.push({
        nome: listUsers[key].nome,
        cognome: listUsers[key].cognome,
        codiceAdmin: listUsers[key].codiceAdmin,
      });
    }
    setAdminList(response);
  };

  //go to signing page
  const signinPageHandler = () => {
    navigate("/signin");
  };
  //login handler
  const loginHandler = async (e) => {
    e.preventDefault();
    //check usercode, name and surname with regex. So we don't do useless call to db
    const validUserCode = new RegExp("[a-zA-Z]+[0-9]{1,5}");
    const validSurname = new RegExp("[a-zA-Z]");
    //check if field are not empty
    if (surname.length > 0) {
      setError(false);
      if (userCode.length > 0) {
        setError(false);
        //there is written something in both fields
        if (validSurname.test(surname)) {
          setError(false);
          if (validUserCode.test(userCode)) {
            setError(false);
            //correct userCode and surname
            if (await checkUser(surname)) {//check if user is in DB
              setError(false);
              dispatch({ type: actionLogin.LOGIN });
              sessionStorage.removeItem(storageName.ERROR_MSG);
              navigate("/home");
            } else {
              //check if admin trying to log
              if (await checkAdmin(surname)) {
                setError(false);
                console.log("succes addmin login");
                //dispatch({ type: actionLogin.LOGIN });
                dispatch({ type: actionLogin.ADMIN_LOGGED });
                sessionStorage.removeItem(storageName.ERROR_MSG);
                navigate("/home");
              } else {//user not in DB
                setError(true);
                sessionStorage.setItem(
                  storageName.ERROR_MSG,
                  "Credenziali non valide"
                );
                dispatch({ type: actionLogin.ERROR });
              }
            }
          } else {//regex not valid of userCode
            console.log("codice cliente non valido");
            setError(true);
            sessionStorage.setItem(
              storageName.ERROR_MSG,
              "Codice cliente non valido"
            );
            dispatch({ type: actionLogin.ERROR });
          }
        } else {//regex not valid of surname
          console.log("cognome non valido");
          setError(true);
          sessionStorage.setItem(storageName.ERROR_MSG, "Cognome non valido");
          dispatch({ type: actionLogin.ERROR });
        }
      } else {//userCode is empty
        setError(true);
        sessionStorage.setItem(
          storageName.ERROR_MSG,
          "Il campo 'Codice cliente' è vuoto"
        );
        dispatch({ type: actionLogin.ERROR });
      }
    } else {//surname is empty
      setError(true);
      sessionStorage.setItem(
        storageName.ERROR_MSG,
        "Il campo 'Cognome' è vuoto"
      );
      dispatch({ type: actionLogin.ERROR });
    }
  };

  return (
    <>
      <h1 className="text-center">LOGIN</h1>

      {isLoading ? (
        <>
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
        </>
      ) : (
        <Container>
          <Row className="justify-content-md-center">
            <Col xs lg="2"></Col>
            <Col className="text-center" bg="primary" sm={8}>
              <div className="d-flex justify-content-center p-4">
                <form>
                  <div className="row g-3 align-items-center">
                    <div className="text-center">
                      <label className="col-form-label">
                        Inserisci le tue credenziali oppure{" "}
                        <a className="fw-bold fs-6" onClick={signinPageHandler}>
                          REGISTRATI
                        </a>
                      </label>
                    </div>
                    <div className="">
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
                        type="password"
                        id="inputPassword6"
                        className="form-control"
                        aria-describedby="passwordHelpInline"
                        placeholder="Codice utente"
                        onChange={(e) => setUserCode(e.target.value)}
                      />
                    </div>
                    {error && (
                      <div className="alert alert-danger" role="alert">
                        {errorMsg}
                      </div>
                    )}
                    <button
                      type="submit"
                      className="btn btn-warning "
                      onClick={loginHandler}
                    >
                      Login
                    </button>
                  </div>
                </form>
              </div>
            </Col>
            <Col xs lg="2"></Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default Login;
