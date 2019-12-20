import {Router} from 'express';
import { Client } from 'pg';

const router = Router();

router.get('/', async(req, res) =>{
    let resultado = [];
    const client = criaClient();
    await client.connect();

    

    let queryResult = await client.query("select CODIGO_ATIVO, QUANTIDADE, PRECO_MEDIO  from public.CARTEIRA");
    for (let row of queryResult.rows) {
       
        resultado.push({
            codigo_ativo:row.codigo_ativo, // não consegui puxar da tabela ativos daqui, por isso fiz assim para poder continuar o exercicio
            quantidade: row.quantidade,
            preco_medio:row.preco_medio


        });
        console.log(resultado[-1]);
    }
    await client.end();

    res.send(JSON.stringify(resultado));

});


router.post('/', async (req, res) => {
    let payload = req.body;
    let sql = `insert into CARTEIRA(CODIGO_ATIVO, QUANTIDADE, PRECO_MEDIO) VALUES
    ('${payload.codigo_ativo}','${payload.quantidade}','${payload.preco_medio}')
    `;

    const client = criaClient();
    await client.connect();
    await client.query(sql);
    await client.end();

    res.status(201);
    res.send();
})

router.put('/:codigo', async(req,res) =>{
    let codigo = req.params.codigo_ativo;
    let payload= req.body;
    
    let sql = `update  CARTEIRA SET 
        
    QUANTIDADE= '${payload.quantidade}',
    PRECO_MEDIO='${payload.preco_medio}'
    
     
     where
        CODIGO_ATIVO ='${codigo}'
        `;
            const client = criaClient();
            await client.connect();
            await client.query(sql);
            await client.end();
        
            res.status(204);
            res.send();

    
});

router.delete('/:codigo', async (req,res) =>{
    let codigo = req.params.codigo_ativo;
    let payload= req.body;
    
    let sql = `delete from  CARTEIRA  
    
         where
         CODIGO_ATIVO ='${codigo}'
            `;
            const client = criaClient();
            await client.connect();
            await client.query(sql);
            await client.end();
        
            res.status(204);
            res.send();
});





function criaClient() {
    return new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'db_dia3',
        password: '123456',
        port: 5432
    });
}


export default router;