import { useState } from 'react';
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Terminal, Code2, Sparkles, Zap, Cpu, Braces } from "lucide-react";
import APIPlayground from '@/components/APIPlayground';
import CodeEditor from '@/components/CodeEditor';

const PYTHON_EXAMPLES = {
  generativeAI: `import requests
import json

# SAP BTP Generative AI Hub - Text Completion
def call_generative_ai_hub(query: str, model: str = "gpt-4") -> str:
    """
    Call the Generative AI Hub to generate text completions.
    """
    api_url = "https://your-sap-btp-instance/api/v1/completions"
    
    headers = {
        "Authorization": "Bearer YOUR_TOKEN",
        "Content-Type": "application/json"
    }
    
    payload = {
        "model": model,
        "messages": [
            {"role": "system", "content": "You are a helpful assistant for SAP BTP AI solutions."},
            {"role": "user", "content": query}
        ],
        "temperature": 0.7,
        "max_tokens": 500
    }
    
    response = requests.post(api_url, headers=headers, json=payload)
    return response.json()["choices"][0]["message"]["content"]`,

  embeddings: `import requests
from typing import List

# Generate embeddings for documents
def generate_embeddings(texts: List[str], model: str = "text-embedding-3-large") -> List[List[float]]:
    api_url = "https://your-sap-btp-instance/api/v1/embeddings"
    headers = {"Authorization": "Bearer YOUR_TOKEN", "Content-Type": "application/json"}
    
    embeddings = []
    for text in texts:
        payload = {"input": text, "model": model}
        response = requests.post(api_url, headers=headers, json=payload)
        embeddings.append(response.json()["data"][0]["embedding"])
    
    return embeddings`,

  ragWithHana: `import requests
from hdbcli import dbapi

# RAG with SAP HANA Vector Engine
class RAGSystem:
    def __init__(self, hana_host, hana_user, hana_password, api_token):
        self.hana_host = hana_host
        self.hana_user = hana_user
        self.hana_password = hana_password
        self.api_token = api_token
    
    def retrieve_documents(self, query, top_k=3):
        # Vector search implementation in HANA
        pass`,

  documentAI: `import requests

# SAP Document AI Extraction
def extract_document_info(document_url: str, document_type: str = "invoice") -> dict:
    api_url = "https://your-sap-btp-instance/api/v1/document-ai/extract"
    headers = {"Authorization": "Bearer YOUR_TOKEN", "Content-Type": "application/json"}
    
    payload = {
        "document_url": document_url,
        "extraction_type": document_type
    }
    
    response = requests.post(api_url, headers=headers, json=payload)
    return response.json()["extractions"]`,
};

const JAVASCRIPT_EXAMPLES = {
  generativeAI: `// SAP BTP Generative AI Hub - Node.js
const axios = require('axios');

async function callGenerativeAIHub(query, model = 'gpt-4') {
  const apiUrl = 'https://your-sap-btp-instance/api/v1/completions';
  const headers = { 'Authorization': 'Bearer YOUR_TOKEN' };
  
  const payload = {
    model,
    messages: [{ role: 'user', content: query }]
  };
  
  const response = await axios.post(apiUrl, payload, { headers });
  return response.data.choices[0].message.content;
}`,
  embeddings: `// Generate embeddings using SAP AI Core
const axios = require('axios');

async function generateEmbeddings(texts, model = 'text-embedding-3-large') {
  const apiUrl = 'https://your-sap-btp-instance/api/v1/embeddings';
  const headers = { 'Authorization': 'Bearer YOUR_TOKEN' };
  
  const results = await Promise.all(texts.map(text => 
    axios.post(apiUrl, { input: text, model }, { headers })
  ));
  
  return results.map(r => r.data.data[0].embedding);
}`,
};

export default function Playground() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header Section - Blue Themed */}
      <div className="bg-[#001A33] text-white border-b border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[40%] -left-[10%] w-[70%] h-[70%] rounded-full bg-blue-600/10 blur-[120px]" />
        </div>
        
        <div className="container py-16 md:py-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium"
            >
              <Terminal className="w-4 h-4" />
              <span>Interactive Developer Sandbox</span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold tracking-tight"
            >
              AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Playground</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-slate-400 leading-relaxed"
            >
              Experiment with SAP BTP AI APIs, test your prompts, and explore production-ready code examples in Python and JavaScript.
            </motion.p>
          </div>
        </div>
      </div>

      <div className="container py-12 md:py-20">
        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="api" className="space-y-12">
            <div className="flex justify-center">
              <TabsList className="bg-[#00264D] border border-white/10 p-1 h-auto rounded-2xl shadow-2xl">
                <TabsTrigger value="api" className="px-8 py-3 rounded-xl data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all text-slate-400">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    <span>API Tester</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger value="python" className="px-8 py-3 rounded-xl data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all text-slate-400">
                  <div className="flex items-center gap-2">
                    <Braces className="w-4 h-4" />
                    <span>Python SDK</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger value="javascript" className="px-8 py-3 rounded-xl data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all text-slate-400">
                  <div className="flex items-center gap-2">
                    <Code2 className="w-4 h-4" />
                    <span>JavaScript SDK</span>
                  </div>
                </TabsTrigger>
              </TabsList>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <TabsContent value="api" className="mt-0 focus-visible:outline-none">
                <div className="bg-[#00264D] rounded-3xl shadow-2xl border border-white/10 overflow-hidden">
                  <div className="p-6 border-b border-white/5 bg-white/5 flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-600 text-white">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white">Generative AI Hub Tester</h3>
                      <p className="text-xs text-slate-400">Test prompts against SAP-managed LLM deployments</p>
                    </div>
                  </div>
                  <APIPlayground />
                </div>
              </TabsContent>

              <TabsContent value="python" className="mt-0 focus-visible:outline-none">
                <div className="grid gap-8">
                  <div className="bg-[#00264D] rounded-3xl shadow-2xl border border-white/10 overflow-hidden">
                    <div className="p-6 border-b border-white/5 bg-white/5 flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-blue-600 text-white">
                        <Cpu className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white">Python Implementation Patterns</h3>
                        <p className="text-xs text-slate-400">Production-ready snippets for SAP AI Core</p>
                      </div>
                    </div>
                    <div className="p-6">
                      <CodeEditor 
                        title="Generative AI Hub (Python)"
                        language="python" 
                        defaultCode={PYTHON_EXAMPLES.generativeAI} 
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="javascript" className="mt-0 focus-visible:outline-none">
                <div className="bg-[#00264D] rounded-3xl shadow-2xl border border-white/10 overflow-hidden">
                  <div className="p-6 border-b border-white/5 bg-white/5 flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-600 text-white">
                      <Code2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white">Node.js / JavaScript SDK</h3>
                      <p className="text-xs text-slate-400">Integrate SAP AI into your CAP or web applications</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <CodeEditor 
                      title="Generative AI Hub (Node.js)"
                      language="javascript" 
                      defaultCode={JAVASCRIPT_EXAMPLES.generativeAI} 
                    />
                  </div>
                </div>
              </TabsContent>
            </motion.div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
