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
    <svg width="100%" viewBox="0 0 680 620" style="display:block;">
      <defs>
        <marker id="darrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </marker>
      </defs>
      
      <!-- Row 1: PDFs -->
      <text x="40" y="25" style="font-family:var(--font-sans-2);font-size:10px;fill:var(--muted);letter-spacing:0.1em;opacity:0.5">INGESTION</text>
      <g class="dnode" data-key="pdfs" style="cursor:pointer">
        <rect x="280" y="35" width="120" height="36" rx="6" fill="var(--surface)" stroke="var(--border)" stroke-width="0.5"/>
        <text x="340" y="53" text-anchor="middle" dominant-baseline="central" style="font-family:var(--font-sans-2);font-size:12px;font-weight:500;fill:var(--text)">PDF documents</text>
      </g>

      <line x1="340" y1="71" x2="340" y2="85" stroke="var(--muted)" stroke-width="1" marker-end="url(#darrow)"/>

      <!-- Row 2: Docling -->
      <g class="dnode" data-key="docling" style="cursor:pointer">
        <rect x="250" y="85" width="180" height="36" rx="6" fill="#2e1a47" stroke="#c084fc" stroke-width="0.5"/>
        <text x="340" y="103" text-anchor="middle" dominant-baseline="central" style="font-family:var(--font-sans-2);font-size:12px;font-weight:500;fill:#c084fc">Docling parser</text>
      </g>
      
      <path d="M260 121 L260 135 L130 135 L130 145" fill="none" stroke="var(--muted)" stroke-width="1" marker-end="url(#darrow)"/>
      <line x1="340" y1="121" x2="340" y2="145" stroke="var(--muted)" stroke-width="1" marker-end="url(#darrow)"/>
      <path d="M420 121 L420 135 L550 135 L550 145" fill="none" stroke="var(--muted)" stroke-width="1" marker-end="url(#darrow)"/>

      <!-- Row 3: Components -->
      <g class="dnode" data-key="textchunks" style="cursor:pointer"><rect x="70" y="145" width="120" height="40" rx="6" fill="#0d3028" stroke="#1d9e75" stroke-width="0.5"/><text x="130" y="165" text-anchor="middle" dominant-baseline="central" style="font-family:var(--font-sans-2);font-size:11px;font-weight:500;fill:#1d9e75">Text chunks</text></g>
      <g class="dnode" data-key="figures" style="cursor:pointer"><rect x="280" y="145" width="120" height="40" rx="6" fill="#0d3028" stroke="#1d9e75" stroke-width="0.5"/><text x="340" y="165" text-anchor="middle" dominant-baseline="central" style="font-family:var(--font-sans-2);font-size:11px;font-weight:500;fill:#1d9e75">Figures</text></g>
      <g class="dnode" data-key="formulas" style="cursor:pointer"><rect x="490" y="145" width="120" height="40" rx="6" fill="#0d3028" stroke="#1d9e75" stroke-width="0.5"/><text x="550" y="165" text-anchor="middle" dominant-baseline="central" style="font-family:var(--font-sans-2);font-size:11px;font-weight:500;fill:#1d9e75">Formulas</text></g>

      <path d="M130 185 L130 199 L280 199" fill="none" stroke="var(--muted)" stroke-width="1" marker-end="url(#darrow)"/>
      <line x1="340" y1="185" x2="340" y2="199" stroke="var(--muted)" stroke-width="1" marker-end="url(#darrow)"/>
      <path d="M550 185 L550 199 L400 199" fill="none" stroke="var(--muted)" stroke-width="1" marker-end="url(#darrow)"/>

      <!-- Row 4: Qdrant -->
      <g class="dnode" data-key="qdrant" style="cursor:pointer">
        <rect x="230" y="199" width="220" height="40" rx="6" fill="#2e1a47" stroke="#c084fc" stroke-width="0.5"/>
        <text x="340" y="219" text-anchor="middle" dominant-baseline="central" style="font-family:var(--font-sans-2);font-size:12px;font-weight:500;fill:#c084fc">Qdrant Vector Store</text>
      </g>

      <line x1="40" y1="260" x2="640" y2="260" stroke="#303030" stroke-width="0.5" stroke-dasharray="4 4"/>

      <!-- Row 5: Query -->
      <text x="40" y="280" style="font-family:var(--font-sans-2);font-size:10px;fill:var(--muted);letter-spacing:0.1em;opacity:0.5">RETRIEVAL</text>
      <g class="dnode" data-key="query" style="cursor:pointer">
        <rect x="280" y="290" width="120" height="36" rx="6" fill="var(--surface)" stroke="var(--border)" stroke-width="0.5"/>
        <text x="340" y="308" text-anchor="middle" dominant-baseline="central" style="font-family:var(--font-sans-2);font-size:12px;font-weight:500;fill:var(--text)">User query</text>
      </g>
      <line x1="340" y1="326" x2="340" y2="340" stroke="var(--muted)" stroke-width="1" marker-end="url(#darrow)"/>

      <!-- Row 6: Router -->
      <g class="dnode" data-key="router" style="cursor:pointer">
        <rect x="240" y="340" width="200" height="40" rx="6" fill="#2a1e08" stroke="#ba7517" stroke-width="0.5"/>
        <text x="340" y="360" text-anchor="middle" dominant-baseline="central" style="font-family:var(--font-sans-2);font-size:12px;font-weight:500;fill:#ba7517">Query router</text>
      </g>

      <path d="M260 380 L260 394 L150 394 L150 405" fill="none" stroke="var(--muted)" stroke-width="1" marker-end="url(#darrow)"/>
      <path d="M420 380 L420 394 L530 394 L530 405" fill="none" stroke="var(--muted)" stroke-width="1" marker-end="url(#darrow)"/>

      <!-- Row 7: Hybrid/Direct -->
      <g class="dnode" data-key="directlookup" style="cursor:pointer"><rect x="70" y="405" width="160" height="40" rx="6" fill="#2a1208" stroke="#993c1d" stroke-width="0.5"/><text x="150" y="425" text-anchor="middle" dominant-baseline="central" style="font-family:var(--font-sans-2);font-size:11px;font-weight:500;fill:#d85a30">Direct lookup</text></g>
      <g class="dnode" data-key="hybrid" style="cursor:pointer"><rect x="450" y="405" width="160" height="40" rx="6" fill="#2a1208" stroke="#993c1d" stroke-width="0.5"/><text x="530" y="425" text-anchor="middle" dominant-baseline="central" style="font-family:var(--font-sans-2);font-size:11px;font-weight:500;fill:#d85a30">Hybrid retrieval</text></g>

      <path d="M150 445 L150 459 L260 459" fill="none" stroke="var(--muted)" stroke-width="1" marker-end="url(#darrow)"/>
      <path d="M530 445 L530 459 L420 459" fill="none" stroke="var(--muted)" stroke-width="1" marker-end="url(#darrow)"/>

      <!-- Row 8: Enriched -->
      <g class="dnode" data-key="enriched" style="cursor:pointer">
        <rect x="230" y="459" width="220" height="40" rx="6" fill="#2e1a47" stroke="#c084fc" stroke-width="0.5"/>
        <text x="340" y="479" text-anchor="middle" dominant-baseline="central" style="font-family:var(--font-sans-2);font-size:12px;font-weight:500;fill:#c084fc">Enriched context</text>
      </g>

      <line x1="40" y1="520" x2="640" y2="520" stroke="#303030" stroke-width="0.5" stroke-dasharray="4 4"/>

      <!-- Row 9: LLM -->
      <text x="40" y="540" style="font-family:var(--font-sans-2);font-size:10px;fill:var(--muted);letter-spacing:0.1em;opacity:0.5">GENERATION</text>
      <g class="dnode" data-key="llm" style="cursor:pointer">
        <rect x="250" y="545" width="180" height="36" rx="6" fill="#2e1a47" stroke="#c084fc" stroke-width="0.5"/>
        <text x="340" y="563" text-anchor="middle" dominant-baseline="central" style="font-family:var(--font-sans-2);font-size:12px;font-weight:500;fill:#c084fc">Qwen2.5:7b</text>
      </g>

      <line x1="340" y1="581" x2="340" y2="595" stroke="var(--muted)" stroke-width="1" marker-end="url(#darrow)"/>

      <!-- Row 10: Grounding -->
      <g class="dnode" data-key="grounding" style="cursor:pointer">
        <rect x="240" y="595" width="200" height="36" rx="6" fill="#0d3028" stroke="#1d9e75" stroke-width="0.5"/>
        <text x="340" y="613" text-anchor="middle" dominant-baseline="central" style="font-family:var(--font-sans-2);font-size:12px;font-weight:500;fill:#1d9e75">Grounded answer</text>
      </g>
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

    // Position tooltip above the clicked node
    let left = (nodeRect.left - wrapRect.left) + (nodeRect.width / 2);
    let top = (nodeRect.top - wrapRect.top) - 8;

    tooltip.style.left = left + 'px';
    tooltip.style.top = top + 'px';
    tooltip.style.transform = 'translate(-50%, -100%)';
    tooltip.classList.add('visible');

    e.stopPropagation();
  });

  document.addEventListener('click', (e) => {
    if (!wrap.contains(e.target)) tooltip.classList.remove('visible');
  });
}
