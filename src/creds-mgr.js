/**
 * @module
 */
const keytar = require('keytar')
const inquirer = require('inquirer')
const service = process.env.npm_package_name


/**
 * If a named credential for our service (based on package name)
 * exists in the local machine's key store get it. Otherwise
 * prompt the user to create it
 * @param {{name:string, hide:boolean}} param  
 * @returns {Promise<string>}  resolves to the stored secret for the passed name
 * @example getOrCreateSecret({name:'trelloApiKey}, hidden:false)
 */
const getOrCreateSecret = async (param) => {
  const propSecret = await keytar.getPassword(service, param.name)
  if (propSecret === null) {
    return await createSecret(param)
  }
  return propSecret
}

/**
 * Create the key in the local machine's key store and allow the user to
 * type in the value. If the hide property is true - typed value will not show
 * The service is set to our package name
 * @param {{name:string, hide:boolean}} param 
 * @returns {Promise<{secret:string}>} 
 * for example if user types 123 will return {secret:'123'}
 * @example createSecret({name:'apiKey', hide:false})
 */
const createSecret = async (param) => {
  const inputType = param.hide ? 'password' : 'input'
  const response = await inquirer.prompt([
    {type: inputType, name: 'secret', message: `Enter a value for ${param.name}`}
  ])

  const {secret} = response
  await keytar.setPassword(service, param.name, secret)
  return secret
}

/**
 * 
 * @param {{name:string}} param  name of the credentials to find and delete for this service 
 */
const clearSecret = async (param) => {
  await keytar.deletePassword(service, param.name)
}

module.exports = {
  getOrCreateSecret,
  clearSecret,
}