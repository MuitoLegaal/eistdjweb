import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import { Button, Input } from 'antd';
import { Container, Row, Col } from 'reactstrap'
import '../App.css';
import { Redirect, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPowerOff } from '@fortawesome/free-solid-svg-icons'
import Countdown, { zeroPad } from 'react-countdown';
import { connect } from 'react-redux';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

function Homeguest(props) {


  const [TIMER, setTIMER] = useState(0)
  const [powerOff, setPowerOff] = useState(false)

  const [EventNameFromBack, setEventNameFromBack] = useState()

  const [SONGchosen, setSONGchosen] = useState('')
  const [playlist, setPlaylist] = useState([])

  const [validation, setValidation] = useState(false)

  const Completionist = () => <Redirect to="/Winner" />;


  const renderer = ({ minutes, seconds, completed }) => {
    if (completed) {

      return <Completionist />;
    } else {

      return <span style={{ backgroundColor: '#FF0060', borderColor: '#FF0060', borderRadius: 5, width: '10vh', height: '5vh', marginTop: '6vh' }}>{zeroPad(minutes)}:{zeroPad(seconds)}</span>;
    }
  };

  // ---------------------------------------- chargement de la playlist --------------------------------------------


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


    const findPLAYLIST = async () => {
      // ----------------------------------------- METTRE A JOUR l'IP --------------------------------------------
      const rawDATA = await fetch('/playlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `idUserFromFront=${props.hostId}`
      })
      var data = await rawDATA.json();
      console.log('data en front', data.playlistDB)
      var arrayPL = data.playlistDB
      setPlaylist(arrayPL)
    }

    findTIMER()
    findPLAYLIST()

  }, [])



  var handleRefresh = async () => {

    var rawResponse = await fetch('/afficheTimer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `idUserFromFront=${props.hostId}`
    })

    var timer = await rawResponse.json();

    setTIMER(timer.reboursMS)
  }

  var handlePowerOff = async () => {
    setPowerOff(true)

  }

  if (powerOff) {
    return <Redirect to='/' />
  }

  // // function que recupere le valeur du titre selectioné
  var handleChange = async (event) => {
    setSONGchosen(event.target.value)
  }



  // BOUCLE QUE AFFICHE LES TITRES DU VOTER
  var voteList = []
  for (let i = 0; i < playlist.length; i++) {
    voteList.push(<FormControlLabel key={i} label={playlist[i].titre} type='radio' onChange={handleChange} value={playlist[i].titre} control={<Radio/> } />)
  }

  // ---------------------------------------- envoi du vote en BACK ------------------------------------------------
  var handleVoteGuest = async () => {
    const SONGdata = await fetch('/voteguest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `titreFromFront=${SONGchosen}&idUserFromFront=${props.hostId}&tokenFromFront=${props.token}`
    })
    var SONG = await SONGdata.json();
    setValidation(true)
  }

  if (validation) {
    return <Redirect to='/Validation' />
  }

  return (
    <div className="App">
      <header className="App-header">
        <Container>

          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end', marginTop: '4%' }}>
            <FontAwesomeIcon icon={faPowerOff} onClick={() => handlePowerOff()} />
          </div>

          <div className="Header mt-4">
            <img src='../logoMini.png' alt='logo-dj'></img>
            <p className="Title">DJ INVITÉ</p>
          </div>

          <p className="Title">Bienvenue dans la soirée</p>

          <Row>

            <Col className="Card m-4">

              <div style={{ textAlign: 'center', alignItems: 'center' }}>
                <img src='../picto-fete2.png' style={{ height: 150, width: 170 }} />
              </div>

              {TIMER > 0 && (
                <p className="Champs">Vote en cours, résultat dans :</p>
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

            <Col>

              {TIMER <= 0 && (
                <p className="Title">VOTE TERMINÉ</p>
              )
              }

              {TIMER > 0 && (
                <p className="Title">VOTE EN COURS</p>
              )
              }

              {TIMER > 0 && (     

              <FormControl component="fieldset">
                <p className='Champs' component="legend">Vote pour le titre de ton choix :</p>

                <RadioGroup style={{color: '#FF0060'}} aria-label="vote" name="vote1"> 
                {voteList}
                </RadioGroup>

              </FormControl>

              )
              }


              {TIMER <= 0 && (
                <Link to="/Winner">
                  <Button className="Button" type="primary" style={{ backgroundColor: '#584DAD', borderColor: '#584DAD', marginTop: 100, borderRadius: 5 }}>Découvrir le gagnant</Button>
                </Link>
              )
              }

              {TIMER > 0 && (
                <Button onClick={() => handleVoteGuest()} className="Button" type="primary" style={{ backgroundColor: '#584DAD', borderColor: '#584DAD', marginTop: 100, marginBottom: 50, borderRadius: 5 }}>Valider le vote</Button>
              )
              }
            </Col>

          </Row>

          <Button onClick={() => handleRefresh()} className="Button" type="primary" style={{ backgroundColor: '#E59622', borderColor: '#E59622', marginTop: 100, marginBottom: 50, borderRadius: 5 }}>Refresh</Button>


        </Container>
      </header>
    </div>
  );
}


function mapStateToProps(state) {
  return {
    hostId: state.hostId,
    token: state.token
  }
}

export default connect(
  mapStateToProps,
  null
)(Homeguest);