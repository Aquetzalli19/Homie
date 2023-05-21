//Dependences
import morgan from 'morgan';
import express  from 'express';
const app = express();
//routes
import inmueble from './routes/inmueble.routes.js'

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended : true}))

app.use('/inmueble', inmueble)





app.listen(process.env.PORT || 3000, () => {
    console.log('server is running...');
})