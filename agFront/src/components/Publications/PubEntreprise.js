import React, { Component } from 'react';
import axios from 'axios';

// import { Link } from 'react-router-dom';

export default class PubEntre extends Component {

    constructor(props) {
        super(props);
        this.state = { profil: [] };

    }
    // delete() {
    //     axios.get(`http://localhost:5000/api/users/publicationDeleted/${localStorage.id}`)
    //         .then(console.log('Deleted'))
    //         .catch(err => console.log(err))
    // }
    componentDidMount() {
        axios.get(`http://localhost:5000/api/users//societeProduit/${localStorage.getItem('cles')}`)
            .then(response => {
                console.log('user-article ==== ', response)
                this.setState({ profil: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })

        

    }
    
    listeEntre() {

        return <div id="pub-entreprise">
            <h2>PRODUITS DE {localStorage.getItem('nomEntre')}</h2>
        <table className="table" >
                    <thead>
                        <tr>
                            <th>NOM</th>
                            <th>DESCRIPTION</th>
                            <th>PRIX</th>
                            <th>MARQUE</th>
                            <th>PHOTO</th>
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
                                        <img width="150px" height="50px" src={'http://localhost:5000/api/users/image/'+obj.image} alt="pdp" />
                                    </td>
                                    {console.log(obj)}
                                </tr>

                            })) : ('')
                        }
                    </tbody>
                </table>
                </div>
    }
    render() {
        return (
            <div className='app1'>
                {this.listeEntre()}
            </div>
        );
    }
}