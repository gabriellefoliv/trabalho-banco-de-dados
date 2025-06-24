import db from "../database/index.js"

class FornecedorController {
    async criarFornecedor(req, res) {
        const { razaoSocial, cnpj, email, dataFim } = req.body

        db.query(
            'INSERT INTO fornecedor (razaoSocial, cnpj, email, dataFim) VALUES (?, ?, ?, ?)',
            [razaoSocial, cnpj, email, dataFim],
            (err, results) => {
                if (err) {
                    console.error('Erro ao inserir fornecedor:', err)
                    return res.status(500).json({ error: 'Erro ao inserir fornecedor' })
                }
                res.status(201).json({ message: 'Fornecedor inserido com sucesso' })
            }
        )
    }

    async buscarFornecedores(req, res) {
        db.query('SELECT * FROM fornecedor ORDER BY dataIni DESC', (err, results) => {
            if (err) {
                return res.status(500).send({ error: 'Erro ao buscar fornecedores' })
            }
            return res.send(results)
        })
    }

    async diversidadeEmCategorias(req, res) {
        db.query(
            `SELECT f.*, COUNT(DISTINCT mp.categoria) AS categoriasDistintas
            FROM fornecedor f
            INNER JOIN materia_prima mp
            ON f.codFornecedor = mp.codFornecedor
            GROUP BY f.razaoSocial
            HAVING COUNT(DISTINCT mp.categoria) >= 3        
            `,
            (err, results) => {
                if (err) {
                    return res.status(500).send({ error: 'Erro ao buscar diversidade em categorias' })
                }
                return res.send(results)
            }
        )
    }

    async fornecedoresPremium(req, res) {
        db.query(
            `SELECT f.*
            FROM fornecedor f
            INNER JOIN materia_prima mp 
            ON f.codFornecedor = mp.codFornecedor
            INNER JOIN aloca_mp a
            ON mp.codMP = a.codMP
            GROUP BY f.razaoSocial
            HAVING AVG(mp.custo) > 50 AND COUNT(DISTINCT a.codProduto) >= 2`,
            (err, results) => {
                if (err) {
                    return res.status(500).send({ error: 'Erro ao buscar fornecedores premium' })
                }
                return res.send(results)
            }
        )
    }

    async prolongarContratoFornecedor(req, res) {
        const { codFornecedor } = req.params;
        const { quantidade, unidade } = req.body;

        const unidadesPermitidas = ['DAY', 'MONTH', 'YEAR'];

        if (!quantidade || !unidade) {
            return res.status(400).send({ error: 'Informe quantidade e unidade' });
        }

        if (!unidadesPermitidas.includes(unidade.toUpperCase())) {
            return res.status(400).send({ error: 'Unidade inválida. Use DAY, MONTH ou YEAR.' });
        }

        db.query(
            `
                UPDATE fornecedor
                SET dataFim = DATE_ADD(IFNULL(dataFim, CURDATE()), INTERVAL ? ${unidade.toUpperCase()})
                WHERE codFornecedor = ?
            `,
            [quantidade, codFornecedor],
            (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send({ error: 'Erro ao prorrogar contrato' });
                }

                if (result.affectedRows === 0) {
                    return res.status(404).send({ error: 'Fornecedor não encontrado' });
                }

                return res.send({ message: 'Contrato prorrogado com sucesso' });
            }
        );
    }

}

export default new FornecedorController();