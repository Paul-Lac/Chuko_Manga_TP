import PropTypes from "prop-types";

import AdvertFormContent from "./AdvertFormContent";
import AdvertFormPicture from "./AdvertFormPictures";
import AdvertFormReference from "./AdvertFormReference";

import "./AdvertForm.css";

function AdvertForm(props) {
  const {
    advertTitle,
    batch,
    deleteFile,
    description,
    files,
    handleDescChange,
    handleImageChange,
    handlePriceChange,
    handleSelectedManga,
    handleSubmit,
    handleTitleChange,
    maxDescReached,
    maxTitleReached,
    price,
    priceErr,
    setBatch,
    setConditionId,
    setVolumeId,
    volumeList,
  } = props;

  return (
    <form className="advert-form" onSubmit={handleSubmit}>
      <AdvertFormPicture
        deleteFile={deleteFile}
        files={files}
        handleImageChange={handleImageChange}
      />
      <AdvertFormContent
        advertTitle={advertTitle}
        description={description}
        handleDescChange={handleDescChange}
        handlePriceChange={handlePriceChange}
        handleTitleChange={handleTitleChange}
        maxDescReached={maxDescReached}
        maxTitleReached={maxTitleReached}
        price={price}
        priceErr={priceErr}
        setConditionId={setConditionId}
      />
      <AdvertFormReference
        batch={batch}
        handleSelectedManga={handleSelectedManga}
        setBatch={setBatch}
        setVolumeId={setVolumeId}
        volumeList={volumeList}
      />
      <button className="add-button" type="submit">
        Ajouter
      </button>
    </form>
  );
}

export default AdvertForm;

AdvertForm.propTypes = {
  advertTitle: PropTypes.string.isRequired,
  batch: PropTypes.number.isRequired,
  deleteFile: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired,
  handleDescChange: PropTypes.func.isRequired,
  handleImageChange: PropTypes.func.isRequired,
  handlePriceChange: PropTypes.func.isRequired,
  handleSelectedManga: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  maxDescReached: PropTypes.bool.isRequired,
  maxTitleReached: PropTypes.bool.isRequired,
  price: PropTypes.string.isRequired,
  priceErr: PropTypes.bool.isRequired,
  setBatch: PropTypes.func.isRequired,
  setConditionId: PropTypes.func.isRequired,
  setVolumeId: PropTypes.func.isRequired,
  volumeList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
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

AdvertForm.defaultProps = {
  files: null,
};
