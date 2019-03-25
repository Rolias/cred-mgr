const chai = require('chai')
chai.should()
const sandbox = require('sinon').createSandbox()
const trelloCreds = require('./trello-creds-mgr')
const credMgr = require('./creds-mgr')

describe('trello-creds-mgr module', () => {

  let stubby
  beforeEach(() => {
    sandbox.stub(credMgr, 'getOrCreateSecret').resolvesArg(0)
    stubby = sandbox.stub(credMgr, 'clearSecret').resolves()
  })
  afterEach(() => {
    sandbox.restore()
  })

  it('getTrelloSecrets() should call getOrCreateSecret() looking for the right key names', async () => {
    const result = await trelloCreds.getTrelloSecrets()
    result.apiKey.name.should.equal('trelloApiKey')
    result.apiKey.hide.should.be.false
    result.token.name.should.equal('trelloToken')
    result.token.hide.should.be.true
  })

  it('clearTrelloSecrets() should call clearSecret() with correct key names', async () => {
    await trelloCreds.clearTrelloSecrets()
    const [[first], [second]] = stubby.args
    first.name.should.contain('trelloApiKey')
    second.name.should.contain('trelloToken')
  })
})