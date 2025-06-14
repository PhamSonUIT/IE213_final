import {User} from "../models/index.js"

const getUsers = async (req, res) => {
  try {
    const allUser = await User.find();
    return res.status(200).json(allUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export { getUsers };
