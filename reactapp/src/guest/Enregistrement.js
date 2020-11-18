import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import { Button, Input } from 'antd';
import { Container, Row, Col, Badge } from 'reactstrap'
import '../App.css';
import { Link, Redirect } from 'react-router-dom';
import uuid from 'react-uuid';
import {connect} from 'react-redux';

function Enregistrement(props) {

  const [eventPassword, setEventPassword] = useState('');
  const [eventId, setEventId] = useState('');
  const [errorMessage, setErrorMessage] = useState(false);

  const [homeguest, setHomeguest] = useState(false);

  var response;


  // useEffect(() => {

  //   console.log("response", response)

  // }, [homeguest])


  var handleEnregistrement =  async () => {

    var rawResponse = await fetch('/enregistrement', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `eventIdFromFront=${eventId}&eventPasswordFromFront=${eventPassword}`
    })
    
    response = await rawResponse.json();
    
    console.log("response", response)
    
    // props.addGuestEventPassword(eventPassword)
    // props.addGuestEventID(eventId)
    
    if (response.result === true) {
    
      var token = uuid();
      console.log('token', token)
      var hostId = response.eventExist.user
      console.log('hostID', hostId)
      console.log('Login Success');
      props.addId(hostId);
      props.addToken(token);
      setHomeguest(true);
    
    } else if (response.result === false){
      setErrorMessage(true)
      setHomeguest(false);
      console.log('Login Failed')
    }
  }



  var logInDenied

  if (errorMessage === true) {
    logInDenied = <Badge status="error" style={{color: 'white', backgroundColor:'#FF0060', fontSize:12, marginTop: '4vh'}} value="Nom et/ou Mot de Passe Incorrect(es)">ID et/ou Mot de Passe Incorrect(es)"</Badge>
  }


  if (homeguest === true){
    return <Redirect to='/Homeguest'/>
  }


  return (
    <div className="App">
      <header className="App-header">
        <Container>

          <div className="Header mt-4">
            <img src='../logoMini.png' alt='logo-dj'></img>
            <p className="Title">DJ INVITÉ</p>
          </div>
          <p className="Subtitle">CONNEXION</p>

          <Row className="Row">

            <Col className="Card m-4">

        
              <p className="Champs">ID de la soirée :</p>
              <Input className="Input" style={{ borderRadius: 5 }} placeholder="ID de la soirée" type="text" onChange={(text) => setEventId(text.target.value)} value={eventId} />
              <p className="Champs">Mot de passe de la soirée :</p>
              <Input className="Input" style={{ borderRadius: 5 }} placeholder="Mot de passe" type="text" onChange={(text) => setEventPassword(text.target.value)} value={eventPassword} />
              {logInDenied}
                <Button onClick={()=> handleEnregistrement()}  className="Button" type="primary" style={{ backgroundColor: '#584DAD', borderColor: '#584DAD', marginTop: 150, borderRadius: 5 }}>Rejoindre la soirée</Button>

            </Col>


          </Row>


        </Container>
      </header>
    </div>
  );
} 


function mapDispatchToProps(dispatch) {
  return {
    addToken: function (token) { 
      dispatch( {type: 'addToken', token: token} )
    },
    addId: function (hostId) { 
      dispatch( {type: 'addId', hostId: hostId} )
    }
  }
}


export default connect (null, mapDispatchToProps)(Enregistrement);