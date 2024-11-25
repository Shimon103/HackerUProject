function clocks(ClockId, capitalZone) {
    const interval = 1000;
    setInterval(() => {
        const myClock = document.getElementById(ClockId);
        if (myClock) {
            const useTime = new Date();
            useTime.setHours(useTime.getHours() + capitalZone);
            myClock.innerHTML = useTime.toLocaleTimeString();
        }
    }, interval);
}

clocks('isrClock', 2);
clocks('portugalXClock', 0);
clocks('swissClock', 1);
clocks('argentinaClock', -3);