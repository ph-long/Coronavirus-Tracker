import React, {useState, useEffect} from "react";
import {NativeSelect, FormControl} from '@material-ui/core'
import styles from "./CountryPicker.module.css"
import {fetchCountries} from "../../api"

const CountryPicker = ({handleCountryChange}) => {
    // Initialize countries array to get the dropdown menu
    const [countries, setCountries] = useState([]);
    
    useEffect(() => {
      const fetchAPI = async () => {
        setCountries(await fetchCountries());
      };
      fetchAPI();
      // updates when setCountries changes
    }, [setCountries]);
    
    return (
        <FormControl className={styles.formControl}>
            <NativeSelect defaultValue="" onChange={(e) => handleCountryChange(e.target.value)}>
                <option value=""> Global </option>
                {countries.map((country, i) => 
                    <option key = {i} value={country}>{country}</option>)}
            </NativeSelect>
        </FormControl>
    )
}

export default CountryPicker;