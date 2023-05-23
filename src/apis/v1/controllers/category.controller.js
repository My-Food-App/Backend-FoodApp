const Category = require('../models/categories')

class CategoryController {
   async create(req,res){
       const category = new Category(req.body);
       category.save()
           .then(() => res.json(category))
           .catch(error => res.status(500).send(error.message)) 
            
    }  
    async deleteById(req,res) {
        const {id} = req.params
        try {
            const category = await Category.findByIdAndDelete(id).lean()
            res.json('Deleted');
        } catch (error) {
            res.status(500).send(error.message)
        }
    }
    async getById(req,res) {
        const {id} = req.params
        try {
            const category = await Category.findById(id)
            res.json(category);
        } catch (error) {
            res.status(500).send(error.message)
        }
    }
    async getAll(req,res){
        try {
            const categories = await Category.find()
            res.json(categories);
        } catch (error) {
            res.status(500).send(error.message)
        }
    }
    async updateById(req, res) {
        const { id } = req.params;
        try {
          const category = await Category.findByIdAndUpdate(id, req.body);
          res.json(category);
        } catch (error) {
          res.status(500).send(error.message);
        }
      }
      async findByName(req,res) {
        try {
            const category = await Category.find({'name': { '$regex' : req.body.keyWord, '$options' : 'i' }})
            res.json(category);
        } catch (error) {
            res.status(500).send(error.message)
        }
      
    }
}

module.exports = new CategoryController();