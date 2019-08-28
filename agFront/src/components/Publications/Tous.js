import React, { Component } from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom'
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
// import PopupModal from '../commentaire/modaleComment'
// import Comments from '../commentaire/lireComs'

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';



export default class Tous extends Component {

    constructor(props) {
        super(props);
        this.state = { produit: [] };
        this.onChange = this.onChange.bind(this)
    }
    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handleCha(e) {
        this.setState({ text: e.target.value })
        console.log('resultat recherche', this.state.text)
    }
    componentDidMount() {
        axios.get('http://localhost:5000/api/users/publication/')
            .then(response => {
                console.log('i am a response', response)
                this.setState({ produit: response.data });
                console.log('i am a produit', this.state.produit)
            })
            .catch(function (error) {
                console.log(error);
            })



    }

    liste() {
        return <div>
            <div className="container-fluid">
                {
                    (this.state.produit.length > 0) ? (this.state.produit.map((obj) => {
                        return <div className="container-fluid">




                            <MDBContainer>
                                <MDBRow key={obj._id}>
                                    <MDBCol size="1">col</MDBCol>
                                    <MDBCol size="4">
                                        <div>
                                            <div className="contentImage">
                                                <img className="img-fluid " id="mgList"
                                                    src={'http://localhost:5000/api/users/image/' + obj.image}
                                                    alt="pdp" />
                                            </div>
                                            <p>Prix: {obj.prix} Ar</p>
                                        </div>
                                    </MDBCol>
                                    <MDBCol size="6">
                                        <h2>{obj.nom}</h2>
                                        <div className="container-fluid">
                                            <h3><u>Descriptions</u> :</h3>
                                            <p>{obj.description}</p>
                                            <p>Marque: {obj.marque}</p>
                                        </div>
                                    </MDBCol>
                                    <MDBCol size="1">col</MDBCol>
                                    <div className="row">
                                        <div className="container">
                                            <p className="bnt btn-primary" onClick={() => {
                                                confirmAlert({
                                                    customUI: ({ onClose }) => {
                                                        return (
                                                            <div id="div1" className="peach-gradient">

                                                                <div className="row">
                                                                    <div className="col-md-10"></div>
                                                                    <div className="col-md-2"><button id="bouttonx" className="btn peach-gradient" onClick={onClose}>X</button></div>
                                                                </div>

                                                                <h2 id="h2popups">Votre commentaire a propos de : {obj.nom}</h2>
                                                                <input required className="zonetext2" name="msg" onChange={this.onChange} value={this.state.value} placeholder="Entrer votre nom" /><br></br>
                                                                {/* <input required className="zonetext2" name="prenom" placeholder="Entre votre prénom" onChange={this.onChange} value={this.state.value} /><br></br>
                                                                <input required className="zonetext2" name="email" placeholder="Entrer votre e-mail" onChange={this.onChange} value={this.state.value} /><br></br>
                                                                <input required className="zonetext2" name="numtel" placeholder="Entre votre numero de téléphone" onChange={this.onChange} value={this.state.value} /><br /><br></br> */}
                                                                <button
                                                                    onClick={() => {
                                                                        axios.post(`http://localhost:5000/api/users/coms/` + obj._id, {
                                                                            msg: this.state.msg,
                                                                            entre: obj.nom
                                                                        })
                                                                            .then(res => {
                                                                                console.log(res);
                                                                                console.log(res.data);
                                                                                console.log(res.data.msg);
                                                                            })
                                                                        onClose();
                                                                    }


                                                                    }
                                                                    className="btn btn-primary" id="bouttonconfirmer" >
                                                                    Confirmer
                                                                        </button>
                                                                <button onClick={onClose} id="bottonanuler" className="btn btn-secondary">Annuler</button>
                                                            </div>
                                                        );
                                                    }
                                                });
                                            }}>comment {obj.comsNumber}</p>
                                            <button onClick={() => {
                                                axios.get(`http://localhost:5000/api/users/coms/` + obj.nom)
                                                    .then(res => {
                                                        console.log(res);
                                                        console.log(res.data);
                                                        for (let i = 0; i < res.data.length; i++) {
                                                            console.log(res.data[i].msg)
                                                        }
                                                        confirmAlert({
                                                            customUI: ({ onClose }) => {
                                                                return (
                                                                    <div>
                                    
                                                                        {
                                                                            (res.data.length > 0) ? (res.data.map((obj) => {
                                                                                return <div className="container-fluid">
                                    
                                                                                    <p key={obj._id}>{obj.msg}</p>
                                                                                </div>
                                                                            })) : ('')
                                                                        }
                                                                        <i onClick={() => {onClose()}} className="fas fa-times"></i>
                                                                    </div>
                                                                );
                                                            }
                                                        });
                                                    })
                                                    
                                            }


                                            }>voire comment</button>

                                        </div>
                                        <div onClick = {() => {
                                                confirmAlert({
                                                    customUI: ({ onClose }) => {
                                                        return (
                                                            <div id="div1" className="">

                                                                <div className="row">
                                                                    <div className="col-md-10"></div>
                                                                    <div className="col-md-2"><button id="bouttonx" className="" onClick={onClose}>X</button></div>
                                                                </div>

                                                                <h2 id="h2popups">Commender : {obj.nom}</h2>
                                                                <input required className="zonetext2" name="name" onChange={this.onChange} value={this.state.value} placeholder="Entrer votre nom" /><br></br>
                                                                <input required className="zonetext2" name="phones" placeholder="Entre votre numero phones" onChange={this.onChange} value={this.state.value} /><br></br>
                                                                <input required className="zonetext2" name="email" placeholder="Entrer votre e-mail" onChange={this.onChange} value={this.state.value} /><br></br>
                                                                <input  className="zonetext2" name="nombreDecom" placeholder="combien d'exemplaire" onChange={this.onChange} value={this.state.value} /><br /><br></br>
                                                                <input required className="zonetext2" name="adresse_exacte" placeholder="Entre votre adresse exacte" onChange={this.onChange} value={this.state.value} /><br /><br></br>
                                                                <button
                                                                    onClick={() => {
                                                                        axios.post(`http://localhost:5000/api/users/Commender/` + obj._id, {
                                                                            name: this.state.name,
                                                                            phones: this.state.phones,
                                                                            email: this.state.email,
                                                                            nombreDecom: this.state.nombreDecom,
                                                                            adresse_exacte: this.state.adresse_exacte,
                                                                            idProduitCommender: obj._id
                                                                        })
                                                                            .then(res => {
                                                                                console.log(res);
                                                                                console.log(res.data);
                                                                                localStorage.setItem('resultatCommende', res.data)
                                                                                console.log(localStorage.getItem('resultatCommende'))
                                                                                if(localStorage.getItem('resultatCommende') == 'Email already exists.'){
                                                                                    console.log(localStorage.getItem('resultatCommende'))
                                                                                }else{
                                                                                    localStorage.setItem('resultatCommende', 'commende avec succes')
                                                                                    console.log('commende avec succes');
                                                                                    localStorage.getItem('resultatCommende')
                                                                                    console.log( 'apre modification'+localStorage.getItem('resultatCommende'));
                                                                                    
                                                                                    
                                                                                }
                                                                            })
                                                                        onClose();
                                                                    }


                                                                    }
                                                                    className="btn btn-primary" id="bouttonconfirmer" >
                                                                    Confirmer
                                                                        </button>
                                                                <button onClick={onClose} id="bottonanuler" className="btn btn-secondary">Annuler</button>
                                                            </div>
                                                        );
                                                    }
                                                });
                                            }}
                                         >Commender</div>
                                    </div>
                                </MDBRow>
                            </MDBContainer>
                        </div>
                    })) : ('')
                }
            </div>
        </div>
    }
    render() {
        return (
            <div>
                {this.liste()}
            </div>
        );
    }
}