import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { actionLogin } from "../../store/restaurant-store";
import Carousel from 'react-bootstrap/Carousel';

const Home = () => {
    const dispatch = useDispatch();

    useEffect( ()=> {
        //to keep up the "session" while we update
        dispatch({ type: actionLogin.UPDATE_COUNT });
    }, [])
    return <>
        <div className="text-center"><h1>HOME</h1></div>
        <div className="text-center">
        <Carousel variant="dark">
                <Carousel.Item interval={3000}>
                    <div className='container-img-carosello'>
                        <img className='img-carosello-1'
                            src="https://www.starbene.it/content/uploads/2015/06/iStock_000022351159_Medium-780x438.jpg"
                            alt="First slide"

                        /></div>
                    <Carousel.Caption className="text-dark">
                        <h3>Migliori piatti italiani</h3>
                        <p>
                            Oltre migliaia di clienti soddisfatti
                        </p>

                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={4000}>
                    <div className='container-img-carosello'>
                        <img className='img-carosello-2'
                            src="https://i.pinimg.com/736x/68/dd/6e/68dd6eb08a285159a2ae436e358b11c3.jpg"
                            alt="Second slide"
                        />
                    </div>
                    <Carousel.Caption className="text-dark">
                        <h3>Prodotti freschi</h3>
                        <p>
                            Comprati direttamente dai nostri fornitori italiani
                        </p>

                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <div className='container-img-carosello'>
                        <img className='img-carosello-3'
                            src="https://www.ilgiornaledelcibo.it/wp-content/uploads/2016/06/Ristoranti-di-lusso.jpg"
                            alt="Third slide"
                        />
                    </div>
                    <Carousel.Caption className="text-dark">
                        <h3>Preparazione curata</h3>
                        <p>
                            Cuochi con anni di esperienza
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel></div>
        </>
    
}

export default Home;