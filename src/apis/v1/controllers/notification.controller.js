const Notification = require('../models/notifications')

class NotificationController {
    async create(req,res){
        const notification = new Notification(req.body);
        notification.save()
            .then(() => res.json(notification))
            .catch(error => res.status(500).send(error.message)) 
             
     }  
     async getAll(req,res){
         try {
             const notifications = await Notification.find()
             res.json(notifications);
         } catch (error) {
             res.status(500).send(error.message)
         }
     }
     async getByUserId(req,res) {
        try {
            const notifi = await Notification.find({'userId': { '$regex' : req.body.keyWord, '$options' : 'i' }}).lean()
            res.json(notifi);
        } catch (error) {
            res.status(500).send(error.message)
        }
      
    }
    async updateById(req, res){
        const {id} = req.params
         try {
            const newNotifi =  await Notification.findByIdAndUpdate(id,req.body).lean()
             res.json(newNotifi)
            
         } catch (error) {
            res.status(500).send(error.message)
         }  
    }
    
     
 }
 
 module.exports = new NotificationController();