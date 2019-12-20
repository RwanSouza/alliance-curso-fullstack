import express, { Router } from 'express';
import cors from 'cors';

import Carteira from './carteira';

import Ativo from './ativo';
const app = express();

app.use(express.json());
app.use(cors());
app.use('/carteira',Carteira);
app.use('/ativo',Ativo);


app.listen(3000, () =>
console.log('Servidor rodando na porta 3000'),

);

