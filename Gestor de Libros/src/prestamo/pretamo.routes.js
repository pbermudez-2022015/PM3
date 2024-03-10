'use strict'

import { Router } from 'express'
import { savePrestamo, getPrestamos, updatePrestamo } from './prestamo.controller.js'
import { validateJwt } from '../middlewares/validate-jwt.js'
const api = Router()

//rutas privadas
api.post('/save/:id', [validateJwt], savePrestamo)
api.get('/get', [validateJwt], getPrestamos)
api.put('/update/:id', [validateJwt], updatePrestamo)


export default api