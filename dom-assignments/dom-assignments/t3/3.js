'use strict';
document.addEventListener("DOMContentLoaded", function() {
  const target = document.getElementById('target');

  const browserInfo = navigator.userAgent.match(/(Opera|Chrome|Safari|Firefox|MSIE|Trident(?=\/))\/?\s*([\d\.]+)/i);
  let browserName = browserInfo[1];
  let browserVersion = browserInfo[2];

  const osInfo = navigator.platform;

  const screenWidth = screen.width;
  const screenHeight = screen.height;

  const screenAvailWidth = screen.availWidth;
  const screenAvailHeight = screen.availHeight;

  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false };
  const currentTime = new Date().toLocaleString('fi-FI', options);

  target.innerHTML = `
    <p>Browser: ${browserName}, ${browserVersion}</p>
    <p>Operating System: ${osInfo}</p>
    <p>Screen Width x Height: ${screenWidth} x ${screenHeight}</p>
    <p>Available Screen Space: ${screenAvailWidth} x ${screenAvailHeight}</p>
    <p>Current Date and Time: ${currentTime}</p>
  `;
});
