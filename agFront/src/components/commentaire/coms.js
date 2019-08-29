import React from 'react';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.css';
class Coms extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            msg: '',
            // mots_cles: '',
            // produitAuth: '',
            // email: '',
            // phones: ''
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
      msg: this.state.msg,
    //   mots_cles: this.state.mots_cles,
    //   produitAuth: this.state.produitAuth,
    //   email: this.state.email,
    //   phones: this.state.phones
    };
    axios.post(`http://localhost:5000/api/users/coms`, user)
      .then(res => {
        console.log(res);
        console.log(res.data);
        console.log(res.data.msg);
      })
    }

    render() {
        return (
            <div className="container-fluid">
                <form onSubmit={this.handlePost} className="">

                    <input type="text" name="msg" onChange={this.onChange} placeholder="votre commentaire"/>
                    {/* <input type="password" name="mots_cles" onChange={this.onChange} placeholder="mots_cles"/>
                    <input type="text" name="produitAuth" onChange={this.onChange} placeholder="produitAuth"/>
                    <input type="text" name="email" onChange={this.onChange} placeholder="email"/>
                    <input type="text" name="phones" onChange={this.onChange} placeholder="phones"/> */}
                    
                    <button id="validate" type="submit" className="btn btn-info">Valider</button>
                    
                    

                </form>
            </div>

        );
    }
}

export default Coms;
