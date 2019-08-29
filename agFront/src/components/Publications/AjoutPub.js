import React from 'react';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

class Publication extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idUser: '',
      clesEntreprPub: '',
      nom: '',
      description: '',
      marque: '',
      prix: '',
      image: '',
      image2: '',
      image1: ''
    }
    this.onChange = this.onChange.bind(this)
    this.handleUploadImage = this.handleUploadImage.bind(this);
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleUploadImage(ev) {
    ev.preventDefault();
    console.log(localStorage.getItem('cles'));

    const pub = new FormData();
    pub.append('image', this.uploadInput.files[0]);
    pub.append('image1', this.uploadInput1.files[0]);
    pub.append('image2', this.uploadInput2.files[0]);
    pub.append('nom', this.state.nom);
    pub.append('clesEntreprPub', localStorage.getItem('cles'));
    pub.append('prix', this.state.prix);
    pub.append('marque', this.state.marque);
    pub.append('idUser', localStorage.id);
    pub.append('description', this.state.description)

    axios.post('http://localhost:5000/api/users/publication',
      pub
    ).then((body) => {
      this.setState({ image: `http://localhost:5000/api/users/publication/${body.data.image}` });
      this.setState({ image1: `http://localhost:5000/api/users/publication/${body.data.image1}` });
      this.setState({ image2: `http://localhost:5000/api/users/publication/${body.data.image2}` });
      console.log('ity ilay body.image', body.data.image);
      console.log('ity ilay body.image1', body.data.image1);
      console.log('ity ilay body.image2', body.data.image2);
    });
  }

  render() {
    return (
      <div className="container-fluid" id="ajout">
        <form onSubmit={this.handleUploadImage}>

          <input className="form-control" type="text"
            value={this.state.value}
            onChange={this.onChange}
            name="nom" placeholder="Nom" />

          <input className="form-control" type="text"
            value={this.state.value}
            onChange={this.onChange}
            name="description" placeholder="Description" />

          <input className="form-control" type="text"
            value={this.state.value}
            onChange={this.onChange}
            name="marque" placeholder="Marque" />


          <input className="form-control" type="text"
            value={this.state.value}
            onChange={this.onChange}
            name="prix" placeholder="Prix" />


          <input ref={(ref) => { this.uploadInput = ref; }} type="file" name="image" />
          <input ref={(ref1) => { this.uploadInput1 = ref1; }} type="file" name="image1" />
          <input ref={(ref2) => { this.uploadInput2 = ref2; }} type="file" name="image2" />
          <button onClick={() => {
            confirmAlert({
              customUI: () => {
                return (
                  <div className='custom-ui'>
                    <p>publication avec succé</p>
                    <center></center><a href="/dashboard" id="okajout" className="btn btn-primary">OK</a>
                  </div>
                );
              }
            });
          }} id="validate" className="btn btn-info">Publier</button>



        </form>
      </div>

    );
  }
}

export default Publication;