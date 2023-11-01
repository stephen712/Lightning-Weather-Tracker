public with sharing class getWeatherData {
    @AuraEnabled(cacheable=true)
    public static List<Map<String,String>> fetchDetails(){
        List<weatherResult__c> weatherResult=[SELECT Name,weatherCode__c ,City__c from weatherResult__c];
        List<Map<String,String>> weatherData = new List<Map<String,String>>();
        for(weatherResult__c wr:weatherResult){
            Map<String,String> mo=new Map<String,String>();
            mo.put(wr.City__c,wr.weatherCode__c );
            weatherData.add(mo);
            System.debug(mo);
        }
        return weatherData;
    }

}