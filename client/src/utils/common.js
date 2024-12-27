export const shuffle = (arr) => [...arr].sort(() => 0.5 - Math.random())

export const buildUrl = (url, params) => {
    let urlWithParams = url+"?populate=*";

    Object.entries(params).forEach(([key, value], i) => {
        urlWithParams += `&[${key}][$eq]=${value}`
    })
    return urlWithParams
}

export const sumBy = (arr) => arr.reduce((prev, cur) => prev + cur, 0)