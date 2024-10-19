const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db/dbdatos.json'); // Ruta correcta al archivo JSON
const middlewares = jsonServer.defaults();

// Middleware para generar IDs numéricos autoincrementables
router.db._.id = 0; // Inicializa el contador de IDs

server.use(middlewares);

// Middleware personalizado para incrementar el ID numérico
server.use((req, res, next) => {
  if (req.method === 'POST') {
    const db = router.db; // Accede a la base de datos
    const collection = db.get(req.path.split('/')[1]); // Obtén la colección correcta
    
    // Encuentra el último ID y suma 1 para el nuevo ID
    const lastItem = collection.sortBy('id').last().value();
    const newId = lastItem ? lastItem.id + 1 : 1;

    req.body.id = newId; // Asigna el nuevo ID
  }
  next();
});

// Usa el enrutador de json-server
server.use(router);

// Ejecuta el servidor en el puerto 3000
server.listen(3000, () => {
  console.log('JSON Server is running on port 3000');
});
