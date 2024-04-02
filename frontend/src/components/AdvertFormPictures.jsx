import PropTypes from "prop-types";
import PlusIcon from "../assets/Plus_Icon.png";
import DeleteIcon from "../assets/Delete_Icon.png";

import "./AdvertFormPictures.css";

function AdvertFormPicture(props) {
  const { deleteFile, handleImageChange, previewUrls } = props;
  return (
    <div className="advert-picture-container">
      {["image1", "image2", "image3"].map((key) => (
        <div key={key} className="picture-box">
          <label className="label-picture" htmlFor="file">
            <img src={PlusIcon} alt="Ajouter" />
          </label>
          <input
            id="file"
            type="file"
            name={key}
            onChange={handleImageChange}
          />
          {previewUrls[key] && (
            <div className="preview-container">
              <img
                className="preview-image"
                src={previewUrls[key]}
                alt="Preview"
              />
              <button
                className="delete-preview"
                type="button"
                onClick={() => deleteFile(key)}
              >
                <img src={DeleteIcon} alt="delete" />
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default AdvertFormPicture;

AdvertFormPicture.propTypes = {
  deleteFile: PropTypes.func.isRequired,
  handleImageChange: PropTypes.func.isRequired,
  previewUrls: PropTypes.shape({
    image1: PropTypes.string,
    image2: PropTypes.string,
    image3: PropTypes.string,
  }).isRequired,
};
