module.exports = async function handler(req, res) {

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // CORS — allow requests from your domain only
  const origin = req.headers.origin || '';
  const allowed = [
    'https://agentscoci.site',
    'https://www.agentscoci.site',
    'http://localhost:3000',
    'http://localhost:5500'
  ];
  if (allowed.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Validate request body
  const { messages, system } = req.body || {};
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Invalid request — messages array required' });
  }

  // Hard limits to protect against runaway costs
  const MAX_MESSAGES = 20;
  const trimmedMessages = messages.slice(-MAX_MESSAGES);

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1000,
        system: system || '',
        messages: trimmedMessages
      })
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      console.error('Anthropic error:', err);
      return res.status(response.status).json({
        error: err?.error?.message || 'API error'
      });
    }

    const data = await response.json();
    const reply = data.content?.find(b => b.type === 'text')?.text || '';

    return res.status(200).json({ reply });

  } catch (err) {
    console.error('Proxy error:', err);
    return res.status(500).json({ error: 'Server error — please try again' });
  }
}
