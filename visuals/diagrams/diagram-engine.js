export function initDiagram(wrapId, tooltipData) {
  // Click on a node
  document.addEventListener('click', function(e) {
    const node = e.target.closest('.dnode');
    const wrap = document.getElementById(wrapId + '-wrap');
    const tooltip = document.getElementById(wrapId + '-tooltip');
    if (!wrap || !tooltip) return;

    if (!node || !wrap.contains(node)) {
      tooltip.classList.remove('visible');
      return;
    }

    const key = node.dataset.key;
    const data = tooltipData[key];
    if (!data) return;

    document.getElementById(wrapId + '-tooltip-title').textContent = data.title;
    document.getElementById(wrapId + '-tooltip-body').textContent = data.body;

    const wrapRect = wrap.getBoundingClientRect();
    const nodeRect = node.getBoundingClientRect();

    let left = nodeRect.right - wrapRect.left + 10;
    let top  = nodeRect.top  - wrapRect.top;

    tooltip.style.left = left + 'px';
    tooltip.style.top  = top  + 'px';
    tooltip.classList.add('visible');

    // Flip left if overflowing right edge
    requestAnimationFrame(() => {
      const tipRect = tooltip.getBoundingClientRect();
      if (tipRect.right > window.innerWidth - 20) {
        tooltip.style.left = (nodeRect.left - wrapRect.left - tooltip.offsetWidth - 10) + 'px';
      }
    });

    e.stopPropagation();
  });
}

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
