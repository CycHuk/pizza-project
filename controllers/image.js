const path = require("path");

const image = async (req, res) => {
  try {
    const { imagePath } = req.params;

    const absolutePath = path.join(__dirname, "../public/images", imagePath);

    res.sendFile(absolutePath);
  } catch {
    return res.status(500).json({ message: "Что-то пошло не так" });
  }
};

module.exports = {
  image,
};
