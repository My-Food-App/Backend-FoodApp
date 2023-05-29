const Order = require('../models/orders')

class OrderController {
    async create(req,res){
        const order = new Order(req.body);
        order.save()
            .then(() => res.json(order))
            .catch(error => res.status(500).send(error.message)) 
             
     }
     async updateById(req, res){
         const {id} = req.params
          try {
             const newOrder =  await Order.findByIdAndUpdate(id,req.body).lean()
              res.json(newOrder)
             
          } catch (error) {
             res.status(500).send(error.message)
          }  
     }
     async deleteById(req,res) {
         const {id} = req.params
         try {
              await Order.findByIdAndDelete(id).lean()
             res.json('Deleted');
         } catch (error) {
             res.status(500).send(error.message)
         }
     }
     async getById(req,res) {
         const {id} = req.params
         try {
             const order = await Order.findById(id).lean()
             res.json(order);
         } catch (error) {
             res.status(500).send(error.message)
         }
     }
     async getAll(req,res){
         try {
             const orders = await Order.find().lean()
             res.json(orders);
         } catch (error) {
             res.status(500).send(error.message)
         }
     }
     async getByStatus(req,res) {
         try {
             const orders = await Order.find({'status': { '$regex' : req.body.keyWord, '$options' : 'i' }}).lean()
             res.json(orders);
         } catch (error) {
             res.status(500).send(error.message)
         }
       
     }
     async getByUserId(req,res) {
        try {
            const orders = await Order.find({'userId': { '$regex' : req.body.keyWord, '$options' : 'i' }}).lean()
            res.json(orders);
        } catch (error) {
            res.status(500).send(error.message)
        }
      
    }
    async getByStoreId(req,res) {
        try {
            const orders = await Order.find({'storeId': { '$regex' : req.body.keyWord, '$options' : 'i' }}).lean()
            res.json(orders);
        } catch (error) {
            res.status(500).send(error.message)
        }
      
    }
    async getByShipperId(req,res) {
        try {
            const orders = await Order.find({'shipperId': { '$regex' : req.body.keyWord, '$options' : 'i' }}).lean()
            res.json(orders);
        } catch (error) {
            res.status(500).send(error.message)
        }
      
    }
    async getByOrderName(req,res) {
        try {
            const orders = await Order.find({'name': { '$regex' : req.body.keyWord, '$options' : 'i' }}).lean()
            res.json(orders);
        } catch (error) {
            res.status(500).send(error.message)
        }
      
    }
}
module.exports = new OrderController()