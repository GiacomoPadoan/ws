const request = require('supertest');
const app = require('./app');

describe('Test the invoice endpoints', () => {
  let invoiceId;

  test('GET / should return a list of invoices', async () => {
    const response = await request(app).get('/invoices');
    expect(response.status).toBe(200);
    expect(response.body.r).toBeInstanceOf(Array);
  });

  test('POST / should create a new invoice', async () => {
    const invoice = {
      data: '2023-05-08',
      utente: 1,
      indirizzata: 'francesco',
      motivazioni: 'fattura 100 coca cola',
      somma: 500.00,
    };

    const response = await request(app)
      .post('/invoices')
      .send(invoice);
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(invoice);

    invoiceId = response.body.id;
  });

  test('PUT /update/:id should update an existing invoice', async () => {
    const invoiceUpdates = {
      data: '2023-05-09',
      utente: 2,
      indirizzata: 'giacomino',
      motivazioni: 'fattura 100 hamburgar',
      somma: 750.00,
    };

    const response = await request(app)
      .put(`/invoices/update/${invoiceId}`)
      .send(invoiceUpdates);
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(invoiceUpdates);
  });

  test('DELETE /delete/:id should delete an existing invoice', async () => {
    const response = await request(app).delete(`/invoices/delete/${invoiceId}`);
    expect(response.status).toBe(204);

    const getResponse = await request(app).get(`/invoices/${invoiceId}`);
    expect(getResponse.status).toBe(404);
  });
});
