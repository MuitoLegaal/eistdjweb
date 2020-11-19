import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import { Button, Input } from 'antd';
import { Container, Row, Col, Badge } from 'reactstrap'
import '../App.css';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';


function Eventcreation(props) {

  const [errorMessage, setErrorMessage] = useState();
  const [eventName, setEventName] = useState('');
  const [eventPassword, setEventPassword] = useState('');

  const [songListCreation, setSongListCreation] = useState(false);

  var response


  var handleEventCreation = async () => {

    var rawResponse = await fetch('/eventcreation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: `eventNameFromFront=${eventName}&eventPasswordFromFront=${eventPassword}&idUserFromFront=${props.hostId}`
    })

    response = await rawResponse.json();
    
    if (response.result === true) {
          console.log('true')

          //redirection vers songlistcreation
          setSongListCreation(true)

    } else {
          setErrorMessage(<Badge status="error" style={{color: 'white', backgroundColor:'#FF0060', fontSize:12, marginTop: '4vh'}}  value="Mot de passe trop court">Mot de passe trop court</Badge>)
    }
}

console.log('eventName', eventName)
var nameForget;
if (eventName === "" || eventPassword === "") {
      nameForget = <Badge status="error" style={{color: 'white', backgroundColor:'#FF0060', fontSize:12, marginTop: '4vh'}} value="Les deux champs sont obligatoires :) ">Les deux champs sont obligatoires</Badge>
}

 //redirection vers songlistcreation
if (songListCreation){
  return <Redirect to="/Songlistcreation"></Redirect>}


else 

  return (
    <div className="App">
      <header className="App-header">
        <Container>

          <div className="Header">
            <img src='../logoMini.png' alt='logo-dj'></img>
            <p className="Title">DJ HÔTE</p>
          </div>

          <Row className="Row">

            <Col className="Card m-4">
              <p className="Title" >Nouvelle soirée</p>


              <p className="Champs">Nom de l'évènement :</p>
              <Input className="Input" style={{ borderRadius: 5 }} placeholder="Nom de l'évènement" type="text" onChange={(text) => setEventName(text.target.value)} value={eventName}/>
              <p className="Champs mt-3">Mot de passe de l'évènement :</p>
              <Input className="Input" style={{ borderRadius: 5 }} placeholder="Mot de passe" type="text" onChange={(text) => setEventPassword(text.target.value)} value={eventPassword}/>

              {nameForget}
              {errorMessage}
            
                  <Button onClick={()=> handleEventCreation()} className="Button" type="primary" style={{ backgroundColor: '#584DAD', borderColor: '#584DAD', marginTop: 100, borderRadius: 5 }}>Nouvelle soirée</Button>
                
            </Col>

          </Row>


        </Container>
      </header>
    </div>
  )
}


function mapStateToProps(state) {
  return { hostId: state.hostId }
}

export default connect(
  mapStateToProps,
  null
)(Eventcreation);