export function longDateFormatter() : string {

    const date = new Date(Date.now());
    const formatter:Intl.DateTimeFormatOptions = {weekday: 'long', day: 'numeric', month: 'long'}
    let dateFormatted = date.toLocaleDateString('es-ES', formatter);
    dateFormatted = dateFormatted.charAt(0).toUpperCase() + dateFormatted.slice(1);
    return dateFormatted;

}