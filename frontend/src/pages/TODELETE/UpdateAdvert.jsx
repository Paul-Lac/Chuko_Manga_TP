// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";

// import "./UpdateAdvert.css";

// import AdvertForm from "../components/AdvertForm";

// function UpdateAdvert() {
//   const { id } = useParams();
//   // defined if we are on the New-Advert or Update-Advert page with a boolean
//   const isNewAdvertPage = false;
//   const navigate = useNavigate();
//   // States designed to display options for selection and control user's input
//   const [selectedManga, setSelectedManga] = useState(null);
//   const [volumeList, setVolumeList] = useState([]);
//   const [priceErr, setPriceErr] = useState(false);

//   // State designed to switch tab : selling a tome or a batch
//   const [batch, setBatch] = useState(0);

//   // States designed to handle values provided by advert
//   const [advertTitle, setAdvertTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [conditionId, setConditionId] = useState(null);
//   const [conditionAnounce, setConditionAnounce] = useState();
//   const [price, setPrice] = useState("");
//   const [volumeId, setVolumeId] = useState(null);
//   const [volumeAnounce, setVolumeAnounce] = useState();
//   const [mangaAnounce, setMangaAnounce] = useState("");
//   const alert = 0;
//   const publicationDate = new Date().toISOString().split("T")[0];

//   // States designed to preview images
//   const [previewUrls, setPreviewUrls] = useState({
//     image1: "",
//     image2: "",
//     image3: "",
//   });

//   // States designed transfer images
//   const [files, setFiles] = useState({
//     image1: null,
//     image2: null,
//     image3: null,
//   });

//   useEffect(() => {
//     fetch(`http://localhost:3310/api/advert-cards/${id}`)
//       .then((res) => {
//         return res.json();
//       })
//       .then((data) => {
//         console.info("récupération de l'annonce :", data);
//         setAdvertTitle(data[0].title_search_manga);
//         setDescription(data[0].description);
//         setConditionAnounce(data[0].name_condition);
//         setPrice(data[0].price);
//         setBatch(data[0].batch);
//         setMangaAnounce(data[0].manga_title);
//         setVolumeAnounce(data[0].volume_title);
//         // Vérification des images retournées par l'API
//         const imagePaths = data[0].image_paths;
//         const images = {};
//         if (imagePaths && imagePaths.length > 0) {
//           images.image1 = `http://localhost:3310${imagePaths[0]}`;
//           if (imagePaths.length > 1) {
//             images.image2 = `http://localhost:3310${imagePaths[1]}`;
//           }
//           if (imagePaths.length > 2) {
//             images.image3 = `http://localhost:3310${imagePaths[2]}`;
//           }
//         }
//         setPreviewUrls(images);
//       })
//       .catch((error) => {
//         console.error("Error get advert:", error);
//       });
//   }, [id]);

//   // Variables designed to control user's input
//   const MAX_LENGTH_TITLE = 40;
//   const MAX_LENGTH_DESC = 255;
//   const maxTitleReached = advertTitle.length >= MAX_LENGTH_TITLE;
//   const maxDescReached = description.length >= MAX_LENGTH_DESC;

//   // Set manga selection
//   const handleSelectedManga = (e) => {
//     setVolumeList([]);
//     setSelectedManga(e.target.value);
//     // console.info("Manga selected:", selectedManga);
//   };

//   // Handle image selection
//   const handleImageChange = (e) => {
//     setFiles({ ...files, [e.target.name]: e.target.files[0] });
//   };

//   // Create image preview
//   useEffect(() => {
//     for (const key in files) {
//       if (files[key]) {
//         const url = URL.createObjectURL(files[key]);
//         setPreviewUrls((prevUrls) => ({ ...prevUrls, [key]: url }));
//       }
//     }
//     return () => {
//       for (const key in files) {
//         if (files[key]) {
//           URL.revokeObjectURL(previewUrls[key]);
//         }
//       }
//     };
//   }, [files]);

