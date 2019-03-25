const chai = require('chai')
chai.should()
const sandbox = require('sinon').createSandbox()
const keytar = require('keytar')
const inquirer = require('inquirer')
const credsMgr = require('./creds-mgr')


describe('creds-mgr module', () => {
  afterEach(() => {
    sandbox.restore()
  })

  describe('When property is found in store', () => {
    beforeEach(() => {
      sandbox.stub(keytar, 'getPassword').resolves('123')
    })

    it('getOrCreateSecret() should return prop secret when passed name', async () => {
      const result = await credsMgr.getOrCreateSecret({name: 'apiKeyTest'})
      result.should.equal('123')
    })

    it('getOrCreateSecret() should return prop secret when passed name and hide', async () => {
      const result = await credsMgr.getOrCreateSecret({name: 'apiKeyTest', hide: true})
      result.should.equal('123')
    })
  })

  describe('when property is not found in store', () => {
    it('getOrCreateSecret() should call createSecret and get back inquirer.prompt() value', async () => {
      sandbox.stub(keytar, 'getPassword').resolves(null)
      sandbox.stub(inquirer, 'prompt').resolves({secret: 'KeyValue'})
      sandbox.stub(keytar, 'setPassword').resolves()
      const result = await credsMgr.getOrCreateSecret({name: 'theKey'})
      result.should.equal('KeyValue')
    })
  })

  it('clearSecret() should call deletePassword with package name and passed name', async () => {
    const stubby = sandbox.stub(keytar, 'deletePassword')
    credsMgr.clearSecret({name: 'TheKey'})
    stubby.args[0][0].should.equal(process.env.npm_package_name)
    stubby.args[0][1].should.equal('TheKey')
  })

})