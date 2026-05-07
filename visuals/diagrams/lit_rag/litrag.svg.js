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
    <svg width="100%" viewBox="0 0 680 640" style="display:block;">
      <defs>
        <marker id="darrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </marker>
      </defs>

      <!-- Labels -->
      <text x="40" y="30" style="font-family:var(--font-sans-2);font-size:10px;fill:var(--muted);letter-spacing:0.1em;opacity:0.5">INGESTION</text>
      <text x="40" y="285" style="font-family:var(--font-sans-2);font-size:10px;fill:var(--muted);letter-spacing:0.1em;opacity:0.5">RETRIEVAL</text>
      <text x="40" y="530" style="font-family:var(--font-sans-2);font-size:10px;fill:var(--muted);letter-spacing:0.1em;opacity:0.5">GENERATION</text>

      <!-- ── INGESTION ── -->
      <g class="dnode" data-key="pdfs" style="cursor:pointer">
        <rect x="270" y="45" width="140" height="36" rx="6" fill="var(--surface)" stroke="var(--border)" stroke-width="0.5"/>
        <text x="340" y="63" text-anchor="middle" dominant-baseline="central" style="font-family:var(--font-sans-2);font-size:12px;font-weight:500;fill:var(--text)">PDF documents</text>
      </g>

      <line x1="340" y1="81" x2="340" y2="100" stroke="var(--muted)" stroke-width="1" marker-end="url(#darrow)"/>

      <g class="dnode" data-key="docling" style="cursor:pointer">
        <rect x="240" y="100" width="200" height="36" rx="6" fill="#2e1a47" stroke="#c084fc" stroke-width="0.5"/>
        <text x="340" y="118" text-anchor="middle" dominant-baseline="central" style="font-family:var(--font-sans-2);font-size:12px;font-weight:500;fill:#c084fc">Docling parser</text>
      </g>

      <path d="M270 136 L270 155 L130 155 L130 170" fill="none" stroke="var(--muted)" stroke-width="1" marker-end="url(#darrow)"/>
      <line x1="340" y1="136" x2="340" y2="170" stroke="var(--muted)" stroke-width="1" marker-end="url(#darrow)"/>
      <path d="M410 136 L410 155 L550 155 L550 170" fill="none" stroke="var(--muted)" stroke-width="1" marker-end="url(#darrow)"/>

      <g class="dnode" data-key="textchunks" style="cursor:pointer">
        <rect x="65" y="170" width="130" height="42" rx="6" fill="#0d3028" stroke="#1d9e75" stroke-width="0.5"/>
        <text x="130" y="191" text-anchor="middle" dominant-baseline="central" style="font-family:var(--font-sans-2);font-size:11px;font-weight:500;fill:#1d9e75">Text chunks</text>
      </g>

      <g class="dnode" data-key="figures" style="cursor:pointer">
        <rect x="275" y="170" width="130" height="42" rx="6" fill="#0d3028" stroke="#1d9e75" stroke-width="0.5"/>
        <text x="340" y="191" text-anchor="middle" dominant-baseline="central" style="font-family:var(--font-sans-2);font-size:11px;font-weight:500;fill:#1d9e75">Figures</text>
      </g>

      <g class="dnode" data-key="formulas" style="cursor:pointer">
        <rect x="485" y="170" width="130" height="42" rx="6" fill="#0d3028" stroke="#1d9e75" stroke-width="0.5"/>
        <text x="550" y="191" text-anchor="middle" dominant-baseline="central" style="font-family:var(--font-sans-2);font-size:11px;font-weight:500;fill:#1d9e75">Formulas</text>
      </g>

      <path d="M130 212 L130 225 L260 225" fill="none" stroke="var(--muted)" stroke-width="1" marker-end="url(#darrow)"/>
      <line x1="340" y1="212" x2="340" y2="225" stroke="var(--muted)" stroke-width="1" marker-end="url(#darrow)"/>
      <path d="M550 212 L550 225 L420 225" fill="none" stroke="var(--muted)" stroke-width="1" marker-end="url(#darrow)"/>

      <g class="dnode" data-key="qdrant" style="cursor:pointer">
        <rect x="210" y="225" width="260" height="42" rx="6" fill="#2e1a47" stroke="#c084fc" stroke-width="0.5"/>
        <text x="340" y="246" text-anchor="middle" dominant-baseline="central" style="font-family:var(--font-sans-2);font-size:12px;font-weight:500;fill:#c084fc">Nomic embeddings + Qdrant</text>
      </g>

      <line x1="40" y1="275" x2="640" y2="275" stroke="#303030" stroke-width="0.5" stroke-dasharray="4 4"/>

      <!-- ── RETRIEVAL ── -->
      <g class="dnode" data-key="query" style="cursor:pointer">
        <rect x="270" y="295" width="140" height="36" rx="6" fill="var(--surface)" stroke="var(--border)" stroke-width="0.5"/>
        <text x="340" y="313" text-anchor="middle" dominant-baseline="central" style="font-family:var(--font-sans-2);font-size:12px;font-weight:500;fill:var(--text)">User query</text>
      </g>

      <line x1="340" y1="331" x2="340" y2="350" stroke="var(--muted)" stroke-width="1" marker-end="url(#darrow)"/>

      <g class="dnode" data-key="router" style="cursor:pointer">
        <rect x="230" y="350" width="220" height="42" rx="6" fill="#2a1e08" stroke="#ba7517" stroke-width="0.5"/>
        <text x="340" y="371" text-anchor="middle" dominant-baseline="central" style="font-family:var(--font-sans-2);font-size:12px;font-weight:500;fill:#ba7517">Query router</text>
      </g>

      <path d="M260 392 L260 410 L150 410 L150 425" fill="none" stroke="var(--muted)" stroke-width="1" marker-end="url(#darrow)"/>
      <path d="M420 392 L420 410 L530 410 L530 425" fill="none" stroke="var(--muted)" stroke-width="1" marker-end="url(#darrow)"/>

      <g class="dnode" data-key="directlookup" style="cursor:pointer">
        <rect x="70" y="425" width="160" height="42" rx="6" fill="#2a1208" stroke="#993c1d" stroke-width="0.5"/>
        <text x="150" y="446" text-anchor="middle" dominant-baseline="central" style="font-family:var(--font-sans-2);font-size:11px;font-weight:500;fill:#d85a30">Direct lookup</text>
      </g>

      <g class="dnode" data-key="hybrid" style="cursor:pointer">
        <rect x="450" y="425" width="160" height="42" rx="6" fill="#2a1208" stroke="#993c1d" stroke-width="0.5"/>
        <text x="530" y="446" text-anchor="middle" dominant-baseline="central" style="font-family:var(--font-sans-2);font-size:11px;font-weight:500;fill:#d85a30">Hybrid retrieval</text>
      </g>

      <path d="M150 467 L150 485 L260 485" fill="none" stroke="var(--muted)" stroke-width="1" marker-end="url(#darrow)"/>
      <path d="M530 467 L530 485 L420 485" fill="none" stroke="var(--muted)" stroke-width="1" marker-end="url(#darrow)"/>

      <g class="dnode" data-key="enriched" style="cursor:pointer">
        <rect x="220" y="485" width="240" height="42" rx="6" fill="#2e1a47" stroke="#c084fc" stroke-width="0.5"/>
        <text x="340" y="506" text-anchor="middle" dominant-baseline="central" style="font-family:var(--font-sans-2);font-size:12px;font-weight:500;fill:#c084fc">Enriched context</text>
      </g>

      <line x1="40" y1="540" x2="640" y2="540" stroke="#303030" stroke-width="0.5" stroke-dasharray="4 4"/>

      <!-- ── GENERATION ── -->
      <line x1="340" y1="527" x2="340" y2="555" stroke="var(--muted)" stroke-width="1" marker-end="url(#darrow)"/>

      <g class="dnode" data-key="llm" style="cursor:pointer">
        <rect x="240" y="555" width="200" height="36" rx="6" fill="#2e1a47" stroke="#c084fc" stroke-width="0.5"/>
        <text x="340" y="573" text-anchor="middle" dominant-baseline="central" style="font-family:var(--font-sans-2);font-size:12px;font-weight:500;fill:#c084fc">Qwen2.5:7b</text>
      </g>

      <!-- Retry Loop -->
      <path d="M440 573 Q550 573 550 515 Q550 465 440 465" fill="none" stroke="#ba7517" stroke-width="0.8" stroke-dasharray="4 3" marker-end="url(#darrow)"/>
      <text x="555" y="490" style="font-family:var(--font-sans-2);font-size:9px;fill:var(--muted)">retry if low score</text>

      <line x1="340" y1="591" x2="340" y2="605" stroke="var(--muted)" stroke-width="1" marker-end="url(#darrow)"/>

      <g class="dnode" data-key="grounding" style="cursor:pointer">
        <rect x="230" y="605" width="220" height="36" rx="6" fill="#0d3028" stroke="#1d9e75" stroke-width="0.5"/>
        <text x="340" y="623" text-anchor="middle" dominant-baseline="central" style="font-family:var(--font-sans-2);font-size:12px;font-weight:500;fill:#1d9e75">Grounded answer + sources</text>
      </g>
    </svg>
  `
};

// ... keep buildDiagramHTML and initDiagram same as before ...
export function buildDiagramHTML(id, svgString) {
  return `
    <p class="diagram-hint">↗ click any node to learn more</p>
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
