const User = require("../models/User.js");

module.exports.getUser = async (req, res) => {
  try {
    if (!req.user || !req.user.steamId) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    const user = await User.findOne({ steamId: req.user.steamId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Error fetching user", error });
  }
};

module.exports.updateUser = async (req, res) => {
  try {
    if (!req.user || !req.user.steamId) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    const updateData = req.body;
    const updatedUser = await User.findOneAndUpdate(
      { steamId: req.user.steamId },
      { $set: updateData },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Error updating user", error });
  }
};
