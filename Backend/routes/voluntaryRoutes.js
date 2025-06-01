const router = require('express').Router()

const VoluntaryController = require('../controllers/voluntaryController')

router.post('/register', VoluntaryController.register)
router.delete('/delete', VoluntaryController.delete)
router.patch('/edit', VoluntaryController.edit)
router.get('all', VoluntaryController.allVoluntarys)
router.get('/allnunb', VoluntaryController.allVoluntarysNumb)

module.exports = router