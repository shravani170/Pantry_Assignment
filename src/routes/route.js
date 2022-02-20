const express = require('express')
const router = express.Router()
const pantryController=require('../controllers/pantryController');
const basketController=require('../controllers/basketController');


router.post('/pantry',pantryController.createPantry);
router.get('/pantry/:pantryId',pantryController.getPantry);


router.post('/pantry/:pantryId/basket/:basketName',basketController.createBasket);
router.put('/pantry/:pantryId/basket/:basketName',basketController.updateBasket);
router.get('/pantry/:pantryId/basket/:basketName',basketController.getBasketDetails);
router.delete('/pantry/:pantryId/basket/:basketName',basketController.deleteBasket);



router.get('/basket/list',basketController.getBasket);




module.exports = router