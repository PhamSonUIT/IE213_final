// import bcrypt from "bcrypt";
import users from "../models/User.js";

const signUp = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.status(400).json({ message: "Hãy nhập đầy đủ các thông tin" });
    }

    const userExists = await users.findOne({
      $or: [{ email: email }, { username: username }],
    });

    if (userExists) {
      return res
        .status(400)
        .json({ message: "Email hoặc username đã tồn tại" });
    }

    // const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new users({
      email,
      password,
      username,
      avatar: "https://www.w3schools.com/howto/img_avatar.png", 
      createdAt: new Date(),
    });

    const user = await newUser.save();

    return res.status(201).json(user);
  } catch (error) {
    console.error("Error in signUp:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Hãy nhập đầy đủ các thông tin" });
    }

    const user = await users.findOne({ email: email });

    if (!user) {
      return res
        .status(401)
        .json({ message: "Email hoặc mật khẩu không đúng" });
    }

    // const isPasswordValid = await bcrypt.compare(password, user.password);
    if (password !== user.password) {
      return res
        .status(401)
        .json({ message: "Email hoặc mật khẩu không đúng" });
    }

    res.cookie(
      "user",
      JSON.stringify({
        _id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
      }),
      {
        httpOnly: false, 
        secure: false,
        path: "/", 
        maxAge: 24 * 60 * 60 * 1000,
      }
    );

    return res.status(200).json({
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar, 
      },
      userId: user._id,
    });
  } catch (error) {
    console.error("Error in signIn:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const signOut = (req, res) => {
  res.clearCookie("user", { path: "/" });
  return res.status(200).json({ message: "Signed out successfully" });
};

export { signIn, signUp, signOut };
