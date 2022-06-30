import {JSX, h} from 'preact'
import {useRouter} from "preact-router";
import {useEffect, useState} from 'preact/hooks';
import SearchComponent from '../components/search.component';
import {doRequest} from '../services/http.service';
import {BookingRequest, BookingResponse, Filter, Holiday} from '../types/booking';
import {DateTime} from 'luxon';
import * as React from "preact/compat";
import ListingTileComponent from "../components/listing-tile.component";
import FilterComponent from "../components/filter.component";
import {FILTERS} from "../consts/search";
import * as style from "./results.module.less"

interface SearchParams {
    departureDate?: string
    location?: string
    duration?: number
    adults?: number
}

export default function ResultsRoute(): JSX.Element {
    const [searchParams] = useRouter();
    const [results, setResults] = useState<BookingResponse>({ destination: { name: "", gateway: ""}, holidays: []})
    const [filterValues, setFilterValues] = useState({})

    const onFilterSelect = (key, value) => {
        setFilterValues({...filterValues, ...{[key]: value}})
    }

    const getSearchResults = async (params: SearchParams): Promise<BookingResponse> => {
        const hasFilters = Object.keys(filterValues).length
        const departureDate = DateTime.fromFormat(params.departureDate, "yyyy-MM-dd").toFormat("dd-MM-yyyy");
        const requestBody: BookingRequest = {
            ...(hasFilters && {filters: filterValues}),
            bookingType: "holiday",
            location: params.location,
            departureDate: departureDate,
            duration: params.duration,
            gateway: "LHR",
            partyCompositions: [
                {
                    adults: params.adults,
                    childAges: [],
                    infants: 0
                }
            ]
        }

        return await doRequest('POST', '/cjs-search-api/search', requestBody)
    }

    useEffect(() => {
        (async () => setResults(await getSearchResults(searchParams?.matches)))();
    }, [searchParams, filterValues]);


    return (
        <section>
            <SearchComponent />

            {results.holidays?.length > 0 && <h1>{results.holidays.length} results found for {results.destination.name}</h1>}
            {results.holidays?.length === 0 && (<h1>Results should display here.</h1>)}
            {!results.holidays && (<h1>No results found</h1>)}

            {JSON.stringify(filterValues)}
            <div class={style['columns']}>
                <div>
                    <h1>Filter your search</h1>
                    { FILTERS.map(searchFilter => <FilterComponent {...{onFilterSelect, ...searchFilter}} />) }
                </div>
                <div>
                    {results.holidays?.length > 0 && results.holidays.map(holiday => <ListingTileComponent { ...holiday } />)}
                </div>
            </div>
        </section>
    )
}
