import db from "../database/index.js"

class FornecedorController {
    async create(req, res) {
        const { razaoSocial, cnpj, email } = req.body

        db.query(
            'INSERT INTO fornecedor (razaoSocial, cnpj, email) VALUES (?, ?, ?)',
            [razaoSocial, cnpj, email],
            (err, results) => {
                if (err) {
                    console.error('Erro ao inserir fornecedor:', err)
                    return res.status(500).json({ error: 'Erro ao inserir fornecedor' })
                }
                res.status(201).json({ message: 'Fornecedor inserido com sucesso', id: results.insertId })
            }
        )
    }
}

export default new FornecedorController();