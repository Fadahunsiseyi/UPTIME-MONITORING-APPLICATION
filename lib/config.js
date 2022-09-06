/*
CREAATE AND EXPORT CONFIGURATION VARIABLES
*/


//Container for all the environments

var environments = {};


//Staging environment

environments.staging = {
    'httpPort': 4000,
    'httpsPort': 4001,
    'envName': 'staging',
    'hashingSecret': 'thisIsASecret'
}

//Production environment

environments.production = {
    'httpPort': 5000,
    'httpsPort': 5001,
    'envName': 'production',
    'hashingSecret': 'thisIsAlsoASecret'
}


//Determine which environment was passed as a command line argument

const currentEnvironment = typeof(process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV.toLocaleLowerCase() : '';


//Check if the currentEnvironment is one of the environments variables above, go to staging for default

const environmentToExport = typeof(environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.staging;

module.exports = environmentToExport;