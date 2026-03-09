import React from 'react';
import './HowItWorks.css';

const HowItWorks = () => {
    return (
        <section className="how-it-works">
            <h2 className="section-title">How Guardrail Works</h2>
            <div className="steps-container">
                <div className="step-card glass-card">
                    <div className="step-number">1</div>
                    <h3>Configure Contexts</h3>
                    <p>Use `guardrail create-config` to generate a YAML file defining your environments (dev, staging, prod), tying together your cloud access profiles and Kubernetes contexts.</p>
                </div>
                <div className="step-card glass-card">
                    <div className="step-number">2</div>
                    <h3>Switch Environments</h3>
                    <p>Run `guardrail use prod` to instantly and safely authenticate and switch your underlying kubeconfig and AWS/GCP profiles to the target environment.</p>
                </div>
                <div className="step-card glass-card">
                    <div className="step-number">3</div>
                    <h3>Execute Safely</h3>
                    <p>Instead of running destructive commands directly, prepend them with `guardrail run --`. If the current context has `is_production: true`, Guardrail will intercept high-risk keywords and mandate explicit confirmation.</p>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
