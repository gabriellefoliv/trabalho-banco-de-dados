import app from './app.js'

const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello Serra Jr.');
});

app.listen(port, () => {
    console.log(`🚀 Servidor rodando na porta ${port}!!`);
});