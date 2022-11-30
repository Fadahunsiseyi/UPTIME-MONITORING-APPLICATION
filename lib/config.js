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
    'hashingSecret': 'thisIsASecret',
    'maxChecks': 5,
    'twilio' : {
        'accountSid': 'ACb32d411ad7fe886aac54c665d25e5c5d',
        'authToken': '9455e3eb3109edc12e3d8c92768f7a67',
        'fromPhone': '+15005550006'
    },
    'templateGlobals': {
        'appName': 'UptimeChecker',
        'companyName': 'NotARealCompany, Inc',
        'yearCreated': '2018',
        'baseUrl': 'http://localhost:4000/'
    }
}

//Production environment

environments.production = {
    'httpPort': 5000,
    'httpsPort': 5001,
    'envName': 'production',
    'hashingSecret': 'thisIsAlsoASecret',
    'maxChecks': 5,
    'twilio' : {
        'accountSid': '',
        'authToken': '',
        'fromPhone': ''
    },
    'templateGlobals': {
        'appName': 'UptimeChecker',
        'companyName': 'NotARealCompany, Inc',
        'yearCreated': '2018',
        'baseUrl': 'http://localhost:4000/'
    }
}


//Determine which environment was passed as a command line argument

const currentEnvironment = typeof(process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV.toLocaleLowerCase() : '';


//Check if the currentEnvironment is one of the environments variables above, go to staging for default

const environmentToExport = typeof(environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.staging;

module.exports = environmentToExport;