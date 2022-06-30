import {JSX, h} from 'preact'
import {useRouter} from "preact-router";
import {useEffect, useState} from 'preact/hooks';
import SearchComponent from '../components/search.component';
import {doRequest} from '../services/http.service';
import {BookingRequest, BookingResponse, Holiday} from '../types/booking';
import {DateTime} from 'luxon';
import * as React from "preact/compat";
import ListingTileComponent from "../components/listing-tile.component";

interface SearchParams {
    departureDate?: string
    location?: string
    duration?: number
    adults?: number
}

export default function ResultsRoute(): JSX.Element {
    const [searchParams] = useRouter();
    const [results, setResults] = useState<BookingResponse>({ holidays: []})

    const getSearchResults = async (params: SearchParams): Promise<BookingResponse> => {
        const departureDate = DateTime.fromFormat(params.departureDate, "yyyy-MM-dd").toFormat("dd-MM-yyyy");
        const requestBody: BookingRequest = {
            "bookingType": "holiday",
            "location": params.location,
            "departureDate": departureDate,
            "duration": params.duration,
            "gateway": "LHR",
            "partyCompositions": [
                {
                    "adults": params.adults,
                    "childAges": [],
                    "infants": 0
                }
            ]
        }

        return await doRequest('POST', '/cjs-search-api/search', requestBody)
    }

    useEffect(() => {
        (async () => setResults(await getSearchResults(searchParams?.matches)))();
    }, [searchParams]);


    return (
        <section>
            <SearchComponent />
            {results.holidays?.length > 0 && results.holidays.map(holiday => <ListingTileComponent { ...holiday } />)}
            {results.holidays?.length === 0 && (<h1>Results should display here.</h1>)}
            {!results.holidays && (<h1>No results found</h1>)}
        </section>
    )
}
