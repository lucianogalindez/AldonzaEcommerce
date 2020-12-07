import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const generateToken = (user) => {
    return jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET || 'somethingsecret',
    {
        expiresIn: '30d',
    } )
}

// el primer parametro hace referencia al objeto que vamos a usar para generar el token

//el segundo el el jsonwebtokenSecret, que es como una llave que se usa para encriptar la data y generar el token

// para esto se utilizara .env, debo instalar el paquete npm i dotenv. y agregar en app.js dotenv.config()

//el tercer parametro son las opciones. Aqui ponemos una fecha de expiracion para el token

export const isAuth = (req, res, next) => {
    const authorization = req.headers.authorization;
    if(authorization) {
        const token = authorization.slice(7, authorization.length); // Bearer XXXXX => con esta funcion solo me quedo con el codigo, es decir con XXXXX
        jwt.verify(token, process.env.JWT_SECRET || 'somethingsecret', (err, decode) => {
            if (err) {
                res.status(401).send({
                    message: 'Invalid Token'
                }) 
            } else {
                req.user = decode; //devuelve la informacion del usuario
                next() //con next pasamos al usuario como propiedad para el siguiente paso
            }
        }) //lo encripta
    } else {
        res.status(401).send({message: 'No Token'})
    }
}

//middlewars reciben 3 parametros, req, res y next