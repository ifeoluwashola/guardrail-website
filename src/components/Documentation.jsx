import React from 'react';
import './Documentation.css';

const Documentation = () => {
    return (
        <section className="docs-container">
            <h2>Documentation</h2>

            <div className="doc-section">
                <h3>1. Installation</h3>
                <p>Guardrail is distributed natively across all major platforms securely via GoReleaser. Pick your package manager:</p>

                <h4 style={{ marginTop: '16px', marginBottom: '8px' }}>macOS / Linux (Homebrew)</h4>
                <pre style={{ marginBottom: '16px' }}><code>brew tap ifeoluwashola/homebrew-tap
                    brew install guardrail</code></pre>

                <h4 style={{ marginBottom: '8px' }}>Debian / Ubuntu (APT)</h4>
                <pre style={{ marginBottom: '16px' }}><code># Download .deb from GitHub Releases
                    curl -LO https://github.com/ifeoluwashola/guardrail/releases/latest/download/guardrail_Linux_x86_64.deb
                    sudo dpkg -i guardrail_Linux_x86_64.deb</code></pre>

                <h4 style={{ marginBottom: '8px' }}>Windows (Scoop)</h4>
                <pre style={{ marginBottom: '16px' }}><code>scoop bucket add guardrail https://github.com/ifeoluwashola/scoop-bucket.git
                    scoop install guardrail</code></pre>

                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>*Alternatively, you can compile from source locally using <code>go install github.com/ifeoluwashola/guardrail/...</code></p>
            </div>

            <div className="doc-section">
                <h3>2. Configuration</h3>
                <p>Guardrail is driven by <code>~/.guardrail/config.yaml</code>. To scaffold this interactively, run:</p>
                <pre><code>guardrail create-config   # Or use alias: guardrail cc</code></pre>
                <p>To dynamically update your environments via terminal dropdowns:</p>
                <pre><code>guardrail set-context     # Or use alias: guardrail sc</code></pre>
            </div>

            <div className="doc-section">
                <h3>3. Core Commands</h3>
                <div className="command-block">
                    <h4>Environment Switching</h4>
                    <pre><code>guardrail use [env_name]</code></pre>
                    <p>Switches your active Kubernetes context and Cloud Provider Profile automatically.</p>
                </div>

                <div className="command-block">
                    <h4>Safety Interceptor (Production Protection)</h4>
                    <pre><code>guardrail run -- [command]</code></pre>
                    <p>Executes a shell command beneath the active environment profile.</p>
                    <p><strong>How the Interceptor Works:</strong> If your <code>~/.guardrail/config.yaml</code> contains <code>is_production: true</code> for the active context, Guardrail actively scans your command. If it detects high-risk keywords (like <code>delete</code>, <code>apply</code>, <code>destroy</code>, <code>uninstall</code>), it instantly halts execution.</p>
                    <p>It then prompts a high-visibility terminal warning, requiring you to manually type the exact, complex name of the cluster you are about to mutate before it lets the command through.</p>
                </div>

                <div className="command-block">
                    <h4>Shell Profile Exporting</h4>
                    <pre><code>eval $(guardrail env)</code></pre>
                    <p>Safely exports the Go child-process variables (like <code>AWS_PROFILE</code> or <code>KUBECONFIG_CONTEXT</code>) to your parent bash/zsh profile. Best used by creating an alias in your shell rc file: <code>alias gr='guardrail use $1 && eval $(guardrail env)'</code></p>
                </div>
            </div>
        </section>
    );
};

export default Documentation;
