/* Global Variables */
// Personal API Key for OpenWeatherMap API

const apiKey = 'c4fef84e2f4c211a33e22ffffae94478&units=imperial';
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+ 1+'.'+ d.getDate()+'.'+ d.getFullYear();



// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

/* Function called by event listener */
function performAction() {
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;

    if (!zip || !feelings) {
        alert('Error: Please fill in all fields!');
        return; 
    }

    getWeatherData(baseURL, zip, apiKey)
        .then((data) => {
            // Post data to server
            return postData('/add', {
                temperature: data.main.temp,
                date: newDate,
                userResponse: feelings,
            });
        })
        .then(() => {
            alert('Successful!');
            retrieveData();
        })
        .catch((error) => {
            console.log('Error:', error);
            alert('Error: Something went wrong.');
        });
}

/* Function to GET Web API Data */
const getWeatherData = async (baseURL, zip, key) => {
    const response = await fetch(baseURL+zip+'&appid='+key);
    try {
        const data = await response.json();
        console.log(data)
        return data;
    } catch (error) {
        console.log('error:', error);
    }
};

/* Function to POST data */
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log('error:', error);
    }
};

/* Function to GET Project Data */
const retrieveData = async () =>{
    const request = await fetch('/all');
    try {
    // Transform into JSON
    const allData = await request.json()
    console.log("Retrieved Data:" ,allData)
    // Write updated data to DOM elements
    document.getElementById('temp').innerHTML = `Temperature: ${Math.round(allData.temperature)}degrees`;
    document.getElementById('content').innerHTML = `Feelings: ${allData.userResponse}`;
    document.getElementById('date').innerHTML = `Date: ${allData.date}`;
    }
    catch(error) {
      console.log('error', error);
      // appropriately handle the error
    }
   }
