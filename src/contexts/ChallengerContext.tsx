
import { createContext, ReactNode, useEffect, useState } from 'react';
import challenges from '../../challenges.json';
import Cookie from 'js-cookie';
import { LevelUpModal } from '../components/LevelUpModal';


interface Challenge {
    type: 'body' | 'eye';
    description: String;
    amount: number;
}


interface ChallengeContextData {
    level: number;
    currentExperience: number;
    challengesCompleted: number;
    activeChallenge: Challenge;
    experienceToNextLevel: number;
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completedChallenge: () => void;
    setLevelUpModalOpen: (isOpen: boolean) => void;
}

interface ChallengerProviderProps {
    children: ReactNode;
    level: number;
    currentExperience: number;
    challengesCompleted: number;
}

export const ChallengerContext = createContext({} as ChallengeContextData);

export function ChallengesProvider({ children, ...rest }: ChallengerProviderProps) {

    const [level, setLevel] = useState(rest.level ?? 1);

    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
    const [challengesCompleted, setChallengeCompleted] = useState(rest.challengesCompleted ?? 0);

    const [activeChallenge, setActiveChallenger] = useState(null);
    const [isLevelUpModalOpen, setLevelUpModalOpen] = useState(false);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    useEffect(() => {
        Notification.requestPermission();
    }, []);

    useEffect(() => {
        Cookie.set('level', level.toString());
        Cookie.set('currentExperience', currentExperience.toString());
        Cookie.set('challengesCompleted', challengesCompleted.toString());
    }, [level, currentExperience, challengesCompleted])

    function levelUp() {
        setLevel(level + 1);
        setLevelUpModalOpen(true);
    }

    function startNewChallenge() {
        const challengerIndex = Math.floor(Math.random() * challenges.length);
        const challenger = challenges[challengerIndex];

        setActiveChallenger(challenger);

        new Audio('/notification.mp3').play();

        if (Notification.permission === 'granted') {
            new Notification('Novo Desafio', { body: `Valendo ${challenger.description} xp!` })
        }
    }

    function resetChallenge() {
        setActiveChallenger(null);
    }

    function completedChallenge() {
        if (!activeChallenge) {
            return;
        }

        const { amount } = activeChallenge;

        let finalExperience = currentExperience + amount;

        if (finalExperience >= experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExperience);
        setActiveChallenger(null);
        setChallengeCompleted(challengesCompleted + 1);
    }

    return (
        <ChallengerContext.Provider
            value={{
                level,
                currentExperience,
                challengesCompleted,
                activeChallenge,
                experienceToNextLevel,
                levelUp,
                startNewChallenge,
                resetChallenge,
                completedChallenge,
                setLevelUpModalOpen,
            }}>
            {children}

            { isLevelUpModalOpen && <LevelUpModal />}

        </ChallengerContext.Provider>
    )
}