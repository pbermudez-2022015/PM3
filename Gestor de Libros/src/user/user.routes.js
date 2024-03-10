import express from 'express'
import { validateJwt } from '../middlewares/validate-jwt.js'
import { registerAd, registerUser, login, updateUser, updateAdmin, search, searchUser, getUser, deleteU, deleteAdmin } from './user.controller.js';

const api = express.Router();

//rutas Publicas
api.post('/registerUser', registerUser)
api.post('/login', login)
api.post('/searchUser', searchUser)


//Rutas Privadas
api.post('/registerAd', [validateJwt], registerAd)
api.put('/updateUser', [validateJwt], updateUser)
api.put('/updateAdmin/:id', [validateJwt], updateAdmin)
api.post('/search', [validateJwt], search)
api.get('/getUser/:id', [validateJwt], getUser)
api.delete('/delete/:id', [validateJwt], deleteU)
api.delete('/deleteAdmin/:id', [validateJwt], deleteAdmin)

export default api