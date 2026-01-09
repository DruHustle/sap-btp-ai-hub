import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, Play, RotateCcw, Download } from 'lucide-react';
import { toast } from 'sonner';

interface APIRequest {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  endpoint: string;
  headers: Record<string, string>;
  body: string;
}

interface APIResponse {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  body: string;
  time: number;
}

const API_EXAMPLES = {
  generativeAIHub: {
    name: 'Generative AI Hub - Text Completion',
    method: 'POST' as const,
    endpoint: 'https://your-sap-btp-instance/api/v1/completions',
    headers: {
      'Authorization': 'Bearer YOUR_TOKEN',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [
        {
          role: 'user',
          content: 'Explain SAP BTP AI Core in 2 sentences',
        },
      ],
      temperature: 0.7,
      max_tokens: 150,
    }, null, 2),
  },
  embeddings: {
    name: 'Generate Embeddings',
    method: 'POST' as const,
    endpoint: 'https://your-sap-btp-instance/api/v1/embeddings',
    headers: {
      'Authorization': 'Bearer YOUR_TOKEN',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      input: 'SAP BTP is a comprehensive cloud platform',
      model: 'text-embedding-3-large',
    }, null, 2),
  },
  hanaVectorSearch: {
    name: 'HANA Vector Similarity Search',
    method: 'POST' as const,
    endpoint: 'https://your-sap-btp-instance/api/v1/vector-search',
    headers: {
      'Authorization': 'Bearer YOUR_TOKEN',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: 'How do I deploy models on SAP AI Core?',
      top_k: 3,
      similarity_threshold: 0.7,
    }, null, 2),
  },
  documentAI: {
    name: 'Document AI - Extract Information',
    method: 'POST' as const,
    endpoint: 'https://your-sap-btp-instance/api/v1/document-ai/extract',
    headers: {
      'Authorization': 'Bearer YOUR_TOKEN',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      document_url: 'https://example.com/invoice.pdf',
      extraction_type: 'invoice',
      fields: ['vendor_name', 'invoice_number', 'total_amount', 'date'],
    }, null, 2),
  },
  aiCore: {
    name: 'SAP AI Core - List Deployments',
    method: 'GET' as const,
    endpoint: 'https://your-sap-btp-instance/api/v1/deployments',
    headers: {
      'Authorization': 'Bearer YOUR_TOKEN',
      'Content-Type': 'application/json',
    },
    body: '',
  },
};

