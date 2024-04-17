import PropTypes from "prop-types";
import PlusIcon from "../assets/Plus_Icon.png";
import DeleteIcon from "../assets/Delete_Icon.png";

import "./AdvertFormPictures.css";

function AdvertFormPicture(props) {
  const { deleteFile, files, handleImageChange } = props;

  // Define  types of files and maximum size accepted
  const acceptedFileTypes = "image/jpeg, image/png, image/png";
  const maxFileSize = 5 * 1024 * 1024;

  return (
    <section className="advert-picture">
      <h2>Photos *</h2>
      <p>Ajoute 1 à 3 photos</p>
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
              required={key === "image1"}
              accept={acceptedFileTypes}
              size={maxFileSize}
            />
            {files[key] && files[key].preview && (
              <div className="preview-container">
                <img
                  className="preview-image"
                  src={files[key].preview}
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
    </section>
  );
}

export default AdvertFormPicture;

AdvertFormPicture.propTypes = {
  deleteFile: PropTypes.func.isRequired,
  handleImageChange: PropTypes.func.isRequired,
  files: PropTypes.shape({
    image1: PropTypes.shape({
      file: PropTypes.instanceOf(File),
      preview: PropTypes.string,
    }),
    image2: PropTypes.shape({
      file: PropTypes.instanceOf(File),
      preview: PropTypes.string,
    }),
    image3: PropTypes.shape({
      file: PropTypes.instanceOf(File),
      preview: PropTypes.string,
    }),
  }),
};

AdvertFormPicture.defaultProps = {
  files: null,
};
