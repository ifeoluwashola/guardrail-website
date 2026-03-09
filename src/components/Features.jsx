import React from 'react';
import './Features.css';

const Features = () => {
    const features = [
        {
            icon: "🛑",
            title: "Command Interceptor",
            desc: "Automatically detects high-risk actions (`delete`, `apply`, `destroy`) explicitly targeting production flags."
        },
        {
            icon: "🔑",
            title: "K8s Dynamic Validation",
            desc: "Natively cross-references target clusters against your local ~/.kube/config via client-go before acting."
        },
        {
            icon: "☁️",
            title: "Cloud Provider Agnosticism",
            desc: "Smartly routes shell executions to `aws configure` or `gcloud config` based on the environment rules."
        },
        {
            icon: "⚡",
            title: "Interactive State",
            desc: "Setup via `guardrail create-config` or dynamically edit with `sc` via PromptUI terminal dropdowns."
        }
    ];

    return (
        <section className="features-grid">
            {features.map((f, i) => (
                <div key={i} className="glass-card feature-card">
                    <div className="feature-icon">{f.icon}</div>
                    <h3>{f.title}</h3>
                    <p>{f.desc}</p>
                </div>
            ))}
        </section>
    );
};

export default Features;
