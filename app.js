document.addEventListener('DOMContentLoaded', () => {
    const palette = document.getElementById('palette');
    const canvas = document.getElementById('canvas');

    const components = [
        { name: 'Heading', tag: 'dnd-heading' },
        { name: 'Paragraph', tag: 'dnd-paragraph' },
        { name: 'Card', tag: 'dnd-card' }
    ];

    components.forEach(comp => {
        const componentEl = document.createElement('div');
        componentEl.className = 'component';
        componentEl.draggable = true;
        componentEl.dataset.component = comp.tag;
        componentEl.textContent = comp.name;
        palette.appendChild(componentEl);
    });

    palette.addEventListener('dragstart', (e) => {
        if (e.target.classList.contains('component')) {
            e.dataTransfer.setData('text/plain', e.target.dataset.component);
            setTimeout(() => {
                e.target.classList.add('dragging');
            }, 0);
        }
    });

    palette.addEventListener('dragend', (e) => {
        if (e.target.classList.contains('component')) {
            e.target.classList.remove('dragging');
        }
    });

    canvas.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    canvas.addEventListener('drop', (e) => {
        e.preventDefault();
        const componentName = e.dataTransfer.getData('text/plain');
        const newElement = document.createElement(componentName);
        canvas.appendChild(newElement);
    });
});

class DndHeading extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                h1 {
                    font-family: sans-serif;
                    font-size: 2rem;
                    color: #333;
                }
            </style>
            <h1>Heading</h1>
        `;
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}
customElements.define('dnd-heading', DndHeading);

class DndParagraph extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                p {
                    font-family: sans-serif;
                    font-size: 1rem;
                    color: #555;
                }
            </style>
            <p>This is a paragraph.</p>
        `;
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}
customElements.define('dnd-paragraph', DndParagraph);

class DndCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                .card {
                    font-family: sans-serif;
                    border: 1px solid #ccc;
                    border-radius: 8px;
                    padding: 1rem;
                    width: 200px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }
                .card-title {
                    font-size: 1.25rem;
                    margin: 0 0 0.5rem 0;
                }
                .card-content {
                    font-size: 1rem;
                }
            </style>
            <div class="card">
                <h3 class="card-title">Card Title</h3>
                <div class="card-content">
                    This is the card content.
                </div>
            </div>
        `;
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}
customElements.define('dnd-card', DndCard);
