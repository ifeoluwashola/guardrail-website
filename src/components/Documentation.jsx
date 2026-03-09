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
                <h3>2. Initialization & Configuration</h3>
                <p>Guardrail relies on a central configuration file located at <code>~/.guardrail/config.yaml</code>. Use these commands to manage it.</p>

                <div className="command-block">
                    <h4>Create Base Config</h4>
                    <pre><code>guardrail create-config</code></pre>
                    <p><strong>Alias:</strong> <code>guardrail cc</code></p>
                    <p>Scaffolds a fresh configuration file if one doesn't exist. It generates a template populated with standard "dev", "staging", and "prod" environments as a starting point. This is the first command you should run after installation.</p>
                </div>

                <div className="command-block">
                    <h4>Direct Edit</h4>
                    <pre><code>guardrail edit-config</code></pre>
                    <p>Opens <code>~/.guardrail/config.yaml</code> directly in your system's default terminal text editor (uses <code>$EDITOR</code>, falling back to <code>vim</code> or <code>nano</code>). Use this if you prefer writing YAML directly.</p>
                </div>
            </div>

            <div className="doc-section">
                <h3>3. Environment Management</h3>
                <p>These commands handle the creation, mutation, and selection of your cloud profiles.</p>

                <div className="command-block">
                    <h4>Interactive Configuration</h4>
                    <pre><code>guardrail set-context</code></pre>
                    <p><strong>Alias:</strong> <code>guardrail sc</code></p>
                    <p>Launches an interactive dropdown UI in your terminal. This wizard walks you through creating a brand new environment profile, or safely mutating an existing one, asking for attributes like AWS Profiles, Kubeconfig Contexts, and whether the environment represents Production.</p>
                </div>

                <div className="command-block">
                    <h4>Switching Environments</h4>
                    <pre><code>guardrail use [env_name]</code></pre>
                    <p><strong>Example:</strong> <code>guardrail use prod-eu-west</code></p>
                    <p>Updates Guardrail's internal active state to point to the targeted environment. When you use this natively, it relies on your explicit shell alias to inject those profile variables into your terminal session.</p>
                </div>
            </div>

            <div className="doc-section">
                <h3>4. Execution & Safety</h3>
                <p>The core philosophy of Guardrail is preventing destructive actions via the shell wrapper.</p>

                <div className="command-block">
                    <h4>Safety Interceptor (Production Protection)</h4>
                    <pre><code>guardrail run -- [command...]</code></pre>
                    <p><strong>Example:</strong> <code>guardrail run -- kubectl delete pods --all</code></p>
                    <p>Executes a shell command beneath the active environment profile. Guardrail spins up a secure child-process with the exact Kubeconfig and AWS/GCP profiles injected from your YAML file.</p>
                    <br />
                    <p><strong>How the Interceptor Works:</strong> If your active context has <code>is_production: true</code>, Guardrail scans the command arguments before they ever reach the operating system. If it detects high-risk keywords (<code>delete</code>, <code>apply</code>, <code>destroy</code>, <code>uninstall</code>), it halts execution immediately.</p>
                    <br />
                    <p>It then flashes a high-visibility terminal warning (red background), forcing you to type the <strong>exact, case-sensitive name</strong> of the cluster you are about to mutate. If you make a typo, the process dies instantly, saving the cluster.</p>
                </div>
            </div>

            <div className="doc-section">
                <h3>5. Shell Integration</h3>
                <p>For the seamless context-switching to work in your parent bash/ZSH terminal, Guardrail hooks into the prompt.</p>

                <div className="command-block">
                    <h4>Profile Exporting</h4>
                    <pre><code>eval $(guardrail env)</code></pre>
                    <p><strong>Alias Setup (Recommended):</strong> Add <code>alias gr='guardrail use "$1" &amp;&amp; eval $(guardrail env)'</code> to your <code>~/.zshrc</code> or <code>~/.bashrc</code>.</p>
                    <p>Go binaries run as child processes and cannot natively change your terminal's environment variables. The <code>env</code> command prints bash-compatible `export` statements. Wrapping it in an <code>eval</code> directly modifies your active session, linking your shell seamlessly to the Guardrail context.</p>
                </div>

                <div className="command-block">
                    <h4>Terminal Prompt Integration (Inline View)</h4>
                    <pre><code>guardrail prompt</code></pre>
                    <p>Prints a highly-visible badge (e.g., <strong style={{ color: "red" }}>[PROD | my-cluster]</strong>) of your active environment. To have this permanently visible inline on your terminal screen like the screenshot above, you must integrate it into your shell theme.</p>

                    <h5 style={{ margin: '16px 0 8px', color: 'var(--text-primary)' }}>For standard ZSH or Bash:</h5>
                    <p style={{ marginBottom: '8px' }}>Add this to your <code>~/.zshrc</code> or <code>~/.bashrc</code> to prepend it to your prompt:</p>
                    <pre><code>export PS1="\$(guardrail prompt) $PS1"</code></pre>

                    <h5 style={{ margin: '16px 0 8px', color: 'var(--text-primary)' }}>For Starship (starship.rs):</h5>
                    <p style={{ marginBottom: '8px' }}>Add a custom module to your <code>~/.config/starship.toml</code>:</p>
                    <pre><code>[custom.guardrail]
                        command = "guardrail prompt"
                        when = "test -f ~/.guardrail/config.yaml"
                        format = "$output"</code></pre>
                </div>
            </div>
        </section>
    );
};

export default Documentation;
