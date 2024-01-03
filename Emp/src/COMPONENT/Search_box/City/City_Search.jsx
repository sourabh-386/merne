import { React, useState, useRef, useEffect } from 'react'
import style from './City_Search.module.css'
import axios from 'axios'
import debounce from 'lodash.debounce';
import Select from 'react-select'

const City_Search = () => {

    const [city, set_city] = useState([])
    const [FilteredStates, setFilteredStates] = useState([])
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCity, setSelectedCity] = useState([])

    const fetchDataForCountry = async () => {

        try {
            const apiUrl = 'https://countriesnow.space/api/v0.1/countries/cities';

            const response = await axios.post(apiUrl, {
                country: 'india',
            });

            // Handle the response data here
            console.log('Response:', response.data.data);
            set_city(response.data.data)

        } catch (error) {
            // Handle errors
            console.error('Error fetching data:', error.message);
        }
    };

    useEffect(() => {
        const debouncedSearch = debounce(async () => {

            const results = city.filter((state) =>
                state.toLowerCase().includes(searchTerm.toLowerCase().trim())
            );

            const modifyied_result = results.map(val => { return ({ value: val, label: val }) })
            console.log(modifyied_result)
            setFilteredStates(modifyied_result);

        }, 300);

        debouncedSearch();

        return () => debouncedSearch.cancel();

    }, [searchTerm, city]);


    useEffect(() => { fetchDataForCountry() }, [])


    const set_data_fn = (val) => {
        setSelectedCity([...selectedCity, val.value])
    }


    const del_fn = (val) => {
        console.log(val)
        setSelectedCity(selectedCity.filter(name => { return (name.toLowerCase() != val.toLowerCase()) }))
    }

    return (
        // <div><Sucesspage /></div>
        <div className={style.main}>
            <br />
            <b className={style.head}>Preferd Locations : </b>

            <div className={style.select}>
                < Select
                    placeholder='Location'
                    options={FilteredStates}
                    value=''
                    name='Current_CTC'
                    onChange={(value, data, event, formattedValue, e) => {
                        set_data_fn(value)
                    }}
                />
            </div>
            <div className={style.selected_cities}>
                {
                    selectedCity.map(val => {
                        return (
                            <div className={style.para} onClick={() => { del_fn(val) }}>
                                <p className={style.name} > {val} </p>
                                <p className={style.cross}> <i class="bi bi-x-lg"></i></p>
                            </div>
                        )
                    })
                }

            </div>

        </div>
    )
}

export default City_Search