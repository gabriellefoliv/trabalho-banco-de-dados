import 'dotenv/config'
import mySQL from 'mysql2'

const db = mySQL.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_HOST_USER,
    database: process.env.MYSQL_DATABASE,
})

db.getConnection((err) => {
    if (err) {
        console.log('Erro ao conectar ao banco de dados: ', JSON.stringify(err))
    } else {
        console.log('Banco de dados conectado!')
    }
})

export default db