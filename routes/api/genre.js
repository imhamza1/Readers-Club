const express = require("express");
const router = express.Router();
const Genre = require("../../models/genre");
const multer = require("multer");

//define storage for images

const storage = multer.diskStorage({
  //destination
  destination: function (req, file, callback) {
    callback(null, "./public/uploads/");
  },

  //filename
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

//upload parameters for multer
const upload = multer({
  storage: storage,
  limits: {
    fieldSize: 1024 * 1024 * 3,
  },
});

router.get("/", async (req, res) => {
  var genre = await Genre.find();
  res.render("genre/index", { genre });
});

router.get("/new", (req, res) => {
  res.render("genre/new");
});

router.get("/:id", async (req, res) => {
  var genre = await Genre.findById(req.params.id);
  res.render({ genre });
});

router.post("/", upload.single("image"), async (req, res) => {
  var genre = new Genre();
  genre.name = req.body.name;
  genre.image = req.file.filename;
  await genre.save();
  res.redirect("/api/novels");
});

router.delete("/delete", async (req, res) => {
  await Genre.findByIdAndDelete(req.params.id);
  res.render();
});

router.put("/:id", async (req, res) => {
  var genre = await Genre.findById(req.params.id);
  genre.name = req.body.name;
  await genre.save();
  res.render();
});

module.exports = router;
