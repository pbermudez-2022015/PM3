'use strict'

import { Router } from 'express'
import { save, get, getCategoria, update, deleteC } from './categoria.controller.js'
import { validateJwt } from '../middlewares/validate-jwt.js'
const api = Router()

//rutas privadas
api.post('/save', [validateJwt], save)
api.get('/get', [validateJwt], get)
api.get('/getCategoria/:id', [validateJwt], getCategoria)
api.put('/update/:id', [validateJwt], update)
api.delete('/delete/:id', [validateJwt], deleteC)


export default api