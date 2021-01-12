/* axios gets apis */
import axios from "axios";

const url = "https://covid19.mathdro.id/api";

export const fetchData = async (country) => {
    try {

        let changeableUrl = url;

        if (country) {
            changeableUrl = `${url}/countries/${country}`;
        }
        // Structure the data from the response
        // Structuring allows us to only get the parts we need from the API
        const {data: {confirmed, recovered, deaths, lastUpdate}} = await axios.get(changeableUrl);
        
        // Typically need data.confirmed, but js implies that is they share the same name
        return { confirmed, recovered, deaths, lastUpdate };
            
    } catch (error) {

    }
}

// export const fetchDailyData = async () => {
//     try{
//         const { data } = await axios.get('{url}/daily')
//         console.log(data)
//     } catch (error) {

//     }
// }

export const fetchDailyData = async () => {
    try {
        const {data} = await axios.get('https://api.covidtracking.com/v1/us/daily.json');
        return data.map(({ positive, recovered, death, dateChecked: date }) => ({ 
            confirmed: positive, 
            recovered, 
            deaths: death, 
            date }));

    } catch (error) {
        return error;
    }
};

export const fetchCountries = async () => {
    try{
        const { data: { countries } } = await axios.get(`${url}/countries`);
        return countries.map((country) => country.name);
    } catch (error) {

    }
}