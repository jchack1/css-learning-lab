export function buildSrcdoc(html: string, css: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    *, *::before, *::after { box-sizing: border-box; }
    body {
      margin: 0;
      padding: 1.5rem;
      font-family: system-ui, -apple-system, sans-serif;
      font-size: 16px;
      line-height: 1.5;
      color: #1f2937;
      background: #f0f2f8;
      min-height: 100dvh;
    }
    a { color: inherit; }
  </style>
  <style id="user-styles">${css}</style>
  <script>
    window.addEventListener('message', function(e) {
      if (e.data && e.data.type === 'css-update') {
        var el = document.getElementById('user-styles');
        if (el) el.textContent = e.data.css;
      }
    });
  </script>
</head>
<body>
${html}
</body>
</html>`;
}
