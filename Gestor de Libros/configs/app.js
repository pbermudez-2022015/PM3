'use strict'

import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import { config } from 'dotenv'
import userRoutes from '../src/user/user.routes.js'
import categoriaRoutes from '../src/categoria/categoria.routes.js'
import libroRoutes from '../src/libros/libro.routes.js'
import prestamosRoutes from '../src/prestamo/pretamo.routes.js'
//Configuraciones
const app = express()
config();
const port = process.env.PORT || 3056

//Configuraciones del servidor
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))

//declaracion de rutas
app.use('/user', userRoutes)
app.use('/categoria', categoriaRoutes)
app.use('/libro', libroRoutes)
app.use('/prestamo', prestamosRoutes)

//levantar el servidor
export const initServer = () => {
    app.listen(port)
    console.log(`Server HTTP running in port ${port}`)
}