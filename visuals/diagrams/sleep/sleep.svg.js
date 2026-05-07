export const sleepDiagram = {
  tooltips: {
    signal_pre: { title: 'Raw Neural Signal', body: 'High-frequency EEG or DBS time-series data. Normalized and segmented into fixed-length temporal windows before processing.' },
    signal_fine: { title: 'Raw Neural Signal', body: 'During finetuning, the full signal is passed without masking. CNN weights are randomly re-initialized for the target domain.' },
    cnn_pre: { title: 'CNN Feature Extraction', body: 'A 1D-CNN backbone with a wide receptive field at the base that narrows upward, extracting hierarchical temporal features into a compact token sequence.' },
    cnn_fine: { title: 'CNN Feature Extraction', body: 'Same CNN architecture as pretraining but with randomly initialized weights. Learns domain-specific features from the DBS target dataset.' },
    masking: { title: 'Random Temporal Masking', body: '75% of tokens are randomly masked. Only the remaining 25% (pink = unmasked) are passed to the encoder, forcing it to learn a global understanding of sleep patterns.' },
    pe_pre: { title: 'Positional Embedding (PE)', body: 'Adds temporal position information to each token so the Transformer knows the order of signal segments.' },
    pe_fine: { title: 'Positional Embedding (PE)', body: 'All tokens (no masking) are embedded with positional information and passed directly into the pretrained encoder.' },
    encoder_pre: { title: 'Transformer Encoder (Pretraining)', body: 'Processes only the unmasked tokens efficiently. Learns rich sleep-stage representations from large EEG datasets via self-supervised objectives.' },
    encoder_fine: { title: 'Transformer Encoder (Finetuning)', body: 'Weights inherited from the pretrained model. Fine-tuned on DBS recordings from Parkinson\'s patients for sleep stage classification.' },
    decoder: { title: 'Transformer Decoder', body: 'Used only during pretraining. Receives encoded tokens + placeholder mask tokens to reconstruct the missing signal segments.' },
    mae_loss: { title: 'Reconstruction Loss (MSE)', body: 'Self-supervised objective. The model is penalized for how poorly it reconstructs the masked portions of the original signal.' },
    proj: { title: 'Linear Projection', body: 'Projects the encoder\'s CLS token output into a lower-dimensional space before classification.' },
    classifier: { title: 'Linear Classifier', body: 'A simple linear head mapping projected features to 5 sleep stages: Wake, N1, N2, N3, REM.' },
    ce_loss: { title: 'Cross-Entropy Loss', body: 'Supervised classification loss used during finetuning. Combined with cost-sensitive class weighting to handle rare sleep stages in Parkinson\'s patients.' },
  },

  svg: `
    <svg width="100%" viewBox="0 0 780 820" style="display:block;">
      <defs>
        <marker id="sarrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </marker>
      </defs>

      <!-- ══════════════════════════════════════
           COLUMN HEADERS
      ══════════════════════════════════════ -->
      <text x="195" y="28" text-anchor="middle" style="font-family:var(--font-sans-2);font-size:12px;font-weight:700;fill:#a1a1aa;letter-spacing:0.1em">PRETRAINING</text>
      <line x1="30" y1="36" x2="360" y2="36" stroke="#303030" stroke-width="0.8"/>

      <text x="575" y="28" text-anchor="middle" style="font-family:var(--font-sans-2);font-size:12px;font-weight:700;fill:#c084fc;letter-spacing:0.1em">FINETUNING</text>
      <line x1="400" y1="36" x2="750" y2="36" stroke="#c084fc" stroke-width="0.8" opacity="0.4"/>

      <!-- vertical divider -->
      <line x1="385" y1="36" x2="385" y2="780" stroke="#303030" stroke-width="0.8" stroke-dasharray="5 4"/>

      <!-- ══════════════════════════════════════
           LEFT: PRETRAINING PATH
      ══════════════════════════════════════ -->

      <!-- Raw signal waveform -->
      <g class="dnode" data-key="signal_pre" style="cursor:pointer">
        <path d="M100 90 L112 70 L124 100 L136 55 L148 105 L160 75 L172 88 L184 62 L196 95 L208 72 L220 85 L232 75 L244 88 L256 65 L268 90 L280 80 L292 90" 
              fill="none" stroke="#a1a1aa" stroke-width="1.5" opacity="0.7"/>
        <text x="195" y="115" text-anchor="middle" style="font-family:var(--font-sans-2);font-size:11px;font-weight:700;fill:#a1a1aa">Raw Neural Signal</text>
      </g>

      <line x1="195" y1="122" x2="195" y2="142" stroke="#5f5e5a" stroke-width="1.2" marker-end="url(#sarrow)"/>

      <!-- CNN trapezoid (wide base, narrow top) — pointing UP -->
      <g class="dnode" data-key="cnn_pre" style="cursor:pointer">
        <polygon points="80,240 310,240 260,142 130,142" fill="#082a24" stroke="#1d9e75" stroke-width="1.5"/>
        <!-- internal division lines suggesting layers -->
        <line x1="112" y1="193" x2="278" y2="193" stroke="#1d9e75" stroke-width="0.5" opacity="0.4"/>
        <line x1="125" y1="217" x2="265" y2="217" stroke="#1d9e75" stroke-width="0.5" opacity="0.4"/>
        <text x="195" y="200" text-anchor="middle" style="font-family:var(--font-sans-2);font-size:13px;font-weight:700;fill:#9fe1cb">CNN Feature Extraction</text>
      </g>

      <!-- tokens row after CNN -->
      <line x1="195" y1="240" x2="195" y2="268" stroke="#5f5e5a" stroke-width="1.2" marker-end="url(#sarrow)"/>

      <!-- Token row: mix of unmasked (pink) and masked (grey) -->
      <g class="dnode" data-key="masking" style="cursor:pointer">
        <rect x="90"  y="268" width="34" height="34" rx="5" fill="#e38c83" stroke="#e38c83" stroke-width="1.2"/>
        <rect x="132" y="268" width="34" height="34" rx="5" fill="#3a3a3a" stroke="#5f5e5a" stroke-width="1.2"/>
        <rect x="174" y="268" width="34" height="34" rx="5" fill="#e38c83" stroke="#e38c83" stroke-width="1.2"/>
        <rect x="216" y="268" width="34" height="34" rx="5" fill="#3a3a3a" stroke="#5f5e5a" stroke-width="1.2"/>
        <rect x="258" y="268" width="34" height="34" rx="5" fill="#3a3a3a" stroke="#5f5e5a" stroke-width="1.2"/>
        <text x="195" y="318" text-anchor="middle" style="font-family:var(--font-sans-2);font-size:11px;font-weight:700;fill:var(--muted)">Random Temporal Masking</text>
      </g>

      <!-- Legend -->
      <rect x="90" y="328" width="10" height="10" rx="2" fill="#e38c83"/>
      <text x="104" y="337" style="font-family:var(--font-sans-2);font-size:10px;fill:var(--muted)">Unmasked</text>
      <rect x="170" y="328" width="10" height="10" rx="2" fill="#3a3a3a" stroke="#5f5e5a" stroke-width="1"/>
      <text x="184" y="337" style="font-family:var(--font-sans-2);font-size:10px;fill:var(--muted)">Masked</text>

      <!-- PE circle -->
      <g class="dnode" data-key="pe_pre" style="cursor:pointer">
        <circle cx="195" cy="358" r="16" fill="#2a1208" stroke="#ba7517" stroke-width="1.5"/>
        <text x="195" y="358" text-anchor="middle" dominant-baseline="central" style="font-family:var(--font-sans-2);font-size:11px;font-weight:700;fill:#fac775">PE</text>
      </g>

      <!-- only unmasked arrows go up to encoder -->
      <line x1="107" y1="302" x2="107" y2="374" stroke="#e38c83" stroke-width="1" marker-end="url(#sarrow)"/>
      <line x1="191" y1="302" x2="191" y2="374" stroke="#e38c83" stroke-width="1" marker-end="url(#sarrow)"/>

      <!-- Transformer Encoder -->
      <g class="dnode" data-key="encoder_pre" style="cursor:pointer">
        <rect x="80" y="374" width="230" height="58" rx="8" fill="#221a36" stroke="#c084fc" stroke-width="1.5"/>
        <line x1="80" y1="393" x2="310" y2="393" stroke="#c084fc" stroke-width="0.4" opacity="0.3"/>
        <line x1="80" y1="412" x2="310" y2="412" stroke="#c084fc" stroke-width="0.4" opacity="0.3"/>
        <text x="195" y="403" text-anchor="middle" dominant-baseline="central" style="font-family:var(--font-sans-2);font-size:13px;font-weight:700;fill:#cecbf6">Transformer Encoder</text>
      </g>

      <!-- masked tokens also go to decoder (grey arrow) -->
      <path d="M233 285 C340 285, 340 460, 310 460" fill="none" stroke="#5f5e5a" stroke-width="1" stroke-dasharray="4 3" marker-end="url(#sarrow)"/>
      <text x="355" y="370" text-anchor="middle" style="font-family:var(--font-sans-2);font-size:9px;fill:var(--muted);opacity:0.7">mask tokens</text>

      <line x1="195" y1="432" x2="195" y2="455" stroke="#5f5e5a" stroke-width="1.2" marker-end="url(#sarrow)"/>

      <!-- Transformer Decoder -->
      <g class="dnode" data-key="decoder" style="cursor:pointer">
        <rect x="80" y="455" width="230" height="50" rx="8" fill="#1a2236" stroke="#85b7eb" stroke-width="1.5"/>
        <line x1="80" y1="472" x2="310" y2="472" stroke="#85b7eb" stroke-width="0.4" opacity="0.3"/>
        <text x="195" y="480" text-anchor="middle" dominant-baseline="central" style="font-family:var(--font-sans-2);font-size:13px;font-weight:700;fill:#b5d4f4">Transformer Decoder</text>
      </g>

      <!-- decoder output tokens (blue) -->
      <line x1="195" y1="505" x2="195" y2="525" stroke="#5f5e5a" stroke-width="1.2" marker-end="url(#sarrow)"/>
      <rect x="112" y="525" width="28" height="28" rx="4" fill="#4a90d9" stroke="#4a90d9" stroke-width="1"/>
      <rect x="148" y="525" width="28" height="28" rx="4" fill="#4a90d9" stroke="#4a90d9" stroke-width="1"/>
      <rect x="184" y="525" width="28" height="28" rx="4" fill="#4a90d9" stroke="#4a90d9" stroke-width="1"/>
      <rect x="220" y="525" width="28" height="28" rx="4" fill="#4a90d9" stroke="#4a90d9" stroke-width="1"/>
      <rect x="256" y="525" width="28" height="28" rx="4" fill="#4a90d9" stroke="#4a90d9" stroke-width="1"/>

      <!-- decoder output legend -->
      <rect x="90" y="558" width="10" height="10" rx="2" fill="#4a90d9"/>
      <text x="104" y="567" style="font-family:var(--font-sans-2);font-size:10px;fill:var(--muted)">Decoder output</text>

      <line x1="195" y1="553" x2="195" y2="575" stroke="#5f5e5a" stroke-width="1.2" marker-end="url(#sarrow)"/>

      <!-- Reconstruction Loss -->
      <g class="dnode" data-key="mae_loss" style="cursor:pointer">
        <ellipse cx="195" cy="600" rx="100" ry="24" fill="#2a1208" stroke="#993c1d" stroke-width="1.5"/>
        <text x="195" y="600" text-anchor="middle" dominant-baseline="central" style="font-family:var(--font-sans-2);font-size:12px;font-weight:700;fill:#f5c4b3">Reconstruction Loss</text>
      </g>

      <!-- ══════════════════════════════════════
           RIGHT: FINETUNING PATH
      ══════════════════════════════════════ -->

      <!-- Raw signal waveform -->
      <g class="dnode" data-key="signal_fine" style="cursor:pointer">
        <path d="M470 90 L482 68 L494 98 L506 55 L518 102 L530 72 L542 88 L554 62 L566 95 L578 72 L590 85 L602 75 L614 88 L626 65 L638 90 L650 78 L662 90"
              fill="none" stroke="#a1a1aa" stroke-width="1.5" opacity="0.7"/>
        <text x="568" y="115" text-anchor="middle" style="font-family:var(--font-sans-2);font-size:11px;font-weight:700;fill:#a1a1aa">Raw Neural Signal</text>
      </g>

      <line x1="568" y1="122" x2="568" y2="142" stroke="#5f5e5a" stroke-width="1.2" marker-end="url(#sarrow)"/>

      <!-- CNN trapezoid (finetuning) -->
      <g class="dnode" data-key="cnn_fine" style="cursor:pointer">
        <polygon points="450,240 686,240 636,142 500,142" fill="#082a24" stroke="#1d9e75" stroke-width="1.5"/>
        <line x1="480" y1="193" x2="656" y2="193" stroke="#1d9e75" stroke-width="0.5" opacity="0.4"/>
        <line x1="490" y1="217" x2="646" y2="217" stroke="#1d9e75" stroke-width="0.5" opacity="0.4"/>
        <text x="568" y="200" text-anchor="middle" style="font-family:var(--font-sans-2);font-size:13px;font-weight:700;fill:#9fe1cb">CNN Feature Extraction</text>
      </g>

      <!-- all tokens (no masking, all pink) -->
      <line x1="568" y1="240" x2="568" y2="268" stroke="#5f5e5a" stroke-width="1.2" marker-end="url(#sarrow)"/>

      <rect x="455" y="268" width="34" height="34" rx="5" fill="#e38c83" stroke="#e38c83" stroke-width="1.2"/>
      <rect x="497" y="268" width="34" height="34" rx="5" fill="#e38c83" stroke="#e38c83" stroke-width="1.2"/>
      <rect x="539" y="268" width="34" height="34" rx="5" fill="#e38c83" stroke="#e38c83" stroke-width="1.2"/>
      <rect x="581" y="268" width="34" height="34" rx="5" fill="#e38c83" stroke="#e38c83" stroke-width="1.2"/>
      <rect x="623" y="268" width="34" height="34" rx="5" fill="#e38c83" stroke="#e38c83" stroke-width="1.2"/>
      <text x="568" y="318" text-anchor="middle" style="font-family:var(--font-sans-2);font-size:11px;fill:var(--muted)">All tokens (no masking)</text>

      <!-- PE circle -->
      <g class="dnode" data-key="pe_fine" style="cursor:pointer">
        <circle cx="568" cy="352" r="16" fill="#2a1208" stroke="#ba7517" stroke-width="1.5"/>
        <text x="568" y="352" text-anchor="middle" dominant-baseline="central" style="font-family:var(--font-sans-2);font-size:11px;font-weight:700;fill:#fac775">PE</text>
      </g>

      <!-- all token arrows up to encoder -->
      <line x1="472" y1="302" x2="472" y2="374" stroke="#e38c83" stroke-width="1" marker-end="url(#sarrow)"/>
      <line x1="514" y1="302" x2="514" y2="374" stroke="#e38c83" stroke-width="1" marker-end="url(#sarrow)"/>
      <line x1="556" y1="302" x2="556" y2="374" stroke="#e38c83" stroke-width="1" marker-end="url(#sarrow)"/>
      <line x1="598" y1="302" x2="598" y2="374" stroke="#e38c83" stroke-width="1" marker-end="url(#sarrow)"/>
      <line x1="640" y1="302" x2="640" y2="374" stroke="#e38c83" stroke-width="1" marker-end="url(#sarrow)"/>

      <!-- Transformer Encoder (finetuning) -->
      <g class="dnode" data-key="encoder_fine" style="cursor:pointer">
        <rect x="453" y="374" width="230" height="58" rx="8" fill="#221a36" stroke="#c084fc" stroke-width="1.5"/>
        <line x1="453" y1="393" x2="683" y2="393" stroke="#c084fc" stroke-width="0.4" opacity="0.3"/>
        <line x1="453" y1="412" x2="683" y2="412" stroke="#c084fc" stroke-width="0.4" opacity="0.3"/>
        <text x="568" y="396" text-anchor="middle" style="font-family:var(--font-sans-2);font-size:12px;font-weight:700;fill:#cecbf6">Transformer Encoder</text>
        <text x="568" y="416" text-anchor="middle" style="font-family:var(--font-sans-2);font-size:10px;fill:#afa9ec;opacity:0.8">(pretrained weights)</text>
      </g>

      <line x1="568" y1="432" x2="568" y2="455" stroke="#c084fc" stroke-width="1.2" marker-end="url(#sarrow)"/>

      <!-- Linear Projection -->
      <g class="dnode" data-key="proj" style="cursor:pointer">
        <rect x="478" y="455" width="180" height="42" rx="6" fill="#362208" stroke="#ba7517" stroke-width="1.5"/>
        <text x="568" y="476" text-anchor="middle" dominant-baseline="central" style="font-family:var(--font-sans-2);font-size:12px;font-weight:700;fill:#fac775">Linear Projection</text>
      </g>

      <line x1="568" y1="497" x2="568" y2="520" stroke="#ba7517" stroke-width="1.2" marker-end="url(#sarrow)"/>

      <!-- Linear Classifier -->
      <g class="dnode" data-key="classifier" style="cursor:pointer">
        <rect x="478" y="520" width="180" height="42" rx="6" fill="#362208" stroke="#ba7517" stroke-width="1.5"/>
        <text x="568" y="541" text-anchor="middle" dominant-baseline="central" style="font-family:var(--font-sans-2);font-size:12px;font-weight:700;fill:#fac775">Linear Classifier</text>
      </g>

      <line x1="568" y1="562" x2="568" y2="582" stroke="#ba7517" stroke-width="1.2" marker-end="url(#sarrow)"/>

      <!-- Cross-entropy loss -->
      <g class="dnode" data-key="ce_loss" style="cursor:pointer">
        <ellipse cx="568" cy="606" rx="100" ry="24" fill="#2a1208" stroke="#993c1d" stroke-width="1.5"/>
        <text x="568" y="606" text-anchor="middle" dominant-baseline="central" style="font-family:var(--font-sans-2);font-size:12px;font-weight:700;fill:#f5c4b3">Cross-Entropy Loss</text>
      </g>

      <line x1="568" y1="630" x2="568" y2="650" stroke="#1d9e75" stroke-width="1.2" marker-end="url(#sarrow)"/>

      <!-- Final output -->
      <g class="dnode" data-key="final_stage" style="cursor:pointer">
        <rect x="453" y="650" width="230" height="46" rx="8" fill="#082a24" stroke="#1d9e75" stroke-width="1.5"/>
        <text x="568" y="673" text-anchor="middle" dominant-baseline="central" style="font-family:var(--font-sans-2);font-size:13px;font-weight:700;fill:#9fe1cb">Sleep Stage Prediction</text>
      </g>

      <!-- Stage labels W N1 N2 N3 REM -->
      <text x="568" y="712" text-anchor="middle" style="font-family:var(--font-sans-2);font-size:10px;fill:var(--muted);opacity:0.6">W · N1 · N2 · N3 · REM</text>

      <!-- pretrain → finetune transfer arrow -->
      <path d="M310 403 C350 403, 420 403, 453 403" fill="none" stroke="#c084fc" stroke-width="1.2" stroke-dasharray="5 3" marker-end="url(#sarrow)"/>
      <text x="382" y="395" text-anchor="middle" style="font-family:var(--font-sans-2);font-size:9px;fill:#c084fc;opacity:0.8">weights</text>
      <text x="382" y="407" text-anchor="middle" style="font-family:var(--font-sans-2);font-size:9px;fill:#c084fc;opacity:0.8">transfer</text>

      <!-- bottom label -->
      <text x="390" y="775" text-anchor="middle" style="font-family:var(--font-sans-2);font-size:11px;fill:var(--muted);opacity:0.4">Dual-Stage Transfer Learning Framework</text>
    </svg>
  `
};
