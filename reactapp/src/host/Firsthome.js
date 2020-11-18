import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import { Button, Input } from 'antd';
import { Container, Row, Col } from 'reactstrap'
import '../App.css';
import { Redirect, Link } from 'react-router-dom';



function Firsthome() {


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

              <p className="Title">MES SOIRÉES :</p>

              <div className="border border-primary" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 10, padding: 20 }}>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>
                  <p>Pas de soirée en cours.</p>
                  <p>Ajoute une soirée pour lancer un vote.</p>

                </div>

              </div>

            </Col>

            <Col className="Card m-4">

<p className="Title">VOTE EN COURS :</p>


    <p className='Champs'>Pas de vote en cours</p>


</Col>

          </Row>

          <Link to="/Eventcreation">
            <Button className="Button" type="primary" style={{ backgroundColor: '#584DAD', borderColor: '#584DAD', marginTop: '20%', marginBottom:20, borderRadius: 5 }}>Nouvelle soirée</Button>
          </Link>


        </Container>
      </header>
    </div>
  );
}



export default Firsthome;