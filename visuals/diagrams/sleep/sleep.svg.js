export const sleepDiagram = {
  tooltips: {
    signal_pre: { title: 'Raw Neural Signal', body: 'High-frequency EEG or DBS time-series data segmented into windows.' },
    cnn_stack: { title: 'CNN Feature Stack', body: 'Hierarchical layers (CNN → Feature → Extraction) that compress the signal into discrete temporal features.' },
    masking: { title: 'Temporal Masking', body: 'Tokens are randomly masked (75%). The model must learn to reconstruct the masked parts from the unmasked context.' },
    pe: { title: 'Positional Embedding', body: 'Injects sequence order into the tokens so the Transformer understands temporal flow.' },
    encoder: { title: 'Transformer Encoder', body: 'The "brain" of the model. Learns deep representations of sleep patterns via self-attention.' },
    decoder: { title: 'Transformer Decoder', body: 'Used only in pretraining. Takes unmasked features + mask placeholders to rebuild the original signal.' },
    mae_loss: { title: 'Reconstruction Loss', body: 'Calculated by comparing the reconstructed output against the original "Extraction" features.' },
    classifier: { title: 'Classification Head', body: 'Linear layers that map learned features to specific sleep stages (Wake, N1, N2, N3, REM).' },
  },

  svg: `
    <svg width="100%" viewBox="0 0 800 950" style="display:block; background:#18181b; font-family: sans-serif;">
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="#71717a" />
        </marker>
        <pattern id="maskPattern" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
          <line x1="0" y1="4" x2="4" y2="0" stroke="#52525b" stroke-width="1" />
        </pattern>
      </defs>

      <!-- ════════ LEGEND ════════ -->
      <g transform="translate(30, 60)">
        <text x="0" y="0" style="font-size:18px; font-weight:800; fill:#fff;">Legend</text>
        <line x1="0" y1="10" x2="100" y2="10" stroke="#3f3f46" stroke-width="1"/>
        
        <rect x="0" y="30" width="22" height="22" fill="#18181b" stroke="#fff" stroke-width="1.5" />
        <rect x="0" y="30" width="22" height="22" fill="url(#maskPattern)" />
        <text x="35" y="46" style="font-size:13px; fill:#a1a1aa;">Masked token</text>

        <rect x="0" y="65" width="22" height="22" fill="none" stroke="#fff" stroke-width="1.5" />
        <text x="35" y="81" style="font-size:13px; fill:#a1a1aa;">Unmasked token</text>

        <rect x="0" y="100" width="22" height="22" fill="#93c5fd" fill-opacity="0.3" stroke="#93c5fd" stroke-width="1.5" />
        <text x="35" y="116" style="font-size:13px; fill:#a1a1aa;">Decoder token</text>
        
        <circle cx="11" cy="150" r="11" fill="none" stroke="#fff" stroke-width="1.5"/>
        <text x="5" y="154" style="font-size:10px; fill:#fff; font-weight:bold;">PE</text>
      </g>

      <!-- ════════ PRETRAINING (LEFT) ════════ -->
      <g transform="translate(250, 40)">
        <text x="0" y="0" text-anchor="middle" style="font-size:14px; font-weight:bold; fill:#a1a1aa; letter-spacing:1px;">RAW NEURAL SIGNAL</text>
        <path d="M-90,50 L-70,30 L-50,60 L-30,10 L-10,75 L10,35 L30,60 L50,25 L70,55 L90,40" fill="none" stroke="#fff" stroke-width="2" />
        
        <!-- CNN STACK -->
        <g class="dnode" data-key="cnn_stack" style="cursor:pointer">
          <polygon points="-120,110 120,110 100,75 -100,75" fill="#27272a" stroke="#fff" stroke-width="1.5" />
          <text x="0" y="98" text-anchor="middle" style="font-size:12px; font-weight:bold; fill:#fff;">CNN</text>
          
          <polygon points="-100,150 100,150 85,115 -85,115" fill="#27272a" stroke="#fff" stroke-width="1.5" />
          <text x="0" y="138" text-anchor="middle" style="font-size:11px; fill:#fff;">Feature</text>
          
          <polygon points="-85,190 85,190 70,155 -70,155" fill="#27272a" stroke="#fff" stroke-width="1.5" />
          <text x="0" y="178" text-anchor="middle" style="font-size:11px; fill:#fff;">Extraction</text>
        </g>

        <!-- Feature Circles (Target for reconstruction) -->
        <g transform="translate(-60, 220)">
           <circle cx="0" cy="0" r="9" fill="none" stroke="#fff" stroke-width="1.5" />
           <circle cx="30" cy="0" r="9" fill="none" stroke="#fff" stroke-width="1.5" />
           <circle cx="60" cy="0" r="9" fill="none" stroke="#fff" stroke-width="1.5" />
           <circle cx="90" cy="0" r="9" fill="none" stroke="#fff" stroke-width="1.5" />
           <circle cx="120" cy="0" r="9" fill="none" stroke="#fff" stroke-width="1.5" />
        </g>

        <!-- Tokens & PE -->
        <g transform="translate(-60, 280)">
          <!-- Tokens -->
          <rect x="-11" y="0" width="22" height="22" fill="url(#maskPattern)" stroke="#fff" />
          <rect x="19" y="0" width="22" height="22" fill="none" stroke="#fff" />
          <rect x="49" y="0" width="22" height="22" fill="none" stroke="#fff" />
          <rect x="79" y="0" width="22" height="22" fill="url(#maskPattern)" stroke="#fff" />
          <rect x="109" y="0" width="22" height="22" fill="url(#maskPattern)" stroke="#fff" />
          
          <!-- PE connection logic from sketch -->
          <g transform="translate(-80, 10)">
            <circle cx="0" cy="0" r="14" fill="none" stroke="#fff" stroke-width="1.5" />
            <text x="0" y="4" text-anchor="middle" style="font-size:10px; fill:#fff; font-weight:bold;">PE</text>
            <path d="M14,0 L140,0" fill="none" stroke="#52525b" />
            <path d="M30,0 L30,40" fill="none" stroke="#52525b" marker-end="url(#arrow)" />
            <path d="M60,0 L60,40" fill="none" stroke="#52525b" marker-end="url(#arrow)" />
          </g>
        </g>

        <!-- Encoder -->
        <g class="dnode" data-key="encoder" transform="translate(-100, 380)">
          <rect x="0" y="0" width="200" height="90" fill="#27272a" stroke="#fff" stroke-width="2" />
          <line x1="0" y1="30" x2="200" y2="30" stroke="#52525b" />
          <line x1="0" y1="60" x2="200" y2="60" stroke="#52525b" />
          <text x="100" y="52" text-anchor="middle" style="font-size:13px; font-weight:bold; fill:#fff;">TRANSFORMER ENCODER</text>
        </g>

        <!-- Decoder Section -->
        <g transform="translate(-100, 560)">
          <g class="dnode" data-key="decoder">
            <rect x="0" y="0" width="200" height="60" fill="#27272a" stroke="#93c5fd" stroke-width="2" />
            <line x1="0" y1="30" x2="200" y2="30" stroke="#3b82f6" opacity="0.3"/>
            <text x="100" y="37" text-anchor="middle" style="font-size:12px; font-weight:bold; fill:#93c5fd;">TRANSFORMER DECODER</text>
          </g>
          
          <!-- Decoder Output Tokens -->
          <g transform="translate(40, 85)">
            <rect x="0" y="0" width="22" height="22" fill="#93c5fd" fill-opacity="0.3" stroke="#93c5fd" />
            <rect x="30" y="0" width="22" height="22" fill="#93c5fd" fill-opacity="0.3" stroke="#93c5fd" />
            <rect x="60" y="0" width="22" height="22" fill="#93c5fd" fill-opacity="0.3" stroke="#93c5fd" />
            <rect x="90" y="0" width="22" height="22" fill="#93c5fd" fill-opacity="0.3" stroke="#93c5fd" />
          </g>
        </g>

        <!-- Reconstruction Loss -->
        <g class="dnode" data-key="mae_loss" transform="translate(0, 750)">
          <ellipse cx="0" cy="0" rx="100" ry="25" fill="none" stroke="#fff" stroke-width="1.5" />
          <text x="0" y="5" text-anchor="middle" style="font-size:12px; fill:#fff;">Reconstruction Loss</text>
          <!-- Path from feature extraction to loss -->
          <path d="M70,180 C180,180 180,750 100,750" fill="none" stroke="#52525b" stroke-dasharray="5,3" marker-end="url(#arrow)" />
        </g>
      </g>

      <!-- ════════ FINETUNING (RIGHT) ════════ -->
      <g transform="translate(600, 40)">
        <text x="0" y="0" text-anchor="middle" style="font-size:14px; font-weight:bold; fill:#a1a1aa; letter-spacing:1px;">RAW NEURAL SIGNAL</text>
        <path d="M-90,50 L-70,30 L-50,60 L-30,10 L-10,75 L10,35 L30,60 L50,25 L70,55 L90,40" fill="none" stroke="#fff" stroke-width="2" />
        
        <g transform="translate(0,0)">
          <polygon points="-120,110 120,110 100,75 -100,75" fill="#27272a" stroke="#fff" stroke-width="1.5" />
          <polygon points="-100,150 100,150 85,115 -85,115" fill="#27272a" stroke="#fff" stroke-width="1.5" />
          <polygon points="-85,190 85,190 70,155 -70,155" fill="#27272a" stroke="#fff" stroke-width="1.5" />
        </g>

        <g transform="translate(-60, 220)">
           <circle cx="0" cy="0" r="9" fill="none" stroke="#fff" stroke-width="1.5" />
           <circle cx="30" cy="0" r="9" fill="none" stroke="#fff" stroke-width="1.5" />
           <circle cx="60" cy="0" r="9" fill="none" stroke="#fff" stroke-width="1.5" />
           <circle cx="90" cy="0" r="9" fill="none" stroke="#fff" stroke-width="1.5" />
           <circle cx="120" cy="0" r="9" fill="none" stroke="#fff" stroke-width="1.5" />
        </g>

        <!-- Unmasked Tokens in Finetuning -->
        <g transform="translate(-60, 280)">
          <rect x="-11" y="0" width="22" height="22" fill="none" stroke="#fff" />
          <rect x="19" y="0" width="22" height="22" fill="none" stroke="#fff" />
          <rect x="49" y="0" width="22" height="22" fill="none" stroke="#fff" />
          <rect x="79" y="0" width="22" height="22" fill="none" stroke="#fff" />
          <rect x="109" y="0" width="22" height="22" fill="none" stroke="#fff" />
          
          <circle cx="150" cy="11" r="14" fill="none" stroke="#fff" stroke-width="1.5" />
          <text x="150" y="15" text-anchor="middle" style="font-size:10px; fill:#fff; font-weight:bold;">PE</text>
        </g>

        <g transform="translate(-100, 380)">
          <rect x="0" y="0" width="200" height="90" fill="#27272a" stroke="#fff" stroke-width="2" />
          <line x1="0" y1="30" x2="200" y2="30" stroke="#52525b" />
          <line x1="0" y1="60" x2="200" y2="60" stroke="#52525b" />
          <text x="100" y="52" text-anchor="middle" style="font-size:13px; font-weight:bold; fill:#fff;">TRANSFORMER ENCODER</text>
        </g>

        <!-- Classifier Head -->
        <g transform="translate(-90, 520)">
           <rect x="0" y="0" width="180" height="35" rx="4" fill="#27272a" stroke="#fff" />
           <text x="90" y="22" text-anchor="middle" style="font-size:11px; fill:#fff;">Linear Projection</text>
           
           <path d="M90,35 L90,60" fill="none" stroke="#52525b" marker-end="url(#arrow)" />
           
           <rect x="0" y="60" width="180" height="35" rx="4" fill="#27272a" stroke="#fff" />
           <text x="90" y="82" text-anchor="middle" style="font-size:11px; fill:#fff;">Linear Classifier</text>
        </g>

        <g class="dnode" data-key="ce_loss" transform="translate(0, 750)">
          <ellipse cx="0" cy="0" rx="100" ry="25" fill="none" stroke="#fff" stroke-width="1.5" />
          <text x="0" y="5" text-anchor="middle" style="font-size:12px; fill:#fff;">Cross Entropy Loss</text>
        </g>
      </g>

      <!-- weight transfer arrow -->
      <path d="M350,425 L490,425" fill="none" stroke="#71717a" stroke-width="2" marker-end="url(#arrow)" />
      <text x="420" y="415" text-anchor="middle" style="font-size:12px; fill:#a1a1aa; font-weight:bold;">weight transfer</text>

    </svg>
  `
};
