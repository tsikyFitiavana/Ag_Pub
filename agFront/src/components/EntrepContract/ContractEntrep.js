import React from 'react';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';
class Entre extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nom: '',
            mots_cles: '',
            produitAuth: '',
            email: '',
            phones: ''
        }
        this.onChange = this.onChange.bind(this)
        this.handlePost = this.handlePost.bind(this);
    }


    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handlePost(ev) {
        ev.preventDefault();

    const user = {
      nom: this.state.nom,
      mots_cles: this.state.mots_cles,
      produitAuth: this.state.produitAuth,
      email: this.state.email,
      phones: this.state.phones
    };
    axios.post(`http://localhost:5000/api/users/entreprise`, user)
      .then(res => {
        console.log(res);
        console.log(res.data);
        console.log(res.data.nom);
      })
    }

    render() {
        return (
            <div className="container-fluid">
                <form onSubmit={this.handlePost} className="">

                    <input type="text" name="nom" onChange={this.onChange} placeholder="nom"/>
                    <input type="password" name="mots_cles" onChange={this.onChange} placeholder="mots_cles"/>
                    <input type="text" name="produitAuth" onChange={this.onChange} placeholder="produitAuth"/>
                    <input type="text" name="email" onChange={this.onChange} placeholder="email"/>
                    <input type="text" name="phones" onChange={this.onChange} placeholder="phones"/>
                    
                    <button onClick={() => {
            confirmAlert({
              customUI: () => {
                return (
                  <div className='custom-ui'>
                    <p>contrat bien fait</p>
                    <center></center><a href="/" id="okajout" className="btn btn-primary">OK</a>
                  </div>
                );
              }
            });
          }}
                     id="validate" type="submit" className="btn btn-info">Valider</button>
                    
                    

                </form>
            </div>

        );
    }
}

export default Entre;