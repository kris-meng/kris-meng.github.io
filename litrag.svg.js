// litrag.svg.js

export const litragDiagram = {
  tooltips: {
    pdfs: { title: 'PDF documents', body: 'Any research paper dropped into the UI. Supports multi-paper ingestion with a per-file registry.' },
    docling: { title: 'Docling parser', body: 'Converts PDFs into structured documents, preserving section hierarchy, tables, and formulas.' },
    textchunks: { title: 'Text chunks', body: 'Paragraphs grouped by section and chunked with overlap. Carries metadata like page and bounding boxes.' },
    figures: { title: 'Figures', body: 'Passed to Qwen2.5-VL to generate searchable text descriptions from images and captions.' },
    formulas: { title: 'Formulas', body: 'LaTeX extracted via pix2tex OCR, summarized into plain-English by Qwen2.5.' },
    qdrant: { title: 'Nomic + Qdrant', body: 'Vectors stored in Qdrant with all structural metadata for filtered retrieval.' },
    query: { title: 'User query', body: 'Natural language question. Can be targeted at specific papers or the whole library.' },
    router: { title: 'Query router', body: 'Detects intent (comparison, trend, etc.) and determines local vs global search scope.' },
    directlookup: { title: 'Direct lookup', body: 'Bypasses vector search to fetch specific Figures/Tables by ID if mentioned.' },
    hybrid: { title: 'Hybrid retrieval', body: 'Combines dense semantic search with keyword BM25 scoring for accuracy.' },
    enriched: { title: 'Enriched context', body: 'Retrieved text chunks are cross-referenced with their associated figures and tables.' },
    llm: { title: 'Qwen2.5:7b', body: 'Generates final answer constrained strictly to the provided research context.' },
    grounding: { title: 'Grounded answer', body: 'Answer is scored for faithfulness. Sources link directly to PDF bounding boxes.' },
  },

  svg: `
    <svg width="100%" viewBox="0 0 680 850" style="display:block;">
      <defs>
        <marker id="darrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </marker>
      </defs>
      <text x="40" y="38"  style="font-family:var(--font-sans-2);font-size:11px;fill:var(--muted);letter-spacing:0.1em;opacity:0.5">INGESTION</text>
      <text x="40" y="350" style="font-family:var(--font-sans-2);font-size:11px;fill:var(--muted);letter-spacing:0.1em;opacity:0.5">RETRIEVAL</text>
      <text x="40" y="680" style="font-family:var(--font-sans-2);font-size:11px;fill:var(--muted);letter-spacing:0.1em;opacity:0.5">GENERATION</text>

      <!-- Nodes -->
      <g class="dnode" data-key="pdfs" style="cursor:pointer"><rect x="270" y="50" width="140" height="44" rx="8" fill="var(--surface)" stroke="var(--border)" stroke-width="0.5"/><text x="340" y="72" text-anchor="middle" dominant-baseline="central" style="font-family:var(--font-sans-2);font-size:13px;font-weight:500;fill:var(--text)">PDF documents</text></g>
      <line x1="340" y1="94" x2="340" y2="118" stroke="var(--muted)" stroke-width="1" marker-end="url(#darrow)"/>
      <g class="dnode" data-key="docling" style="cursor:pointer"><rect x="230" y="118" width="220" height="44" rx="8" fill="#2e1a47" stroke="#c084fc" stroke-width="0.5"/><text x="340" y="140" text-anchor="middle" dominant-baseline="central" style="font-family:var(--font-sans-2);font-size:13px;font-weight:500;fill:#c084fc">Docling parser</text></g>
      
      <path d="M260 162 L260 186 L130 186 L130 210" fill="none" stroke="var(--muted)" stroke-width="1" marker-end="url(#darrow)"/>
      <line x1="340" y1="162" x2="340" y2="210" stroke="var(--muted)" stroke-width="1" marker-end="url(#darrow)"/>
      <path d="M420 162 L420 186 L550 186 L550 210" fill="none" stroke="var(--muted)" stroke-width="1" marker-end="url(#darrow)"/>

      <g class="dnode" data-key="textchunks" style="cursor:pointer"><rect x="60" y="210" width="140" height="56" rx="8" fill="#0d3028" stroke="#1d9e75" stroke-width="0.5"/><text x="130" y="238" text-anchor="middle" style="font-family:var(--font-sans-2);font-size:13px;font-weight:500;fill:#1d9e75">Text chunks</text></g>
      <g class="dnode" data-key="figures" style="cursor:pointer"><rect x="270" y="210" width="140" height="56" rx="8" fill="#0d3028" stroke="#1d9e75" stroke-width="0.5"/><text x="340" y="238" text-anchor="middle" style="font-family:var(--font-sans-2);font-size:13px;font-weight:500;fill:#1d9e75">Figures</text></g>
      <g class="dnode" data-key="formulas" style="cursor:pointer"><rect x="480" y="210" width="140" height="56" rx="8" fill="#0d3028" stroke="#1d9e75" stroke-width="0.5"/><text x="550" y="238" text-anchor="middle" style="font-family:var(--font-sans-2);font-size:13px;font-weight:500;fill:#1d9e75">Formulas</text></g>

      <path d="M130 266 L130 286 L270 286" fill="none" stroke="var(--muted)" stroke-width="1" marker-end="url(#darrow)"/>
      <line x1="340" y1="266" x2="340" y2="286" stroke="var(--muted)" stroke-width="1" marker-end="url(#darrow)"/>
      <path d="M550 266 L550 286 L410 286" fill="none" stroke="var(--muted)" stroke-width="1" marker-end="url(#darrow)"/>

      <g class="dnode" data-key="qdrant" style="cursor:pointer"><rect x="200" y="286" width="280" height="56" rx="8" fill="#2e1a47" stroke="#c084fc" stroke-width="0.5"/><text x="340" y="316" text-anchor="middle" style="font-family:var(--font-sans-2);font-size:13px;font-weight:500;fill:#c084fc">Qdrant Vector Store</text></g>

      <line x1="40" y1="365" x2="640" y2="365" stroke="#303030" stroke-width="0.5" stroke-dasharray="4 4"/>

      <g class="dnode" data-key="query" style="cursor:pointer"><rect x="270" y="385" width="140" height="44" rx="8" fill="var(--surface)" stroke="var(--border)" stroke-width="0.5"/><text x="340" y="407" text-anchor="middle" dominant-baseline="central" style="font-family:var(--font-sans-2);font-size:13px;font-weight:500;fill:var(--text)">User query</text></g>
      <line x1="340" y1="429" x2="340" y2="453" stroke="var(--muted)" stroke-width="1" marker-end="url(#darrow)"/>

      <g class="dnode" data-key="router" style="cursor:pointer"><rect x="220" y="453" width="240" height="56" rx="8" fill="#2a1e08" stroke="#ba7517" stroke-width="0.5"/><text x="340" y="483" text-anchor="middle" style="font-family:var(--font-sans-2);font-size:13px;font-weight:500;fill:#ba7517">Query router</text></g>

      <path d="M260 509 L260 534 L150 534 L150 558" fill="none" stroke="var(--muted)" stroke-width="1" marker-end="url(#darrow)"/>
      <path d="M420 509 L420 534 L530 534 L530 558" fill="none" stroke="var(--muted)" stroke-width="1" marker-end="url(#darrow)"/>

      <g class="dnode" data-key="directlookup" style="cursor:pointer"><rect x="60" y="558" width="180" height="56" rx="8" fill="#2a1208" stroke="#993c1d" stroke-width="0.5"/><text x="150" y="588" text-anchor="middle" style="font-family:var(--font-sans-2);font-size:13px;font-weight:500;fill:#d85a30">Direct lookup</text></g>
      <g class="dnode" data-key="hybrid" style="cursor:pointer"><rect x="440" y="558" width="180" height="56" rx="8" fill="#2a1208" stroke="#993c1d" stroke-width="0.5"/><text x="530" y="588" text-anchor="middle" style="font-family:var(--font-sans-2);font-size:13px;font-weight:500;fill:#d85a30">Hybrid retrieval</text></g>

      <path d="M150 614 L150 646 L270 646" fill="none" stroke="var(--muted)" stroke-width="1" marker-end="url(#darrow)"/>
      <path d="M530 614 L530 646 L410 646" fill="none" stroke="var(--muted)" stroke-width="1" marker-end="url(#darrow)"/>

      <g class="dnode" data-key="enriched" style="cursor:pointer"><rect x="200" y="646" width="280" height="56" rx="8" fill="#2e1a47" stroke="#c084fc" stroke-width="0.5"/><text x="340" y="676" text-anchor="middle" style="font-family:var(--font-sans-2);font-size:13px;font-weight:500;fill:#c084fc">Enriched context</text></g>

      <line x1="340" y1="702" x2="340" y2="728" stroke="var(--muted)" stroke-width="1" marker-end="url(#darrow)"/>
      <g class="dnode" data-key="llm" style="cursor:pointer"><rect x="220" y="728" width="240" height="56" rx="8" fill="#2e1a47" stroke="#c084fc" stroke-width="0.5"/><text x="340" y="758" text-anchor="middle" style="font-family:var(--font-sans-2);font-size:13px;font-weight:500;fill:#c084fc">Qwen2.5:7b</text></g>

      <line x1="340" y1="784" x2="340" y2="800" stroke="var(--muted)" stroke-width="1" marker-end="url(#darrow)"/>
      <g class="dnode" data-key="grounding" style="cursor:pointer"><rect x="215" y="800" width="250" height="44" rx="8" fill="#0d3028" stroke="#1d9e75" stroke-width="0.5"/><text x="340" y="822" text-anchor="middle" dominant-baseline="central" style="font-family:var(--font-sans-2);font-size:13px;font-weight:500;fill:#1d9e75">Grounded answer</text></g>
    </svg>
  `
};

