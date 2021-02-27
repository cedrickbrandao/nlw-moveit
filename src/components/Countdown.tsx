
import { useContext } from 'react';
import { CountDownContext } from '../contexts/CountDownContext';
import style from '../styles/components/Countdown.module.css';



export function Countdown() {

    const { minutes, seconds, hasFinish, isActive, resetCountDown, startCountDown } = useContext(CountDownContext);

    const [minutesLeft, minutesRight] = String(minutes).padStart(2, '0').split('');
    const [secondsLeft, secondsRight] = String(seconds).padStart(2, '0').split('');

    return (
        <div>
            <div className={style.countDownContainer}>
                <div>
                    <span>{minutesLeft}</span>
                    <span>{minutesRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondsLeft}</span>
                    <span>{secondsRight}</span>
                </div>
            </div>
            {hasFinish ? <button disabled className={style.countDownButton} >Ciclo concluído</button> : (
                <>
                    {isActive ? (
                        <button type="button" className={`${style.countDownButton} ${style.countDownButtonActive}`} onClick={resetCountDown}>Abandonar Ciclo</button>
                    ) : (
                            <button type="button" className={style.countDownButton} onClick={startCountDown}>Iniciar Ciclo</button>
                        )
                    }
                </>
            )}
        </div>

    );
}