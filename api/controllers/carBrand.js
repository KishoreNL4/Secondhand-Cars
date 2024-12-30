import SellPets from "../modals/SellPets.js";

export const carBrand = async (req, res, next) => {
  try {
    const { brand } = req.params;

    // If the breed URL parameter is provided and not "all", filter pets by breed
    let filter = {};
    if (brand && brand !== "all") {
      filter = { brand: brand };
    }

    const cars = await SellPets.find(filter);

    res.status(200).json({ cars });
  } catch (err) {
    next(err);
  }
};
