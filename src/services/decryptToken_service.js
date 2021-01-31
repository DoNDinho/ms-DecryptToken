'use strict';
const logger = require('../config/log4js_config');
const headerSchema = require('../schemas/header_schema');
const { JWE } = require('jose');
const firmaTokenJwe = process.env.FIRMATOKENJWE;
const jwt = require('jsonwebtoken');
const firmaTokenJwt = process.env.FIRMATOKENJWT;

class Token {
    /**
     * @method
     * @description Valida el request de la solicitud
     * @param {object} headers cabecera de la solicitud
     */
    validarRequest(headers) {
        const Ajv = require('ajv');
        const ajv = new Ajv();
        let valid;

        return new Promise((resolve, reject) => {
            logger.info('Validando request de la solicitud');
            // Validando headers de la solicitud
            valid = ajv.validate(headerSchema, headers);
            if (!valid) {
                logger.error('Solicitud invalida - Headers invalidos!');

                // Llamando a metodo que arma objeto error
                reject(this.handlingError(400, '400', `${ajv.errors[0].message}`));
            } else {
                logger.info('Solicitud valida!');
                resolve(headers);
            }
        });
    }

    /**
     * @method
     * @description Metodo para desencriptar token
     * @param {String} encryptedToken token encriptado
     * @returns {String} token desencriptado
     * @throws {InvalidJWE} el token no es un token valido
     * @throws {SignatureIsNotValid} la firma del token no es valida
     */
    desencriptarTokenJwe(encryptedToken) {
        logger.info('Desencriptando Token JWE');

        try {
            let token = JWE.decrypt(encryptedToken, firmaTokenJwe);
            let decryptToken = Buffer.from(token).toString();
            logger.info('Token JWE desencriptado');
            return decryptToken;
        } catch (err) {
            if (err.code == 'ERR_JWE_INVALID') {
                logger.info('El token JWE es invalido');
                let InvalidJWE = this.handlingError(422, err.code, 'JWE Invalid');
                throw InvalidJWE;
            } else {
                logger.info('La firma del token JWE no es valida');
                let SignatureIsNotValid = this.handlingError(422, 'ERR_JWE_INVALID_SIGNATURE', err.message);
                throw SignatureIsNotValid;
            }
        }
    }

    /**
     * @method
     * @description metodo para desencriptar token con datos del usuario
     * @param {String} tokenJwt token que contiene datos del usuario
     * @returns {object} devuelve payload con contenido del token
     * @throws {TokenExpiredError} el token ha expirado
     * @throws {JsonWebTokenError} el token es invalido o la firma es invalida
     */
    desencriptarTokenJwt(tokenJwt) {
        logger.info('Desencriptando Token JWT');

        try {
            let decode = jwt.verify(tokenJwt, firmaTokenJwt);
            logger.info('Token JWT desencriptado');
            return decode;
        } catch (err) {
            if (err.name == 'TokenExpiredError') {
                logger.info('El token JWT ha expirado');
                let TokenExpiredError = this.handlingError(422, err.name, err.message);
                throw TokenExpiredError;
            } else if (err.name == 'JsonWebTokenError') {
                logger.info('Error en el JWT: ' + err.message);
                let JsonWebTokenError = this.handlingError(422, err.name, err.message);
                throw JsonWebTokenError;
            }
        }
    }

    /**
     * @method
     * @description Metodo para crear estructura de objeto error
     * @param {integer} status código estado de respuesta HTTP
     * @param {String} code codigo de error
     * @param {String} message mensaje de error
     * @returns {object} devuelv objeto error
     */
    handlingError(status, code, message) {
        let error = new Object();
        error.status = status;
        error.code = code;
        error.message = message;
        return error;
    }
}

module.exports = Token;
