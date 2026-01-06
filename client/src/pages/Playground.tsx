import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import APIPlayground from '@/components/APIPlayground';
import CodeEditor from '@/components/CodeEditor';

const PYTHON_EXAMPLES = {
  generativeAI: `import requests
import json

# SAP BTP Generative AI Hub - Text Completion
def call_generative_ai_hub(query: str, model: str = "gpt-4") -> str:
    """
    Call the Generative AI Hub to generate text completions.
    
    Args:
        query: The user's question or prompt
        model: The LLM model to use (gpt-4, claude, etc.)
    
    Returns:
        The generated response from the LLM
    """
    api_url = "https://your-sap-btp-instance/api/v1/completions"
    
    headers = {
        "Authorization": "Bearer YOUR_TOKEN",
        "Content-Type": "application/json"
    }
    
    payload = {
        "model": model,
        "messages": [
            {
                "role": "system",
                "content": "You are a helpful assistant for SAP BTP AI solutions."
            },
            {
                "role": "user",
                "content": query
            }
        ],
        "temperature": 0.7,
        "max_tokens": 500
    }
    
    try:
        response = requests.post(api_url, headers=headers, json=payload)
        response.raise_for_status()
        
        result = response.json()
        return result["choices"][0]["message"]["content"]
    
    except requests.exceptions.RequestException as e:
        print(f"Error calling Generative AI Hub: {e}")
        return None

# Example usage
if __name__ == "__main__":
    query = "Explain how to deploy a custom LLM on SAP AI Core"
    response = call_generative_ai_hub(query)
    print(f"Query: {query}")
    print(f"Response: {response}")`,

  embeddings: `import requests
import json
from typing import List

# Generate embeddings for documents
def generate_embeddings(texts: List[str], model: str = "text-embedding-3-large") -> List[List[float]]:
    """
    Generate embeddings for a list of texts using SAP AI Core.
    
    Args:
        texts: List of text strings to embed
        model: The embedding model to use
    
    Returns:
        List of embedding vectors
    """
    api_url = "https://your-sap-btp-instance/api/v1/embeddings"
    
    headers = {
        "Authorization": "Bearer YOUR_TOKEN",
        "Content-Type": "application/json"
    }
    
    embeddings = []
    
    for text in texts:
        payload = {
            "input": text,
            "model": model
        }
        
        try:
            response = requests.post(api_url, headers=headers, json=payload)
            response.raise_for_status()
            
            result = response.json()
            embedding = result["data"][0]["embedding"]
            embeddings.append(embedding)
            print(f"✓ Generated embedding for: {text[:50]}...")
        
        except requests.exceptions.RequestException as e:
            print(f"Error generating embedding: {e}")
            embeddings.append(None)
    
    return embeddings

# Example usage
if __name__ == "__main__":
    documents = [
        "SAP AI Core is a service for deploying custom AI models",
        "Generative AI Hub provides access to large language models",
        "SAP HANA Vector Engine enables fast similarity search"
    ]
    
    embeddings = generate_embeddings(documents)
    print(f"Generated {len([e for e in embeddings if e])} embeddings")`,

  ragWithHana: `import requests
import json
from hdbcli import dbapi

# Retrieval-Augmented Generation with SAP HANA Vector Engine
class RAGSystem:
    def __init__(self, hana_host: str, hana_user: str, hana_password: str, api_token: str):
        self.hana_host = hana_host
        self.hana_user = hana_user
        self.hana_password = hana_password
        self.api_token = api_token
        self.embedding_api = "https://your-sap-btp-instance/api/v1/embeddings"
        self.llm_api = "https://your-sap-btp-instance/api/v1/completions"
    
    def connect_hana(self):
        """Connect to SAP HANA Cloud"""
        return dbapi.connect(
            address=self.hana_host,
            port=443,
            user=self.hana_user,
            password=self.hana_password,
            sslValidateCertificate=False
        )
    
    def get_embedding(self, text: str) -> List[float]:
        """Generate embedding for text"""
        headers = {
            "Authorization": f"Bearer {self.api_token}",
            "Content-Type": "application/json"
        }
        
        payload = {"input": text, "model": "text-embedding-3-large"}
        response = requests.post(self.embedding_api, headers=headers, json=payload)
        return response.json()["data"][0]["embedding"]
    
    def retrieve_documents(self, query: str, top_k: int = 3) -> List[str]:
        """Retrieve relevant documents from HANA using vector search"""
        query_embedding = self.get_embedding(query)
        
        connection = self.connect_hana()
        cursor = connection.cursor()
        
        cursor.execute("""
            SELECT content, COSINE_SIMILARITY(embedding, ?) as similarity
            FROM documents
            ORDER BY similarity DESC
            LIMIT ?
        """, (query_embedding, top_k))
        
        results = cursor.fetchall()
        connection.close()
        
        return [row[0] for row in results]
    
    def generate_answer(self, query: str) -> str:
        """Generate answer using RAG"""
        # Retrieve relevant documents
        documents = self.retrieve_documents(query)
        context = "\\n\\n".join(documents)
        
        # Call LLM with context
        headers = {
            "Authorization": f"Bearer {self.api_token}",
            "Content-Type": "application/json"
        }
        
        payload = {
            "model": "gpt-4",
            "messages": [
                {"role": "system", "content": "Answer based on the provided context."},
                {"role": "user", "content": f"Context:\\n{context}\\n\\nQuestion: {query}"}
            ],
            "temperature": 0.7,
            "max_tokens": 500
        }
        
        response = requests.post(self.llm_api, headers=headers, json=payload)
        return response.json()["choices"][0]["message"]["content"]

# Example usage
if __name__ == "__main__":
    rag = RAGSystem(
        hana_host="your-hana-host",
        hana_user="your-user",
        hana_password="your-password",
        api_token="YOUR_TOKEN"
    )
    
    query = "How do I deploy a custom model on SAP AI Core?"
    answer = rag.generate_answer(query)
    print(f"Q: {query}")
    print(f"A: {answer}")`,

  documentAI: `import requests
import json

# SAP Document AI - Extract information from documents
def extract_document_info(document_url: str, document_type: str = "invoice") -> dict:
    """
    Extract structured information from a document using SAP Document AI.
    
    Args:
        document_url: URL or path to the document
        document_type: Type of document (invoice, contract, receipt, etc.)
    
    Returns:
        Extracted information as a dictionary
    """
    api_url = "https://your-sap-btp-instance/api/v1/document-ai/extract"
    
    headers = {
        "Authorization": "Bearer YOUR_TOKEN",
        "Content-Type": "application/json"
    }
    
    # Define fields to extract based on document type
    extraction_fields = {
        "invoice": ["vendor_name", "invoice_number", "total_amount", "date", "line_items"],
        "contract": ["parties", "effective_date", "expiration_date", "key_terms"],
        "receipt": ["vendor_name", "transaction_date", "total_amount", "items"],
    }
    
    payload = {
        "document_url": document_url,
        "extraction_type": document_type,
        "fields": extraction_fields.get(document_type, [])
    }
    
    try:
        response = requests.post(api_url, headers=headers, json=payload)
        response.raise_for_status()
        
        result = response.json()
        print(f"✓ Successfully extracted {len(result['extractions'])} fields")
        return result["extractions"]
    
    except requests.exceptions.RequestException as e:
        print(f"Error extracting document: {e}")
        return {}

# Example usage
if __name__ == "__main__":
    document_url = "https://example.com/invoice.pdf"
    extracted_data = extract_document_info(document_url, "invoice")
    
    print("Extracted Information:")
    for field, value in extracted_data.items():
        print(f"  {field}: {value}")`,
};

