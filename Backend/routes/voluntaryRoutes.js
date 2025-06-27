const router = require('express').Router()

const VoluntaryController = require('../controllers/voluntaryController')

router.post('/register', VoluntaryController.register)
router.delete('/delete/:id', VoluntaryController.delete)
router.patch('/edit/:id', VoluntaryController.edit)
router.get('/all', VoluntaryController.allVoluntarys)
router.get('/allnunb', VoluntaryController.allVoluntarysNumb)
router.get('/getuser/:id', VoluntaryController.getuser)

module.exports = router