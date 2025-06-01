const router = require('express').Router()

const SupporterController = require('../controllers/supporterControllers')

router.post('/register', SupporterController.register)
router.delete('/delete', SupporterController.delete)
router.patch('/edit', SupporterController.edit)
router.get('all', SupporterController.allSupporters)
router.get('/allnunb', SupporterController.allSupportersNumb)

module.exports = router