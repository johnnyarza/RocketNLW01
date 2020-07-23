import express from 'express';
import routes from './routes';
import path from 'path';
import cors from 'cors';
import { errors } from 'celebrate';
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

app.listen(3333, () => {
  console.log('API iniciada-------------<');
});

// //Request Param: Parâmetros que vem na própria rota que uidentificam um recurso
// //Query Param: Parâmetros que vem na própria rota geralmente opcionais para filtros, paginação
// //Request Body: São parâmetros para criação / atualização de informações

// const users = ['Diego', 'Cleiton', 'Robson'];

// app.get('/users', (req, res) => {
//   try {
//     const search = String(req.query.search);
//     const filteredUsers = search
//       ? users.filter((user) => user.includes(search))
//       : users;

//     return res.json(filteredUsers);
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
//   console.log('Listagem de usuarios');
// });

// app.get('/users/:id', (req, res) => {
//   try {
//     const id = Number(req.params.id);
//     const user = users[id];
//     return res.json(user);
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// });

// app.post('/users', (req, res) => {
//   try {
//     const data = req.body;

//     return res.json(data);
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// });
