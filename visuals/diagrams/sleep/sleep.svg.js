export const sleepDiagram = {
  tooltips: {
    signal_pre: {
      title: 'Raw Neural Signal',
      body: 'High-frequency EEG or DBS time-series data segmented into windows.',
    },
    cnn_stack: {
      title: 'CNN Feature Stack',
      body: 'Hierarchical CNN layers compress the neural waveform into temporal feature tokens.',
    },
    masking: {
      title: 'Temporal Masking',
      body: 'Randomly masks ~75% of tokens so the encoder learns contextual representations.',
    },
    pe: {
      title: 'Positional Embedding',
      body: 'Adds temporal ordering information into the token sequence.',
    },
    encoder: {
      title: 'Transformer Encoder',
      body: 'Learns global temporal relationships using self-attention.',
    },
    decoder: {
      title: 'Transformer Decoder',
      body: 'Used during MAE pretraining to reconstruct masked signal features.',
    },
    mae_loss: {
      title: 'Reconstruction Loss',
      body: 'Measures similarity between reconstructed and original extracted features.',
    },
    classifier: {
      title: 'Classification Head',
      body: 'Maps learned representations into sleep-stage predictions.',
    },
    ce_loss: {
      title: 'Cross Entropy Loss',
      body: 'Optimizes supervised sleep-stage classification.',
    },
  },

  svg: `
  <svg width="100%" viewBox="0 0 1400 980" style="display:block; font-family:'Inter',sans-serif;">
    
    <defs>
      <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5"
        markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0,0 L10,5 L0,10 Z" fill="#2f2f2f"/>
      </marker>

      <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000" flood-opacity="0.12"/>
      </filter>

      <pattern id="maskPattern" x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse">
        <rect width="6" height="6" fill="#fca5a5"/>
        <path d="M0,6 L6,0" stroke="#ef4444" stroke-width="1"/>
      </pattern>
    </defs>

    <!-- ================= LEGEND ================= -->
    <g transform="translate(40,70)">
      
      <text x="0" y="0"
        style="font-size:28px;font-weight:700;fill:#111;">
        Legend
      </text>

      <line x1="0" y1="15" x2="130" y2="15"
        stroke="#555" stroke-width="2"/>

      <!-- masked -->
      <rect x="0" y="45" width="28" height="28"
        rx="4"
        fill="url(#maskPattern)"
        stroke="#111"
        stroke-width="2"/>

      <text x="42" y="65"
        style="font-size:18px;fill:#222;">
        Masked token
      </text>

      <!-- unmasked -->
      <rect x="0" y="95" width="28" height="28"
        rx="4"
        fill="#fef9c3"
        stroke="#111"
        stroke-width="2"/>

      <text x="42" y="115"
        style="font-size:18px;fill:#222;">
        Unmasked token
      </text>

      <!-- decoder -->
      <rect x="0" y="145" width="28" height="28"
        rx="4"
        fill="#dbeafe"
        stroke="#3b82f6"
        stroke-width="2"/>

      <text x="42" y="165"
        style="font-size:18px;fill:#222;">
        Decoder token
      </text>

      <!-- PE -->
      <circle cx="14" cy="220" r="16"
        fill="white"
        stroke="#111"
        stroke-width="2"/>

      <text x="14" y="226"
        text-anchor="middle"
        style="font-size:12px;font-weight:700;">
        PE
      </text>

    </g>

    <!-- ================= LEFT PRETRAIN ================= -->
    <g transform="translate(430,50)">

      <!-- signal -->
      <text x="0" y="0"
        text-anchor="middle"
        style="font-size:22px;font-weight:700;fill:#111;">
        RAW NEURAL SIGNAL
      </text>

      <path d="
        M-120,55
        C-95,0 -80,80 -55,30
        S-10,100 15,45
        S70,10 95,55
        S120,15 145,40"
        fill="none"
        stroke="#111"
        stroke-width="4"
        stroke-linecap="round"/>

      <line x1="-150" y1="85" x2="160" y2="85"
        stroke="#111"
        stroke-width="3"/>

      <!-- CNN STACK -->
      <g class="dnode" data-key="cnn_stack"
        style="cursor:pointer;"
        filter="url(#softShadow)">

        <polygon points="-140,160 140,160 110,100 -110,100"
          fill="#dbeafe"
          stroke="#111"
          stroke-width="3"/>

        <text x="0" y="138"
          text-anchor="middle"
          style="font-size:28px;font-weight:700;">
          CNN
        </text>

        <polygon points="-110,225 110,225 90,175 -90,175"
          fill="#fef9c3"
          stroke="#111"
          stroke-width="3"/>

        <text x="0" y="208"
          text-anchor="middle"
          style="font-size:22px;font-weight:600;">
          Feature
        </text>

        <polygon points="-85,280 85,280 68,238 -68,238"
          fill="#fff"
          stroke="#111"
          stroke-width="3"/>

        <text x="0" y="265"
          text-anchor="middle"
          style="font-size:18px;font-weight:600;">
          Extraction
        </text>
      </g>

      <!-- circles -->
      <g transform="translate(-80,330)">
        <circle cx="0" cy="0" r="12" fill="#fff" stroke="#111" stroke-width="3"/>
        <circle cx="40" cy="0" r="12" fill="#fff" stroke="#111" stroke-width="3"/>
        <circle cx="80" cy="0" r="12" fill="#fff" stroke="#111" stroke-width="3"/>
        <circle cx="120" cy="0" r="12" fill="#fff" stroke="#111" stroke-width="3"/>
        <circle cx="160" cy="0" r="12" fill="#fff" stroke="#111" stroke-width="3"/>
      </g>

      <!-- tokens -->
      <g class="dnode" data-key="masking"
        transform="translate(-80,390)"
        style="cursor:pointer;">

        <rect x="-12" y="0" width="24" height="24"
          fill="url(#maskPattern)"
          stroke="#111"
          stroke-width="2"/>

        <rect x="28" y="0" width="24" height="24"
          fill="#fef9c3"
          stroke="#111"
          stroke-width="2"/>

        <rect x="68" y="0" width="24" height="24"
          fill="#fef9c3"
          stroke="#111"
          stroke-width="2"/>

        <rect x="108" y="0" width="24" height="24"
          fill="url(#maskPattern)"
          stroke="#111"
          stroke-width="2"/>

        <rect x="148" y="0" width="24" height="24"
          fill="url(#maskPattern)"
          stroke="#111"
          stroke-width="2"/>
      </g>

      <!-- PE -->
      <g class="dnode" data-key="pe"
        transform="translate(-200,400)"
        style="cursor:pointer;">

        <circle cx="0" cy="0" r="18"
          fill="#fff"
          stroke="#111"
          stroke-width="3"/>

        <text x="0" y="5"
          text-anchor="middle"
          style="font-size:14px;font-weight:700;">
          PE
        </text>

        <path d="M18,0 L140,0"
          fill="none"
          stroke="#222"
          stroke-width="2"/>

        <path d="M60,0 L60,48"
          fill="none"
          stroke="#222"
          stroke-width="2"
          marker-end="url(#arrow)"/>

        <path d="M100,0 L100,48"
          fill="none"
          stroke="#222"
          stroke-width="2"
          marker-end="url(#arrow)"/>
      </g>

      <!-- encoder -->
      <g class="dnode" data-key="encoder"
        transform="translate(-120,500)"
        style="cursor:pointer;"
        filter="url(#softShadow)">

        <rect x="0" y="0"
          width="240"
          height="100"
          rx="8"
          fill="#fde68a"
          stroke="#111"
          stroke-width="3"/>

        <line x1="0" y1="33" x2="240" y2="33"
          stroke="#111" opacity="0.2"/>

        <line x1="0" y1="66" x2="240" y2="66"
          stroke="#111" opacity="0.2"/>

        <text x="120" y="58"
          text-anchor="middle"
          style="font-size:24px;font-weight:700;">
          TRANSFORMER
        </text>

        <text x="120" y="84"
          text-anchor="middle"
          style="font-size:24px;font-weight:700;">
          ENCODER
        </text>
      </g>

      <!-- arrows -->
      <path d="M0,415 L0,500"
        fill="none"
        stroke="#111"
        stroke-width="3"
        marker-end="url(#arrow)"/>

      <!-- decoder -->
      <g class="dnode" data-key="decoder"
        transform="translate(-120,690)"
        style="cursor:pointer;"
        filter="url(#softShadow)">

        <rect x="0" y="0"
          width="240"
          height="100"
          rx="8"
          fill="#fde68a"
          stroke="#111"
          stroke-width="3"/>

        <text x="120" y="55"
          text-anchor="middle"
          style="font-size:22px;font-weight:700;">
          TRANSFORMER
        </text>

        <text x="120" y="82"
          text-anchor="middle"
          style="font-size:22px;font-weight:700;">
          DECODER
        </text>
      </g>

      <!-- decoder tokens -->
      <g transform="translate(-100,820)">
        <rect x="0" y="0" width="26" height="26"
          rx="4"
          fill="#dbeafe"
          stroke="#3b82f6"
          stroke-width="2"/>

        <rect x="40" y="0" width="26" height="26"
          rx="4"
          fill="#dbeafe"
          stroke="#3b82f6"
          stroke-width="2"/>

        <rect x="80" y="0" width="26" height="26"
          rx="4"
          fill="#dbeafe"
          stroke="#3b82f6"
          stroke-width="2"/>

        <rect x="120" y="0" width="26" height="26"
          rx="4"
          fill="#dbeafe"
          stroke="#3b82f6"
          stroke-width="2"/>
      </g>

      <!-- reconstruction loss -->
      <g class="dnode"
        data-key="mae_loss"
        transform="translate(0,920)"
        style="cursor:pointer;">

        <ellipse cx="0" cy="0"
          rx="120"
          ry="34"
          fill="#fff"
          stroke="#111"
          stroke-width="3"/>

        <text x="0" y="8"
          text-anchor="middle"
          style="font-size:22px;font-weight:600;">
          Reconstruction Loss
        </text>
      </g>

    </g>

    <!-- ================= RIGHT FINETUNE ================= -->
    <g transform="translate(1020,50)">

      <!-- signal -->
      <text x="0" y="0"
        text-anchor="middle"
        style="font-size:22px;font-weight:700;fill:#111;">
        RAW NEURAL SIGNAL
      </text>

      <path d="
        M-120,55
        C-95,0 -80,80 -55,30
        S-10,100 15,45
        S70,10 95,55
        S120,15 145,40"
        fill="none"
        stroke="#111"
        stroke-width="4"
        stroke-linecap="round"/>

      <line x1="-150" y1="85" x2="160" y2="85"
        stroke="#111"
        stroke-width="3"/>

      <!-- cnn -->
      <g filter="url(#softShadow)">
        <polygon points="-140,160 140,160 110,100 -110,100"
          fill="#dbeafe"
          stroke="#111"
          stroke-width="3"/>

        <text x="0" y="138"
          text-anchor="middle"
          style="font-size:28px;font-weight:700;">
          CNN
        </text>

        <polygon points="-110,225 110,225 90,175 -90,175"
          fill="#fef9c3"
          stroke="#111"
          stroke-width="3"/>

        <text x="0" y="208"
          text-anchor="middle"
          style="font-size:22px;font-weight:600;">
          Feature
        </text>

        <polygon points="-85,280 85,280 68,238 -68,238"
          fill="#fff"
          stroke="#111"
          stroke-width="3"/>
      </g>

      <!-- tokens -->
      <g transform="translate(-80,390)">
        <rect x="-12" y="0" width="24" height="24"
          fill="#fef9c3"
          stroke="#111"
          stroke-width="2"/>

        <rect x="28" y="0" width="24" height="24"
          fill="#fef9c3"
          stroke="#111"
          stroke-width="2"/>

        <rect x="68" y="0" width="24" height="24"
          fill="#fef9c3"
          stroke="#111"
          stroke-width="2"/>

        <rect x="108" y="0" width="24" height="24"
          fill="#fef9c3"
          stroke="#111"
          stroke-width="2"/>

        <rect x="148" y="0" width="24" height="24"
          fill="#fef9c3"
          stroke="#111"
          stroke-width="2"/>
      </g>

      <!-- vertical arrows -->
      <g stroke="#111" stroke-width="2.5">
        <path d="M-80,420 L-80,520" marker-end="url(#arrow)"/>
        <path d="M-40,420 L-40,520" marker-end="url(#arrow)"/>
        <path d="M0,420 L0,520" marker-end="url(#arrow)"/>
        <path d="M40,420 L40,520" marker-end="url(#arrow)"/>
        <path d="M80,420 L80,520" marker-end="url(#arrow)"/>
      </g>

      <!-- PE -->
      <g transform="translate(150,402)">
        <circle cx="0" cy="0" r="18"
          fill="#fff"
          stroke="#111"
          stroke-width="3"/>

        <text x="0" y="5"
          text-anchor="middle"
          style="font-size:14px;font-weight:700;">
          PE
        </text>
      </g>

      <!-- encoder -->
      <g transform="translate(-120,540)"
        filter="url(#softShadow)">

        <rect x="0" y="0"
          width="240"
          height="100"
          rx="8"
          fill="#fde68a"
          stroke="#111"
          stroke-width="3"/>

        <text x="120" y="58"
          text-anchor="middle"
          style="font-size:24px;font-weight:700;">
          TRANSFORMER
        </text>

        <text x="120" y="84"
          text-anchor="middle"
          style="font-size:24px;font-weight:700;">
          ENCODER
        </text>
      </g>

      <!-- projection -->
      <g class="dnode"
        data-key="classifier"
        transform="translate(-100,690)"
        style="cursor:pointer;"
        filter="url(#softShadow)">

        <rect x="0" y="0"
          width="200"
          height="50"
          rx="8"
          fill="#fff"
          stroke="#111"
          stroke-width="3"/>

        <text x="100" y="31"
          text-anchor="middle"
          style="font-size:20px;font-weight:600;">
          Linear Projection
        </text>

        <path d="M100,50 L100,90"
          fill="none"
          stroke="#111"
          stroke-width="2"
          marker-end="url(#arrow)"/>

        <rect x="0" y="100"
          width="200"
          height="50"
          rx="8"
          fill="#fff"
          stroke="#111"
          stroke-width="3"/>

        <text x="100" y="131"
          text-anchor="middle"
          style="font-size:20px;font-weight:600;">
          Linear Classifier
        </text>
      </g>

      <!-- CE loss -->
      <g class="dnode"
        data-key="ce_loss"
        transform="translate(0,920)"
        style="cursor:pointer;">

        <ellipse cx="0" cy="0"
          rx="120"
          ry="34"
          fill="#fff"
          stroke="#111"
          stroke-width="3"/>

        <text x="0" y="8"
          text-anchor="middle"
          style="font-size:22px;font-weight:600;">
          Cross Entropy Loss
        </text>
      </g>

    </g>

    <!-- transfer arrow -->
    <path d="M620,560 L860,560"
      fill="none"
      stroke="#111"
      stroke-width="3"
      marker-end="url(#arrow)"/>

    <text x="740" y="535"
      text-anchor="middle"
      style="font-size:24px;font-weight:700;fill:#111;">
      weight transfer
    </text>

  </svg>
  `,
};
