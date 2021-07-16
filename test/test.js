let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
chai.should();
chai.use(chaiHttp);
let testData = require('../test/testData.json');
let token = '';

describe('POST /registerUser',()=>{
    it('should return 200 responce on successfull user registration',(done)=>{
        chai.request(server)
            .post('/registerUser')
            .send(testData.userData)
            .end((error,res)=>{
                res.should.have.status(200);
                res.body.should.have.property('success').eq(true);
                res.body.should.have.property('data');
            done();
            });
    });

    it('should return 422 responce on invalid user details',(done)=>{
        chai.request(server)
            .post('/registerUser')
            .send(testData.falseData)
            .end((error,res)=>{
                res.should.have.status(422);
                res.body.should.have.property('success').eq(false);
            done();
            });
    });

    it('should return 500 responce on duplicate mail address',(done)=>{
        chai.request(server)
            .post('/registerUser')
            .send(testData.userData)
            .end((error,res)=>{
                res.should.have.status(500);
                res.body.should.have.property('success').eq(false);
            done();
            });
    });
});

describe('POST /login',()=>{
    it('should return 200 responce on successfull user login',(done)=>{
        chai.request(server)
            .post('/login')
            .send(testData.userLogin)
            .end((error,res)=>{
                res.should.have.status(200);
                res.body.should.have.property('success').eq(true);
                res.body.should.have.property('token');
            done();
            });
    });

    it('should return 404 responce on failed user login',(done)=>{
        chai.request(server)
            .post('/login')
            .send(testData.falseLogin)
            .end((error,res)=>{
                res.should.have.status(404);
                res.body.should.have.property('success').eq(false);
            done();
            });
    });
});

beforeEach((done) => {
    chai.request(server)
        .post('/login')
        .send(testData.userLogin)
        .end((err, res) => {
            res.should.have.status(200);
            token = res.body.token;
            done();
        });
});


describe('POST /addressbook/addcontact',()=>{
    it('should return 200 status code on successful storing data',(done)=>{
        chai.request(server)
            .post('/addressbook/addcontact')
            .send(testData.contact)
            .set('token',token)
            .end((error,res)=>{
                res.should.have.status(200);
                res.body.should.have.property('success').eq(true);
                res.body.should.have.property('data');
            done();
            })
    })

    it('should return 422 status code on invalid contact details',(done)=>{
        chai.request(server)
            .post('/addressbook/addcontact')
            .send(testData.falseContact)
            .set('token',token)
            .end((error,res)=>{
                res.should.have.status(422);
                res.body.should.have.property('success').eq(false);
            done();
            })
    })
})

describe('GET /addressbook/getcontact',()=>{
    it('should return all the contacts in database with 200 status code',(done)=>{
        chai.request(server)
            .get('/addressbook/getcontact')
            .set('token',token)
            .end((error,res)=>{
                res.should.have.status(200)
                res.body.should.have.property('success').eq(true)
            done()    
            })
    })

    it('should give status code 402 for invalid token',(done)=>{
        chai.request(server)
            .get('/addressbook/getcontact')
            .set('token',testData.falseToken)
            .end((error,res)=>{
                res.should.have.status(402)
                res.body.should.have.property('success').eq(false)
            done()    
            })
    })
})

describe('GET contact by ID /addressbook/getcontact',()=>{
    it('should get emp using contact id and give status code 200',(done)=>{
        chai.request(server)
            .get('/addressbook/getcontact/'+testData.contactID)
            .set('token',token)
            .end((error,res)=>{
                res.should.have.status(200)
                res.body.should.have.property('success').eq(true)
            done()    
            })
    })

    it('should return status code 500 on wrong contact ID',(done)=>{
        chai.request(server)
            .get('/addressbook/getcontact/'+testData.falseID)
            .set('token',token)
            .end((error,res)=>{
                res.should.have.status(500)
                res.body.should.have.property('success').eq(false)
            done()    
            })
    })
})

describe(' PUT by ID /addressbook/updatecontact/',()=>{
    it('should give status code 200 on successfull update',(done)=>{
        chai.request(server)
            .put('/addressbook/updatecontact/'+testData.contactID)
            .send(testData.updateContact)
            .set('token',token)
            .end((error,res)=>{
                res.should.have.status(200)
                res.body.should.have.property('success').eq(true)
            done()
            })
    })

    it('should give status code 500 on unsuccessfull update',(done)=>{
        chai.request(server)
            .put('/addressbook/updatecontact/'+testData.falseID)
            .send(testData.updateContact)
            .set('token',token)
            .end((error,res)=>{
                res.should.have.status(500)
                res.body.should.have.property('success').eq(false)
            done()
            })
    })
})

describe('DELETE emp by ID /addressbook/deletecontact/',()=>{
    it('should get status code 200 on contact delete',(done)=>{
        chai.request(server)
            .delete('/addressbook/deletecontact/'+testData.deleteID)
            .set('token',token)
            .end((error,res)=>{
                res.should.have.status(200)
                res.body.should.have.property('success').eq(true)
            done()    
            })
    })

    it('should return status code on wrong contact ID',(done)=>{
        chai.request(server)
            .delete('/addressbook/deletecontact/'+testData.falseID)
            .set('token',token)
            .end((error,res)=>{
                res.should.have.status(500)
                res.body.should.have.property('success').eq(false)
            done()    
            })
    })
})
