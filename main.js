const trelloCredsMgr = require('./src/trello-creds-mgr')

const main = async () => {
  const result = await trelloCredsMgr.getTrelloSecrets()
  console.log(result)
  await trelloCredsMgr.clearTrelloSecrets()
}

main()
