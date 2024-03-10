import Libro from './libro.model.js'

export const save = async (req, res) => {
    try {
        if (req.user.role !== 'ADMIN') {
            return res.status(401).send({ message: 'Unauthorized, only admins can save books.' });
        }
        let data = req.body;
        let libro = new Libro(data);
        await libro.save();
        return res.send({ message: 'Book saved successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error saving book' });
    }
};


export const getlibro = async (req, res) => {
    try {
        const libros = await Libro.find().populate({ path: 'categoria', select: '-_id' });
        return res.json(libros);
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error fetching books' });
    }
};

export const deleteLibro = async (req, res) => {
    try {
        if (req.user.role !== 'ADMIN') {
            return res.status(401).send({ message: 'Unauthorized, only admins can delete books.' });
        }
        const libroId = req.params.id;
        const libro = await Libro.findById(libroId);
        if (!libro) {
            return res.status(404).send({ message: 'Book not found' });
        }
        await Libro.findOneAndDelete(libroId);
        return res.send({ message: 'Book deleted successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error deleting book' });
    }
};
