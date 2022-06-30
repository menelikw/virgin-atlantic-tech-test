import { Option} from "../components/select.component"
import {SearchFilter} from "../types/booking";

export const LOCATIONS: Option[] = [
    {
        value: "new-york",
        description: "New York"
    },
    {
        value: "orlando",
        description: "Orlando"
    },
    {
        value: "barbados",
        description: "Barbados"
    },
    {
        value: "toronto",
        description: "Toronto"
    }
]

export const FILTERS: SearchFilter[] = [
    {
        name: "Price per person",
        multiselect: false,
        dataKey: "pricePerPerson",
        options: [
            {
                value: 1500,
                key: "Up to £1500",
            },
            {
                value: 2000,
                key: "Up to £2000"
            },
            {
                value: 3000,
                key: "Up to £3000"
            },
            {
                value: 3500,
                key: "Up to £3500"
            }
        ]
    },
    {
        name: "Hotel facilities",
        multiselect: true,
        dataKey: "facilities",
        options: [
            {
                key: "Restaurant",
                value: "Restaurant"
            },
            {
                key: "Bar",
                value: "Bar"
            },
            {
                key: "Spa",
                value: "Spa"
            },
            {
                key: "No Smoking",
                value: "No Smoking"
            },
            {
                key: "Free Parking",
                value: "Free Parking"
            },
            {
                key: "Room Service",
                value: "Room Service"
            },
            {
                key: "Safety Deposit Box",
                value: "Safety Deposit Box"
            },
            {
                key: "Fitness Centre/Gym",
                value: "Fitness Centre/Gym"
            },
            {
                key: "Laundry Service",
                value: "Laundry Service"
            },
            {
                key: "Games Room",
                value: "Games Room"
            },
            {
                key: "Internet Access",
                value: "Internet Access"
            },
            {
                key: "Free transport to theme parks",
                value: "Free transport to theme parks"
            },
            {
                key: "Swimming Pool",
                value: "Swimming Pool"
            },
            {
                key: "Whirlpool",
                value: "Whirlpool"
            }
        ]
    },
    {
        name: "Star rating",
        multiselect: false,
        dataKey: "starRating",
        options: [
            {
                value: 1,
                key: "1 Star"
            },
            {
                value: 2,
                key: "2 Stars"
            },
            {
                value: 3,
                key: "3 Stars"
            },
            {
                value: 4,
                key: "4 Stars"
            },
            {
                value: 5,
                key: "5 Stars"
            },
        ]
    }
]
