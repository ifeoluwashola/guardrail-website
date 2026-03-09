import React, { useState, useEffect } from 'react';
import './Hero.css';

const Hero = ({ onGetStarted }) => {
    const [typedCommand, setTypedCommand] = useState('');
    const [history, setHistory] = useState([]);
    const [showDanger, setShowDanger] = useState(false);
    const [currentCmdIdx, setCurrentCmdIdx] = useState(0);

    const commandSequence = [
        { text: "guardrail sc", delay: 1000, output: "Successfully updated dev context in ~/.guardrail/config.yaml" },
        { text: "guardrail use prod", delay: 1400, output: "WARNING: NOW OPERATING IN PRODUCTION", isWarningOutput: true },
        { text: "guardrail run -- kubectl delete ds prom-node-exporter", delay: 2000, isFinal: true }
    ];

    useEffect(() => {
        if (currentCmdIdx >= commandSequence.length) return;

        const currentTarget = commandSequence[currentCmdIdx];
        let charIndex = 0;

        // Pause before typing the next command
        const startPause = setTimeout(() => {
            const typeInterval = setInterval(() => {
                if (charIndex <= currentTarget.text.length) {
                    setTypedCommand(currentTarget.text.slice(0, charIndex));
                    charIndex++;
                } else {
                    clearInterval(typeInterval);

                    if (currentTarget.isFinal) {
                        setTimeout(() => setShowDanger(true), 400);
                    } else {
                        setTimeout(() => {
                            setHistory(prev => [...prev, { cmd: currentTarget.text, out: currentTarget.output, isWarning: currentTarget.isWarningOutput }]);
                            setTypedCommand('');
                            setCurrentCmdIdx(curr => curr + 1);
                        }, 800); // Pause after typing before showing output & next command
                    }
                }
            }, 60); // Typing speed

            return () => clearInterval(typeInterval);
        }, currentCmdIdx === 0 ? 500 : 1000);

        return () => clearTimeout(startPause);
    }, [currentCmdIdx]);

    return (
        <section className="hero">
            <div className="hero-content">
                <h2 className="title">Navigate Cloud Contexts. <span className="danger-text">Protect Production.</span></h2>
                <p className="subtitle">
                    Guardrail is a context-aware Go CLI that instantly synchronizes your Kubernetes and AWS/GCP profiles, while natively wrapping your terminal to freeze execution if destructive commands target crucial infrastructure.
                </p>
                <div className="cta-buttons">
                    <button onClick={onGetStarted} className="btn-primary" style={{ border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: '1rem' }}>Get Started</button>
                    <a href="https://github.com/ifeoluwashola/guardrail" target="_blank" className="btn-secondary" rel="noreferrer">View on GitHub</a>
                </div>
            </div>

            <div className="hero-visual glass-card">
                <div className="mac-buttons">
                    <span className="close"></span>
                    <span className="minimize"></span>
                    <span className="maximize"></span>
                </div>
                <div className="terminal-content">

                    {history.map((item, i) => (
                        <div key={i} style={{ marginBottom: '16px' }}>
                            <p className="command">~ $ <span style={{ color: 'white' }}>{item.cmd}</span></p>
                            <p style={{ color: item.isWarning ? 'var(--accent-red)' : 'var(--text-secondary)', marginTop: '4px', fontWeight: item.isWarning ? 'bold' : 'normal' }}>{item.out}</p>
                        </div>
                    ))}

                    <p className="command">~ $ <span style={{ color: 'white' }}>{typedCommand}</span><span className="typing-cursor" style={{ display: showDanger ? 'none' : 'inline-block' }}>&nbsp;</span></p>

                    {showDanger && (
                        <>
                            <p className="output danger" style={{ color: 'var(--accent-red)', marginTop: '16px', fontWeight: 'bold' }}>[DANGER] Targeting PRODUCTION</p>
                            <p className="prompt" style={{ color: 'var(--accent-cyan)', marginTop: '8px' }}>✔ Type the exact cluster context name ('arn:aws:eks...:prod-cluster') to confirm:</p>
                            <p style={{ marginTop: '8px' }}><span className="typing-cursor">&nbsp;</span></p>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Hero;
