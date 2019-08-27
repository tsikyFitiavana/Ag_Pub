import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import PopupModal from '../commentaire/modaleComment'
import Comments from '../commentaire/lireComs'




export default class Tous extends Component {

    constructor(props) {
        super(props);
        this.state = { produit: [] };
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
                localStorage.setItem('loc', response.data[1].place)
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
                                            <p className="bnt btn-primary"><PopupModal/></p>
                                            <Comments/>
                                            
                                        </div>
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