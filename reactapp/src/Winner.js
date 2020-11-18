import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import { Button, Input } from 'antd';
import { Container, Row, Col } from 'reactstrap'
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIcons, faTrophy, faPowerOff} from '@fortawesome/free-solid-svg-icons'
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';

function Winner(props) {

  const [CLASSEMENTb, setCLASSEMENTb] = useState ([{titre: ""}]);
  const [powerOff, setPowerOff] = useState (false);
  // const [supportedURL, setSupportedURL] =useState();

  useEffect(() => {
  
    const findCLASSEMENT = async () => {
  
    const TRIdata = await fetch('/winner', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `idUserFromFront=${props.hostId}`
    })
    var classement = await TRIdata.json();
  
    setCLASSEMENTb(classement.tri)
  
    console.log('classement BRUT ------------>', classement)
    }
  
    findCLASSEMENT()
  
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
            <p className="Title">DJ HÔTE</p>
          </div>


          <Row className="Row">

            <Col className="Card m-4">
              <div style={{ textAlign: 'center', alignItems: 'center' }}>
                <img src='../picto-fete2.png' style={{ height: 150, width: 170, margin: '2vh' }} />
              </div>
            </Col>

            <Col className="Card m-4">

       
              <p className="Subtitle">ET LE GAGNANT EST...</p>
              <FontAwesomeIcon icon={faTrophy} style={{ height: 100, width: 90, color: "#E59522" }} />
              <div style={{width: 'auto', height: 'auto', backgroundColor: '#E59622', borderRadius:15, marginTop: '5%', padding:'4%'}}>
              <p className="Champs">1.</p>
              <p className="Champs">{CLASSEMENTb[0].titre}</p>
              </div>

              <div style={{width: 'auto', height: 'auto', backgroundColor: '#584DAD', borderRadius:15, marginTop: '2%', padding:'2%'}}>

              <a style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}} target="_blank" href={`https://www.youtube.com/results?search_query=${CLASSEMENTb[0].titre}`}> 
              <img src='../youtube.svg' style={{ height: 80, width: 40, marginRight: '1vh' }}/>  
              <p className="Champs"  style={{ marginTop: '2vh', color: "white"}}>Lancer le titre</p></a>
            
              </div> 
         
           

            </Col>

          </Row>
          <Link to="/Homehost">
            <Button className="Button" type="primary" style={{ backgroundColor: '#FF0060', borderColor: '#FF0060', marginTop: 100, borderRadius: 5, marginBottom: 50 }}>Suivant</Button>
          </Link>

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
)(Winner);