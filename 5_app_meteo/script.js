const loader = document.querySelector(".loader-container");
const errorInformation = document.querySelector(".error-information");

async function getWeatherData(city) {
  try {
    const response = await fetch("http://api.airvisual.com/v2/nearest_city?key=9917d845-3fcd-4066-bee0-a8affebeef38");
    console.log(response);

    const responseData = await response.json();

    console.log(responseData);

    const sortedData = {
      city: responseData.data.city,
      country: responseData.data.country,
      iconId: responseData.data.current.weather.ic,
      temperature: responseData.data.current.weather.tp,
    };
    console.log(sortedData);
  } catch (error) {}
}

getWeatherData();
