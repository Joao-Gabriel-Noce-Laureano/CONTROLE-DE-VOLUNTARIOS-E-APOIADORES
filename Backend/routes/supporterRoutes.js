const router = require('express').Router()

const SupporterController = require('../controllers/supporterControllers')

router.post('/register', SupporterController.register)
router.delete('/delete/:id', SupporterController.delete)
router.patch('/edit/:id', SupporterController.edit)
router.get('/all', SupporterController.allSupporters)
router.get('/allnunb', SupporterController.allSupportersNumb)
router.get('/getuser/:id', SupporterController.getuser)

module.exports = router