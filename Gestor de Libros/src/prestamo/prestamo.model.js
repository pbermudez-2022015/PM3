import { Schema, model } from 'mongoose';

const prestamoSchema = Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    libro: {
        type: Schema.Types.ObjectId,
        ref: 'libro',
        required: true
    },
    fechaPrestamo: {
        type: Date,
        default: Date.now,
    },
    fechaDevolucion: {
        type: Date
    },
    estado: {
        type: String,
        enum: ['prestado', 'devuelto'],
        default: 'prestado'
    }
}, {
    versionKey: false
});

export default model('prestamo', prestamoSchema);
