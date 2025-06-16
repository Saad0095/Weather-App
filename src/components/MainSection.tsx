import CloudImg from "../assets/cloud.png"
import ClearImg from "../assets/clear.png"
import DrizzleImg from "../assets/drizzle.png"
import RainImg from "../assets/rain.png"
import SnowImg from "../assets/snow.png"
import WindImg from "../assets/wind.png"
import HumidityImg from "../assets/humidity.png"
import { useEffect, useMemo, useState } from "react";
import axios, { AxiosError } from "axios";
import { debounce } from 'lodash'
import Loading from "./Loading";
import { toast, ToastContainer } from "react-toastify";

interface MainSectionProps {
    searchTerm: string;
}

interface WeatherData {
    name: string;
    temp: number;
    wind: number;
    feels_like: number;
    humidity: number;
    image: string
}

const MainSection = ({ searchTerm }: MainSectionProps) => {
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null)

    const allImages = {
        "01d": ClearImg,
        "01n": ClearImg,
        "02d": CloudImg,
        "02n": CloudImg,
        "03d": CloudImg,
        "03n": CloudImg,
        "04d": CloudImg,
        "04n": CloudImg,
        "09d": DrizzleImg,
        "09n": DrizzleImg,
        "10d": RainImg,
        "10n": RainImg,
        "11d": RainImg,
        "11n": RainImg,
        "13d": SnowImg,
        "13n": SnowImg,
        "50d": DrizzleImg,
        "50n": DrizzleImg
    };

    const getData = debounce(async (searchTerm) => {
        if (!searchTerm) return;
        try {
            console.log("Getting Data...");

            const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=metric&appid=${import.meta.env.VITE_API_KEY}`
            const { data } = await axios.get(url);

            const iconCode = data.weather[0].icon as keyof typeof allImages;
            const image = allImages[iconCode] || ClearImg;

            setWeatherData({ name: data.name, temp: Math.floor(data.main.temp), wind: data.wind.speed, feels_like: data.main.feels_like, humidity: data.main.humidity, image });
        } catch (error: unknown) {
            const axiosError = error as AxiosError;
            if (axiosError.response?.status === 404) {
                toast.error("City not found. Please try a valid city name.");
            } else {
                console.log("Error fetching weather data:", axiosError);
            }
        }
    })

    const debouncedFetch = useMemo(() => debounce(getData, 600), [])

    useEffect(() => {
        if (searchTerm) debouncedFetch(searchTerm);

        return () => debouncedFetch.cancel();
    }, [searchTerm])

    useEffect(() => {
        getData("Karachi")
    }, [])

    return (
        <div className="text-white min-h-96 flex flex-col justify-center items-center">
            {weatherData ?
                <div>
                    <ToastContainer />
                    <div className="flex flex-col justify-center items-center gap-5 p-5">
                        <img src={weatherData.image} alt="" className="size-60" />
                        <div className="space-y-2">
                            <h1 className="text-5xl font-bold text-center">{weatherData.temp} °C</h1>
                            <h2 className="text-5xl font-bold text-center">{weatherData.name}</h2>
                            <p className="text-lg p-5">Feels Like: {weatherData.feels_like} °C</p>
                        </div>
                    </div>
                    <div className="flex justify-center items-center gap-10 p-5">
                        <div className="flex gap-5">
                            <img src={HumidityImg} alt="" />
                            <div className="">
                                <p className="text-xl">{weatherData.humidity}%</p>
                                <p className="text-xl">Humidity</p>
                            </div>
                        </div>
                        <div className="flex gap-5">
                            <img src={WindImg} alt="" />
                            <div className="">
                                <p className="text-xl">{weatherData.wind} km/h</p>
                                <p className="text-xl">Wind Speed</p>
                            </div>
                        </div>
                    </div>
                </div> :
                <Loading />
            }
        </div>
    )
}

export default MainSection

