import { Schema, model } from 'mongoose';

const schemaLibro = Schema({
    titulo: {
        type: String,
        required: true
    },
    autor: {
        type: String,
        required: true
    },
    año: {
        type: Number,
        required: true
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'categoria'
    }
}, {
    versionKey: false
});

export default model('libro', schemaLibro);
