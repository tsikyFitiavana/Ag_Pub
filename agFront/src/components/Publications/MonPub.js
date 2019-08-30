import React, { Component } from 'react';
import axios from 'axios';
import MiseJ from '../Publications/MiseAJour'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
export default class MonPub extends Component {

    constructor(props) {
        super(props);
        this.state = { profil: [] };

    }
    delete() {
        console.log(localStorage.id)
        axios.get(`http://localhost:5000/api/users/publicationDeleted/${localStorage.id}`)
            .then(console.log('Deleted'))
            .catch(err => console.log(err))
    }
    componentDidMount() {
        axios.get(`http://localhost:5000/api/users/monProduit/${localStorage.id}`)
            .then(response => {
                console.log('user-article ==== ', response)
                this.setState({ profil: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })



    }

    liste() {
        return <table className="table">
            <thead>
                <tr>
                    <th>NOM</th>
                    <th>DESCRIPTION</th>
                    <th>PRIX</th>
                    <th>MARQUE</th>
                    <th>PHOTO</th>
                    <th>MINIPHOTO1</th>
                    <th>MINIPHOTO2</th>
                    <th>ACTION</th>
                </tr>
            </thead>
            <tbody>
                {
                    (this.state.profil.length > 0) ? (this.state.profil.map((obj) => {

                        return <tr key={obj._id}>
                            <td>{obj.nom}</td>
                            <td>{obj.description}</td>
                            <td>{obj.prix}</td>

                            <td>{obj.marque}</td>
                            <td>
                                <img width="70px" height="50px" src={'http://localhost:5000/api/users/image/' + obj.image} alt="pdp" />
                            </td>
                            <td>
                                <img width="70px" height="50px" src={'http://localhost:5000/api/users/image/' + obj.image1} alt="pdp" />
                            </td>
                            <td>
                                <img width="70px" height="50px" src={'http://localhost:5000/api/users/image/' + obj.image2} alt="pdp" />
                            </td>
                            <td>
                                <MiseJ id={obj._id} />
                                <button onClick={()=> 
                                // {
                                //     axios.get(`http://localhost:5000/api/users/publicationDeleted/${obj._id}`)
                                //                                 .then(console.log('Deleted' ,obj._id))
                                //                                  .catch(err => console.log(err))
                                // }
                                {
                                    confirmAlert({
                                        customUI: ({ onClose }) => {
                                            return (
                                                <div className='custom-ui'>
                                                    <p>êtes vous sure de suprimer {obj.nom}</p>
                                                    <a  href="/dashboard"  id="okajout" className="btn btn-primary" onClick={() => {

                                                        axios.get(`http://localhost:5000/api/users/publicationDeleted/${obj._id}`)
                                                            .then(console.log('Deleted'))
                                                            .catch(err => console.log(err))
                                                        onClose();
                                                        
                                                    }}>oui</a>
                                                    <button onClick={onClose} id="bottonanuler" className="btn btn-secondary">Annuler</button>
                                                </div>
                                            );
                                        }
                                    })
                                }
                                     //this.delete
                                } className="btn btn-great dark red">Delete</button>
                            </td>
                            {console.log(obj)}
                        </tr>

                    })) : ('')
                }
            </tbody>
        </table>
    }
    render() {
        return (
            <div className='app1'>
                {this.liste()}
            </div>
        );
    }
}