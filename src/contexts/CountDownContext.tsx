import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengerContext } from "./ChallengerContext";
import { clearTimeout, setTimeout } from 'timers';

interface CountDownData {
    time: number;
    seconds: number;
    minutes: number;
    isActive: boolean;
    hasFinish: boolean;
    startCountDown: () => void;
    resetCountDown: () => void;
}

interface CountDownProps {
    children: ReactNode;
}

let countDownTimeOut: NodeJS.Timeout;

export const CountDownContext = createContext({} as CountDownData);

export function CountDownContextProvider({ children }: CountDownProps) {
    const { startNewChallenge } = useContext(ChallengerContext);

    const initialTime = 0.1 * 60;
    const [time, setTime] = useState(initialTime);
    const [isActive, setIsActive] = useState(false);
    const [hasFinish, setHasFinish] = useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    function startCountDown() {
        setIsActive(true);
    }

    function resetCountDown() {
        clearTimeout(countDownTimeOut);
        setIsActive(false);
        setHasFinish(false);
        setTime(initialTime);
    }

    useEffect(() => {
        if (isActive && time > 0) {
            countDownTimeOut = setTimeout(() => {
                setTime(time - 1);
            }, 1000);
        } else if (isActive && time === 0) {
            setHasFinish(true);
            setIsActive(false);
            startNewChallenge();
        }
    }, [isActive, time]);
    return (
        <CountDownContext.Provider value={{
            time, isActive, hasFinish, minutes, seconds, startCountDown, resetCountDown,
        }}>
            {children}
        </CountDownContext.Provider>
    );
}