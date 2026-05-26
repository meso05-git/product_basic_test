class GameCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const title = this.getAttribute('title') || 'Game Title';
        const tagline = this.getAttribute('tagline') || 'Classic Game';
        const description = this.getAttribute('description') || '';
        const features = JSON.parse(this.getAttribute('features') || '[]');
        const hue = this.getAttribute('color-hue') || '200';
        const link = this.getAttribute('app-store-link') || '#';
        const icon = this.getAttribute('icon') || '🎮';

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    --card-hue: ${hue};
                    --card-accent: oklch(65% 0.18 var(--card-hue));
                    --card-bg: oklch(99% 0.01 var(--card-hue));
                    --card-text: oklch(25% 0.04 var(--card-hue));
                }

                .card {
                    background: var(--card-bg);
                    border: 1px solid oklch(90% 0.02 var(--card-hue));
                    border-radius: 24px;
                    padding: 2rem;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                    box-shadow: 0 10px 30px -10px oklch(80% 0.1 var(--card-hue) / 0.3);
                    position: relative;
                    overflow: hidden;
                    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }

                /* Container Query for internal layout adjustments */
                @container (min-width: 500px) {
                    .card {
                        padding: 2.5rem;
                    }
                }

                .card::before {
                    content: '';
                    position: absolute;
                    top: -50%;
                    left: -50%;
                    width: 200%;
                    height: 200%;
                    background: radial-gradient(circle, var(--card-accent) 0%, transparent 70%);
                    opacity: 0.03;
                    pointer-events: none;
                }

                .icon-wrapper {
                    font-size: 3rem;
                    background: oklch(95% 0.03 var(--card-hue));
                    width: 80px;
                    height: 80px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 20px;
                    box-shadow: inset 0 2px 4px rgba(255,255,255,0.8), 0 4px 12px oklch(80% 0.1 var(--card-hue) / 0.2);
                }

                .header h2 {
                    font-family: 'Playfair Display', serif;
                    font-size: 1.75rem;
                    margin-bottom: 0.25rem;
                    color: var(--card-text);
                }

                .tagline {
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    font-size: 0.75rem;
                    font-weight: 800;
                    color: var(--card-accent);
                }

                .description {
                    font-size: 0.95rem;
                    color: oklch(45% 0.05 var(--card-hue));
                    flex-grow: 1;
                }

                .features {
                    list-style: none;
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                    margin: 1rem 0;
                }

                .feature-tag {
                    font-size: 0.75rem;
                    background: oklch(94% 0.02 var(--card-hue));
                    padding: 0.4rem 0.8rem;
                    border-radius: 100px;
                    color: oklch(40% 0.05 var(--card-hue));
                    border: 1px solid oklch(88% 0.03 var(--card-hue));
                }

                .cta {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    background: var(--card-accent);
                    color: white;
                    text-decoration: none;
                    padding: 1rem 1.5rem;
                    border-radius: 14px;
                    font-weight: 600;
                    font-size: 0.9rem;
                    transition: transform 0.2s ease, box-shadow 0.2s ease;
                    box-shadow: 0 4px 15px var(--card-accent) / 0.3;
                }

                .cta:hover {
                    transform: scale(1.02);
                    box-shadow: 0 6px 20px var(--card-accent) / 0.4;
                    filter: brightness(1.1);
                }

                .cta:active {
                    transform: scale(0.98);
                }
            </style>

            <div class="card">
                <div class="icon-wrapper">${icon}</div>
                <div class="header">
                    <div class="tagline">${tagline}</div>
                    <h2>${title}</h2>
                </div>
                <p class="description">${description}</p>
                <ul class="features">
                    ${features.map(f => `<li class="feature-tag">${f}</li>`).join('')}
                </ul>
                <a href="${link}" class="cta" target="_blank">Download on App Store</a>
            </div>
        `;
    }
}

customElements.define('game-card', GameCard);
