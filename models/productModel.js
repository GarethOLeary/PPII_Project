import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
    {
    title: { type: String, required: true},
    image: { type: String, required: true},
    year: { type: String, required: true},
    category: { type: String, required: true},
    description: { type: String, required: true},
},
{
    timestamps: true,
}
);
const MovieList = mongoose.model('MovieList', productSchema);

export default MovieList;