const JAVASCRIPT_EXAMPLES = {
  generativeAI: `// SAP BTP Generative AI Hub - JavaScript/Node.js
const axios = require('axios');

async function callGenerativeAIHub(query, model = 'gpt-4') {
  const apiUrl = 'https://your-sap-btp-instance/api/v1/completions';
  
  const headers = {
    'Authorization': 'Bearer YOUR_TOKEN',
    'Content-Type': 'application/json'
  };
  
  const payload = {
    model: model,
    messages: [
      {
        role: 'system',
        content: 'You are a helpful assistant for SAP BTP AI solutions.'
      },
      {
        role: 'user',
        content: query
      }
    ],
    temperature: 0.7,
    max_tokens: 500
  };
  
  try {
    const response = await axios.post(apiUrl, payload, { headers });
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error calling Generative AI Hub:', error.message);
    return null;
  }
}

// Example usage
(async () => {
  const query = 'Explain SAP AI Core in simple terms';
  const response = await callGenerativeAIHub(query);
  console.log('Query:', query);
  console.log('Response:', response);
})();`,

  embeddings: `// Generate embeddings using SAP AI Core
const axios = require('axios');

async function generateEmbeddings(texts, model = 'text-embedding-3-large') {
  const apiUrl = 'https://your-sap-btp-instance/api/v1/embeddings';
  
  const headers = {
    'Authorization': 'Bearer YOUR_TOKEN',
    'Content-Type': 'application/json'
  };
  
  const embeddings = [];
  
  for (const text of texts) {
    const payload = {
      input: text,
      model: model
    };
    
    try {
      const response = await axios.post(apiUrl, payload, { headers });
      const embedding = response.data.data[0].embedding;
      embeddings.push(embedding);
      console.log(\`✓ Generated embedding for: \${text.substring(0, 50)}...\`);
    } catch (error) {
      console.error('Error generating embedding:', error.message);
      embeddings.push(null);
    }
  }
  
  return embeddings;
}

// Example usage
(async () => {
  const documents = [
    'SAP AI Core is a service for deploying custom AI models',
    'Generative AI Hub provides access to large language models',
    'SAP HANA Vector Engine enables fast similarity search'
  ];
  
  const embeddings = await generateEmbeddings(documents);
  console.log(\`Generated \${embeddings.filter(e => e).length} embeddings\`);
})();`,

  vectorSearch: `// Vector similarity search with SAP HANA
const axios = require('axios');

async function vectorSearch(query, topK = 3) {
  const apiUrl = 'https://your-sap-btp-instance/api/v1/vector-search';
  
  const headers = {
    'Authorization': 'Bearer YOUR_TOKEN',
    'Content-Type': 'application/json'
  };
  
  const payload = {
    query: query,
    top_k: topK,
    similarity_threshold: 0.7
  };
  
  try {
    const response = await axios.post(apiUrl, payload, { headers });
    const results = response.data.results;
    
    console.log(\`Found \${results.length} similar documents:\`);
    results.forEach((result, index) => {
      console.log(\`\${index + 1}. Similarity: \${result.similarity.toFixed(3)}\`);
      console.log(\`   Content: \${result.content.substring(0, 100)}...\`);
    });
    
    return results;
  } catch (error) {
    console.error('Error performing vector search:', error.message);
    return [];
  }
}

// Example usage
(async () => {
  const query = 'How do I deploy models on SAP AI Core?';
  const results = await vectorSearch(query, 5);
})();`,
};

