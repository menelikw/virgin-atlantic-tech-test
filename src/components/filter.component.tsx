import * as React from "preact/compat";
import { h, JSX } from 'preact'
import {Filter, SearchFilter} from "../types/booking";
import * as style from './filter.module.less'

interface FilterComponentProps extends SearchFilter {
    onFilterSelect: (key: string, value: any) => void
}

export default function FilterComponent ({
    name = "",
    multiselect = false,
    options = [],
    dataKey = "",
    onFilterSelect
}: FilterComponentProps): JSX.Element {
    const inputName = name.replace(/[^A-Z]/g, "")
    const handleChange = (value, name: string) => {
        let selectedValue = value

        if (multiselect) {
            const checkedItems = document.querySelectorAll(`[name=${name}]:checked`)
            selectedValue = Array.from(checkedItems).map(item => item.value)
        }

        onFilterSelect(dataKey, selectedValue)
    }
    return (
        <div class={style['filter-component']}>
            <h3>{name}</h3>
            {
                options.map(option => multiselect
                    ? <label>{option.key} <input onChange={() => handleChange(event.target.value, inputName)} name={inputName} type={"checkbox"} value={option.value} /></label>
                    : <label>{option.key} <input onChange={() => handleChange(event.target.value, inputName)} name={inputName} type={"radio"} value={option.value} /></label> )
            }
        </div>
    )
}
