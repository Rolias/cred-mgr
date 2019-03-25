// @ts-check
const credMgr = require('./creds-mgr')
const TRELLO_API_KEY_NAME = 'trelloApiKey'
const TRELLO_TOKEN_NAME = 'trelloToken'

/**
 * Will retrieve keys for trelloApiKey and trelloToken. If they don't exist user will
 * be prompted to create them
 * @returns {Promise<{apiKey:string, token:string}>}
 */
const getTrelloSecrets = async () => {
  const apiKey = await credMgr.getOrCreateSecret({name: TRELLO_API_KEY_NAME, hide: false})
  const token = await credMgr.getOrCreateSecret({name: TRELLO_TOKEN_NAME, hide: true})
  return {apiKey, token}
}

/**
 * Will clear the two Trello secrests for this service from the store
 */
const clearTrelloSecrets = async () => {
  await credMgr.clearSecret({name: TRELLO_API_KEY_NAME})
  await credMgr.clearSecret({name: TRELLO_TOKEN_NAME})
}

module.exports = {
  getTrelloSecrets,
  clearTrelloSecrets,
}