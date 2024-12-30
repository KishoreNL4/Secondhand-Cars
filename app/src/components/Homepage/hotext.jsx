useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get("/allPets");

      const petsData = response.data.pets;

      const responsee = await axios.get("/images");

      const imagesData = responsee.data;

      // Group image URLs by their IDs

      const imageUrlsByPetId = {};

      imagesData.forEach((image) => {
        if (!imageUrlsByPetId[image._id]) {
          imageUrlsByPetId[image._id] = [image.imageUrl];
        } else {
          imageUrlsByPetId[image._id].push(image.imageUrl);
        }
      });

      // Match IDs and make the POST request

      petsData.forEach(async (pet) => {
        const id = pet._id;

        const imageUrls = imageUrlsByPetId[id];

        if (imageUrls) {
          try {
            await axios.post("/imageUrl", {
              imageUrl: imageUrls,

              ids: [id],
            });

            console.log("Image URLs posted for ID:", id);
          } catch (error) {
            console.log("Error posting image URLs for ID:", id, error);
          }
        } else {
          console.log("No image URLs found for ID:", id);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  fetchData();
}, []);
