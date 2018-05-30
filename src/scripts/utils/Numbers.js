export const randomInRange = (min, max) =>
{
    return Math.random() * (max - min) + min
}

export const randomIntInRange = (min, max) =>
{
    return Math.floor(Math.random() * (max - min + 1)) + min
}

export const randomSign = () =>
{
    return Math.round(Math.random()) * 2 - 1
}

export const DegToRad = (deg) => deg * Math.PI / 180
