'use strict'
import Prestamo from './prestamo.model.js'


export const savePrestamo = async (req, res) => {
    try {
        const { libro } = req.body;
        const { id } = req.params;
        const distintosLibrosPrestados = await Prestamo.find({ user: id, estado: 'prestado' }).distinct('libro');
        if (distintosLibrosPrestados.length >= 2) {
            return res.status(400).send({ message: 'El usuario ya tiene 2 libros diferentes prestados y no devueltos' });
        }
        const prestamoExistente = await Prestamo.findOne({ user: id, libro, estado: 'prestado' });
        if (prestamoExistente) {
            return res.status(400).send({ message: 'El usuario ya tiene este libro prestado' });
        }
        const prestamo = new Prestamo({ user: id, libro });
        await prestamo.save();
        return res.send({ message: 'Prestamo guardado correctamente' });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error al guardar el préstamo' });
    }
};


//Muestra todos los prestamos hechos
export const getPrestamos = async (req, res) => {
    try {
        const prestamos = await Prestamo.find().populate({ path: 'user', select: '-_id name lastname' }).populate({ path: 'libro', select: '-_id titulo autor categoria' });
        return res.json(prestamos);
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error fetching loans' });
    }
};

//solo puede actualziar el estado y fecha que fueron devueltos los libros
export const updatePrestamo = async (req, res) => {
    try {
        const { id } = req.params;
        const { estado, fechaDevolucion } = req.body;
        if (!['prestado', 'devuelto'].includes(estado)) {
            return res.status(400).send({ message: 'Provided state is not valid' });
        }
        if (estado === 'devuelto' && !fechaDevolucion) {
            return res.status(400).send({ message: 'Return date is required when marking as returned' });
        }
        const prestamo = await Prestamo.findById(id);
        if (!prestamo) {
            return res.status(404).send({ message: 'Prestamo not found' });
        }
        prestamo.estado = estado;
        prestamo.fechaDevolucion = fechaDevolucion;
        await prestamo.save();
        return res.send({ message: 'Prestamo updated successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error updating prestamo' });
    }
};


