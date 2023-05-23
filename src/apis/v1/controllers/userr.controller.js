const {users} = require('../models/users')

class UserController {
  async getById(req, res) {
    const { id } = req.params;
    try {
      const user = await users.findById(id).lean();
      res.json(user);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
  async getAll(req, res) {
    try {
      const user = await users.find().lean();
      res.json(user);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
  async deleteById(req, res) {
    const { id } = req.params;
    try {
      const user = await users.findByIdAndDelete(id).lean();
      res.json("Deleted");
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
  async createShipper(req, res) {
    const user = new users(req.body);
    user
      .save()
      .then(() => res.json(user))
      .catch((error) => res.status(500).send(error.message));
  }
  async updateById(req, res) {
    const { id } = req.params;
    try {
      const newUser = await users.findByIdAndUpdate(id, req.body).lean();
      res.json(newUser);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
  async findByName(req, res) {
    try {
      const user = await users.find({
        $or: [
          { fullname: { $regex: req.body.keyWord, $options: "i" } },
          { username: { $regex: req.body.keyWord, $options: "i" } },
          { email: { $regex: req.body.keyWord, $options: "i"  } },
          { phone: { $regex: req.body.keyWord, $options: "i"  } },
        ],
      }).lean();
    
      res.json(user);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}
module.exports = new UserController();
