import { useState, useEffect } from 'react';
import { parseChatFile } from '../Parser/ParseChat.jsx';
import blacklist from '../Parser/BlackList.jsx';
import styles from './DisplayData.module.css';
import PropTypes from 'prop-types';

const apiKey = 'AIzaSyDR64IZyG6MqMjo50od-m3a5JjCvW-Fatw';
//const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

const DisplayData = ({ fileContent }) => {
    const messagesBeforeAi = parseChatFile(fileContent, blacklist);
    const [messages, setMessages] = useState(null);

    console.table(messages);

    useEffect(() => {
        const requestData = {
            contents: [
                {
                    parts: [
                        {
                            text:
                                "Keep the object in the same structure, and add a field named 'score' to each object in the array, and its value should be a rating of how harmful the text in content is, scaling 1-10. make sure your response is json string that can be parsed into json object. your response is only the json data, no other text or data. also remove ```json from the start of your response. make sure to check the word inside sentence context whether its really problematic, for example: 'dying my hair' is not problematic since its not really about a man who wish to die." +
                                JSON.stringify(messagesBeforeAi),
                        },
                    ],
                },
            ],
        };

        const fetchGeminiData = async () => {
            try {
                const response = await fetch(
                    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(requestData),
                    }
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                const aiText = JSON.parse(
                    data.candidates[0].content.parts[0].text
                );
                setMessages(aiText);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchGeminiData();
    }, [fileContent]);

    // Function to get background color based on severity score
    const getSeverityColor = (score) => {
        // Normalize score to be between 1-5

        switch (score) {
            case 10:
            case 9:
                return '#ffcccc'; // Red background
            case 8:
            case 7:
                return '#ffe5cc'; // Orange background
            case 6:
            case 5:
                return '#fff2cc'; // Yellow background
            case 4:
            case 3:
                return '#e5f2cc'; // Light green background
            case 2:
            case 1:
            case 0:
                return '#ccffcc'; // Green background
            default:
                return '#ffffff'; // White background as fallback
        }
    };

    if (!messages) {
        return null;
    }
    // Calculate analytics
    const totalProblematicWords = messages.reduce(
        (total, msg) => total + msg.problematicWords.length,
        0
    );

    const userViolations = messages.reduce((acc, msg) => {
        if (msg.problematicWords.length > 0) {
            acc[msg.author] =
                (acc[msg.author] || 0) + msg.problematicWords.length;
        }
        return acc;
    }, {});

    const mostProblematicUser =
        Object.entries(userViolations).sort(([, a], [, b]) => b - a)[0]?.[0] ||
        'None';

    const categoryCount = messages.reduce((acc, msg) => {
        if (msg.categories) {
            msg.categories.forEach((category) => {
                acc[category] = (acc[category] || 0) + 1;
            });
        }
        return acc;
    }, {});

    return (
        <div className={styles.container}>
            <div className={styles.filterSection}>
                {/* Summary Statistics */}
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <h2 className={styles.cardTitle}>
                            Chat Analysis Summary
                        </h2>
                    </div>
                    <div className={styles.cardContent}>
                        <div className={styles.statsGrid}>
                            <div className={styles.statBox}>
                                <h3 className={styles.statTitle}>
                                    Total Problematic Words
                                </h3>
                                <p className={styles.statValue}>
                                    {totalProblematicWords}
                                </p>
                            </div>
                            <div className={styles.statBox}>
                                <h3 className={styles.statTitle}>
                                    Most Problematic User
                                </h3>
                                <p className={styles.statValue}>
                                    {mostProblematicUser}
                                </p>
                            </div>
                            <div className={styles.statBox}>
                                <h3 className={styles.statTitle}>
                                    Categories Found
                                </h3>
                                <ul className={styles.categoryList}>
                                    {Object.entries(categoryCount).map(
                                        ([category, count]) => (
                                            <li key={category}>
                                                {category}: {count}
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Message List */}
                <div className={styles.messageList}>
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`${styles.messageCard} ${
                                message.problematicWords.length > 0
                                    ? styles.problematicMessage
                                    : ''
                            }`}
                        >
                            <div className={styles.messageHeader}>
                                <h3 className={styles.messageAuthor}>
                                    {message.author}
                                </h3>
                                <span
                                    className={styles.severityScore}
                                    style={{
                                        backgroundColor: getSeverityColor(
                                            message.score
                                        ),
                                        padding: '4px 8px',
                                        borderRadius: '4px',
                                        marginLeft: '8px',
                                    }}
                                >
                                    Severity Score: {message.score}
                                </span>
                                {message.categories && (
                                    <div className={styles.categoryTags}>
                                        {message.categories.map((category) => (
                                            <span
                                                key={category}
                                                className={styles.categoryTag}
                                            >
                                                {category}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <span className={styles.messageContent}>
                                {message.aiAnalyze}
                            </span>
                            <p className={styles.messageContent}>
                                {message.content}
                            </p>
                            {message.problematicWords.length > 0 && (
                                <div className={styles.problematicWordsBox}>
                                    <p className={styles.problematicWordsText}>
                                        Problematic words found:{' '}
                                        {message.problematicWords.join(', ')}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

DisplayData.propTypes = {
    fileContent: PropTypes.any,
};

export default DisplayData;
