// Bibliotecas
const request = require('supertest');
const { expect } = require('chai');

// Testes
describe('Transfer External', () => {
    describe('POST /transfers', () => {
        const http = 'http://localhost:3000'

        beforeEach(async () => {
            const respostaLogin = await request(http)
                .post('/users/login')
                .send({
                    username: 'diego',
                    password: '123456'
                });

            token = respostaLogin.body.token;
        })

        it('Quando informo remetente e destinatario inexistentes recebo 400', async () => {
            const resposta = await request(http)
                .post('/transfers')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    from: "diego",
                    to: "singrid",
                    value: 100
                });

            expect(resposta.status).to.equal(400);
            expect(resposta.body).to.have.property('error', 'Usuário remetente ou destinatário não encontrado')
        });

        it('Usando Mocks: Quando informo remetente e destinatario inexistentes recebo 400', async () => {
            const resposta = await request(http)
                .post('/transfers')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    from: "alan",
                    to: "BR",
                    value: 100
                });

            expect(resposta.status).to.equal(400);
            expect(resposta.body).to.have.property('error', 'Usuário remetente ou destinatário não encontrado');
        });

        it('Usando Mocks: Quando informo valores válidos eu tenho sucesso com 201 CREATED', async () => {
            const resposta = await request(http)
                .post('/transfers')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    from: "diego",
                    to: "bruno",
                    value: 100
                });

            expect(resposta.status).to.equal(201);

            // Validação com um Fixture
            const respostaEsperada = require('../fixture/respostas/quandoInformoValoresValidosEuTenhoSucessoCom201Creadted.json')
            delete resposta.body.date;
            delete respostaEsperada.date;
            expect(resposta.body).to.deep.equal(respostaEsperada)
        });

        describe('GET /transfers', () => {
            // Its ficam aqui
        });
    });
});