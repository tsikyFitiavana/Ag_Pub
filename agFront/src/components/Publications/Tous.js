import React, { Component } from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom'
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
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
                                <MDBRow key={obj._id} id="mdbContent">
                                    <MDBCol size="5">
                                        <MDBContainer>
                                            <MDBRow className="contentImage">
                                                <MDBContainer>

                                                    <img className="img-fluid " id="mgList"
                                                        src={'http://localhost:5000/api/users/image/' + obj.image}
                                                        alt="pdp" />
                                                </MDBContainer>
                                                <MDBContainer>
                                                    <MDBRow >
                                                        <MDBCol size="6" className="mgListBas">
                                                            <img onClick={() => {
                                                                confirmAlert({
                                                                    customUI: ({ onClose }) => {
                                                                        return (
                                                                            <div id="ShowImagePop" className="">
                                                                                <img className="img-fluid widthena" id="mgListBasLeft" onClick={onClose}
                                                                                    src={'http://localhost:5000/api/users/image/' + obj.image1}
                                                                                    alt="pdp" />
                                                                            </div>)
                                                                    }
                                                                }
                                                                )

                                                            }
                                                            }
                                                                className="img-fluid " id="mgListBasLeft0"
                                                                src={'http://localhost:5000/api/users/image/' + obj.image1}
                                                                alt="pdp" />
                                                        </MDBCol>
                                                        <MDBCol size="6" className="mgListBas">
                                                            <img onClick={() => {
                                                                confirmAlert({
                                                                    customUI: ({ onClose }) => {
                                                                        return (
                                                                            <div id="ShowImagePop" className="">
                                                                                <img className="img-fluid widthena" id="mgListBasRigth" onClick={onClose}
                                                                                    src={'http://localhost:5000/api/users/image/' + obj.image2}
                                                                                    alt="pdp" />
                                                                            </div>)
                                                                    }
                                                                }
                                                                )

                                                            }
                                                            }

                                                                className="img-fluid " id="mgListBasRigth0"
                                                                src={'http://localhost:5000/api/users/image/' + obj.image2}
                                                                alt="pdp" />
                                                        </MDBCol>
                                                    </MDBRow>
                                                </MDBContainer>
                                            </MDBRow>
                                            <MDBRow>
                                                <p id="prixProduits">Prix: {obj.prix} Ar</p>
                                            </MDBRow>
                                        </MDBContainer>
                                    </MDBCol>
                                    <MDBCol size="7">
                                        <MDBContainer>
                                            <MDBRow>
                                                <h2>{obj.nom}</h2>
                                            </MDBRow>
                                            <MDBRow>
                                                <MDBContainer>
                                                    {/* <h3><u>Descriptions</u> :</h3>
                                                    <p>{obj.description}</p> */}
                                                    <p id="des" className="card-text"><strong>Description:  <span>{obj.description}</span> </strong> </p>

                                                    <div className="more">
                                                        &nbsp;&nbsp;
                                                    <a className="more-text" href="#!" id="plusmoins">
                                                            <span className="plus" id="plusartiste">Plus de description...</span>
                                                            <span className="moins" id="moinsmoins"></span>
                                                        </a>
                                                        <p className="hidetext">
                                                            <b>description complet: </b><br />{obj.description}
                                                        </p>

                                                    </div>

                                                </MDBContainer>
                                                <MDBContainer>
                                                    <p>Marque: {obj.marque}</p>
                                                </MDBContainer>
                                            </MDBRow>
                                            <MDBRow>
                                                <MDBCol size="4">
                                                    <p className="" onClick={() => {
                                                        confirmAlert({
                                                            customUI: ({ onClose }) => {
                                                                return (
                                                                    <div id="divConfirmComment" className="">

                                                                        <div className="row">
                                                                            <div className="col-md-11"></div>
                                                                            <div className="col-md-1"><p id="bouttonx" style={{ cursor: 'pointer' }} onClick={onClose}>X</p></div>
                                                                        </div>

                                                                        <h4 id="h2popups">Votre avis a propos de : {obj.nom}</h4>
                                                                        <FormControl margin="normal" required>
                                                                            <InputLabel htmlFor="msgIput">votre critere</InputLabel>
                                                                            <Input id="msgIput" required className="zonetext2" name="msg" onChange={this.onChange} value={this.state.value} placeholder="" />
                                                                        </FormControl>
                                                                        {/* <input required className="zonetext2" name="prenom" placeholder="Entre votre prénom" onChange={this.onChange} value={this.state.value} /><br></br>
                                                                <input required className="zonetext2" name="email" placeholder="Entrer votre e-mail" onChange={this.onChange} value={this.state.value} /><br></br>
                                                                <input required className="zonetext2" name="numtel" placeholder="Entre votre numero de téléphone" onChange={this.onChange} value={this.state.value} /><br /><br></br> */}
                                                                        <button
                                                                            onClick={() => {
                                                                                let bol = ''
                                                                                let checkenaVide = document.getElementById('msgIput').value
                                                                                if (checkenaVide == '') {
                                                                                    bol = prompt('etes vous sure de renvoyer un commentaire vide(oui/nom)')

                                                                                    if (bol !== 'oui') {
                                                                                        confirmAlert({
                                                                                            customUI: () => {
                                                                                                return (
                                                                                                    <div className='custom-ui'>
                                                                                                        <p>avis vide</p>
                                                                                                        <center></center><a href="/tous" id="okajout" className="btn btn-primary">OK</a>
                                                                                                    </div>
                                                                                                );
                                                                                            }
                                                                                        });
                                                                                    } else {
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
                                                                                        confirmAlert({
                                                                                            customUI: () => {
                                                                                                return (
                                                                                                    <div className='custom-ui'>
                                                                                                        <p>Merci pour votre francise</p>
                                                                                                        <center></center><a href="/tous" id="okajout" className="btn btn-primary">OK</a>
                                                                                                    </div>
                                                                                                );
                                                                                            }
                                                                                        });
                                                                                    }
                                                                                } else {
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
                                                                                    confirmAlert({
                                                                                        customUI: () => {
                                                                                            return (
                                                                                                <div className='custom-ui'>
                                                                                                    <p>ce ok</p>
                                                                                                    <center></center><a href="/tous" id="okajout" className="btn btn-primary">OK</a>
                                                                                                </div>
                                                                                            );
                                                                                        }
                                                                                    });
                                                                                }

                                                                                

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
                                                    }}><span id="btnCommentaire">Remarques </span> {obj.comsNumber} </p>
                                                </MDBCol>
                                                <MDBCol size="4">
                                                    <button id="btnVoirecommentaire" onClick={() => {
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
                                                                            <div id="regarderCommentaire">
                                                                                <div id="fermerRegardComment">
                                                                                    <i onClick={() => { onClose() }} className="fas fa-times"></i>
                                                                                </div>



                                                                                {
                                                                                    (res.data.length > 0) ? (res.data.map((obj) => {
                                                                                        return <div className="container-fluid">

                                                                                            <div id="listCommentDiv" key={obj._id}>{obj.msg}</div>
                                                                                        </div>
                                                                                    })) : ('')
                                                                                }

                                                                            </div>
                                                                        );
                                                                    }
                                                                });
                                                            })

                                                    }


                                                    }>voire message</button>
                                                </MDBCol>
                                                <MDBCol size="4">
                                                    <button id="btnCommande" onClick={() => {
                                                        confirmAlert({
                                                            customUI: ({ onClose }) => {
                                                                return (
                                                                    <div id="commanderPopUps" className="">

                                                                        <div className="row">
                                                                            <div className="col-md-11"></div>
                                                                            <div className="col-md-1"><p id="bouttonx" style={{ cursor: 'pointer' }} className="" onClick={onClose}>X</p></div>
                                                                        </div>

                                                                        <h4 id="h2popups">Commander : {obj.nom} et utiliser de vrais et unique e-mail</h4>
                                                                        <FormControl margin="normal" required>
                                                                            <InputLabel htmlFor="name">Entrer votre nom</InputLabel>
                                                                            <Input id="name" required className="zonetext" name="name" onChange={this.onChange} value={this.state.value} placeholder="" />
                                                                        </FormControl>
                                                                        <FormControl margin="normal" required>
                                                                            <InputLabel htmlFor="phones">Entre votre numero phones</InputLabel>
                                                                            <Input id="phones" required className="zonetext" name="phones" placeholder="" onChange={this.onChange} value={this.state.value} />
                                                                        </FormControl>
                                                                        <FormControl margin="normal" required>
                                                                            <InputLabel htmlFor="email">Entrer votre e-mail</InputLabel>
                                                                            <Input id="email" required className="zonetext" name="email" placeholder="" onChange={this.onChange} value={this.state.value} />
                                                                        </FormControl>
                                                                        <FormControl margin="normal" required>
                                                                            <InputLabel htmlFor="nombreDecom">Nombre d'exemplaire</InputLabel>
                                                                            <Input id="nombreDecom" className="zonetext" name="nombreDecom" placeholder="" onChange={this.onChange} value={this.state.value} />
                                                                        </FormControl>
                                                                        <FormControl margin="normal" required>
                                                                            <InputLabel htmlFor="adresse_exacte">Entre votre adresse exacte</InputLabel>
                                                                            <Input id="adresse_exacte" required className="zonetext" name="adresse_exacte" placeholder="" onChange={this.onChange} value={this.state.value} />
                                                                        </FormControl>
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
                                                                                        if (localStorage.getItem('resultatCommende') == 'Email already exists.') {
                                                                                            console.log(localStorage.getItem('resultatCommende'))
                                                                                        } else {
                                                                                            localStorage.setItem('resultatCommende', 'commende avec succes')
                                                                                            console.log('commende avec succes');
                                                                                            localStorage.getItem('resultatCommende')
                                                                                            console.log('apre modification' + localStorage.getItem('resultatCommende'));


                                                                                        }
                                                                                    })
                                                                                onClose();
                                                                                confirmAlert({
                                                                                    customUI: () => {
                                                                                      return (
                                                                                        <div className='custom-ui'>
                                                                                          <p>{localStorage.getItem('resultatCommende')}</p>
                                                                                          <center></center><a href="/tous" id="okajout" className="btn btn-primary">OK</a>
                                                                                        </div>
                                                                                      );
                                                                                    }
                                                                                  })
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
                                                    >Commander</button>
                                                </MDBCol>

                                            </MDBRow>
                                        </MDBContainer>
                                    </MDBCol>
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