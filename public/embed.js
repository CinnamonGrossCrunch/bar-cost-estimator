// Embed script for shadow DOM integration
(function() {
  'use strict';
  
  // Configuration
  const WIDGET_URL = 'https://your-vercel-domain.vercel.app/embed';
  
  // Create container
  const container = document.currentScript?.parentElement || document.body;
  const widgetHost = document.createElement('div');
  widgetHost.id = 'gdp-cost-calculator-widget';
  
  // Create shadow DOM
  const shadow = widgetHost.attachShadow({ mode: 'open' });
  
  // Create iframe
  const iframe = document.createElement('iframe');
  iframe.src = WIDGET_URL;
  iframe.style.width = '100%';
  iframe.style.border = 'none';
  iframe.style.minHeight = '700px';
  iframe.style.display = 'block';
  
  // Add iframe to shadow DOM
  shadow.appendChild(iframe);
  
  // Insert widget into page
  container.appendChild(widgetHost);
  
  // Handle iframe height messages
  window.addEventListener('message', function(event) {
    if (event.data && event.data.type === 'gdp-widget-height') {
      iframe.style.height = event.data.height + 'px';
    }
  });
})();
