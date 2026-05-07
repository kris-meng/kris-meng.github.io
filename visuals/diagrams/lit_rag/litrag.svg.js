export const litragDiagram = {
  tooltips: {
    pdfs: { title: 'PDF documents', body: 'Any research paper dropped into the UI. Supports multi-paper ingestion with a per-file registry.' },
    docling: { title: 'Docling parser', body: 'Converts PDFs into structured documents, preserving section hierarchy, tables, and formulas.' },
    textchunks: { title: 'Text chunks', body: 'Paragraphs grouped by section and chunked with overlap. Carries metadata like page and bounding boxes.' },
    figures: { title: 'Figures', body: 'Passed to Qwen2.5-VL to generate searchable text descriptions from images and captions.' },
    formulas: { title: 'Formulas', body: 'LaTeX extracted via pix2tex OCR, summarized into plain-English by Qwen2.5.' },
    qdrant: { title: 'Nomic + Qdrant', body: 'Vectors stored in Qdrant with all structural metadata for filtered retrieval.' },
    query: { title: 'User query', body: 'Natural language question. Can be targeted at specific papers or the whole library.' },
    router: { title: 'Query router', body: 'Detects intent (comparison, trend, etc.) and determines local vs global search scope. Considers recent conversation history while contextualizing.' },
    directlookup: { title: 'Direct lookup', body: 'Bypasses vector search to fetch specific Figures/Tables by ID if mentioned.' },
    hybrid: { title: 'Hybrid retrieval', body: 'Combines dense semantic search with keyword BM25 scoring for accuracy.' },
    enriched: { title: 'Enriched context', body: 'Retrieved text chunks are cross-referenced with their associated figures and tables.' },
    llm: { title: 'Qwen2.5:7b', body: 'Generates final answer constrained strictly to the provided research context.' },
    grounding: { title: 'Grounded answer', body: 'Answer is scored for faithfulness. Sources link directly to PDF bounding boxes.' },
  },

  svg: `
    <svg width="100%" viewBox="0 0 680 930" style="display:block;">
      <defs>
        <marker id="darrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </marker>
      </defs>

      <!-- ── INGESTION ── -->
      <text x="30" y="30" style="font-family:var(--font-sans-2);font-size:11px;fill:var(--muted);letter-spacing:0.1em;opacity:0.5;font-weight:700">INGESTION</text>
      
      <g class="dnode" data-key="pdfs" style="cursor:pointer">
        <rect x="270" y="50" width="140" height="46" rx="8" fill="#2a2a2a" stroke="#5f5e5a" stroke-width="1.5"/>
        <text x="340" y="73" text-anchor="middle" dominant-baseline="central" style="font-family:var(--font-sans-2);font-size:13px;font-weight:700;fill:#d3d1c7">PDF documents</text>
      </g>

      <line x1="340" y1="96" x2="340" y2="125" stroke="#5f5e5a" stroke-width="1.5" marker-end="url(#darrow)"/>

      <g class="dnode" data-key="docling" style="cursor:pointer">
        <rect x="230" y="125" width="220" height="46" rx="8" fill="#221a36" stroke="#c084fc" stroke-width="1.5"/>
        <text x="340" y="148" text-anchor="middle" dominant-baseline="central" style="font-family:var(--font-sans-2);font-size:14px;font-weight:700;fill:#cecbf6">Docling parser</text>
      </g>

      <path d="M260 171 L260 190 L130 190 L130 210" fill="none" stroke="#5f5e5a" stroke-width="1.5" marker-end="url(#darrow)"/>
      <line x1="340" y1="171" x2="340" y2="210" stroke="#5f5e5a" stroke-width="1.5" marker-end="url(#darrow)"/>
      <path d="M420 171 L420 190 L550 190 L550 210" fill="none" stroke="#5f5e5a" stroke-width="1.5" marker-end="url(#darrow)"/>

      <g class="dnode" data-key="textchunks" style="cursor:pointer">
        <rect x="65" y="210" width="130" height="58" rx="8" fill="#082a24" stroke="#1d9e75" stroke-width="1.5"/>
        <text x="130" y="231" text-anchor="middle" style="font-family:var(--font-sans-2);font-size:13px;font-weight:700;fill:#9fe1cb">Text chunks</text>
        <text x="130" y="250" text-anchor="middle" style="font-family:var(--font-sans-2);font-size:11px;fill:#1d9e75;opacity:0.9">Section-aware</text>
      </g>

      <g class="dnode" data-key="figures" style="cursor:pointer">
        <rect x="275" y="210" width="130" height="58" rx="8" fill="#082a24" stroke="#1d9e75" stroke-width="1.5"/>
        <text x="340" y="231" text-anchor="middle" style="font-family:var(--font-sans-2);font-size:13px;font-weight:700;fill:#9fe1cb">Figures</text>
        <text x="340" y="250" text-anchor="middle" style="font-family:var(--font-sans-2);font-size:11px;fill:#1d9e75;opacity:0.9">Qwen2.5-VL vision</text>
      </g>

      <g class="dnode" data-key="formulas" style="cursor:pointer">
        <rect x="485" y="210" width="130" height="58" rx="8" fill="#082a24" stroke="#1d9e75" stroke-width="1.5"/>
        <text x="550" y="231" text-anchor="middle" style="font-family:var(--font-sans-2);font-size:13px;font-weight:700;fill:#9fe1cb">Formulas</text>
        <text x="550" y="250" text-anchor="middle" style="font-family:var(--font-sans-2);font-size:11px;fill:#1d9e75;opacity:0.9">pix2tex OCR</text>
      </g>

      <path d="M130 268 L130 285 L260 285" fill="none" stroke="#5f5e5a" stroke-width="1.5" marker-end="url(#darrow)"/>
      <line x1="340" y1="268" x2="340" y2="285" stroke="#5f5e5a" stroke-width="1.5" marker-end="url(#darrow)"/>
      <path d="M550 268 L550 285 L420 285" fill="none" stroke="#5f5e5a" stroke-width="1.5" marker-end="url(#darrow)"/>

      <g class="dnode" data-key="qdrant" style="cursor:pointer">
        <rect x="200" y="285" width="280" height="58" rx="8" fill="#221a36" stroke="#c084fc" stroke-width="1.5"/>
        <text x="340" y="306" text-anchor="middle" style="font-family:var(--font-sans-2);font-size:13px;font-weight:700;fill:#cecbf6">Nomic embeddings + Qdrant</text>
        <text x="340" y="325" text-anchor="middle" style="font-family:var(--font-sans-2);font-size:11px;fill:#afa9ec;opacity:0.9">Vector index + registry</text>
      </g>

      <line x1="40" y1="365" x2="640" y2="365" stroke="#303030" stroke-width="0.8" stroke-dasharray="4 4"/>

      <!-- ── RETRIEVAL ── -->
      <text x="30" y="390" style="font-family:var(--font-sans-2);font-size:11px;fill:var(--muted);letter-spacing:0.1em;opacity:0.5;font-weight:700">RETRIEVAL</text>
      
      <g class="dnode" data-key="query" style="cursor:pointer">
        <rect x="270" y="405" width="140" height="46" rx="8" fill="#2a2a2a" stroke="#5f5e5a" stroke-width="1.5"/>
        <text x="340" y="428" text-anchor="middle" dominant-baseline="central" style="font-family:var(--font-sans-2);font-size:13px;font-weight:700;fill:#d3d1c7">User query</text>
      </g>

      <line x1="340" y1="451" x2="340" y2="480" stroke="#5f5e5a" stroke-width="1.5" marker-end="url(#darrow)"/>

      <g class="dnode" data-key="router" style="cursor:pointer">
        <rect x="220" y="480" width="240" height="58" rx="8" fill="#362208" stroke="#ba7517" stroke-width="1.5"/>
        <text x="340" y="501" text-anchor="middle" style="font-family:var(--font-sans-2);font-size:14px;font-weight:700;fill:#fac775">Query router</text>
        <text x="340" y="520" text-anchor="middle" style="font-family:var(--font-sans-2);font-size:11px;fill:#ba7517;opacity:0.9">Contextualize + detect scope</text>
      </g>

      <path d="M260 538 L260 555 L150 555 L150 575" fill="none" stroke="#5f5e5a" stroke-width="1.5" marker-end="url(#darrow)"/>
      <path d="M420 538 L420 555 L530 555 L530 575" fill="none" stroke="#5f5e5a" stroke-width="1.5" marker-end="url(#darrow)"/>

      <g class="dnode" data-key="directlookup" style="cursor:pointer">
        <rect x="60" y="575" width="180" height="58" rx="8" fill="#3b1208" stroke="#993c1d" stroke-width="1.5"/>
        <text x="150" y="596" text-anchor="middle" style="font-family:var(--font-sans-2);font-size:13px;font-weight:700;fill:#f5c4b3">Direct lookup</text>
        <text x="150" y="615" text-anchor="middle" style="font-family:var(--font-sans-2);font-size:11px;fill:#993c1d;opacity:0.9">Fig / table / equation</text>
      </g>

      <g class="dnode" data-key="hybrid" style="cursor:pointer">
        <rect x="440" y="575" width="180" height="58" rx="8" fill="#3b1208" stroke="#993c1d" stroke-width="1.5"/>
        <text x="530" y="596" text-anchor="middle" style="font-family:var(--font-sans-2);font-size:13px;font-weight:700;fill:#f5c4b3">Hybrid retrieval</text>
        <text x="530" y="615" text-anchor="middle" style="font-family:var(--font-sans-2);font-size:11px;fill:#993c1d;opacity:0.9">Semantic + keyword</text>
      </g>

      <path d="M150 633 L150 655 L260 655" fill="none" stroke="#5f5e5a" stroke-width="1.5" marker-end="url(#darrow)"/>
      <path d="M530 633 L530 655 L420 655" fill="none" stroke="#5f5e5a" stroke-width="1.5" marker-end="url(#darrow)"/>

      <g class="dnode" data-key="enriched" style="cursor:pointer">
        <rect x="200" y="655" width="280" height="58" rx="8" fill="#221a36" stroke="#c084fc" stroke-width="1.5"/>
        <text x="340" y="676" text-anchor="middle" style="font-family:var(--font-sans-2);font-size:13px;font-weight:700;fill:#cecbf6">Enriched context</text>
        <text x="340" y="695" text-anchor="middle" style="font-family:var(--font-sans-2);font-size:11px;fill:#afa9ec;opacity:0.9">Chunks + linked figures/tables</text>
      </g>

      <line x1="40" y1="735" x2="640" y2="735" stroke="#303030" stroke-width="0.8" stroke-dasharray="4 4"/>

      <!-- ── GENERATION ── -->
      <text x="30" y="760" style="font-family:var(--font-sans-2);font-size:11px;fill:var(--muted);letter-spacing:0.1em;opacity:0.5;font-weight:700">GENERATION</text>
      
      <line x1="340" y1="713" x2="340" y2="775" stroke="#5f5e5a" stroke-width="1.5" marker-end="url(#darrow)"/>

      <g class="dnode" data-key="llm" style="cursor:pointer">
        <rect x="220" y="775" width="240" height="58" rx="8" fill="#221a36" stroke="#c084fc" stroke-width="1.5"/>
        <text x="340" y="796" text-anchor="middle" style="font-family:var(--font-sans-2);font-size:14px;font-weight:700;fill:#cecbf6">Qwen2.5:7b</text>
        <text x="340" y="815" text-anchor="middle" style="font-family:var(--font-sans-2);font-size:11px;fill:#afa9ec;opacity:0.9">Answer generation</text>
      </g>

      <!-- Retry Loop -->
      <path d="M460 804 C580 804, 580 676, 440 676" fill="none" stroke="#ba7517" stroke-width="1" stroke-dasharray="5 3" marker-end="url(#darrow)"/>
      <text x="596" y="738" text-anchor="middle" style="font-family:var(--font-sans-2);font-size:10px;fill:var(--muted)">retry if low score</text>

      <line x1="340" y1="833" x2="340" y2="865" stroke="#5f5e5a" stroke-width="1.5" marker-end="url(#darrow)"/>

      <g class="dnode" data-key="grounding" style="cursor:pointer">
        <rect x="215" y="865" width="250" height="46" rx="8" fill="#082a24" stroke="#1d9e75" stroke-width="1.5"/>
        <text x="340" y="888" text-anchor="middle" dominant-baseline="central" style="font-family:var(--font-sans-2);font-size:13px;font-weight:700;fill:#9fe1cb">Grounded answer + sources</text>
      </g>
    </svg>
  `
};
