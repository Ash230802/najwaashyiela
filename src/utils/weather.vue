<template>
    <div class="weather-icon">
        <font-awesome-icon :icon="['fas', 'cloud']" beat />
        <div v-if="weatherData" >
            <p>{{ weatherData.name }}</p>
            <p class="weather-temp">{{ weatherData.main.temp }}°C</p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            weatherData: null,
        };
    },
    mounted() {
        this.fetchWeatherData()
    },
    methods: {
        fetchWeatherData() {
            const apiKey = 'a9995332af693720356a18b3734d3ab0';
            const cityName = 'Melbourne';

            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

            axios.get(apiUrl)
            .then((response) => {
                this.weatherData = response.data;
            })
            .catch((error) => {
                console.error('error here: ', error);
            })

        }
    }

};
</script>

<style scoped>
.weather-icon {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1rem;
}
p {
    margin: 0;
}
.weather-temp {
    text-align: center;
}
/*Galaxy Fold mobile size */
@media (max-width: 320px) {
    .weather-icon {
        position: absolute;
        top: 0;
        left: 50%; /* Center horizontally relative to the viewport */
        transform: translateX(-50%); /* move the element to the left half of its own width */
    }
}
</style>
