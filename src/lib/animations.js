/**
 * Svelte action for scroll-triggered reveal animations.
 * Uses IntersectionObserver + CSS transforms (GPU-accelerated).
 * Respects prefers-reduced-motion — shows elements immediately if enabled.
 */

const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * @param {HTMLElement} node
 * @param {Object} options
 * @param {number} [options.threshold=0.15] - IntersectionObserver threshold
 * @param {number} [options.delay=0] - Delay before animation starts (ms)
 * @param {number} [options.duration=600] - Animation duration (ms)
 * @param {number} [options.distance=24] - translateY distance (px)
 * @param {'up'|'down'} [options.direction='up'] - Reveal direction
 * @param {number} [options.stagger=0] - Stagger delay between children (ms)
 * @param {string} [options.staggerSelector=''] - CSS selector for stagger children
 */
export function reveal(node, options = {}) {
  if (prefersReducedMotion) {
    node.style.opacity = '1';
    return { destroy() {} };
  }

  const {
    threshold = 0.15,
    delay = 0,
    duration = 600,
    distance = 24,
    direction = 'up',
    stagger = 0,
    staggerSelector = '',
  } = options;

  const translateDir = direction === 'up' ? distance : -distance;

  if (stagger && staggerSelector) {
    // Stagger mode: animate children individually
    const children = node.querySelectorAll(staggerSelector);
    node.style.opacity = '1';
    children.forEach((child) => {
      child.style.opacity = '0';
      child.style.transform = `translateY(${translateDir}px)`;
      child.style.willChange = 'opacity, transform';
      child.style.transition = `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1), transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1)`;
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            children.forEach((child, i) => {
              setTimeout(() => {
                child.style.transitionDelay = '0ms';
                child.style.opacity = '1';
                child.style.transform = 'translateY(0)';
                setTimeout(() => {
                  child.style.willChange = 'auto';
                }, duration + 50);
              }, delay + i * stagger);
            });
            observer.unobserve(node);
          }
        });
      },
      { threshold }
    );

    observer.observe(node);

    return {
      destroy() {
        observer.disconnect();
      },
    };
  }

  // Single element mode
  node.style.opacity = '0';
  node.style.transform = `translateY(${translateDir}px)`;
  node.style.willChange = 'opacity, transform';
  node.style.transition = `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          node.style.opacity = '1';
          node.style.transform = 'translateY(0)';
          setTimeout(() => {
            node.style.willChange = 'auto';
          }, duration + delay + 50);
          observer.unobserve(node);
        }
      });
    },
    { threshold }
  );

  observer.observe(node);

  return {
    destroy() {
      observer.disconnect();
    },
  };
}
