import SellCars from "../modals/SellPets.js";

export const imageUrl = async (req, res, next) => {
  try {
    const { imageUrl, ids } = req.body;
    console.log(imageUrl);
    const updatedPets = await SellCars.updateMany(
      { _id: { $in: ids } },
      { imageUrl }
    );
    console.log("Image URLs updated for matching pets");

    res.status(200).json({ message: "Image URLs updated for matching pets" });
  } catch (error) {
    next(error);
  }
};
