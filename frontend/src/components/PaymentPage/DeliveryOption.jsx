/* eslint-disable jsx-a11y/label-has-associated-control */
import "./DeliveryOption.css";

function DeliveryOption() {
  return (
    <div className="delivery-option-container">
      <h3>Option de livraison</h3>
      <label className="delivery-option">
        <input
          type="radio"
          id="pickupPoint"
          name="deliveryOption"
          value="pickupPoint"
          defaultChecked
        />
        <div className="option-content">
          <img
            src="http://localhost:3310/static/espaceReserve.png"
            alt="Point relais"
          />
          <div className="text-content">
            <h3>Envoi au point de relais</h3>
            <p>A partir de...</p>
          </div>
        </div>
      </label>
      <label className="delivery-option">
        <input
          type="radio"
          id="homeDelivery"
          name="deliveryOption"
          value="homeDelivery"
        />
        <div className="option-content">
          <img
            className="homeDeliveryImage"
            src="http://localhost:3310/static/domicile.png"
            alt="Domicile"
          />
          <div className="text-content">
            <h3>Envoi à domicile</h3>
            <p>A partir de...</p>
          </div>
        </div>
      </label>
    </div>
  );
}

export default DeliveryOption;
