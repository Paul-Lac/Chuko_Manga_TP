import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProfilTabOrder.css";
import axiosInstance from "../services/axiosInstance";

function ProfilTabOrder() {
  const { id } = useParams();
  const [historyOrders, setHistoryOrders] = useState([]);

  useEffect(() => {
    axiosInstance
      .get(`/buyers/${id}/orders`, {
        withCredentials: true,
      })
      .then((res) => {
        console.info("Mon historique d'achat:", res.data);
        setHistoryOrders(res.data);
      });
  }, [id]);

  function orderStatusClass(status) {
    switch (status) {
      case "completed":
        return "completed";
      case "pending":
        return "pending";
      case "cancelled":
        return "cancelled";
      default:
        return "default";
    }
  }
  return (
    <div className="tab-order">
      {historyOrders.length > 0 ? (
        historyOrders?.map((order) => (
          <div key={order.id}>
            <li className="order-item">
              <img
                className="img-order"
                src={`http://localhost:3310${order.image_path}`}
                alt="image_article_seller"
              />
              <div className="order-advert-info">
                <div className="order-info-title">{`${order.title_advert}`}</div>
                <div className="order-info-price">
                  {`${order.total_price}`} €
                </div>
              </div>
              <div className="order-details">
                <div className="order-date">
                  Acheté le :{" "}
                  {`${order.order_date ? new Date(order.order_date).toLocaleDateString("fr-FR").split("/").join("-") : ""}`}
                </div>
                <div className="status-order">
                  Statut :{" "}
                  <span className={orderStatusClass(order.status_order)}>
                    {order.status_order}
                  </span>
                </div>
              </div>
            </li>
          </div>
        ))
      ) : (
        <p className="no-order-msg">Aucun achat pour le moment.</p>
      )}
    </div>
  );
}

export default ProfilTabOrder;
