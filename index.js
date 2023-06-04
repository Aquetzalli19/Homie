//Dependences
import morgan from 'morgan';
import express  from 'express';
const app = express();
//routes
import inmueble from './routes/inmueble.routes.js';
import user from './routes/users.routes.js';
//middlewares
import {auth} from './middlewares/auth.js';
import {cors} from './middlewares/cors.js';
import {notFound} from './middlewares/notFound.js';

app.use(cors);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended : true}));

app.use('/user', user);
app.use(auth);
app.use('/inmueble', inmueble);


app.use(notFound);


app.listen(process.env.PORT || 3000, () => {
    console.log('server is running...');
})