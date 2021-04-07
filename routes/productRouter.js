import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import MovieList from '../models/productModel.js';

const productRouter = express.Router();

productRouter.get('/seed', expressAsyncHandler(async(req, res) => {
    const createdProducts = await MovieList.insertMany(data.moviesList);
    res.send( {createdProducts});
    })
);
export default productRouter;