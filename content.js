export default function content(weatherData) {
    let contentHtml = "";
    const dias = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    contentHtml = `
        <p><img src="${weatherData.current.condition.icon}"></p>
        <p>${weatherData.location.name}, ${weatherData.location.country}<br>
        <span class="condition">${weatherData.current.condition.text}, ${weatherData.current.is_day ? 'Day' : 'Night'}</span><br>
        ${weatherData.current.temp_c}ºC<br>`;

        weatherData.forecast.forecastday.forEach( day => {

            contentHtml += `
                <span class="condition">${dias[(new Date(day.date)).getDay()]}<img src="${day.day.condition.icon}" width="40px">${day.day.condition.text}</span><br>
            `;
        });

        contentHtml += `</p>`;

    return contentHtml;
}