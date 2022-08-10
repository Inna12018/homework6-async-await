// Задание
// Написать программу "Я тебя по айпи вычислю"

// Технические требования:

// Создать простую HTML страницу с кнопкой Вычислить по IP.
// По нажатию на кнопку - отправить AJAX запрос по адресу https://api.ipify.org/?format=json, получить оттуда IP адрес клиента.
// Узнав IP адрес, отправить запрос на сервис https://ip-api.com/ и получить информацию о физическом адресе.
// Под кнопкой вывести на страницу информацию, полученную из последнего запроса - континент, страна, регион, город, район города.
// Все запросы на сервер необходимо выполнить с помощью async await.


// Примечание
// Задание должно быть выполнено на "чистом" Javascript без использования библиотек типа jQuery или React.



async function getData() {
    const ipRequest = await fetch("https://api.ipify.org/?format=json");//IP адрес клиента
    const ip = await ipRequest.json();// переводим в формат json
    const ipInfoRequest = await fetch(`http://ip-api.com/json/${ip.ip}?fields=continent,country,regionName,city,district`);
    const ipInfo = await ipInfoRequest.json();
    return ipInfo;
}

const Btn = document.querySelector('.getIP');// получили кнопку

Btn.addEventListener('click', async (e) => {// добавили слушатель на кнопку
    e.preventDefault();// убрали дефолтное значение

    document.querySelector('.content').innerHTML = 'Loading...';//нашли див и добавили ему лоадер
    renderItems(await getData()); // подгрузили данные местонахождения 
});

function renderItems(info) {
    
    document.querySelector('.content').innerHTML = 
    `
        <p><strong>Континент:</strong> ${info.continent}</p>
        <p><strong>Страна:</strong> ${info.country}</p>
        <p><strong>Регион:</strong> ${info.regionName}</p>
        <p><strong>Город:</strong> ${info.city}</p>
        <p><strong>Район города:</strong> ${info.district = info.district === '' ? null : info.district}</p>
    `;
}