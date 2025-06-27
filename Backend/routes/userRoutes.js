const router = require('express').Router()

const UserController = require('../controllers/userController')

router.get('/dist', UserController.distribuicao)
router.get('/cadastro', UserController.cadastro)

module.exports = router