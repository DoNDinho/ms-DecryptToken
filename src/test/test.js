const assert = require('chai').assert;
const Token = require('../services/decryptToken_service');

describe('Token', () => {
    let token = new Token();
    let tokenJwe =
        'eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiUEJFUzItSFMyNTYrQTEyOEtXIiwicDJjIjozMTc4LCJwMnMiOiIxUEV5d3JXSVJ2bVdMRHg5TXNSMGZnIn0.aMk8aDq7Ir9TDjgkCTZ4d-mPdtUsIQyqQVXqhVJylv9pAJ5ESNkkvw.iS4fZ2e9C1jv6OTLc8NLWA.GPSGdFaQaLsJBwe0R9Q8UupiRNY1PTDDKRJhiIz1cmd_RxvtJCqvTDM6GCP-WcLlGiBVaOGrWaNp7_9ATnpqWrbte13rwEqtw67Q7tOlBPOPHg3HQ-SabmmNGBZ1SSOqZIQ4RG6dj1VEWw06P1d9qSygkMNGDpiQHpw84_Y3w-hHZRM7J0B2pj8XanMq0pPTKaEc4IErB3nw-YNJ_eStuW5SuxGA0hCZpJwOJcQrXmRdZB-yvFrl3WOzPfNV4KVAJsPazoQL6BHOjHmkAx44rldSJ6HArfAw8N2w-UUOLjxXqCpH5IyHJ8CuHT-h3bBukPITqkw8XQVDUvWEOaaIddjVu4H7eZWyJFLtULjX80A.IRi99QBcW5MhI_5RmwFsCg';

    describe('#desencriptarTokenJwe()', () => {
        it('Prueba metodo para desencriptar token JWE', () => {
            decryptJwe = token.desencriptarTokenJwe(tokenJwe);
            assert.typeOf('decryptJwe', 'string', 'decryptJwe es un string');
        });
    });
});
