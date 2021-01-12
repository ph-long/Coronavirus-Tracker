import React from 'react';

import {Cards, Charts, CountryPicker} from './components';
import style from './App.module.css'

// {} because it a named import
import {fetchData} from './api'

class App extends React.Component {
    state = {
        data: {},
        country: '',
    }

    // componentDidMount invoked immediately after component inserted to DOM
    async componentDidMount() {
        const fetchedData = await fetchData();
        this.setState({data: fetchedData});
    }

    handleCountryChange = async (country) => {
        // returns the covid data about that specific country
        const fetchedData = await fetchData(country);
        this.setState({data: fetchedData, country: country});
    }

    render() {
        const {data, country} = this.state;

        return (
            <div className={style.container}>
                <CountryPicker handleCountryChange={this.handleCountryChange}/>
                <Cards data = {data}/>
                <Charts data = {data} country = {country}/>
            </div>
        )
    }
}

export default App;