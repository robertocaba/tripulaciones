const express = require('express');
const router = express.Router()
const UserController = require('../controllers/UserController');
const { authentication, isAdmin, isAuthor } = require('../middlewares/authentication');

router.post('/', UserController.create);
router.get('/confirm/:emailToken',UserController.confirm);
router.post('/login', UserController.login);
router.delete('/logout', authentication , UserController.logout);
router.get('/id/:_id',UserController.getById);
router.get('/name/:name', UserController.getUserByName);
router.get('/',UserController.getAll);
router.put('/:_id', authentication, UserController.update);
router.delete('/admin/:_id', authentication, isAdmin, UserController.delete);
router.delete('/', authentication, UserController.deleteMySelf);
router.put('/resetPassword/:recoverToken', UserController.resetPassword);
router.get('/recoverPassword/:email', authentication, UserController.recoverPasswod)



module.exports = router;