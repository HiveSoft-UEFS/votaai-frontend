import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './LoginScreen.css';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

export default function Index({id = 'modal', onClose = () => {}, email = {}, password = {}}){ 
  const handleModalClick = (event: any) => {if(event.target.id == id) onClose();}
  // 9 até 12 Recebe os dados do testfield de senha e email
  const [valorEmail, setEmail] = useState("");
  const [valorPassword, setPassword] = useState("");
  const handleChangeEmail = (event : any) => {setEmail(event.target.value);}
  const handleChangePassword = (event : any) => {setPassword(event.target.value);}
  //Verifica se o email e senha estam corretos
  //const verification = (event : any) => {
  // if((valorEmail !== email && valorEmail.length !== 0) || (valorPassword != password && valorPassword.length !== 0)){
   //   document.getElementById('error-Password-email').style.display = "block";
  //  }else if((valorEmail === email && valorEmail.length !== 0) && (valorPassword === password && valorPassword.length !== 0)){
   //   <h1></h1>
   // }

  return(
    <div id = {id} className = "modal" onClick={handleModalClick}>
      <div className = "container">
        <img className = "logo" src = "https://i.ibb.co/b2rqJTF/Logo.png/293x205" alt = "Logo"/>
          <div className = "input-group" style = {{paddingTop: "29.47px", paddingRight: "44px"}}>
              <span className = "input-group-icon" id = "icon-email">@</span>
              <input type = "email" onChange = {handleChangeEmail} className = "form-control" placeholder = "EMAIL" aria-label = "EMAIL" aria-describedby = "icon-email"/>
          </div>
          <div className = "input-group" style = {{paddingTop: '12px', paddingRight: '44px'}}>
              <span className = "input-group-icon" id = "icon-lock-fill" style = {{paddingLeft: "5px"}}><img src = "https://i.ibb.co/m4z2j43/lock-fill.png/31x31" alt = "lock-fill"/></span>
              <input type = "password" onChange = {handleChangePassword} className = "form-control" placeholder = "SENHA" aria-label = "SENHA" aria-describedby = "icon-lock-fill"/>
          </div>
          <div id = 'error-Password-email' className = 'error'>
          </div>
        <Button className = "button-log-into" variant = 'contained' style = {{background:'#04345C'}}>ENTRAR</Button>
        <div className = "hivesoft">
          <img src = "https://i.ibb.co/vBRRQVp/2024-Hive-Soft-Inc.png" alt = "2024-Hive-Soft-Inc"/>
        </div>
        <div>
          <button type="button" className="button-close" aria-label="Close" onClick = {onClose}>X</button>
        </div>
        <div className = 'link-password'>
          <p><a className = "link-opacity-50-hover"style = {{paddingTop:"0px"}} href = "#">Esqueceu a senha?</a></p>
        </div>
        <div className = "link-register">
          <p><a className = "link-opacity-50-hover" style = {{paddingTop:"0px"}} href = "#">Não possuo cadastro</a></p>
        </div>
        <div className = "group-check" style = {{paddingTop: "3px"}}>
          <input className = "form-check-input" type = "checkbox" id = "box"/>
          <label className = "check-text" htmlFor = "box">Mantenha-me conectado</label>
        </div>
      </div>
    </div>
  );
}