export function buildDiagramHTML(id, svgString) {
  return `
    <div class="diagram-hint">↗ click any node to learn more</div>
    <div class="diagram-wrap" id="${id}-wrap">
      <div class="diagram-tooltip" id="${id}-tooltip">
        <div class="diagram-tooltip-title" id="${id}-tooltip-title"></div>
        <div class="diagram-tooltip-body" id="${id}-tooltip-body"></div>
      </div>
      ${svgString}
    </div>
  `;
}

export function initDiagram(id, tooltips) {
  const wrap = document.getElementById(id + '-wrap');
  const tooltip = document.getElementById(id + '-tooltip');
  const titleEl = document.getElementById(id + '-tooltip-title');
  const bodyEl = document.getElementById(id + '-tooltip-body');

  if (!wrap) return;

  wrap.addEventListener('click', (e) => {
    const node = e.target.closest('.dnode');
    if (!node) {
      tooltip.classList.remove('visible');
      return;
    }

    const data = tooltips[node.dataset.key];
    if (!data) return;

    titleEl.textContent = data.title;
    bodyEl.textContent = data.body;

    const wrapRect = wrap.getBoundingClientRect();
    const nodeRect = node.getBoundingClientRect();

    // Position relative to the container
    let left = (nodeRect.left - wrapRect.left) + (nodeRect.width / 2);
    let top = (nodeRect.top - wrapRect.top) - 10;

    tooltip.style.left = left + 'px';
    tooltip.style.top = top + 'px';
    tooltip.style.transform = 'translate(-50%, -100%)';
    tooltip.classList.add('visible');

    e.stopPropagation();
  });

  // Hide tooltip if clicking outside the wrap
  document.addEventListener('click', (e) => {
    if (!wrap.contains(e.target)) tooltip.classList.remove('visible');
  });
}
