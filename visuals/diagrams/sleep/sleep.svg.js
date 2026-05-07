export const sleepDiagram = {
  tooltips: {
    signal: { title: 'Raw Neural Signal', body: 'High-frequency EEG or DBS time-series data. The input is normalized and segmented into temporal windows.' },
    cnn: { title: 'CNN Feature Extraction', body: 'A 1D-Convolutional backbone that extracts local patterns and reduces the high-resolution signal into a sequence of feature tokens.' },
    masking: { title: 'Random Temporal Masking', body: '75% of tokens are randomly removed. The model only "sees" the remaining 25% (unmasked tokens) during encoding, forcing it to learn a global understanding of sleep patterns.' },
    pe: { title: 'Positional Embedding', body: 'Adds temporal context to the tokens so the Transformer knows the order of the signal segments.' },
    encoder: { title: 'Transformer Encoder', body: 'Processes the sparse set of unmasked tokens. Since it only handles a fraction of the data, it is highly efficient.' },
    decoder: { title: 'Transformer Decoder', body: 'Used only during pretraining. It takes the encoded tokens + dummy "mask tokens" to reconstruct the missing parts of the signal.' },
    mae_loss: { title: 'Reconstruction Loss (MSE)', body: 'The self-supervised objective. The model is penalized based on how accurately it reconstructs the original raw signal from the masked version.' },
    classifier: { title: 'Linear Classifier (Finetuning)', body: 'The pretraining decoder is discarded. A simple linear head is added to the encoder to map learned features to sleep stages (W, N1, N2, N3, REM).' },
    final_stage: { title: 'Sleep Stage Prediction', body: 'The final output: a 5-class classification for real-time sleep monitoring in Parkinson\'s patients.' },
  },

  svg: `
    <svg width="100%" viewBox="0 0 680 720" style="display:block;">
      <defs>
        <marker id="darrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </marker>
      </defs>

      <!-- ── INPUT STAGE ── -->
      <g class="dnode" data-key="signal" style="cursor:pointer">
        <path d="M280 60 L290 40 L300 70 L310 30 L320 80 L330 50 L340 65 L350 35 L360 75 L370 45 L380 60 L390 50 L400 60" fill="none" stroke="#a1a1aa" stroke-width="1.5" opacity="0.6"/>
        <text x="340" y="85" text-anchor="middle" style="font-family:var(--font-sans-2);font-size:11px;fill:var(--muted);font-weight:700">Raw Neural Signal</text>
      </g>

      <line x1="340" y1="95" x2="340" y2="120" stroke="#5f5e5a" stroke-width="1" marker-end="url(#darrow)"/>

      <!-- CNN Feature Extraction (Trapezoid) -->
      <g class="dnode" data-key="cnn" style="cursor:pointer">
        <polygon points="200,200 480,200 410,120 270,120" fill="#082a24" stroke="#1d9e75" stroke-width="1.5" opacity="0.8"/>
        <text x="340" y="165" text-anchor="middle" style="font-family:var(--font-sans-2);font-size:13px;font-weight:700;fill:#9fe1cb">CNN Feature Extraction</text>
      </g>

      <line x1="340" y1="200" x2="340" y2="230" stroke="#5f5e5a" stroke-width="1" marker-end="url(#darrow)"/>

      <!-- ── ENCODER STAGE ── -->
      <g class="dnode" data-key="masking" style="cursor:pointer">
        <!-- Tokens -->
        <rect x="250" y="230" width="30" height="30" rx="4" fill="#e38c83" stroke="#e38c83" stroke-width="1"/> <!-- Unmasked -->
        <rect x="290" y="230" width="30" height="30" rx="4" fill="#3a3a3a" stroke="#5f5e5a" stroke-width="1"/> <!-- Masked -->
        <rect x="330" y="230" width="30" height="30" rx="4" fill="#e38c83" stroke="#e38c83" stroke-width="1"/> <!-- Unmasked -->
        <rect x="370" y="230" width="30" height="30" rx="4" fill="#3a3a3a" stroke="#5f5e5a" stroke-width="1"/> <!-- Masked -->
        <rect x="410" y="230" width="30" height="30" rx="4" fill="#3a3a3a" stroke="#5f5e5a" stroke-width="1"/> <!-- Masked -->
        <text x="340" y="275" text-anchor="middle" style="font-family:var(--font-sans-2);font-size:11px;fill:var(--muted);font-weight:700">Random Temporal Masking</text>
      </g>

      <line x1="265" y1="275" x2="265" y2="310" stroke="#e38c83" stroke-width="1" marker-end="url(#darrow)"/>
      <line x1="345" y1="275" x2="345" y2="310" stroke="#e38c83" stroke-width="1" marker-end="url(#darrow)"/>

      <!-- Transformer Encoder -->
      <g class="dnode" data-key="encoder" style="cursor:pointer">
        <rect x="230" y="310" width="220" height="60" rx="8" fill="#221a36" stroke="#c084fc" stroke-width="1.5"/>
        <text x="340" y="345" text-anchor="middle" style="font-family:var(--font-sans-2);font-size:14px;font-weight:700;fill:#cecbf6">Transformer Encoder</text>
      </g>

      <!-- ── BRANCHING PATHS ── -->
      <!-- Pretraining Path (Left) -->
      <path d="M260 370 L260 410 L150 410 L150 440" fill="none" stroke="#5f5e5a" stroke-width="1" stroke-dasharray="4 4" marker-end="url(#darrow)"/>
      <text x="130" y="400" style="font-family:var(--font-sans-2);font-size:10px;fill:var(--muted);opacity:0.6">PRETRAINING</text>
      
      <g class="dnode" data-key="decoder" style="cursor:pointer">
        <rect x="60" y="440" width="180" height="50" rx="6" fill="#1a2236" stroke="#85b7eb" stroke-width="1"/>
        <text x="150" y="470" text-anchor="middle" dominant-baseline="central" style="font-family:var(--font-sans-2);font-size:12px;font-weight:700;fill:#b5d4f4">Transformer Decoder</text>
      </g>

      <line x1="150" y1="490" x2="150" y2="530" stroke="#5f5e5a" stroke-width="1" marker-end="url(#darrow)"/>

      <g class="dnode" data-key="mae_loss" style="cursor:pointer">
        <rect x="70" y="530" width="160" height="36" rx="18" fill="#2a1208" stroke="#993c1d" stroke-width="1"/>
        <text x="150" y="548" text-anchor="middle" dominant-baseline="central" style="font-family:var(--font-sans-2);font-size:11px;font-weight:700;fill:#f5c4b3">Reconstruction Loss</text>
      </g>

      <!-- Finetuning Path (Right) -->
      <path d="M420 370 L420 410 L530 410 L530 440" fill="none" stroke="#c084fc" stroke-width="1.5" marker-end="url(#darrow)"/>
      <text x="540" y="400" style="font-family:var(--font-sans-2);font-size:10px;fill:#c084fc;font-weight:700">FINETUNING</text>
      
      <g class="dnode" data-key="classifier" style="cursor:pointer">
        <rect x="440" y="440" width="180" height="50" rx="6" fill="#362208" stroke="#ba7517" stroke-width="1.5"/>
        <text x="530" y="470" text-anchor="middle" dominant-baseline="central" style="font-family:var(--font-sans-2);font-size:12px;font-weight:700;fill:#fac775">Linear Classifier</text>
      </g>

      <line x1="530" y1="490" x2="530" y2="530" stroke="#ba7517" stroke-width="1" marker-end="url(#darrow)"/>

      <g class="dnode" data-key="final_stage" style="cursor:pointer">
        <rect x="450" y="530" width="160" height="40" rx="6" fill="#082a24" stroke="#1d9e75" stroke-width="1.5"/>
        <text x="530" y="555" text-anchor="middle" dominant-baseline="central" style="font-family:var(--font-sans-2);font-size:12px;font-weight:700;fill:#9fe1cb">Sleep Stage Classification</text>
      </g>

      <line x1="40" y1="620" x2="640" y2="620" stroke="#303030" stroke-width="0.8" stroke-dasharray="4 4"/>
      <text x="340" y="650" text-anchor="middle" style="font-family:var(--font-sans-2);font-size:11px;fill:var(--muted);opacity:0.5">Dual-Stage Transfer Learning Framework</text>
    </svg>
  `
};
