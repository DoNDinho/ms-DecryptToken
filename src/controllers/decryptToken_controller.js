'use strict';
const logger = require('../config/log4js_config');
const Token = require('../services/decryptToken_service');

exports.token = async (req, res) => {
    try {
        let transactionId = req.headers.transaction_id;
        logger.addContext('transaction_id', transactionId);

        let headers = req.headers;
        let encryptedToken = req.params.encrypted_token;

        let token = new Token();

        try {
            await token.validarRequest(headers, res);
            let tokenJwt = token.desencriptarTokenJwe(encryptedToken);
            let decode = token.desencriptarTokenJwt(tokenJwt);

            res.json({
                data: decode.data
            });
        } catch (err) {
            // Obteniendo datos de objeto error
            let status = err.status;
            let code = err.code;
            let message = err.message;

            // Devolviendo respuesta error
            return res.status(status).json({
                code,
                message
            });
        }
    } catch (err) {
        logger.error('Ha ocurrido un error en metodo Generate Decrypt Token Controller: ', err);
        return res.status(500).json({
            code: '500',
            message: 'Internal Server Error'
        });
    }
};
