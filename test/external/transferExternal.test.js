// Bibliotecas
const request = require('supertest');
const { expect } = require('chai');

// Testes
describe('Transfer External', () => {
    describe('POST /transfers', () => {
        it('Quando informo remetente e destinatario inexistentes recebo 400', async () => {
            // Capturar o Token
            const  respostaLogin = await request('http://localhost:3000')
                .post('/users/login')
                .send({
                    username: 'diego',
                    password: '123456'
                });

            const token = respostaLogin.body.token;

            // Realizar a transferência
            const resposta = await request('http://localhost:3000')
                .post('/transfers')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    from: "diego",
                    to: "BR",
                    value: 100
                });
            
            expect(resposta.status).to.equal(400);
            expect(resposta.body).to.have.property('error', 'Usuário remetente ou destinatário não encontrado')
        });
    });

    describe('GET /transfers', () => {
        // Its ficam aqui
    });
});