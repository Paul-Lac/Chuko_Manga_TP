import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./ProfilTabFeedback.css";

function ProfilTabFeedback() {
  const { id } = useParams();
  const [evaluations, setEvaluations] = useState([]);

  // useEffect(() => {
  //   fetch(`http://localhost:3310/api/users/${id}/feedbacks`, {
  //     credentials: "include", // Ceci permet d'inclure les cookies dans la requête
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       // console.info("commentairesTableau:", data);
  //       setEvaluations(data);
  //     });
  // }, [id]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3310/api/users/${id}/feedbacks`,
          {
            withCredentials: true,
          }
        );
        // console.info("commentairesTableau:", response.data);
        setEvaluations(response.data);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      }
    };

    fetchFeedbacks();
  }, [id]);

  function renderStars(averageRating) {
    const fullStars = Math.floor(averageRating); // Nombre d'étoiles pleines
    const decimalPart = averageRating - fullStars; // Partie décimale de la note
    let partialStar = ""; // Classe pour l'étoile partielle
    // Déterminer la classe de l'étoile partielle en fonction de la partie décimale
    if (decimalPart >= 0.75) {
      partialStar = "half-star";
    } else if (decimalPart >= 0.25) {
      partialStar = "half-star";
    } else {
      partialStar = "empty-star";
    }
    // Création des étoiles en fonction du nombre d'étoiles pleines et de l'étoile partielle
    const stars = [];
    for (let i = 0; i < 5; i += 1) {
      if (i < fullStars) {
        stars.push(
          <div key={i} className="star full-star">
            ★
          </div>
        );
      } else if (i === fullStars && partialStar === "half-star") {
        stars.push(
          <div key={i} className={`star ${partialStar}`}>
            ★
          </div>
        );
      } else {
        stars.push(
          <div key={i} className="star empty-star">
            ★
          </div>
        );
      }
    }
    return <div className="starcontainer">{stars}</div>;
  }

  const averageRating =
    evaluations.reduce(
      (total, evaluation) => total + parseFloat(evaluation.average_rating),
      0
    ) / evaluations.length;

  return (
    <div className="containerEvaluations">
      {evaluations?.length > 0 ? (
        <div className="containerNote">
          {console.info(evaluations)}
          <p className="average_rating">{`${(Math.round(averageRating * 100) / 100).toFixed(2)}`}</p>
          <div className="StarNumbCom">
            <div className="starcontainer">
              {renderStars(parseFloat(averageRating))}
            </div>
            <p className="Number_comment">({evaluations.length})</p>
          </div>
        </div>
      ) : (
        <p className="no-feedback-msg">Aucune évaluation pour le moment.</p>
      )}
      {evaluations?.map((evaluation) => (
        <div key={evaluation.id} className="cardCom">
          {console.info(evaluation.average_rating)}
          <div className="containerCom">
            <div className="pictureBuyerCom">
              <Link to={`/profilseller/${evaluation.user_buyer}`}>
                <img
                  className="picture_buyer"
                  src={`http://localhost:3310${evaluation.picture_buyer}`}
                  alt="image_buyer"
                />
              </Link>
            </div>
            <div className="comment-buyer">
              <div className="speudoBuyer">
                <Link to={`/profilseller/${evaluation.user_buyer}`}>
                  {`${evaluation.pseudo}`}{" "}
                </Link>
              </div>
              <div className="createdOn">
                {`${evaluation.created_on ? new Date(evaluation.created_on).toLocaleDateString("fr-FR").split("/").join("-") : ""}`}
              </div>
              <div className="rating">
                {renderStars(parseFloat(evaluation.rating))}
              </div>
              <div className="comment">{`${evaluation.comment}`}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProfilTabFeedback;
