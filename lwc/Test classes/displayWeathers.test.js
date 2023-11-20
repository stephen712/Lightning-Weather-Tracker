import { createElement } from 'lwc';
import DisplayWeathers from 'c/displayWeathers';
import {createApexTestWireAdapter} from '@salesforce/sfdx-lwc-jest';
import fetchDetails from '@salesforce/apex/getWeatherData.fetchDetails';

const mockDetails = createApexTestWireAdapter(fetchDetails);

describe('c-display-weathers', () => {  
    jest.setTimeout(10000);
    afterEach(() => {
        
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
        jest.clearAllMocks();
    });

    it('displays the correct label text', async() => {
        // Arrange
        const element = createElement('c-display-weathers', {
            is: DisplayWeathers
        });

        
        document.body.appendChild(element);

        // Assert
        
        return Promise.resolve().then(()=>{
            const labelValue = element.shadowRoot.querySelector('lightning-input');
            expect(labelValue.label).toBe('Enter the Billing City');
        });
    });
  
    
    it('updates billingCity when lightning-input value changes', async() => {
        // Arrange
        const element = createElement('c-display-weathers', {
            is: DisplayWeathers
        });
        document.body.appendChild(element);
    
        // Act
        const lightningInput = element.shadowRoot.querySelector('lightning-input');
        lightningInput.value = 'New Delhi';
        lightningInput.dispatchEvent(new CustomEvent('change'));
    
        // Assert
       
        return Promise.resolve().then(() => {
            // Assert
            expect(element.billingCity).toBe('New Delhi');
        });
        
    });

    it('fetches wire data correctly', () => {
       
        // Arrange
        const element = createElement('c-display-weathers', {
            is: DisplayWeathers
        });
        document.body.appendChild(element);

        const mockData = [
            {
                'Anchorage': '{&quot;data&quot;:{&quot;timelines&quot;:[{&quot;timestep&quot;:&quot;1d&quot;,&quot;endTime&quot;:&quot;2023-11-04T14:00:00Z&quot;,&quot;startTime&quot;:&quot;2023-10-30T14:00:00Z&quot;,&quot;intervals&quot;:[{&quot;startTime&quot;:&quot;2023-10-30T14:00:00Z&quot;,&quot;values&quot;:{&quot;weatherCodeFullDay&quot;:1100}},{&quot;startTime&quot;:&quot;2023-10-31T14:00:00Z&quot;,&quot;values&quot;:{&quot;weatherCodeFullDay&quot;:1001}},{&quot;startTime&quot;:&quot;2023-11-01T14:00:00Z&quot;,&quot;values&quot;:{&quot;weatherCodeFullDay&quot;:1001}},{&quot;startTime&quot;:&quot;2023-11-02T14:00:00Z&quot;,&quot;values&quot;:{&quot;weatherCodeFullDay&quot;:1001}},{&quot;startTime&quot;:&quot;2023-11-03T14:00:00Z&quot;,&quot;values&quot;:{&quot;weatherCodeFullDay&quot;:2103}},{&quot;startTime&quot;:&quot;2023-11-04T14:00:00Z&quot;,&quot;values&quot;:{&quot;weatherCodeFullDay&quot;:1001}}]}]}}'
            },
            {
                'New Delhi': '{&quot;data&quot;:{&quot;timelines&quot;:[{&quot;timestep&quot;:&quot;1d&quot;,&quot;endTime&quot;:&quot;2023-11-05T00:30:00Z&quot;,&quot;startTime&quot;:&quot;2023-10-31T00:30:00Z&quot;,&quot;intervals&quot;:[{&quot;startTime&quot;:&quot;2023-10-31T00:30:00Z&quot;,&quot;values&quot;:{&quot;weatherCodeFullDay&quot;:1000}},{&quot;startTime&quot;:&quot;2023-11-01T00:30:00Z&quot;,&quot;values&quot;:{&quot;weatherCodeFullDay&quot;:1000}},{&quot;startTime&quot;:&quot;2023-11-02T00:30:00Z&quot;,&quot;values&quot;:{&quot;weatherCodeFullDay&quot;:1000}},{&quot;startTime&quot;:&quot;2023-11-03T00:30:00Z&quot;,&quot;values&quot;:{&quot;weatherCodeFullDay&quot;:1000}},{&quot;startTime&quot;:&quot;2023-11-04T00:30:00Z&quot;,&quot;values&quot;:{&quot;weatherCodeFullDay&quot;:1000}},{&quot;startTime&quot;:&quot;2023-11-05T00:30:00Z&quot;,&quot;values&quot;:{&quot;weatherCodeFullDay&quot;:1000}}]}]}}'
            }
           
        ];

        

        // Set up the mock wire adapter with data
        mockDetails.emit(mockData);
        console.log(element.weatherData);
     //   await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log(element.weatherData);
        const weatherData = element.weatherData;
        return Promise.resolve().then(()=>{
        
        expect(weatherData).toBe(mockData);
        });
    

     
       
    });


    
    
    
    
    
});