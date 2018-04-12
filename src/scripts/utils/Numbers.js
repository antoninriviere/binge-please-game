export const randomInRange = (min, max) =>
{
    return Math.random() * (max - min) + min
}

export const randomSign = () =>
{
    return Math.round(Math.random()) * 2 - 1
}