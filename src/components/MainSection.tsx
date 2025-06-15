import CloudImg from "../assets/cloud.png"
// import ClearImg from "../assets/clear.png"
// import DrizzleImg from "../assets/drizzle.png"
// import RainImg from "../assets/rain.png"
// import SnowImg from "../assets/snow.png"
import WindImg from "../assets/wind.png"
import HumidityImg from "../assets/humidity.png"
const MainSection = () => {
    return (
        <div className="text-white">
            <div className="flex flex-col justify-center items-center gap-5 p-5">
                <img src={CloudImg} alt="" />
                <div className="space-y-2">
                    <h1 className="text-5xl font-bold text-center">16°C</h1>
                    <h2 className="text-5xl font-bold text-center">Islamabad</h2>
                </div>
            </div>
            <div className="flex justify-center items-center gap-10 p-5">
                <div className="flex gap-5">
                    <img src={HumidityImg} alt="" />
                    <div className="">
                        <p className="text-xl">91%</p>
                        <p className="text-xl">Humidity</p>
                    </div>
                </div>
                <div className="flex gap-5">
                    <img src={WindImg} alt="" />
                    <div className="">
                        <p className="text-xl">3.2km/h </p>
                        <p className="text-xl">Wind Speed</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainSection
