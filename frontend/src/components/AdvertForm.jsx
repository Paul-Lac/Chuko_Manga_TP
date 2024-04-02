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
    previewUrls,
    setBatch,
    setConditionId,
    conditionAnounce,
    setVolumeId,
    volumeAnounce,
    volumeList,
    isNewAdvertPage,
    mangaAnounce,
  } = props;

  return (
    <form className="advert-form" onSubmit={handleSubmit}>
      <AdvertFormPicture
        deleteFile={deleteFile}
        handleImageChange={handleImageChange}
        previewUrls={previewUrls}
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
        conditionAnounce={conditionAnounce}
        isNewAdvertPage={isNewAdvertPage}
      />
      <AdvertFormReference
        batch={batch}
        handleSelectedManga={handleSelectedManga}
        setBatch={setBatch}
        setVolumeId={setVolumeId}
        volumeList={volumeList}
        volumeAnounce={volumeAnounce}
        mangaAnounce={mangaAnounce}
        isNewAdvertPage={isNewAdvertPage}
      />
      <button className="add-button" type="submit">
        {isNewAdvertPage ? "Ajouter" : "Modifier"}
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
  previewUrls: PropTypes.shape({
    image1: PropTypes.string,
    image2: PropTypes.string,
    image3: PropTypes.string,
  }).isRequired,
  setBatch: PropTypes.func.isRequired,
  setConditionId: PropTypes.func.isRequired,
  setVolumeId: PropTypes.func.isRequired,
  volumeList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  volumeAnounce: PropTypes.string.isRequired,
  conditionAnounce: PropTypes.string.isRequired,
  isNewAdvertPage: PropTypes.bool.isRequired,
  mangaAnounce: PropTypes.string.isRequired,
};
