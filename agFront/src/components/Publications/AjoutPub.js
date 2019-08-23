import React from 'react';
import axios from 'axios';

class Publication extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        idUser:'',
        idEntre:'',
        nom: '',
        description: '',
        marque: '',
        prix: '',
        image: ''
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

  const pub = new FormData();
    pub.append('image', this.uploadInput.files[0]);
    pub.append('nom', this.state.nom);
    pub.append('prix', this.state.prix);
    pub.append('marque', this.state.marque);
    pub.append('idUser', localStorage.id);
    pub.append('description', this.state.description)

  axios.post('http://localhost:5000/api/users/publication', 
 pub
  ).then((body) => {
      this.setState({ image: `http://localhost:5000/api/users/publication/${body.data.image}` });
      console.log('ity ilay body.image', body.data.image);
  });
}

  render() {
    return (
      <div className="container-fluid">
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
                <button id="validate" className="btn btn-info">Publier</button>
             
                

        </form>
      </div>

    );
  }
}

export default Publication;