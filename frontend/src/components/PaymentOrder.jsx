/* eslint-disable react/prop-types */
import "./PaymentOrder.css";

function PaymentOrder({ articleInfo }) {
  return (
    <div className="component-card">
      <li key={articleInfo.id}>
        <div className="card-Payment">
          <img
            className="img-command-annonce"
            src={`http://localhost:3310${articleInfo.image_paths[0]}`}
            alt={articleInfo.title_advert}
          />
          <div className="information-card">
            <h3>{articleInfo.title_advert}</h3>
            <div className="user-section">
              <img
                src={`http://localhost:3310${articleInfo.user_picture}`}
                alt="userImage"
                className="img-profil-annonce"
              />
              <p> {articleInfo.pseudo}</p>
            </div>
            <p>État : {articleInfo.name_condition}</p>
            <p>{articleInfo.price} €</p>
          </div>
        </div>
      </li>
    </div>
  );
}
export default PaymentOrder;
