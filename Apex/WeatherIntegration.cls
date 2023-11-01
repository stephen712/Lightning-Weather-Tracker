public with sharing class WeatherIntegration {

    //  API endpoint
    private static final String API_ENDPOINT = 'https://api.tomorrow.io/v4/timelines';

    //  Tomorrow.io API key
    private static final String API_KEY = '1DX7Ebf39zwOHlngWYpOnwbNrgM45J7j';

    public class InputVariables {
        @InvocableVariable(label='Delivery City' required=true)
        public String city;
    }

    @InvocableMethod(label='Get Weather Data')
    public static void getWeatherData(List<InputVariables> inputVariablesList) {
        for (InputVariables inputVar : inputVariablesList) {
            makeApiCall(inputVar.city);
        }
    }

    @future(callout=true)
    public static void makeApiCall(String city) {
        // HTTP request
        HttpRequest request = new HttpRequest();
        request.setEndpoint(API_ENDPOINT);
        request.setMethod('GET');
        
        //  request parameters
        String queryString = 'location=' + EncodingUtil.urlEncode(city, 'UTF-8') +
            '&fields=weatherCodeFullDay&timesteps=1d&apikey=' + API_KEY;
        request.setEndpoint(API_ENDPOINT + '?' + queryString);

        //  HTTP object to send the request
        Http http = new Http();
        HttpResponse response = http.send(request);

        if (response.getStatusCode() == 200) {
          
            String weatherCode = response.getBody();
            System.debug(weatherCode);
            
            weatherResult__c obj = new weatherResult__c();
            obj.City__c = city;
            obj.weatherCode__c = weatherCode;
            insert obj;
        } else {
            // Handle error cases
            System.debug('HTTP Request failed with status code: ' + response.getStatusCode());
        }
    }
}