import React, { Component } from 'react';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';



export default class Comments extends Component {

    constructor(props) {
        super(props);
        this.state = { produit: [] };
    }
    handleCha(e) {
        this.setState({ text: e.target.value })
        console.log('resultat recherche', this.state.text)
    }
    componentDidMount() {
        axios.get('http://localhost:5000/api/users/coms/')
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
                <p>{this.state.produit.length} commentaire</p>
                <button onClick={() => {
                    confirmAlert({
                        customUI: ({ onClose }) => {
                            return (
                                <div>

                                    {
                                        (this.state.produit.length > 0) ? (this.state.produit.map((obj) => {
                                            return <div className="container-fluid">

                                                <p>{obj.msg}</p>
                                            </div>
                                        })) : ('')
                                    }
                                    <i onClick={() => {onClose()}} class="fas fa-times"></i>
                                </div>
                            );
                        }
                    });
                }}>Voirs commentaire</button>

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