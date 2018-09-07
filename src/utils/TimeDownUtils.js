/*倒计时工具*/

export class TimeDownUtils {
    downTime = 60;
    interval = null;

    startDown(callBack, downTime = this.downTime) {
        this.downTime = downTime;
        let countdownDate = new Date(new Date().getTime() + downTime * 1000);
        this.interval = setInterval(() => {
            let time = this.getDateData(countdownDate);
            if (this.downTime >= 0) {
                callBack && callBack(time);
            }
        }, 1000);
    }

    /**
     * 侄计时计算 --> 通过此方法计算,可以解决应用退出后台的时候,定时器不走
     * @param countdownDate
     * @return {*}
     */
    getDateData(countdownDate) {
        let diff = (Date.parse(new Date(countdownDate)) - Date.parse(new Date)) / 1000;
        if (diff <= 0) {
            this.downTime = 0;
            this.stop(); // 倒计时为0的时候, 将计时器清除
            return 0;
        }
        const timeLeft = {
            years: 0,
            days: 0,
            hours: 0,
            min: 0,
            sec: 0,
            millisec: 0
        };
        if (diff >= (365.25 * 86400)) {
            timeLeft.years = Math.floor(diff / (365.25 * 86400));
            diff -= timeLeft.years * 365.25 * 86400;
        }
        if (diff >= 86400) {
            timeLeft.days = Math.floor(diff / 86400);
            diff -= timeLeft.days * 86400;
        }
        if (diff >= 3600) {
            timeLeft.hours = Math.floor(diff / 3600);
            diff -= timeLeft.hours * 3600;
        }
        if (diff >= 60) {
            timeLeft.min = Math.floor(diff / 60);
            diff -= timeLeft.min * 60;
        }
        this.downTime = diff;
        timeLeft.sec = diff;
        return this.downTime;
    }

    /** 清除定时器 */
    stop() {
        this.downTime = 0;
        clearInterval(this.interval);
    }
}