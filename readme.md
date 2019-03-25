# Credential Manager

This small tool is designed to store, retrieve, and clear credentials using the local key store on the 
developer's machine. On the Mac that would be keychain. On Windows and Linux that would be whatever credential
manager is in use. 

## Installation

Right now download and type `npm link` in the project directory
Then move to where you want to use it and type `npm link cred-mgr`.
Will likely move this to npm once it proves useful.

## Dependencies

`keytar` - for abstracting away all the hard stuff and figuring out what the local key store is and how to use it  
`inquirer` - for prompting the user to enter credentials when they aren't found in the store  
