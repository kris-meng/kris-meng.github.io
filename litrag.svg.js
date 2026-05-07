export const litragDiagram = {
  tooltips: {
    pdfs:         { title: 'PDF documents',             body: 'Any research paper dropped into the UI. Supports multi-paper ingestion with a per-file registry so already-processed PDFs are never re-ingested.' },
    docling:      { title: 'Docling parser',            body: 'Converts PDFs into structured documents, preserving section hierarchy, tables, figures, and formula blocks — not just raw text.' },
    textchunks:   { title: 'Text chunks',               body: 'Paragraphs grouped by section and chunked at ~1200 chars with 100-char overlap. Each chunk carries metadata: paper title, section name, page, and bounding box.' },
    figures:      { title: 'Figures',                   body: 'Each figure image is passed to Qwen2.5-VL with its caption. The vision model returns a detailed description that becomes the searchable text for that figure.' },
    formulas:     { title: 'Formulas',                  body: 'LaTeX is extracted via pix2tex OCR, then Qwen2.5 generates a 2–3 sentence plain-English summary with surrounding paragraph context.' },
    qdrant:       { title: 'Nomic embeddings + Qdrant', body: 'Each node is embedded with nomic-embed-text-v2-moe and stored in Qdrant with all metadata as payload fields for filtered retrieval.' },
    query:        { title: 'User query',                body: 'The raw question from the chat UI. Can reference a specific paper, multiple papers, or search across the full library.' },
    router:       { title: 'Query router',              body: 'Rewrites the query using conversation history, detects the query mode (comparison, gap, hypothesis, trend), and determines local vs global search scope.' },
    directlookup: { title: 'Direct lookup',             body: 'If the query mentions "Figure 3" or "Table 2", the system fetches that asset directly from Qdrant by ID — bypassing vector search entirely.' },
    hybrid:       { title: 'Hybrid retrieval',          body: 'Combines dense semantic search (top-k cosine similarity) with keyword retrieval scored by term frequency. Results are deduplicated and diversified across papers.' },
    enriched:     { title: 'Enriched context',          body: 'Retrieved chunks are cross-referenced with linked figures and tables. The context string includes the chunk, linked assets, and full provenance metadata.' },
    llm:          { title: 'Qwen2.5:7b',                body: 'Generates the final answer from enriched context. Constrained to ~300 words and prohibited from adding information not present in the retrieved context.' },
    grounding:    { title: 'Grounded answer + sources', body: 'Every answer is scored for groundedness and relevance. Scores below 0.5 trigger query expansion and a retry. Sources link back to the exact chunk, page, and paper.' },
  },

  svg: `
    <svg width="100%" viewBox="0 0 680 820" style="display:block;">
      <defs>
        <marker id="darrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </marker>
      </defs>

      <!-- Section labels -->
      <text x="40" y="38"  style="font-family:var(--font-sans-2);font-size:11px;fill:var(--muted);letter-spacing:0.1em;opacity:0.5">INGESTION</text>
      <text x="40" y="310" style="font-family:var(--font-sans-2);font-size:11px;fill:var(--muted);letter-spacing:0.1em;opacity:0.5">RETRIEVAL</text>
      <text x="40" y="560" style="font-family:var(--font-sans-2);font-size:11px;fill:var(--muted);letter-spacing:0.1em;opacity:0.5">GENERATION</text>

      <!-- ── INGESTION ── -->
      <g class="dnode" data-key="pdfs" style="cursor:pointer">
        <rect x="270" y="50" width="140" height="44" rx="8" fill="var(--surface)" stroke="var(--border)" stroke-width="0.5"/>
        <text x="340" y="72" text-anchor="middle" dominant-baseline="central" style="font-family:var(--font-sans-2);font-size:13px;font-weight:500;fill:var(--text)">PDF documents</text>
      </g>

      <line x1="340" y1="94" x2="340" y2="118" stroke="var(--muted)" stroke-width="1" marker-end="url(#darrow)"/>

      <g class="dnode" data-key="docling" style="cursor:pointer">
        <rect x="230" y="118" width="220" height="44" rx="8" fill="#2e1a47" stroke="#c084fc" stroke-width="0.5"/>
        <text x="340" y="140" text-anchor="middle" dominant-baseline="central" style="font-family:var(--font-sans-2);font-size:13px;font-weight:500;fill:#c084fc">Docling parser</text>
      </g>

      <path d="M260 162 L260 186 L130 186 L130 210" fill="none" stroke="var(--muted)" stroke-width="1" marker-end="url(#darrow)"/>
      <line x1="340" y1="162" x2="340" y2="210" stroke="var(--muted)" stroke-width="1" marker-end="url(#darrow)"/>
      <path d="M420 162 L420 186 L550 186 L550 210" fill="none" stroke="var(--muted)" stroke-width="1" marker-end="url(#darrow)"/>

      <g class="dnode" data-key="textchunks" style="cursor:pointer">
        <rect x="60" y="210" width="140" height="56" rx="8" fill="#0d3028" stroke="#1d9e75" stroke-width="0.5"/>
        <text x="130" y="230" text-anchor="middle" dominant-baseline="central" style="font-family:var(--font-sans-2);font-size:13px;font-weight:500;fill:#1d9e75">Text chunks</text>
        <text x="130" y="250" text-anchor="middle" dominant-baseline="central" style="font-family:var(--font-sans-2);font-size:11px;fill:#1d9e75;opacity:0.8">Section-aware</text>
      </g>

      <g class="dnode" data-key="figures" style="cursor:pointer">
        <rect x="270" y="210" width="140" height="56" rx="8" fill="#0d3028" stroke="#1d9e75" stroke-width="0.5"/>
        <text x="340" y="230" text-anchor="middle" dominant-baseline="central" style="font-family:var(--font-sans-2);font-size:13px;font-weight:500;fill:#1d9e75">Figures</text>
        <text x="340" y="250" text-anchor="middle" dominant-baseline="central" style="font-family:var(--font-sans-2);font-size:11px;fill:#1d9e75;opacity:0.8">Qwen2.5-VL vision</text>
      </g>

      <g class="dnode" data-key="formulas" style="cursor:pointer">
        <rect x="480" y="210" width="140" height="56" rx="8" fill="#0d3028" stroke="#1d9e75" stroke-width="0.5"/>
        <text x="550" y="230" text-anchor="middle" dominant-baseline="central" style="font-family:var(--font-sans-2);font-size:13px;font-weight:500;fill:#1d9e75">Formulas</text>
        <text x="550" y="250" text-anchor="middle" dominant-baseline="central" style="font-family:var(--font-sans-2);font-size:11px;fill:#1d9e75;opacity:0.8">pix2tex OCR</text>
      </g>

      <path d="M130 266 L130 286 L270 286" fill="none" stroke="var(--muted)" stroke-width="1" marker-end="url(#darrow)"/>
      <line x1="340" y1="266" x2="340" y2="286" stroke="var(--muted)" stroke-width="1" marker-end="url(#darrow)"/>
      <path d="M550 266 L550 286 L410 286" fill="none" stroke="var(--muted)" stroke-width="1" marker-end="url(#darrow)"/>

      <g class="dnode" data-key="qdrant" style="cursor:pointer">
        <rect x="200" y="286" width="280" height="56" rx="8" fill="#2e1a47" stroke="#c084fc" stroke-width="0.5"/>
        <text x="340" y="306" text-anchor="middle" dominant-baseline="central" style="font-family:var(--font-sans-2);font-size:13px;font-weight:500;fill:#c084fc">Nomic embeddings + Qdrant</text>
        <text x="340" y="324" text-anchor="middle" dominant-baseline="central" style="font-family:var(--font-sans-2);font-size:11px;fill:#c084fc;opacity:0.8">Vector index + registry</text>
      </g>

      <line x1="40" y1="360" x2="640" y2="360" stroke="#303030" stroke-width="0.5" stroke-dasharray="4 4"/>

      <!-- ── RETRIEVAL ── -->
      <g class="dnode" data-key="query" style="cursor:pointer">
        <rect x="270" y="375" width="140" height="44" rx="8" fill="var(--surface)" stroke="var(--border)" stroke-width="0.5"/>
        <text x="340" y="397" text-anchor="middle" dominant-baseline="central" style="font-family:var(--font-sans-2);font-size:13px;font-weight:500;fill:var(--text)">User query</text>
      </g>

      <line x1="340" y1="419" x2="340" y2="443" stroke="var(--muted)" stroke-width="1" marker-end="url(#darrow)"/>

      <g class="dnode" data-key="router" style="cursor:pointer">
        <rect x="220" y="443" width="240" height="56" rx="8" fill="#2a1e08" stroke="#ba7517" stroke-width="0.5"/>
        <text x="340" y="463" text-anchor="middle" dominant-baseline="central" style="font-family:var(--font-sans-2);font-size:13px;font-weight:500;fill:#ba7517">Query router</text>
        <text x="340" y="481" text-anchor="middle" dominant-baseline="central" style="font-family:var(--font-sans-2);font-size:11px;fill:#ba7517;opacity:0.8">Contextualize + detect scope</text>
      </g>

      <path d="M260 499 L260 524 L150 524 L150 548" fill="none" stroke="var(--muted)" stroke-width="1" marker-end="url(#darrow)"/>
      <path d="M420 499 L420 524 L530 524 L530 548" fill="none" stroke="var(--muted)" stroke-width="1" marker-end="url(#darrow)"/>

      <g class="dnode" data-key="directlookup" style="cursor:pointer">
        <rect x="60" y="548" width="180" height="56" rx="8" fill="#2a1208" stroke="#993c1d" stroke-width="0.5"/>
        <text x="150" y="568" text-anchor="middle" dominant-baseline="central" style="font-family:var(--font-sans-2);font-size:13px;font-weight:500;fill:#d85a30">Direct lookup</text>
        <text x="150" y="586" text-anchor="middle" dominant-baseline="central" style="font-family:var(--font-sans-2);font-size:11px;fill:#d85a30;opacity:0.8">Fig / table / equation</text>
      </g>

      <g class="dnode" data-key="hybrid" style="cursor:pointer">
        <rect x="440" y="548" width="180" height="56" rx="8" fill="#2a1208" stroke="#993c1d" stroke-width="0.5"/>
        <text x="530" y="568" text-anchor="middle" dominant-baseline="central" style="font-family:var(--font-sans-2);font-size:13px;font-weight:500;fill:#d85a30">Hybrid retrieval</text>
        <text x="530" y="586" text-anchor="middle" dominant-baseline="central" style="font-family:var(--font-sans-2);font-size:11px;fill:#d85a30;opacity:0.8">Semantic + keyword</text>
      </g>

      <path d="M150 604 L150 636 L270 636" fill="none" stroke="var(--muted)" stroke-width="1" marker-end="url(#darrow)"/>
      <path d="M530 604 L530 636 L410 636" fill="none" stroke="var(--muted)" stroke-width="1" marker-end="url(#darrow)"/>

      <g class="dnode" data-key="enriched" style="cursor:pointer">
        <rect x="200" y="636" width="280" height="56" rx="8" fill="#2e1a47" stroke="#c084fc" stroke-width="0.5"/>
        <text x="340" y="656" text-anchor="middle" dominant-baseline="central" style="font-family:var(--font-sans-2);font-size:13px;font-weight:500;fill:#c084fc">Enriched context</text>
        <text x="340" y="674" text-anchor="middle" dominant-baseline="central" style="font-family:var(--font-sans-2);font-size:11px;fill:#c084fc;opacity:0.8">Chunks + linked figures/tables</text>
      </g>

      <line x1="40" y1="706" x2="640" y2="706" stroke="#303030" stroke-width="0.5" stroke-dasharray="4 4"/>

      <!-- ── GENERATION ── -->
      <line x1="340" y1="692" x2="340" y2="718" stroke="var(--muted)" stroke-width="1" marker-end="url(#darrow)"/>

      <g class="dnode" data-key="llm" style="cursor:pointer">
        <rect x="220" y="718" width="240" height="56" rx="8" fill="#2e1a47" stroke="#c084fc" stroke-width="0.5"/>
        <text x="340" y="738" text-anchor="middle" dominant-baseline="central" style="font-family:var(--font-sans-2);font-size:13px;font-weight:500;fill:#c084fc">Qwen2.5:7b</text>
        <text x="340" y="756" text-anchor="middle" dominant-baseline="central" style="font-family:var(--font-sans-2);font-size:11px;fill:#c084fc;opacity:0.8">Answer generation</text>
      </g>

      <path d="M460 746 Q580 746 580 660 Q580 590 460 590" fill="none" stroke="#303030" stroke-width="0.8" stroke-dasharray="5 3" marker-end="url(#darrow)"/>
      <text x="596" y="673" text-anchor="middle" style="font-family:var(--font-sans-2);font-size:10px;fill:var(--muted)">retry if</text>
      <text x="596" y="686" text-anchor="middle" style="font-family:var(--font-sans-2);font-size:10px;fill:var(--muted)">low score</text>

      <line x1="340" y1="774" x2="340" y2="790" stroke="var(--muted)" stroke-width="1" marker-end="url(#darrow)"/>

      <g class="dnode" data-key="grounding" style="cursor:pointer">
        <rect x="215" y="790" width="250" height="44" rx="8" fill="#0d3028" stroke="#1d9e75" stroke-width="0.5"/>
        <text x="340" y="812" text-anchor="middle" dominant-baseline="central" style="font-family:var(--font-sans-2);font-size:13px;font-weight:500;fill:#1d9e75">Grounded answer + sources</text>
      </g>
    </svg>
  `
};
