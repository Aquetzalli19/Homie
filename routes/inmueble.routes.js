import express from 'express';
const inmueble = express.Router();
import { getInmueble, postInmueble} from "../controllers/inmueble.controller.js";

inmueble.get('/', getInmueble);
inmueble.post('/', postInmueble);

export default inmueble