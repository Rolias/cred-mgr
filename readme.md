# Bare Bones Starter Kit

This is a pretty bare bones starter kit. It does have support for mocha and linting. None of the linting or testing is run automatically. While there is a .travis.yml file it doesn't have to do anything. See the alm-starter-kit (Application Life Cycle management) for a more comprehensive Continuous Deployment approach.

## First steps

There is an included bash script now named `new-app.sh` that will do the cloning, and commits. When you run that script you will be prompted for the folder where you want the cloned repo to exist. If will clone into that folder then remove the .git directory, do an init, stage all the cile and do an initial commit. 

When that is done you can modify the package.json file to refer to your package. Change the name, keywords,  and any other fields. 

## Basic Git Stuff

Then create a new repo up in GitHub (don't create the readme). Keep the page open so you can copy and paste the lines for add the origin and doing the push.  

Now you can back to the package.json file and overwrite the repository section to have your git username and the name of your repo. 

``` JSON
"repository":{
      "type": "git",
    "url": "git@github.com:<userName>/<repo-name.git>"
},
```

After those two commands are run, VScode can do push and pull and your git folder will have updated its `config` file with the `[remote "origin"]` section.

Finally do an `npm install`
to install all the packages in the package.json

## Dependencies

The only dependency for the non-development side is winston for logging.  
Packages all use "x" for the semver flag so on a new project the latest versions will get pulled in.
