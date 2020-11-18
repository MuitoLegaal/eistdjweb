import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import { Button, Input } from 'antd';
import { Container, Row, Col } from 'reactstrap'
import '../App.css';
import { Redirect, Link } from 'react-router-dom';
import Countdown, { zeroPad} from 'react-countdown';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function Homehost(props) {

  //COUNTDOWN 

  const [TIMER, setTIMER] = useState(0)

  //EVENT OUVERT
  const [eventOuvert, setEventOuvert] = useState("")
  const [dateOuvert, setDateOuvert] = useState("")
  const [hour, setHour] = useState ("")

  const [songlist, setSonglist] = useState (false)
  const [powerOff, setPowerOff] = useState (false)

  const Completionist = () => <Redirect to="Winner" />;

  const renderer = ({ minutes, seconds, completed }) => {
    if (completed) {

      return <Completionist />;
    } else {

      return (
        <div style={{marginTop: '2%', justifyContent:"center", alignItems:'center'}}>
        <p style={{color: '#FF0060', fontSize: 12}}>Vote en cours, temps restant:</p>
        <span style={{ backgroundColor: '#FF0060', borderColor: '#FF0060', borderRadius: 5, fontSize:35 }}>{zeroPad(minutes)}:{zeroPad(seconds)}</span>
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

  const findEvent = async () => {

    var rawResponse = await fetch('/findEvent', {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: `idUserFromFront=${props.hostId}`
  })

    var response = await rawResponse.json();
    console.log(response)

    if (response.eventIsOpen)
    {
      setEventOuvert(response.eventIsOpen.nameEvent)
      setDateOuvert(`${response.day}/${response.month}/${response.year}`)
      setHour(`${response.hours}:${response.minutes}`)
    }

  }

  findTIMER()
  findEvent()

}, []);

var handleNouveauVote  = async() => {

  var rawResponse = await fetch('/tourdevotecreation', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `idUserFromFront=${props.hostId}`
  })

  var response = await rawResponse.json()

  if (response.result){
    setSonglist(true)
  }
}

var handlePowerOff = async() => {
setPowerOff(true)
}

if (powerOff) {
  return <Redirect to='/'></Redirect>
}


if (songlist) {
  return <Redirect to="/Songlistcreation"/>
}


  return (
    <div className="App">
      <header className="App-header">
   
        <Container>
          <div  style={{display: 'flex', flexDirection:'row', justifyContent:'flex-end', alignItems:'flex-end', marginTop:'4%'}}>
          <FontAwesomeIcon icon={faPowerOff} onClick={() => handlePowerOff()}/>
          </div>
          <div className="Header mt-4">
            <img style={{display: 'flex', flexDirection:'row', justifyContent:'center'}} src='../logoMini.png' alt='logo-dj'></img>
            <p className="Title">DJ HÔTE</p>
          </div>

          <Row>

            <Col className="Card m-4">

            <p className="Title">SOIRÉE EN COURS :</p>

              <div className="border border-primary" style={{display: 'flex', flexDirection:'row', alignItems: 'center', justifyContent:'center', borderRadius:10, padding: 20, height:300, width:500, marginBottom: 20}}>

                  <div>
                  <img src='../picto-fete2.png' alt="picto-fete" style={{ height: 150, width: 170, margin: '2vh' }} />
                  </div>

                  <div style={{display: 'flex', flexDirection:'column', alignItems: 'center', justifyContent:'center', fontSize:18}}>
                  <p>Soirée: {eventOuvert}</p>
                  <p>Date: {dateOuvert} {hour}</p>
             
                <Button onClick={()=> handleNouveauVote()} className="Button" type="primary" style={{ backgroundColor: '#E59622', borderColor: '#E59622', marginTop: '1vh', borderRadius: 5 }}>Nouveau vote</Button>
           
                  </div>
                 
              </div>

              <Link to="/Eventcreation">
                <Button className="Button" type="primary" style={{ backgroundColor: '#584DAD', borderColor: '#584DAD', marginTop: '4vh', borderRadius: 5 }}>Nouvelle soirée</Button>
              </Link>
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
                 <Countdown
                 date={Date.now() + TIMER}
                 renderer={renderer}
               >
               </Countdown>
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
    nameToDisplay: state.EventName,
  }
}

export default connect(
  mapStateToProps,
  null
)(Homehost);