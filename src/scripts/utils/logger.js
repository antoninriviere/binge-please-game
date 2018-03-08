export default (msg, bgColor = 'lightgrey', color = 'white') =>
{
    console.log(`%c${msg}`, `background: ${bgColor}; color: ${color}; padding: 2px;`)
}
