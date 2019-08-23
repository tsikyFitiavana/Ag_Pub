import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'


export default class Tous extends Component {

    constructor(props) {
        super(props);
        this.state = { produit: [] };

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
                            <div id="ligne" className="row" key={obj._id}>
                                <div className="container">
                                    <img className="img-fluid " id="mgList"
                                        src={'http://localhost:5000/api/users/image/' + obj.image}
                                        alt="pdp" />
                                </div>
                                <div className="container">
                                    <div className="container-fluid">
                                        <div className="row">
                                            <div className="container-fluid">
                                                <ul>
                                                    <li><h2>{obj.nom}</h2></li>
                                                    <li>
                                                        <ul>
                                                            <li>Prix: {obj.prix} Ar</li>
                                                        </ul>
                                                        <ul>
                                                            <li>Marque: {obj.marque} Ar</li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                                
                                            </div>
                                            <div className="container-fluid">
                                                <div className="container-fluid">
                                                    <h3><u>Descriptions</u> :</h3>
                                                    <p>{obj.description}</p>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="row">
                                            <div className="container">
                                                <Link to="/Particulier/" className="btn btn-sm btn-great light orange">M'INSCRIRE</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
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