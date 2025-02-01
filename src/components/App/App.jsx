import { useState, useEffect } from 'react';
import Description from '../Description/Description';
import Options from '../Options/Options';
import Feedback from '../Feedback/Feedback';
import Notification from '../Notification/Notification';
import styles from './App.module.css';

function App() {
    const [feedback, setFeedback] = useState(() => {
        const savedFeedback = localStorage.getItem('feedback');
        return savedFeedback ? JSON.parse(savedFeedback) : {
            good: 0,
            neutral: 0,
            bad: 0
        };
    });

    useEffect(() => {
        localStorage.setItem('feedback', JSON.stringify(feedback));
    }, [feedback]);

    const updateFeedback = feedbackType => {
        setFeedback(prevState => ({
            ...prevState,
            [feedbackType]: prevState[feedbackType] + 1
        }));
    };

    const resetFeedback = () => {
        setFeedback({
            good: 0,
            neutral: 0,
            bad: 0
        });
    };

    const totalFeedback = feedback.good + feedback.neutral + feedback.bad;
    const positiveFeedback = Math.round((feedback.good / totalFeedback) * 100);

    return (
        <div className={styles.app}>
            <Description />
            <Options
                updateFeedback={updateFeedback}
                resetFeedback={resetFeedback}
                totalFeedback={totalFeedback}
            />
            {totalFeedback > 0 ? (
                <Feedback
                    feedback={feedback}
                    total={totalFeedback}
                    positive={positiveFeedback}
                />
            ) : (
                <Notification message="There is no feedback yet" />
            )}
        </div>
    );
}

export default App; 