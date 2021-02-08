import express from 'express'
import { Producto } from './producto'

const app = express()

app.use(express.json())

const productos: Producto [] = []

app.get('/api/productos/listar' , (req, res) => {
    if(productos.length === 0){
        res.send(`{error: 'no hay productos cargados'}`)
    } else { // Le agregue el else con el res.json porque sin el else, teniendolo como retorno, me tiraba Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
        res.json(productos)
    }
})

app.post('/api/productos/guardar' , (req, res) => {
    let id = (productos.length + 1).toString()
    const {title, price, thumbnail} = req.body
    const prod = {
        id,
        title,
        price,
        thumbnail
    }
    productos.push(prod)
    //res.json(prod) asi tiraba el mismo error que en LISTAR
    res.status(200).json(prod)
})

app.get('/api/productos/listar/:id', (req, res) => {
    const id = req.params.id
    const prod = productos.find( prod => prod.id === id)
    if (!prod){
        res.send(`{error: 'producto no encontrado'}`)
    }
    res.json(prod)
})

app.listen(8080, () => {
    console.log('Server listening on port 8080')
}).on('error', console.log);