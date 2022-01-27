
import "./App.css";
import axios from "axios";

import React, { Component } from 'react'

export default class App extends Component {
  email=React.createRef();
  asunto=React.createRef();
  mensaje=React.createRef();


  state={
    email:"",
    asunto:"",
    mensaje:"",
 
  };

  comprobarCambios=()=>{
    var email= this.email.current.value;
    var asunto=this.asunto.current.value;
    var mensaje=this.mensaje.current.value;
   
    this.setState({
      email:email,
      asunto:asunto,
      mensaje:mensaje,
 

    });
  };

  constructor(){
    super();
    this.enviarEmail = this.enviarEmail.bind(this);
  }

  async enviarEmail(e){
    e.preventDefault();
    const{email,asunto,mensaje}=this.state;
    const form = await axios.post("/api/form",{
      email,
      asunto,
      mensaje,

    });
  }

  render() {
    return (
      <div>
        <form className="formulario" onSubmit={this.enviarEmail}>
          <h1>Envuando Emails en React</h1>
          <div>
            <label htmlFor="email">Email:</label>
            <input
            type="email"
            name="email"
            onChange={this.comprobarCambios}
            className="form-control"
            ref={this.email}
            />
          </div>
          <div>
            <label htmlFor="asunto">asunto:</label>
            <input
            type="text"
            name="asunto"
            onChange={this.comprobarCambios}
            className="form-control"
            ref={this.asunto}
            />
          </div>
          <div>
            <label htmlFor="mensaje">mensaje:</label>
            <textarea
            rows="4"
            name="mensaje"
            onChange={this.comprobarCambios}
            className="form-control"
            ref={this.mensaje}
            />
          </div>
          <div>
          <label for="file">Select a file:</label>
            <input type="file" id="file" name="file"/>
            </div>
          <div>
            <br/>
            <button type="submit" className="btn btn-primary">Enviar</button>
          </div>
          

        </form>
      </div>
    )
  }
}

