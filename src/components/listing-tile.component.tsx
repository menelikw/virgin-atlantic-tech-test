import { h, JSX } from 'preact'
import * as style from './listing-tile.module.less'
import { Holiday } from "../types/booking";
import * as React from "preact/compat";

export default function ListingTileComponent({
    totalPrice = 0,
    pricePerPerson = 0,
    hotel = undefined
}: Holiday): JSX.Element {
    const toCurrencyValue = (value: number) => value.toFixed(2)/*.replace(/(\d)(?=(\d{3})+(?!\d))/g, "1,")*/;
    const imageData = hotel.content.images[0] // no time for carousels

    return (
        <div className={style['listing-tile-component']}>
            <div className={style['listing-tile-image']}>
                <picture>
                    <source media="(min-width: 1024px)" srcSet={`${imageData.RESULTS_CAROUSEL.url} 1024w`}/>
                    <img src={imageData.MOBILE_MAIN.url} alt={imageData.IMAGE_DESCRIPTION || hotel?.name}/>
                </picture>
            </div>

            <div class={style['listing-tile-content']}>
                <h1>{hotel?.name}<br/><span>{hotel.content.parentLocation}</span></h1>
                <div className={style['listing-tile-facilities']}>
                    {hotel?.content.hotelFacilities.join(" / ")}
                </div>

                <div class={style['listing-tile-footer']}>
                    <div class={style['listing-tile-rating']}>
                        {hotel?.content.starRating && <span>{hotel?.content.starRating} of 5 stars</span>}
                    </div>

                    <div class={style['listing-tile-price-block']}>
                        <span class={style['listing-tile-price']}>£{toCurrencyValue(pricePerPerson)}</span>
                        <br/>
                        <small>per person<br/>total holiday: £{toCurrencyValue(totalPrice)}</small>
                    </div>
                </div>
            </div>
        </div>
    )
}