export default function APIPlayground() {
  const [selectedExample, setSelectedExample] = useState<keyof typeof API_EXAMPLES>('generativeAIHub');
  const [request, setRequest] = useState<APIRequest>(API_EXAMPLES.generativeAIHub);
  const [response, setResponse] = useState<APIResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [showResponse, setShowResponse] = useState(false);

  const handleExampleChange = (exampleKey: keyof typeof API_EXAMPLES) => {
    const example = API_EXAMPLES[exampleKey];
    setSelectedExample(exampleKey);
    setRequest({
      method: example.method,
      endpoint: example.endpoint,
      headers: example.headers,
      body: example.body,
    });
    setResponse(null);
    setShowResponse(false);
  };

  const handleRequestChange = (field: keyof APIRequest, value: any) => {
    setRequest(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleHeaderChange = (key: string, value: string) => {
    setRequest(prev => ({
      ...prev,
      headers: {
        ...prev.headers,
        [key]: value,
      },
    }));
  };

  const handleSendRequest = async () => {
    setLoading(true);
    const startTime = Date.now();

    try {
      const fetchOptions: RequestInit = {
        method: request.method,
        headers: request.headers,
      };

      if (request.body && request.method !== 'GET') {
        fetchOptions.body = request.body;
      }

      // Note: This is a demonstration. In production, you'd use a backend proxy
      // to avoid CORS issues and to securely handle authentication tokens.
      const res = await fetch(request.endpoint, fetchOptions);
      const responseBody = await res.text();
      const endTime = Date.now();

      // Try to parse as JSON for better display
      let parsedBody = responseBody;
      try {
        parsedBody = JSON.stringify(JSON.parse(responseBody), null, 2);
      } catch {
        // Keep as plain text if not JSON
      }

      setResponse({
        status: res.status,
        statusText: res.statusText,
        headers: Object.fromEntries(res.headers.entries()),
        body: parsedBody,
        time: endTime - startTime,
      });
      setShowResponse(true);
      toast.success('Request completed');
    } catch (error) {
      const endTime = Date.now();
      setResponse({
        status: 0,
        statusText: 'Error',
        headers: {},
        body: `Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}\n\nNote: This playground demonstrates API structure. In production, use a backend proxy to handle CORS and authentication.`,
        time: endTime - startTime,
      });
      setShowResponse(true);
      toast.error('Request failed');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    const example = API_EXAMPLES[selectedExample];
    setRequest({
      method: example.method,
      endpoint: example.endpoint,
      headers: example.headers,
      body: example.body,
    });
    setResponse(null);
    setShowResponse(false);
  };

  const handleCopyRequest = () => {
    const curlCommand = `curl -X ${request.method} "${request.endpoint}" \\
${Object.entries(request.headers)
  .map(([key, value]) => `  -H "${key}: ${value}"`)
  .join(' \\\n')}${
  request.body ? ` \\\n  -d '${request.body.replace(/'/g, "'\\''")}'` : ''
}`;
    navigator.clipboard.writeText(curlCommand);
    toast.success('cURL command copied to clipboard');
  };

  const handleDownloadResponse = () => {
    if (!response) return;
    const content = `Request: ${request.method} ${request.endpoint}\nHeaders: ${JSON.stringify(request.headers, null, 2)}\n\nResponse:\nStatus: ${response.status} ${response.statusText}\nTime: ${response.time}ms\n\n${response.body}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `api-response-${Date.now()}.txt`;
    a.click();
  };

  return (
    <div className="w-full space-y-6 py-8">
      <div className="space-y-2">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground px-2 sm:px-0">Interactive API Playground</h2>
        <p className="text-sm sm:text-base md:text-lg text-muted-foreground text-justify px-2 sm:px-0">
          Test REST and OData calls to SAP BTP AI API endpoints. Select an example or build your own request.
        </p>
      </div>

      <Tabs defaultValue="examples" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="examples">Examples</TabsTrigger>
          <TabsTrigger value="builder">Request Builder</TabsTrigger>
        </TabsList>

        <TabsContent value="examples" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {Object.entries(API_EXAMPLES).map(([key, example]) => (
              <Button
                key={key}
                variant={selectedExample === key ? 'default' : 'outline'}
                onClick={() => handleExampleChange(key as keyof typeof API_EXAMPLES)}
                className="justify-start text-left h-auto py-3 px-4"
              >
                <div className="flex flex-col gap-1">
                  <span className="font-semibold">{example.name}</span>
                  <span className="text-xs opacity-75">{example.method}</span>
                </div>
              </Button>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="builder" className="space-y-4">
          <Card className="p-6 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Method</label>
              <select
                value={request.method}
                onChange={(e) => handleRequestChange('method', e.target.value)}
                className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
              >
                <option>GET</option>
                <option>POST</option>
                <option>PUT</option>
                <option>DELETE</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Endpoint URL</label>
              <input
                type="text"
                value={request.endpoint}
                onChange={(e) => handleRequestChange('endpoint', e.target.value)}
                placeholder="https://your-sap-btp-instance/api/v1/..."
                className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Headers</label>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {Object.entries(request.headers).map(([key, value]) => (
                  <div key={key} className="flex gap-2">
                    <input
                      type="text"
                      value={key}
                      onChange={(e) => {
                        const newHeaders = { ...request.headers };
                        delete newHeaders[key];
                        newHeaders[e.target.value] = value;
                        handleRequestChange('headers', newHeaders);
                      }}
                      placeholder="Header name"
                      className="flex-1 px-2 py-1 border border-input rounded text-sm bg-background text-foreground"
                    />
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => handleHeaderChange(key, e.target.value)}
                      placeholder="Header value"
                      className="flex-1 px-2 py-1 border border-input rounded text-sm bg-background text-foreground"
                    />
                  </div>
                ))}
              </div>
            </div>

            {request.method !== 'GET' && (
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Request Body (JSON)</label>
                <textarea
                  value={request.body}
                  onChange={(e) => handleRequestChange('body', e.target.value)}
                  placeholder='{"key": "value"}'
                  className="w-full h-32 px-3 py-2 border border-input rounded-md bg-background text-foreground font-mono text-sm placeholder:text-muted-foreground"
                />
              </div>
            )}

            <div className="flex gap-2 flex-wrap">
              <Button
                onClick={handleSendRequest}
                disabled={loading}
                className="gap-2"
              >
                <Play className="w-4 h-4" />
                {loading ? 'Sending...' : 'Send Request'}
              </Button>
              <Button
                onClick={handleReset}
                variant="outline"
                className="gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </Button>
              <Button
                onClick={handleCopyRequest}
                variant="outline"
                className="gap-2"
              >
                <Copy className="w-4 h-4" />
                Copy cURL
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {showResponse && response && (
        <Card className="p-6 space-y-4 border-primary/50">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="font-semibold text-foreground">Response</h3>
              <p className="text-sm text-muted-foreground">
                Status: <span className={response.status >= 200 && response.status < 300 ? 'text-green-600' : 'text-red-600'}>
                  {response.status} {response.statusText}
                </span> • Time: {response.time}ms
              </p>
            </div>
            <Button
              onClick={handleDownloadResponse}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <Download className="w-4 h-4" />
              Download
            </Button>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">Response Body</label>
            <pre className="w-full h-64 p-3 border border-input rounded-md bg-muted text-muted-foreground text-xs overflow-auto">
              {response.body}
            </pre>
          </div>

          {Object.keys(response.headers).length > 0 && (
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Response Headers</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                {Object.entries(response.headers).map(([key, value]) => (
                  <div key={key} className="text-xs">
                    <span className="font-semibold text-foreground">{key}:</span>
                    <span className="text-muted-foreground ml-1">{String(value)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Card>
      )}

      <Card className="p-6 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800 space-y-3">
        <h4 className="font-semibold text-blue-900 dark:text-blue-100">💡 Important Notes</h4>
        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-2">
          <li>• <strong>Authentication:</strong> Replace YOUR_TOKEN with your actual SAP BTP authentication token</li>
          <li>• <strong>CORS:</strong> This playground demonstrates API structure. For production use, implement a backend proxy to handle CORS and securely manage tokens</li>
          <li>• <strong>Endpoints:</strong> Replace your-sap-btp-instance with your actual SAP BTP instance URL</li>
          <li>• <strong>Rate Limiting:</strong> Be aware of API rate limits when testing multiple requests</li>
          <li>• <strong>Security:</strong> Never commit API tokens to version control. Use environment variables or secure vaults</li>
        </ul>
      </Card>
    </div>
  );
}
