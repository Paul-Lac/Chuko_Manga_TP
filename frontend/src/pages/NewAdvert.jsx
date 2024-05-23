import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { UserContext } from "../context/UserContext";
import AdvertForm from "../components/AdvertForm";

import "./NewAdvert.css";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../services/axiosInstance";

function NewAdvert() {
  const navigate = useNavigate();
  const { auth } = useContext(UserContext);

  // States designed to handle values provided by user
  const [advertTitle, setAdvertTitle] = useState("");
  const [description, setDescription] = useState("");
  const [conditionId, setConditionId] = useState(null);
  const [price, setPrice] = useState("");
  const [selectedMangaId, setSelectedMangaId] = useState(null);
  const [volumeId, setVolumeId] = useState(null);
  const publicationDate = new Date().toISOString().split("T")[0];

  // States designed to display options for selection and control user's input
  const [volumeList, setVolumeList] = useState([]);
  const [priceErr, setPriceErr] = useState(false);

  // State designed to switch tab : selling a tome or a batch
  const [batch, setBatch] = useState(0);

  // Const designed to control user's input
  const maxLengthTitle = 40;
  const maxLengthDesc = 255;
  const maxFileSize = 5 * 1024 * 1024;
  const maxTitleReached = advertTitle.length >= maxLengthTitle;
  const maxDescReached = description.length >= maxLengthDesc;

  // State designed to transfer images and preview images
  const [files, setFiles] = useState({
    image1: { file: null, preview: null },
    image2: { file: null, preview: null },
    image3: { file: null, preview: null },
  });

  // Handle image selection and image preview
  const handleImageChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    const preview = URL.createObjectURL(file);

    // Check file size, toast error and reinitialise input value
    if (file.size > maxFileSize) {
      toast.error(
        "La taille de l'image dépasse la limite de 5Mo. Veuillez sélectionner un autre fichier."
      );
      e.target.value = null;
      return;
    }

    setFiles((prevFiles) => ({
      ...prevFiles,
      [name]: { file, preview },
    }));
  };

  // Delete selected image and corresponding preview
  const deleteFile = (key) => {
    setFiles((prevFiles) => {
      const updatedFiles = { ...prevFiles };
      delete updatedFiles[key];
      if (updatedFiles[key] && updatedFiles[key].preview) {
        URL.revokeObjectURL(updatedFiles[key].preview);
      }
      return updatedFiles;
    });
  };

  // Manage and control user's inputs
  const handleTitleChange = (e) => {
    if (e.target.value.length <= maxLengthTitle) {
      setAdvertTitle(e.target.value);
    }
  };

  const handleDescChange = (e) => {
    if (e.target.value.length <= maxLengthDesc) {
      setDescription(e.target.value);
    }
  };

  const handlePriceChange = (e) => {
    setPriceErr(false);
    const inputValue = e.target.value;
    const regex = /^\d*\.?\d{0,2}$/;
    if (regex.test(inputValue)) {
      setPrice(inputValue);
    }
    if (!regex.test(inputValue)) {
      setPriceErr(true);
    }
  };

  // Set manga selection
  const handleSelectedManga = (e) => {
    setVolumeList([]);
    setSelectedMangaId(e.target.value);
  };

  // Fetch volume's list
  useEffect(() => {
    if (selectedMangaId !== null) {
      axios
        .get(
          `${import.meta.env.VITE_BACKEND_URL}/api/mangas/${selectedMangaId}/volumes`
        )
        .then((res) => {
          setVolumeList(res.data);
        })
        .catch((error) => {
          console.error("Error fetching volumes:", error);
        });
    }
  }, [selectedMangaId]);

  // Submit form and redirect to user's profile
  const handleSubmit = (e) => {
    e.preventDefault();
    // Create a new FormData object
    const formData = new FormData();
    // Append data to the FormData object
    formData.append("titleSearchManga", advertTitle);
    formData.append("description", description);
    formData.append("articleConditionId", conditionId);
    formData.append("price", price);
    if (selectedMangaId !== null) {
      formData.append("mangaId", selectedMangaId);
    }
    if (volumeId !== null) {
      formData.append("volumeId", volumeId);
    }
    formData.append("batch", batch);
    formData.append("userId", auth.user.id);
    formData.append("publicationDate", publicationDate);
    for (const key in files) {
      if (files[key] && files[key].file) {
        formData.append(key, files[key].file);
      }
    }
    // Send the FormData object to the server
    axiosInstance
      .post("/adverts", formData, {
        withCredentials: true,
      })
      .then((res) => {
        console.info("Advert created successfully", res.data);
        navigate(`/profile/${auth.user.id}`, {
          state: { message: "Annonce ajoutée !" },
        });
      })
      .catch((error) => {
        console.error("Error creating advert", error);
      });
  };

  return (
    <section className="new-advert">
      <h1>Crée ton annonce</h1>
      <AdvertForm
        advertTitle={advertTitle}
        batch={batch}
        deleteFile={deleteFile}
        description={description}
        files={files}
        handleDescChange={handleDescChange}
        handleImageChange={handleImageChange}
        handlePriceChange={handlePriceChange}
        handleSelectedManga={handleSelectedManga}
        handleSubmit={handleSubmit}
        handleTitleChange={handleTitleChange}
        maxDescReached={maxDescReached}
        maxTitleReached={maxTitleReached}
        price={price}
        priceErr={priceErr}
        setBatch={setBatch}
        setConditionId={setConditionId}
        setVolumeId={setVolumeId}
        volumeList={volumeList}
      />
      <ToastContainer />
    </section>
  );
}

export default NewAdvert;