//   // Fetch manga's list
//   useEffect(() => {
//     if (selectedManga !== "") {
//       axios
//         .get(`http://localhost:3310/api/mangas/${selectedManga}/volumes`)
//         .then((res) => {
//           // console.info("Volumes are", res.data);
//           setVolumeList(res.data);
//         })
//         .catch((error) => {
//           console.error("Error fetching volumes:", error);
//         });
//     }
//   }, [selectedManga]);

//   // Delete selected image and corresponding preview
//   const deleteFile = (key) => {
//     const updatedFiles = { ...files };
//     updatedFiles[key] = null;
//     setFiles(updatedFiles);
//     if (previewUrls[key]) {
//       const updatedPreviewUrls = { ...previewUrls };
//       updatedPreviewUrls[key] = null;
//       setPreviewUrls(updatedPreviewUrls);
//     }
//   };

//   // Manage and control user's inputs
//   const handleTitleChange = (e) => {
//     if (e.target.value.length <= MAX_LENGTH_TITLE) {
//       setAdvertTitle(e.target.value);
//     }
//   };

//   const handleDescChange = (e) => {
//     if (e.target.value.length <= MAX_LENGTH_DESC) {
//       setDescription(e.target.value);
//     }
//   };

//   const handlePriceChange = (e) => {
//     setPriceErr(false);
//     const inputValue = e.target.value;
//     const regex = /^\d*\.?\d{0,2}$/;
//     if (regex.test(inputValue)) {
//       setPrice(inputValue);
//       // console.info("regex.test:", regex.test(inputValue));
//     }
//     if (!regex.test(inputValue)) {
//       setPriceErr(true);
//       // console.info("regex.test:", regex.test(inputValue));
//     }
//   };

//   // Set user id value
//   let userId;

//   try {
//     const storedAuth = localStorage.getItem("auth");
//     if (storedAuth) {
//       const authObj = JSON.parse(storedAuth);
//       userId = authObj.user.id;
//       console.info("this is user id:", userId);
//     }
//   } catch (error) {
//     console.error(
//       "Erreur lors de la récupération de l'id utilisateur depuis localStorage",
//       error
//     );
//   }

//   // Submit form and redirect to user's profile
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // console.info("upload files", files);
//     const formData = new FormData();
//     formData.append("titleSearchManga", advertTitle);
//     formData.append("description", description);
//     formData.append("articleConditionId", conditionId);
//     formData.append("price", price);
//     if (selectedManga !== null) {
//       formData.append("mangaId", selectedManga);
//     }
//     if (volumeId !== null) {
//       formData.append("volumeId", volumeId);
//     }
//     formData.append("batch", batch);
//     formData.append("alert", alert);
//     formData.append("userId", userId);
//     formData.append("publicationDate", publicationDate);
//     for (const key in files) {
//       if (files[key]) {
//         // console.info(key, files[key]);
//         formData.append(key, files[key]);
//       }
//     }
//     console.info("Data to send:", formData);
//     axios
//       .post("http://localhost:3310/api/adverts", formData)
//       .then((res) => {
//         console.info("Advert created successfully", res.data);
//         navigate(`/profilUser/${userId}`);
//       })
//       .catch((error) => {
//         console.error("Error creating advert", error);
//       });
//   };

//   return (
//     <section className="update-advert">
//       <h1>Modifie ton annonce</h1>
//       <AdvertForm
//         advertTitle={advertTitle}
//         batch={batch}
//         deleteFile={deleteFile}
//         description={description}
//         handleDescChange={handleDescChange}
//         handleImageChange={handleImageChange}
//         handlePriceChange={handlePriceChange}
//         handleSelectedManga={handleSelectedManga}
//         handleSubmit={handleSubmit}
//         handleTitleChange={handleTitleChange}
//         maxDescReached={maxDescReached}
//         maxTitleReached={maxTitleReached}
//         price={price}
//         priceErr={priceErr}
//         previewUrls={previewUrls}
//         setBatch={setBatch}
//         setConditionId={setConditionId}
//         conditionAnounce={conditionAnounce}
//         setVolumeId={setVolumeId}
//         volumeAnounce={volumeAnounce}
//         volumeList={volumeList}
//         isNewAdvertPage={isNewAdvertPage}
//         mangaAnounce={mangaAnounce}
//       />
//     </section>
//   );
// }

// export default UpdateAdvert;
