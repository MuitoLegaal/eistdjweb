import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import { Button, Input } from 'antd';
import { Container, Row, Col } from 'reactstrap'
import '../App.css';
import { Redirect, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPowerOff} from '@fortawesome/free-solid-svg-icons'
import Countdown, { zeroPad, calcTimeDelta, formatTimeDelta } from 'react-countdown';
import { connect } from 'react-redux';

function Validation(props) {


  const [TIMER, setTIMER] = useState(0)
  const [powerOff, setPowerOff] = useState (false)
  const [EventNameFromBack, setEventNameFromBack] = useState()
  const [SONGchosen, setSONGchosen] =  useState('')
  const [playlist, setPlaylist] = useState([])

  const Completionist = () => <Redirect to="/Winner" />;


  const renderer = ({ minutes, seconds, completed }) => {
    if (completed) {

      return <Completionist />;
    } else {

      return <span style={{ backgroundColor: '#FF0060', borderColor: '#FF0060', borderRadius: 5, width: '10vh', height: '5vh', marginTop: '3vh' }}>{zeroPad(minutes)}:{zeroPad(seconds)}</span>;
    }
  };

   useEffect(() => {
  
      const findTIMER = async () => {
  
        // ----------------------------------------- METTRE A JOUR l'IP --------------------------------------------
        var TIMERdata = await fetch('/afficheTimer', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: `idUserFromFront=${props.hostId}`
        })
  
        var timer = await TIMERdata.json();
        setTIMER(timer.reboursMS)
      }

      findTIMER()
  
  
    }, [])
  

    var handlePowerOff = async() => {
      setPowerOff(true)
      }
      
      if (powerOff) {
        return <Redirect to='/'></Redirect>
      }


  return (
    <div className="App">
      <header className="App-header">
        <Container>

        <div  style={{display: 'flex', flexDirection:'row', justifyContent:'flex-end', alignItems:'flex-end', marginTop:'4%'}}>
          <FontAwesomeIcon icon={faPowerOff} onClick={() => handlePowerOff()}/>
          </div>

          <div className="Header mt-4">
            <img src='../logoMini.png' alt='logo-dj'></img>
            <p className="Title">DJ INVITÉ</p>
          </div>

          <Row className="Row">

            <Col className="Card m-4">

              <div style={{ textAlign: 'center', alignItems: 'center' }}>
                <img src='../picto-fete2.png' style={{ height: 150, width: 170 }} />
              </div>

              
            {TIMER > 0 && (
              <p className='Champs' style={{color: '#FF0060', marginTop:'4vh'}} >Vote en cours, résultat dans :</p>
            )}

            {TIMER > 0 && (
                <Countdown
                  date={Date.now() + TIMER}
                  renderer={renderer}
                >
                </Countdown>
              )
              }

             

            </Col>

            <Col className="Card m-4">

              {TIMER <= 0 && (
              <p className="Title">VOTE TERMINÉ</p>
              )
              }   

              {TIMER > 0 && (
              <p className="Title">VOTE EN COURS</p>
              )
              }   

              {TIMER > 0 && (
              <p className="Champs">Ton vote a bien été pris en compte !</p>
              )
              }   

              {TIMER <= 0 && (
                <Link to="/Winner">
                  <Button className="Button" type="primary" style={{ backgroundColor: '#584DAD', borderColor: '#584DAD', marginTop: 100, borderRadius: 5 }}>Découvrir le gagnant</Button>
                </Link>
              )
              }

            </Col>

          </Row>       

        </Container>
      </header>
    </div>
  );
}



function mapStateToProps(state) {
  return {
    hostId: state.hostId,
  }
}

export default connect(
  mapStateToProps,
  null
)(Validation);