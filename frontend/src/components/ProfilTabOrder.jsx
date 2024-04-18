import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProfilTabOrder.css";

function ProfilTabOrder() {
  const { id } = useParams();
  const [historyOrders, setHistoryOrders] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3310/api/buyers/${id}/orders`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.info("Mon historique d'achat:", data);
        setHistoryOrders(data);
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
      {historyOrders?.map((order) => (
        <div key={order.id}>
          <li className="order-item">
            <img
              className="img-order"
              src={`http://localhost:3310${order.image_path}`}
              alt="image_article_seller"
            />
            <div className="order-advert-info">
              <div className="order-info-title">{`${order.title_advert}`}</div>
              <div className="order-info-price">{`${order.total_price}`} €</div>
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
      ))}
    </div>
  );
}

export default ProfilTabOrder;
