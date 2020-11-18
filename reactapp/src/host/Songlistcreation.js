import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import { Button, Input } from 'antd';
import { Container, Row, Col, Badge } from 'reactstrap'
import '../App.css';
import { Redirect, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIcons, faTrash, faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux';

function Songlistcreation(props) {

  const [titreProposeHote, setTitreProposeHote] = useState();
  const [TOPlist, setTOPlist] = useState([]);
  const [errorArtist, setErrorArtist] = useState();

  const [error, setError] = useState();

  const [shareevent, setShareevent] = useState(false);

  useEffect(() => {
    const findTOP = async () => {
      // ----------------------------------------- METTRE A JOUR l'IP --------------------------------------------
      const TOPdata = await fetch('/findTOP', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `userIdFromFront=${props.hostId}`
      })
      var TOP = await TOPdata.json();
      console.log('TOP', TOP)
      setTOPlist(TOP.randomTitles)
    }

    setError()
    setTitreProposeHote();
    findTOP()

  }, [])


  var handleAjouterTitre = async () => {

    if (titreProposeHote === undefined) {
      setErrorArtist(<Badge status="error" badgeStyle={{ color: 'white', backgroundColor: '#FF0060' }} value="Le champ est vide"></Badge>)

    } else {

      setErrorArtist()
      setTOPlist([...TOPlist, titreProposeHote])
      setTitreProposeHote();
    }

    var rawResponse = await fetch('/ajoutertitre', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `titreFromFront=${titreProposeHote}&userIdFromFront=${props.hostId}`
    })

    var response = await rawResponse.json();
    setError()

    console.log("titre proposé ========= ", titreProposeHote)
  }


  var handleSupprimerTitre = async (element) => {

    setTOPlist(TOPlist.filter((e) => (e !== element)))

    var rawResponse = await fetch('/supprimertitre', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `titreFromFront=${element}&idUserFromFront=${props.hostId}`
    })

    var response = await rawResponse.json();
    setError()

    console.log(response);
  }


  var handleValidationList = async () => {

    if (TOPlist.length > 2) {

      setError();
      console.log('>3', TOPlist);
    

      //Déclenchement du timer 10min
      var rawResponse = await fetch('/initTimer10', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `idUserFromFront=${props.hostId}`
      });

      var response = await rawResponse.json()

      console.log(response)

      if (response.result === true) {
        props.onSettingPlaylist(TOPlist);
        setShareevent(true);
      }
    }

    else {
      console.log('else')
      setError(<Badge className="Champs" status="error" style={{ color: '#fff', backgroundColor: '#FF0060' }} value='Merci de choisir au moins 3 titres'>Merci de choisir au moins 3 titres</Badge>)
    }
  }

  if (shareevent) {
    return <Redirect to='/Shareevent' />
  }


  var listHote = TOPlist.map((titre, i) => {
    return (
      <div style={{ display: "flex", flexDirection: "row", justifyContent: 'center' }} key={i}>

        <p className="Champs">{titre}</p>
        <FontAwesomeIcon
          onClick={() => handleSupprimerTitre(titre)}
          icon={faTrash}
          style={{ color: "#fff", marginLeft: '4%', width: 18 }}
        />
      </div>
    )
  }
  )

  return (
    <div className="App">
      <header className="App-header">
        
        <Container>

          <div className="Header mt-4">
            <img src='../logoMini.png' alt='logo-dj'></img>
            <p className="Title">DJ HÔTE</p>


            <p className='Title' style={{ textAlign: 'center' }}>Bienvenue dans la soirée</p>
          </div>
          <Row className="Row">



            <Col className="Card m-4">

              <p>Compose ta liste de titres candidats aux votes</p>
              <p className='Champs'>(3 titres minimum).</p>

           

              <div style={{ display: 'flex', flexDirection: 'column' }}>

                {listHote}
              </div>

              {error}



            </Col>

            <Col className="Card m-4">
              <p className="Champs">Artiste - Titre :</p>
              <Input className="Input" style={{ borderRadius: 5 }} placeholder="Shakira - Waka Waka" type='text' onChange={(text) => setTitreProposeHote(text.target.value)} value={titreProposeHote} />

              <Button onClick={() => handleAjouterTitre()} className="Button" type="primary" style={{ backgroundColor: '#584DAD', borderColor: '#584DAD', marginTop: 20, borderRadius: 5 }}>Ajouter le titre</Button>

            </Col>

          </Row>
          <Button onClick={() => handleValidationList()} className="Button" type="primary" style={{ backgroundColor: '#584DAD', borderColor: '#584DAD', marginTop: 100, marginBottom: 50, borderRadius: 5 }}>Valider la liste</Button>

        </Container>
      </header>
    </div>
  );
}



function mapStateToProps(state) {
  return {
    nameToDisplay: state.EventName, hostId: state.hostId,

  }
}

function mapDispatchToProps(dispatch) {
  return {
    onSettingPlaylist: function (playlist) {
      dispatch({ type: 'setPlaylist', reduxPlaylist: playlist })
    }
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Songlistcreation);