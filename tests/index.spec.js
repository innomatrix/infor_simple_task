const app = require('../index');
const request = require('supertest');
const agent = request.agent(app);

describe('App', () => {
  it('/echo responds with json', (done) => {
    agent
      .get('/echo')
      .end((err, res) => {
        expect(res.type).toBe('application/json')
        expect(res.body).toHaveProperty('echo')
        expect(res.status).toBe(200)
        done();
      })
  });

  it('/convertLinks responds with transformed HTML', (done) => {
    agent
    // request(app)
      .post('/convertLinks')
      .send({
        "html": "<p>Polscy siatkarze w półfinale mistrzostw Europy w Lublanie chcieli przełamać złą passę w pojedynkach ze Słoweńcami. W dwóch poprzednich edycjach czempionatu Starego Kontynentu odpadli właśnie po porażkach z tymi rywalami. Niestety tym razem znów się nie udało.</p>",
        "keys": [{
          "key": "mistrzostw Europy",
          "url": "http://www.infor.pl"
        }, {
          "key": "lasami państwowymi",
          "url": "http://www.dziennik.pl"
        }]
      })
      .end((err, res) => {
        expect(res.type).toBe('application/json')
        expect(res.body).toHaveProperty('html')
        expect(res.body).toMatchObject({
        "html": "<p>Polscy siatkarze w półfinale <a href=\"http://www.infor.pl\" >mistrzostw Europy</a> w Lublanie chcieli przełamać złą passę w pojedynkach ze Słoweńcami. W dwóch poprzednich edycjach czempionatu Starego Kontynentu odpadli właśnie po porażkach z tymi rywalami. Niestety tym razem znów się nie udało.</p>"
        })
        expect(res.status).toBe(200)
        done();
      })
  });  
});