/* KetoLab Touch Gestures - Añadir sin romper */

(function() {
  'use strict';

  if (typeof window.KetoLabGestures === 'boolean' && window.KetoLabGestures) return;
  window.KetoLabGestures = true;

  var touchStartX = 0;
  var touchStartY = 0;
  var touchEndX = 0;
  var touchEndY = 0;
  var minSwipeDistance = 50;
  var maxSwipeTime = 500;
  var touchStartTime = 0;

  function handleTouchStart(e) {
    if (e.touches.length !== 1) return;
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    touchStartTime = Date.now();
  }

  function handleTouchEnd(e) {
    touchEndX = e.changedTouches[0].clientX;
    touchEndY = e.changedTouches[0].clientY;
    
    var deltaX = touchEndX - touchStartX;
    var deltaY = touchEndY - touchStartY;
    var deltaTime = Date.now() - touchStartTime;
    
    if (Math.abs(deltaX) < minSwipeDistance && Math.abs(deltaY) < minSwipeDistance) {
      return;
    }
    
    if (deltaTime > maxSwipeTime) {
      return;
    }
    
    var direction = '';
    var isHorizontal = Math.abs(deltaX) > Math.abs(deltaY);
    
    if (isHorizontal) {
      direction = deltaX > 0 ? 'right' : 'left';
    } else {
      direction = deltaY > 0 ? 'down' : 'up';
    }
    
    var swipeEvent = new CustomEvent('ketolab:swipe', {
      detail: {
        direction: direction,
        startX: touchStartX,
        startY: touchStartY,
        endX: touchEndX,
        endY: touchEndY,
        deltaX: deltaX,
        deltaY: deltaY
      },
      bubbles: true
    });
    
    document.dispatchEvent(swipeEvent);
  }

  function init() {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      document.addEventListener('touchstart', handleTouchStart, { passive: true });
      document.addEventListener('touchend', handleTouchEnd, { passive: true });
      console.log('[KetoLab] Touch gestures initialized');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

/* 
Usage: 
document.addEventListener('ketolab:swipe', function(e) {
  if (e.detail.direction === 'left') {
    // Do something
  }
});
*/