const SQL_EXAMPLES = {
  vectorIndex: `-- Create table with vector embeddings in SAP HANA
CREATE TABLE documents (
    id NVARCHAR(36) PRIMARY KEY,
    content NCLOB,
    embedding REAL_VECTOR(1536),
    metadata NVARCHAR(2000),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create HNSW vector index for fast similarity search
CREATE VECTOR INDEX idx_embedding ON documents(embedding) 
    WITH (ALGORITHM = 'HNSW', METRIC = 'COSINE');

-- Insert sample documents with embeddings
INSERT INTO documents (id, content, embedding, metadata) 
VALUES (
    '1',
    'SAP AI Core is a service for deploying custom machine learning models',
    ARRAY[0.1, 0.2, 0.3, ...], -- 1536-dimensional vector
    '{\"source\": \"documentation\", \"type\": \"tutorial\"}'
);`,

  similaritySearch: `-- Find documents similar to a query using cosine similarity
SELECT 
    id,
    content,
    COSINE_SIMILARITY(embedding, ?) as similarity,
    metadata
FROM documents
WHERE COSINE_SIMILARITY(embedding, ?) > 0.7
ORDER BY similarity DESC
LIMIT 5;

-- Hybrid search combining vector and keyword matching
SELECT 
    id,
    content,
    COSINE_SIMILARITY(embedding, ?) as vector_score,
    CONTAINS(content, ?, LANGUAGE 'EN') as keyword_match,
    (COSINE_SIMILARITY(embedding, ?) * 0.7 + 
     CONTAINS(content, ?, LANGUAGE 'EN') * 0.3) as combined_score
FROM documents
WHERE COSINE_SIMILARITY(embedding, ?) > 0.5
   OR CONTAINS(content, ?, LANGUAGE 'EN') = 1
ORDER BY combined_score DESC
LIMIT 5;`,

  aggregation: `-- Aggregate statistics on document embeddings
SELECT 
    COUNT(*) as total_documents,
    AVG(COSINE_SIMILARITY(embedding, embedding)) as avg_similarity,
    MIN(COSINE_SIMILARITY(embedding, embedding)) as min_similarity,
    MAX(COSINE_SIMILARITY(embedding, embedding)) as max_similarity
FROM documents;

-- Find clusters of similar documents
SELECT 
    d1.id as doc1_id,
    d2.id as doc2_id,
    COSINE_SIMILARITY(d1.embedding, d2.embedding) as similarity
FROM documents d1
JOIN documents d2 ON d1.id < d2.id
WHERE COSINE_SIMILARITY(d1.embedding, d2.embedding) > 0.8
ORDER BY similarity DESC;`,
};

