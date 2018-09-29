const { server } = require('./server');

const port = process.env.PORT || 5000;

server.use('/', (req,res) => res.send('Server up and running!'))

server.listen(port, () => {
  console.log(`\n=== Server listening on port ${port}\n`);
});
