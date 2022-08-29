/*
CREAATE AND EXPORT CONFIGURATION VARIABLES
*/


//Container for all the environments

var environments = {};


//Staging environment

environments.staging = {
    'port': 4000,
    'envName': 'staging',
}

//Production environment

environments.production = {
    'port': 5000,
    'envName': 'production',
}


//Determine which environment was passed as a command line argument

const currentEnvironment = typeof(process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV.toLocaleLowerCase() : '';


//Check if the currentEnvironment is one of the environments variables above, go to staging for default

const environmentToExport = typeof(environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.staging;

module.exports = environmentToExport;