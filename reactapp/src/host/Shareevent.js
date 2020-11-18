import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import { Button, Input } from 'antd';
import { Container, Row, Col } from 'reactstrap'
import '../App.css';
import { Redirect, Link } from 'react-router-dom';
import Countdown, { zeroPad } from 'react-countdown';
import {connect} from 'react-redux';


function Shareevent(props) {

  //COUNTDOWN 

  const [TIMER, setTIMER] = useState(0)
  const [eventID, setEventID] = useState("")
  const [eventPassword, setEventPassword] = useState("")
  const [eventName, setEventName] = useState("")

  const Completionist = () => <Redirect to="Winnerhost" />;

  const renderer = ({ minutes, seconds, completed }) => {
    if (completed) {

      return <p>Vote terminé</p>;

    } else {

      return (
        <div style={{ marginTop: '6vh' }}>
          <p style={{ color: '#FF0060', fontSize: 12 }}>Vote en cours, temps restant:</p>
          <span style={{ backgroundColor: '#FF0060', borderColor: '#FF0060', borderRadius: 5, width: '15vh', height: '10vh', marginTop: '6vh' }}>{zeroPad(minutes)}:{zeroPad(seconds)}</span>
        </div>
      )
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
      console.log("rebours", timer)
    }

    const shareData = async () => {

      var rawResponse =  await fetch('/shareData', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `idUserFromFront=${props.hostId}`
      })

      var response = await rawResponse.json()

      console.log(response);

      setEventID(response.findEvent.eventId)
      setEventPassword(response.findEvent.password)
      setEventName(response.findEvent.nameEvent)
    }

    shareData()
    findTIMER()
    

    console.log('Comptes à rebours FRONT ici ->', TIMER)
    console.log('hostIdState', props.hostId)

  }, [])



  return (
    <div className="App">
      <header className="App-header">
        <Container>

          <div className="Header mt-4">
            <img src='../logoMini.png' alt='logo-dj'></img>
            <p className="Title">DJ HÔTE</p>
          </div>

          <Row className="Row">

            <Col className="Card m-4">

              <div style={{ textAlign: 'center', alignItems: 'center' }}>
                <p className="Text">{eventName}</p>
                <img src='../picto-fete2.png' alt="picto-fete" style={{ height: 150, width: 170 }} />
              </div>

              {TIMER > 0 && (
                <Countdown
                  date={Date.now() + TIMER}
                  renderer={renderer} >
                </Countdown>
              )
              }

            </Col>

            <Col className="Card m-4">

              <p style={{ fontSize: 14 }}>Partage l'évènement pour faire voter tes amis:</p>

              <div className="ShareEvent" style={{ fontSize: 14, borderRadius: 20, padding: 20 }}
              // onPress={() => fetchCopiedp()}
              // onChangep={value => this.setState({pInputp: value})}
              >
                <p>Ce soir, avec Everyone is the DJ.</p>
                <p>Télècharge l’application pour voter :</p>
                <Link>https://apps.apple.com/app/apple-store/id982107779</Link>
                <p>Ou rejoins la page:</p>
                <Link>https://everyoneisthedj.com</Link>
                <p>ID de l'évènement : </p>
                <p style={{ fontWeight: 'bold' }}> {eventID} </p>
                <p>Mot de passe de l'évènement :</p>
                <p style={{ fontWeight: 'bold' }}>{eventPassword}</p>

              </div>

            </Col>

          </Row>
          <Link to="/Homehost">
            <Button className="Button" type="primary" style={{ backgroundColor: '#584DAD', borderColor: '#584DAD', marginTop: 100, marginBottom: 50, borderRadius: 5 }}>Retour à l'accueil</Button>
          </Link>


        </Container>
      </header>
    </div>
  )
}




function mapStateToProps(state) {
  return {
    hostId: state.hostId,
  }
}

export default connect(
  mapStateToProps,
  null
)(Shareevent);