import React from 'react';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
class MiseJ extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      idUser: '',
      idEntre: '',
      nom: '',
      description: '',
      marque: '',
      prix: '',
      show: false,
      image: '',
      image1: '',
      image2: ''
    }

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.onChange = this.onChange.bind(this)
    this.handleUploadImage = this.handleUploadImage.bind(this);
  }
  componentDidMount() {
    axios.get('http://localhost:5000/api/users/publication/' + this.props.id)
      .then(resp => {
        this.setState({
          nom: resp.data.nom,
          description: resp.data.description,
          marque: resp.data.marque,
          image: resp.data.image,
          prix: resp.data.prix
        });
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleUploadImage(ev) {
    ev.preventDefault();

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

    axios.put('http://localhost:5000/api/users/publication/' + this.props.id,
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
      <div className="container-fluid">
        <Button variant="primary" onClick={this.handleShow}>
          modifier
      </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
        <form onSubmit={this.handleUploadImage}>
          <Modal.Header closeButton>
          </Modal.Header>
          <Modal.Body>
            

              <input className="form-control" type="text"
                value={this.state.nom}
                onChange={this.onChange}
                name="nom" placeholder="Nom" />

              <input className="form-control" type="text"
                value={this.state.description}
                onChange={this.onChange}
                name="description" placeholder="Description" />

              <input className="form-control" type="text"
                value={this.state.marque}
                onChange={this.onChange}
                name="marque" placeholder="Marque" />


              <input className="form-control" type="text"
                value={this.state.prix}
                onChange={this.onChange}
                name="prix" placeholder="Prix" />


              <input ref={(ref) => { this.uploadInput = ref; }} type="file" name="image" />
              <input ref={(ref1) => { this.uploadInput1 = ref1; }} type="file" name="image1" />
              <input ref={(ref2) => { this.uploadInput2 = ref2; }} type="file" name="image2" />
              



            

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>Fermer</Button>
            <button onClick={() => {
            this.handleClose()
            confirmAlert({
              customUI: () => {
                return (
                  <div className='custom-ui'>
                    <p>Mise à jour avec succé</p>
                    <center></center><a href="/dashboard" id="okajout" className="btn btn-primary">OK</a>
                  </div>
                );
              }
            });
          }}  className="btn btn-info">Publier</button>
          </Modal.Footer>
          </form>
        </Modal>
      </div>

    );
  }
}

export default MiseJ;


