// Masukkan API key Anda di sini
const apiKey = 'c2aca52fafb8de0f23e6e0104ef3a64a';

// Fungsi untuk mendapatkan lokasi pengguna
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getWeather, showError);
    } else {
        document.getElementById('location').innerText = 'Geolocation is not supported by this browser.';
    }
}

// Fungsi untuk mendapatkan cuaca berdasarkan lokasi
async function getWeather(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Fetching weather data failed: ${response.statusText}`);
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        document.getElementById('location').innerText = `Error: ${error.message}`;
    }
}

// Fungsi untuk menampilkan cuaca di halaman
function displayWeather(data) {
    const location = `${data.name}, ${data.sys.country}`;
    const temperature = `${data.main.temp}°C`;
    const description = data.weather[0].description;

    document.getElementById('location').innerText = location;
    document.getElementById('temperature').innerText = temperature;
    document.getElementById('description').innerText = description;
}

// Fungsi untuk menangani error geolocation
function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            document.getElementById('location').innerText = 'User denied the request for Geolocation.';
            break;
        case error.POSITION_UNAVAILABLE:
            document.getElementById('location').innerText = 'Location information is unavailable.';
            break;
        case error.TIMEOUT:
            document.getElementById('location').innerText = 'The request to get user location timed out.';
            break;
        case error.UNKNOWN_ERROR:
            document.getElementById('location').innerText = 'An unknown error occurred.';
            break;
    }
}

// Panggil fungsi untuk mendapatkan lokasi saat halaman dimuat
window.onload = getLocation;