export default function Playground() {
  const [activeTab, setActiveTab] = useState('api');

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-12 space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-foreground">Interactive Playground</h1>
          <p className="text-lg text-muted-foreground">
            Test API calls, run code examples, and explore SAP BTP AI capabilities interactively.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="api">API Testing</TabsTrigger>
            <TabsTrigger value="python">Python</TabsTrigger>
            <TabsTrigger value="javascript">JavaScript</TabsTrigger>
            <TabsTrigger value="sql">SQL</TabsTrigger>
          </TabsList>

          <TabsContent value="api" className="space-y-6">
            <APIPlayground />
          </TabsContent>

          <TabsContent value="python" className="space-y-6">
            <Tabs defaultValue="generativeAI" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="generativeAI">Generative AI</TabsTrigger>
                <TabsTrigger value="embeddings">Embeddings</TabsTrigger>
                <TabsTrigger value="ragWithHana">RAG + HANA</TabsTrigger>
                <TabsTrigger value="documentAI">Document AI</TabsTrigger>
              </TabsList>

              <TabsContent value="generativeAI">
                <CodeEditor
                  title="Call Generative AI Hub"
                  description="Generate text completions using large language models"
                  language="python"
                  defaultCode={PYTHON_EXAMPLES.generativeAI}
                />
              </TabsContent>

              <TabsContent value="embeddings">
                <CodeEditor
                  title="Generate Embeddings"
                  description="Create vector embeddings for text documents"
                  language="python"
                  defaultCode={PYTHON_EXAMPLES.embeddings}
                />
              </TabsContent>

              <TabsContent value="ragWithHana">
                <CodeEditor
                  title="RAG with SAP HANA Vector Engine"
                  description="Implement retrieval-augmented generation with vector search"
                  language="python"
                  defaultCode={PYTHON_EXAMPLES.ragWithHana}
                />
              </TabsContent>

              <TabsContent value="documentAI">
                <CodeEditor
                  title="Extract Document Information"
                  description="Use Document AI to extract structured data from documents"
                  language="python"
                  defaultCode={PYTHON_EXAMPLES.documentAI}
                />
              </TabsContent>
            </Tabs>
          </TabsContent>

          <TabsContent value="javascript" className="space-y-6">
            <Tabs defaultValue="generativeAI" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="generativeAI">Generative AI</TabsTrigger>
                <TabsTrigger value="embeddings">Embeddings</TabsTrigger>
                <TabsTrigger value="vectorSearch">Vector Search</TabsTrigger>
              </TabsList>

              <TabsContent value="generativeAI">
                <CodeEditor
                  title="Call Generative AI Hub (Node.js)"
                  description="Generate text completions using axios HTTP client"
                  language="javascript"
                  defaultCode={JAVASCRIPT_EXAMPLES.generativeAI}
                />
              </TabsContent>

              <TabsContent value="embeddings">
                <CodeEditor
                  title="Generate Embeddings (Node.js)"
                  description="Create vector embeddings for documents"
                  language="javascript"
                  defaultCode={JAVASCRIPT_EXAMPLES.embeddings}
                />
              </TabsContent>

              <TabsContent value="vectorSearch">
                <CodeEditor
                  title="Vector Similarity Search"
                  description="Search for similar documents using vector embeddings"
                  language="javascript"
                  defaultCode={JAVASCRIPT_EXAMPLES.vectorSearch}
                />
              </TabsContent>
            </Tabs>
          </TabsContent>

          <TabsContent value="sql" className="space-y-6">
            <Tabs defaultValue="vectorIndex" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="vectorIndex">Vector Index</TabsTrigger>
                <TabsTrigger value="similaritySearch">Similarity Search</TabsTrigger>
                <TabsTrigger value="aggregation">Aggregation</TabsTrigger>
              </TabsList>

              <TabsContent value="vectorIndex">
                <CodeEditor
                  title="Create Vector Index in HANA"
                  description="Set up tables and indexes for vector embeddings"
                  language="sql"
                  defaultCode={SQL_EXAMPLES.vectorIndex}
                  readOnly
                />
              </TabsContent>

              <TabsContent value="similaritySearch">
                <CodeEditor
                  title="Vector Similarity Search Queries"
                  description="Query documents using cosine similarity and hybrid search"
                  language="sql"
                  defaultCode={SQL_EXAMPLES.similaritySearch}
                  readOnly
                />
              </TabsContent>

              <TabsContent value="aggregation">
                <CodeEditor
                  title="Vector Aggregation Queries"
                  description="Analyze and cluster vector embeddings"
                  language="sql"
                  defaultCode={SQL_EXAMPLES.aggregation}
                  readOnly
                />
              </TabsContent>
            </Tabs>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
