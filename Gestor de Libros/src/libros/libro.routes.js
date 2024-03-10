'use strict'

import { Router } from 'express'
import { save, getlibro, deleteLibro } from './libro.controller.js'
import { validateJwt } from '../middlewares/validate-jwt.js'
const api = Router()

//rutas privadas
api.post('/save', [validateJwt], save)
api.get('/get', [validateJwt], getlibro)
api.delete('/delete/:id', [validateJwt], deleteLibro)


export default api