import {Option} from "../components/select.component";

export interface PartyComposition {
    adults: number
    childAges: number[]
    infants: number
}

export interface BookingRequest {
    filters?: any,
    bookingType: string
    location: string
    departureDate: string
    duration: number
    gateway: string
    partyCompositions: PartyComposition[]
}

export interface BookingResponse {
    destination: Destination
    holidays: Holiday[]
}

export interface Filter {
    key: string
    value: any
}

export type SearchFilter = {
    name: string,
    dataKey: string,
    multiselect: boolean,
    options: Filter[]
}


interface Destination {
    name: string
    gateway: string
}

export interface Holiday {
    totalPrice: number
    pricePerPerson: number
    flyingClubMiles: number
    virginPoints: number
    tierPoints: number
    departureDate: string
    selectedDate: string
    hotel: Hotel
}

export interface Hotel {
    id: string
    name: string
    boardBasis: string
    content: HotelContent
}

export interface HotelContent {
   name: string
   vRating: number | string
   hotelDescription: string
   atAGlance: string[]
   parentLocation: string
   images: HotelImage[]
   holidayType: string[]
   boardBasis: string[]
   hotelLocation: string[]
   accommodationType: string[]
   hotelFacilities: string[]
   starRating: number | string
   propertyType: string
}

export interface HotelImage {
    RESULTS_CAROUSEL: Image,
    MOBILE_MAIN: Image,
    IMAGE_DESCRIPTION: string
}

export interface Image {
    url: string
}
