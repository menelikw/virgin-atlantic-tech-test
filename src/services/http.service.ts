import { BookingRequest } from "../types/booking"

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE"

export const doRequest = <T>(method: HttpMethod, url: string, body: BookingRequest = undefined): Promise<T> => {
  return new Promise<T>((resolve: (value: T) => void, reject: (any) => void) => {
    run(method, url, body, (request: XMLHttpRequest) => {
      if (request.readyState !== 4) {
        return
      }
      switch (request.status) {
        case 200:
          const results = JSON.parse(request.responseText)

          if (body.filters?.pricePerPerson) {
            results.holidays = results.holidays.filter(data => {
              return data.pricePerPerson <= parseInt(body.filters.pricePerPerson, 10)
            })
          }

          if (body.filters?.facilities) {
            results.holidays = results.holidays.filter(data => {
              return body.filters.facilities.every(facility => data.hotel.content.hotelFacilities.includes(facility))
            })
          }

          if (body.filters?.starRating) {
            results.holidays = results.holidays.filter(data => {
              return data.hotel.content.starRating == body.filters.starRating
            })
          }

          resolve(results as T)
          break
        case 204:
          resolve(undefined)
          break
        case 500:
          const isJson = request.getResponseHeader('content-type') === 'application/json'
          reject(isJson ? JSON.parse(request.responseText) : undefined)
          break
        default:
          reject(undefined)
          break
      }
    })
  })
}

const run = (method: HttpMethod, url: string, body: BookingRequest = undefined, stateChange: (request: XMLHttpRequest) => void): void => {
  const xmlHttpRequest = new XMLHttpRequest()
  xmlHttpRequest.onreadystatechange = () => stateChange(xmlHttpRequest)
  xmlHttpRequest.open(method, url)
  xmlHttpRequest.setRequestHeader("Content-Type", "application/json")
  xmlHttpRequest.send(body != null ? JSON.stringify(body) : undefined)
}
