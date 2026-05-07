export const sleepDiagram = {
  tooltips: {
    signal_pre: { title: 'Raw Neural Signal', body: 'High-frequency EEG/DBS time-series data. Segmented into temporal windows.' },
    cnn_stack: { title: 'Hierarchical Feature Extraction', body: 'A tiered 1D-CNN architecture (CNN → Feature → Extraction) that progressively compresses raw signals into high-level temporal features.' },
    circles: { title: 'Latent Representations', body: 'The compressed feature vectors before masking is applied.' },
    masking: { title: 'Random Masking (MAE)', body: '75-80% of tokens are masked (slashed boxes). Only unmasked tokens (empty boxes) are processed by the encoder.' },
    pe: { title: 'Positional Embedding (PE)', body: 'Adds temporal context so the Transformer understands the sequence order of the signals.' },
    encoder: { title: 'Transformer Encoder', body: 'Learns global dependencies. During finetuning, it uses pretrained weights to classify sleep stages.' },
    decoder: { title: 'Transformer Decoder', body: 'Used only in pretraining to reconstruct the original signal from the latent space.' },
    reconstruction_loss: { title: 'Reconstruction Loss', body: 'Calculated by comparing the reconstructed masked tokens to the original "circles" features.' },
    classifier_stack: { title: 'Classification Head', body: 'Converts encoder outputs into sleep stage probabilities (Wake, N1, N2, N3, REM).' },
    ce_loss: { title: 'Cross Entropy Loss', body: 'The supervised loss used to train the model for sleep stage accuracy.' },
  },

  svg: `
    <svg width="100%" viewBox="0 0 800 900" style="display:block; background:#000;">
      <defs>
        <marker id="arrowhead" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="#666" />
        </marker>
        <!-- Pattern for Masked Token -->
        <pattern id="maskedPattern" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
          <line x1="0" y1="4" x2="4" y2="0" stroke="#555" stroke-width="1" />
        </pattern>
      </defs>

      <!-- ════════ LEGEND ════════ -->
      <g transform="translate(20, 40)">
        <text x="0" y="0" style="font-family:sans-serif; font-size:16px; font-weight:bold; fill:#fff;">Legend</text>
        <rect x="0" y="15" width="20" height="20" fill="url(#maskedPattern)" stroke="#fff" stroke-width="1"/>
        <text x="30" y="30" style="font-family:sans-serif; font-size:12px; fill:#aaa;">Masked token</text>
        
        <rect x="0" y="45" width="20" height="20" fill="none" stroke="#fff" stroke-width="1"/>
        <text x="30" y="60" style="font-family:sans-serif; font-size:12px; fill:#aaa;">Unmasked token</text>
        
        <rect x="0" y="75" width="20" height="20" fill="#add8e6" fill-opacity="0.5" stroke="#add8e6" stroke-width="1"/>
        <text x="30" y="90" style="font-family:sans-serif; font-size:12px; fill:#aaa;">Decoder token</text>
      </g>

      <!-- ════════ PRETRAINING (LEFT) ════════ -->
      <g transform="translate(200, 20)">
        <text x="0" y="10" text-anchor="middle" style="font-family:sans-serif; font-size:14px; font-weight:bold; fill:#aaa; letter-spacing:1px;">RAW NEURAL SIGNAL</text>
        <path d="M-80,50 L-60,30 L-40,60 L-20,10 L0,70 L20,35 L40,50 L60,20 L80,55" fill="none" stroke="#fff" stroke-width="2" opacity="0.8" />
        
        <!-- CNN Stack -->
        <g class="dnode" data-key="cnn_stack">
           <polygon points="-110,120 110,120 90,80 -90,80" fill="#111" stroke="#fff" stroke-width="1.5" />
           <text x="0" y="105" text-anchor="middle" style="font-family:sans-serif; font-size:12px; font-weight:bold; fill:#fff;">CNN</text>
           
           <polygon points="-90,165 90,165 75,130 -75,130" fill="#111" stroke="#fff" stroke-width="1.5" />
           <text x="0" y="152" text-anchor="middle" style="font-family:sans-serif; font-size:12px; fill:#fff;">Feature</text>
           
           <polygon points="-75,210 75,210 60,175 -60,175" fill="#111" stroke="#fff" stroke-width="1.5" />
           <text x="0" y="198" text-anchor="middle" style="font-family:sans-serif; font-size:12px; fill:#fff;">Extraction</text>
        </g>

        <!-- Circles -->
        <g class="dnode" data-key="circles" transform="translate(-60, 230)">
          <circle cx="0" cy="0" r="8" fill="none" stroke="#fff" />
          <circle cx="30" cy="0" r="8" fill="none" stroke="#fff" />
          <circle cx="60" cy="0" r="8" fill="none" stroke="#fff" />
          <circle cx="90" cy="0" r="8" fill="none" stroke="#fff" />
          <circle cx="120" cy="0" r="8" fill="none" stroke="#fff" />
        </g>

        <!-- RAN Masking Box -->
        <rect x="-65" y="255" width="130" height="25" fill="none" stroke="#aaa" />
        <text x="0" y="272" text-anchor="middle" style="font-family:sans-serif; font-size:11px; fill:#aaa;">RAN (Random Masking)</text>

        <!-- Tokens (Masked/Unmasked) -->
        <g class="dnode" data-key="masking" transform="translate(-60, 290)">
          <rect x="-10" y="0" width="20" height="20" fill="url(#maskedPattern)" stroke="#fff" />
          <rect x="20" y="0" width="20" height="20" fill="none" stroke="#fff" />
          <rect x="50" y="0" width="20" height="20" fill="none" stroke="#fff" />
          <rect x="80" y="0" width="20" height="20" fill="url(#maskedPattern)" stroke="#fff" />
          <rect x="110" y="0" width="20" height="20" fill="url(#maskedPattern)" stroke="#fff" />
        </g>

        <!-- PE -->
        <circle cx="-120" cy="300" r="15" fill="none" stroke="#fff" class="dnode" data-key="pe" />
        <text x="-120" y="304" text-anchor="middle" style="font-family:sans-serif; font-size:10px; fill:#fff;">PE</text>
        <path d="M-105,300 L-70,300 L-70,330" fill="none" stroke="#666" marker-end="url(#arrowhead)" />

        <!-- Transformer Encoder -->
        <g class="dnode" data-key="encoder" transform="translate(-100, 380)">
          <rect x="0" y="0" width="200" height="80" fill="#111" stroke="#fff" stroke-width="2" />
          <line x1="0" y1="26" x2="200" y2="26" stroke="#444" />
          <line x1="0" y1="52" x2="200" y2="52" stroke="#444" />
          <text x="100" y="45" text-anchor="middle" style="font-family:sans-serif; font-size:13px; font-weight:bold; fill:#fff;">TRANSFORMER ENCODER</text>
        </g>

        <!-- Transformer Decoder -->
        <g class="dnode" data-key="decoder" transform="translate(-100, 560)">
          <rect x="0" y="0" width="200" height="60" fill="#111" stroke="#add8e6" stroke-width="2" />
          <line x1="0" y1="30" x2="200" y2="30" stroke="#334" />
          <text x="100" y="35" text-anchor="middle" style="font-family:sans-serif; font-size:13px; font-weight:bold; fill:#add8e6;">TRANSFORMER DECODER</text>
        </g>

        <!-- Decoder Tokens (Blue) -->
        <g transform="translate(-60, 640)">
          <rect x="-10" y="0" width="20" height="20" fill="#add8e6" fill-opacity="0.4" stroke="#add8e6" />
          <rect x="20" y="0" width="20" height="20" fill="#add8e6" fill-opacity="0.4" stroke="#add8e6" />
          <rect x="50" y="0" width="20" height="20" fill="#add8e6" fill-opacity="0.4" stroke="#add8e6" />
          <rect x="80" y="0" width="20" height="20" fill="#add8e6" fill-opacity="0.4" stroke="#add8e6" />
          <rect x="110" y="0" width="20" height="20" fill="#add8e6" fill-opacity="0.4" stroke="#add8e6" />
        </g>

        <!-- Reconstruction Loss -->
        <g class="dnode" data-key="reconstruction_loss">
          <ellipse cx="0" cy="730" rx="100" ry="25" fill="none" stroke="#fff" />
          <text x="0" y="735" text-anchor="middle" style="font-family:sans-serif; font-size:13px; fill:#fff;">Reconstruction Loss</text>
          <!-- Arrow from circle row to loss -->
          <path d="M70,230 L150,230 L150,730 L100,730" fill="none" stroke="#666" stroke-dasharray="4 2" marker-end="url(#arrowhead)" />
        </g>
      </g>

      <!-- ════════ FINETUNING (RIGHT) ════════ -->
      <g transform="translate(580, 20)">
        <text x="0" y="10" text-anchor="middle" style="font-family:sans-serif; font-size:14px; font-weight:bold; fill:#aaa; letter-spacing:1px;">RAW NEURAL SIGNAL</text>
        <path d="M-80,50 L-60,30 L-40,60 L-20,10 L0,70 L20,35 L40,50 L60,20 L80,55" fill="none" stroke="#fff" stroke-width="2" opacity="0.8" />
        
        <!-- CNN Stack -->
        <g transform="translate(0,0)">
           <polygon points="-110,120 110,120 90,80 -90,80" fill="#111" stroke="#fff" stroke-width="1.5" />
           <polygon points="-90,165 90,165 75,130 -75,130" fill="#111" stroke="#fff" stroke-width="1.5" />
           <polygon points="-75,210 75,210 60,175 -60,175" fill="#111" stroke="#fff" stroke-width="1.5" />
        </g>

        <!-- Circles -->
        <g transform="translate(-60, 230)">
          <circle cx="0" cy="0" r="8" fill="none" stroke="#fff" />
          <circle cx="30" cy="0" r="8" fill="none" stroke="#fff" />
          <circle cx="60" cy="0" r="8" fill="none" stroke="#fff" />
          <circle cx="90" cy="0" r="8" fill="none" stroke="#fff" />
          <circle cx="120" cy="0" r="8" fill="none" stroke="#fff" />
        </g>

        <!-- All Unmasked Tokens -->
        <g transform="translate(-60, 290)">
          <rect x="-10" y="0" width="20" height="20" fill="none" stroke="#fff" />
          <rect x="20" y="0" width="20" height="20" fill="none" stroke="#fff" />
          <rect x="50" y="0" width="20" height="20" fill="none" stroke="#fff" />
          <rect x="80" y="0" width="20" height="20" fill="none" stroke="#fff" />
          <rect x="110" y="0" width="20" height="20" fill="none" stroke="#fff" />
        </g>

        <!-- PE -->
        <circle cx="80" cy="300" r="15" fill="none" stroke="#fff" />
        <text x="80" y="304" text-anchor="middle" style="font-family:sans-serif; font-size:10px; fill:#fff;">PE</text>

        <!-- Transformer Encoder -->
        <g transform="translate(-100, 380)">
          <rect x="0" y="0" width="200" height="80" fill="#111" stroke="#fff" stroke-width="2" />
          <line x1="0" y1="26" x2="200" y2="26" stroke="#444" />
          <line x1="0" y1="52" x2="200" y2="52" stroke="#444" />
          <text x="100" y="45" text-anchor="middle" style="font-family:sans-serif; font-size:13px; font-weight:bold; fill:#fff;">TRANSFORMER ENCODER</text>
        </g>

        <!-- Classifier Head -->
        <g class="dnode" data-key="classifier_stack" transform="translate(-100, 500)">
          <rect x="10" y="0" width="180" height="30" rx="4" fill="#111" stroke="#fff" />
          <text x="100" y="20" text-anchor="middle" style="font-family:sans-serif; font-size:12px; fill:#fff;">Linear Projection</text>
          
          <path d="M100,30 L100,50" fill="none" stroke="#666" marker-end="url(#arrowhead)" />
          
          <rect x="10" y="50" width="180" height="30" rx="4" fill="#111" stroke="#fff" />
          <text x="100" y="70" text-anchor="middle" style="font-family:sans-serif; font-size:12px; fill:#fff;">Linear Classifier</text>
        </g>

        <!-- CE Loss -->
        <g class="dnode" data-key="ce_loss">
          <ellipse cx="0" cy="650" rx="100" ry="25" fill="none" stroke="#fff" />
          <text x="0" y="655" text-anchor="middle" style="font-family:sans-serif; font-size:13px; fill:#fff;">Cross Entropy Loss</text>
        </g>
      </g>

      <!-- ════════ WEIGHT TRANSFER ════════ -->
      <path d="M300,420 L480,420" fill="none" stroke="#aaa" stroke-width="1.5" marker-end="url(#arrowhead)" />
      <text x="390" y="405" text-anchor="middle" style="font-family:sans-serif; font-size:12px; font-weight:bold; fill:#aaa;">weight transfer</text>

    </svg>
  `
};
