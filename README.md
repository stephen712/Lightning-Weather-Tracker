# Lightning-Weather-Tracker

Use-Case = Create an automation in Salesforce which can help user-agents to predict a suitable delivery date for clients based on the weather conditions which are fetched using real time data from tomorrow.ai weather api.

When an account is saved 
A record Triggered flow is executed which will perform apex callout in a asynchronous way using future method 
Flow will fetch the Billing CIty from Account field and pass it to the http callout in Apex.
Apex action would return us the weather codes in json format which we are saving inside of a custom object WeatherResult__c(City__c,WeatherCodes__c)
Simuntaneously created a lwc component(displayWeathers) with a lightning input and button
Using wire callout we are fetching the current data from WeatherResult__c custom object in list of maps format
We pass this data to extractDatesAndWeatherCodes function where it got parsed into json format and city,date and weatherCodes got extracted and returned to be shown on the org when the template identifier is true (for:each and if:true are used)



On passing the desired city in the field
User will receive the weather conditions(heavy snow, lightning, Heat strokes ,etc..) of the current and 5 more future dates through which the user agent can pick the desired date to make the delivery






