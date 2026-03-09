import React, { useState, useEffect } from 'react';
import './Releases.css';

const Releases = () => {
    const [releases, setReleases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReleases = async () => {
            try {
                const response = await fetch('https://api.github.com/repos/ifeoluwashola/guardrail/releases');
                if (!response.ok) {
                    throw new Error('Failed to fetch releases');
                }
                const data = await response.json();
                setReleases(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchReleases();
    }, []);

    if (loading) return <div className="releases-loading">Loading release history...</div>;
    if (error) return <div className="releases-error">Error loading releases: {error}</div>;

    return (
        <section className="releases-container">
            <h2>Release History</h2>
            <p className="releases-subtitle">Track the latest updates, features, and security patches for the Guardrail CLI.</p>

            <div className="releases-timeline">
                {releases.map((release) => (
                    <div key={release.id} className="release-card glass-card">
                        <div className="release-header">
                            <h3>
                                <a href={release.html_url} target="_blank" rel="noreferrer">
                                    {release.name || release.tag_name}
                                </a>
                                {release.prerelease && <span className="badge prerelease">Pre-release</span>}
                                {release.draft && <span className="badge draft">Draft</span>}
                            </h3>
                            <span className="release-date">
                                {new Date(release.published_at).toLocaleDateString(undefined, {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </span>
                        </div>

                        <div className="release-body" dangerouslySetInnerHTML={{
                            __html: release.body ?
                                release.body.replace(/\r\n/g, '<br />') :
                                'No release notes provided.'
                        }} />

                        <div className="release-assets">
                            <h4>Assets ({release.assets.length})</h4>
                            <ul>
                                {release.assets.slice(0, 5).map(asset => (
                                    <li key={asset.id}>
                                        <a href={asset.browser_download_url} download>
                                            💾 {asset.name}
                                        </a>
                                        <span className="asset-size">{(asset.size / 1024 / 1024).toFixed(2)} MB</span>
                                    </li>
                                ))}
                                {release.assets.length > 5 && (
                                    <li className="more-assets">
                                        <a href={release.html_url} target="_blank" rel="noreferrer">
                                            + {release.assets.length - 5} more assets...
                                        </a>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Releases;
