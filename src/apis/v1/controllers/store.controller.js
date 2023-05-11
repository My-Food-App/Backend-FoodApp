const Store = require('../models/store')

class StoreController {
   async create(req,res){
       const store = new Store(req.body);
        store.save()
           .then(() => res.json(store))
           .catch(error => res.status(500).send(error.message)) 
            
    }
    async updateById(req, res){
        const {id} = req.params
         try {
            const newStore =  await Store.findByIdAndUpdate(id,req.body)
             res.json(newStore)
            
         } catch (error) {
            res.status(500).send(error.message)
         }  
    }
    async deleteById(req,res) {
        const {id} = req.params
        try {
            const store = await Store.findByIdAndDelete(id)
            res.json('Deleted');
        } catch (error) {
            res.status(500).send(error.message)
        }
    }
    async getById(req,res) {
        const {id} = req.params
        try {
            const store = await Store.findById(id)
            res.json(store);
        } catch (error) {
            res.status(500).send(error.message)
        }
    }
    async getAll(req,res){
        try {
            const stores = await Store.find()
            res.json(stores);
        } catch (error) {
            res.status(500).send(error.message)
        }
    }
    async findByName(req,res) {
        try {
            const stores = await Store.find({'name': { '$regex' : req.body.keyWord, '$options' : 'i' }})
            res.json(stores);
        } catch (error) {
            res.status(500).send(error.message)
        }
      
    }
    async findByUserId(req,res) {
        try {
            const stores = await Store.findOne({'userId': { '$regex' : req.body.keyWord, '$options' : 'i' }})
            res.json(stores);
        } catch (error) {
            res.status(500).send(error.message)
        }
      
    }
}

module.exports = new StoreController();