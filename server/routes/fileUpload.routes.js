const { Router } = require("express");
const router = Router();

const fileUploader = require("../configs/cloudinary.config");

/* POST - upload images   */
router.post("/upload", fileUploader.single("imageUrl"), (req, res, next) => {
  res.status(200).json({ cloudinaryUrl: req.file.path });
  console.log("Image file is:", req.file);
});

/* POST - upload GPX files   */ //TODO NEED TO ADD GPX FILE THROUGH OUT THE RIDE DETAILS AND FORMS
/* router.post("/upload", fileUploader.single("gpxUrl"), (req, res, next) => {
    res.status(200).json({ cloudinaryUrl: req.file.path });
    console.log("GPX file is:", req.file);
  }); */

module.exports = router;
