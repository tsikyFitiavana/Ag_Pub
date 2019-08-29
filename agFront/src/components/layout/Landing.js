import React, { Component } from "react";
import { Link } from "react-router-dom";
class Landing extends Component {
  render() {

    let imgUrl = 'https://i.pinimg.com/originals/2b/84/53/2b8453d9c9f6e1e1c35dcb523e516478.jpg';

    return (
      <div>
        <div className="card card-image" id="header" style={{
          backgroundImage: 'url(' + imgUrl + ')',
          backgroundSize: 'cover', backgroundPosition: 'center center', backgroundRepeat: 'no-repeat',
        }}>
          <div className="text-white text-center rgba-stylish-strong py-5 px-4">
            <div className="py-5">
              <h2 id="h2accueil">ETES-VOUS INSATISFAIT DES STRATEGIES MARKETING COUTEUSES MAIS EGALEMENT LIMITEES ?</h2>
              <p className="mb-4 pb-2 px-md-5 mx-md-5"><span id="spanheader">Le site Ag-Pub est fait pour vous</span>
                <br /><br /> Nous vous offrons la possibilité de faire de la publicité pour votre produit <br />
                en louant un site Web à un prix abordable et en vous proposant des offres<br/> renouvelables à votre guise.
              </p>
              <p>Si vous êtes intéressé, envoyez-nous vos informations afin que nous puissions<br/>  vous laisser le temps de remplir le contrat.</p>
            </div>
            <Link
                to="/register"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                S'inscrire
              </Link>
              <Link
                to="/login"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="btn btn-large btn-flat waves-effect white black-text"
              >
                Connexion
              </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
