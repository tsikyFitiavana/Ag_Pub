import React from 'react';
import axios from 'axios';

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
      image: ''
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
      console.log('ity ilay body.image', body.data.image);
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
              



            

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>Fermer</Button>
            <button  className="btn btn-info">Publier</button>
          </Modal.Footer>
          </form>
        </Modal>
      </div>

    );
  }
}

export default MiseJ;


