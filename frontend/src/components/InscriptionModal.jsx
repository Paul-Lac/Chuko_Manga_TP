import Inscription from "./Inscription";
import "./InscriptionModal.css";

function InscriptionModal() {
  return (
    <div className="modal-inscription">
      <div className="modal-background">
        <div className="modal-content">
          <Inscription />
        </div>
      </div>
    </div>
  );
}

export default InscriptionModal;
