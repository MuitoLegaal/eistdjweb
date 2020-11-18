import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import { Button } from 'antd';
import { Container, Row, Col } from 'reactstrap'
import './App.css';
import { Redirect, Link } from 'react-router-dom';




function Accueil() {


  return (
    <div className="App">
      <header className="App-header">
        <Container>

          <div className="Header">
            <div className="Margin mt-4">
              <img src='../logo.png' alt='logo-dj'></img>
            </div>
          </div>

          <Row className="Row">

            <Col className="Card m-4">
              <p className="Subtitle">Reçois tes invités avec Le mode DJ HÔTE</p>
              <p style={{ fontSize: 16 }}> Prépare-toi à ambiancer ta soirée et faire vibrer tes invités avec des bandes sons qu’ils aiment !</p>
              <p style={{ marginTop: 150, fontSize: 22 }}>Vous êtes :</p>
              <Link to="/Login">
                <Button className="Button" type='primary' style={{ backgroundColor: '#E59622', borderColor: '#E59622', borderRadius: 5 }}>Hôte</Button>
              </Link>
            </Col>

            <Col className="Card m-4">
              <p className="Subtitle">Suggère ta musique avec le mode dj invité</p>
              <p style={{ fontSize: 16 }}> Pour une nouvelle démocratie musicale, vote pour ta musique préférée !</p>
              <p style={{ marginTop: 150, fontSize: 22 }}>Vous êtes :</p>
              <Link to="/Enregistrement">
                <Button className="Button" type='primary' style={{ backgroundColor: '#584DAD', borderColor: '#584DAD', borderRadius: 5 }}>Invité</Button>
              </Link>
            </Col>

          </Row>

        </Container>
      </header>
    </div>
  );
}



export default Accueil;