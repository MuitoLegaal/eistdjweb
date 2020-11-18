import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import { Button, Input } from 'antd';
import { Container, Row, Col, Badge } from 'reactstrap'
import '../App.css';
import { Redirect } from 'react-router-dom';
import {connect} from 'react-redux';

function Login(props) {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')


  const [emailSI, setEmailSI] = useState('');
  const [passwordSI, setPasswordSI] = useState('')
  const [signInDenied, setSignInDenied] = useState()
  const [signUpDenied, setSignUpDenied] = useState();

  const[homehost, setHomehost] = useState(false)
  const[firsthome, setFirsthome] = useState(false)

  var response;

  // useEffect(() => {

  //   console.log("response", response)

  // }, [homehost])


  var handleSignUp = async () => {

    var rawResponse = await fetch('/sign-up', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `username=${username}&email=${email}&password=${password}`
    })

    var response = await rawResponse.json();
    console.log(response);


    if (response.result === false) {
      console.log('SignUp Failed')
      setSignInDenied()
      setSignUpDenied(<Badge style={{color: 'white', backgroundColor:'#FF0060', fontSize:12, marginTop: '4vh'}} value="Email déjà existant">Email déjà existant</Badge>)
    } else {
      var hostId = response.hote._id
      console.log('hostID', hostId)
      console.log('SignUp Success2')
      props.addId(hostId)
      setFirsthome(true)
    }

  };

     
var handleSignIn = async() => {
 
      var rawResponse = await fetch('/sign-in', {
              method: 'POST',
              headers: {'Content-Type': 'application/x-www-form-urlencoded'},
              body: `email=${emailSI}&password=${passwordSI}`
          })
  
      var response = await rawResponse.json();
      
      if(response.result === false){
        console.log('SignIn Failed')
          setSignUpDenied()
          setSignInDenied(<Badge style={{color: 'white', backgroundColor:'#FF0060', fontSize:12, marginTop: '4vh'}} value="Email et/ou Mot de Passe Incorrect(es)">Email et/ou Mot de Passe Incorrect(es)</Badge>)
      } else {
          var hostId = response.hote._id
          // await AsyncStorage.setItem("hostId", JSON.stringify(hostId));
          console.log('SignIn Success')
          props.addId(hostId);
          setSignInDenied()
          if (response.isEvent){
           setHomehost(true)
          }
         
          else { 
            setFirsthome(true)
          }
          
      }
  }
    
  if(firsthome){
    return <Redirect to='/Firsthome'></Redirect>
  }

  else if (homehost){
    return <Redirect to='/Homehost'></Redirect>
  }


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
              <p className="Subtitle">INSCRIPTION</p>
              <p className="Champs">Nom d'utilisateur :</p>
              <Input className="Input" style={{ borderRadius: 5 }} placeholder="Nom d'utilisateur" type='text'  onChange={(text) => setUsername(text.target.value)} value={username} />
              <p className="Champs">Email :</p>
              <Input className="Input" style={{ borderRadius: 5 }} placeholder="Email" type='text'  onChange={(text) => setEmail(text.target.value)} value={email} />
              <p className="Champs">Mot de passe :</p>
              <Input className="Input" style={{ borderRadius: 5 }} placeholder='•••••••••' type="password" secureTextEntry={true}  onChange={(text) => setPassword(text.target.value)} value={password}/> 
             
              {signUpDenied}
              
                <Button onClick={()=> handleSignUp()} className="Button" type="primary" style={{ backgroundColor: '#584DAD', borderColor: '#584DAD', marginTop: 100, borderRadius: 5 }}>
                S'inscrire
                </Button>
           
            </Col>

            <Col className="Card m-4">
              <p className="Subtitle">CONNEXION</p>
              <p className="Champs">Email :</p>
              <Input className="Input" style={{ borderRadius: 5 }} placeholder="Email" type="text" onChange={(text) => setEmailSI(text.target.value)} value={emailSI} />
              <p className="Champs">Mot de passe</p>
              <Input className="Input" style={{ borderRadius: 5 }} placeholder='•••••••••' type="password" secureTextEntry={true} onChange={(text) => setPasswordSI(text.target.value)} value={passwordSI}/>

              {signInDenied}

              
              
                <Button onClick={()=> handleSignIn()} className="Button" type="primary" style={{ backgroundColor: '#584DAD', borderColor: '#584DAD', marginTop: 100, borderRadius: 5 }}>
                Se connecter
                </Button>
            
            </Col>

          </Row>


        </Container>
      </header>
    </div>
  );


}


function mapDispatchToProps(dispatch) {
  return {
    addId: function (hostId) { 
      dispatch( {type: 'addId', hostId: hostId} )
    }
  }
}

export default connect (null, mapDispatchToProps)(Login);