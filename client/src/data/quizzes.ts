export const quizzes = {
  1: [
    {
      id: 1,
      text: "What is the primary purpose of a Global Account in SAP BTP?",
      options: [
        "To run a single application instance",
        "To represent your organization's contract with SAP",
        "To store database tables only",
        "To manage user passwords"
      ],
      correctAnswer: 1,
      explanation: "A Global Account represents your commercial contract with SAP. It is the top-level container that holds all your subaccounts and entitlements."
    },
    {
      id: 2,
      text: "Which service is required to manage AI lifecycles on SAP BTP?",
      options: [
        "SAP HANA Cloud",
        "SAP Build Apps",
        "SAP AI Core",
        "SAP Integration Suite"
      ],
      correctAnswer: 2,
      explanation: "SAP AI Core is the service designed to handle the execution and operations of your AI assets, including training and serving models."
    },
    {
      id: 3,
      text: "How long is a standard SAP BTP Trial account valid for?",
      options: [
        "7 days",
        "30 days (renewable)",
        "1 year",
        "Forever"
      ],
      correctAnswer: 1,
      explanation: "SAP BTP Trial accounts are valid for 30 days but can be extended. If inactive, they may be suspended."
    }
  ],
  2: [
    {
      id: 1,
      text: "What is the role of the Generative AI Hub?",
      options: [
        "To train models from scratch",
        "To provide a unified API access to various LLMs",
        "To replace SAP HANA",
        "To generate images only"
      ],
      correctAnswer: 1,
      explanation: "The Generative AI Hub abstracts the complexity of different model providers, giving you a single API to access models like GPT-4, Claude, and others."
    },
    {
      id: 2,
      text: "Which parameter controls the randomness of an LLM's output?",
      options: [
        "Max Tokens",
        "Temperature",
        "Frequency Penalty",
        "Stop Sequence"
      ],
      correctAnswer: 1,
      explanation: "Temperature controls randomness. Low values (e.g., 0.2) make the output deterministic, while high values (e.g., 0.8) make it more creative."
    },
    {
      id: 3,
      text: "What is 'Prompt Engineering'?",
      options: [
        "Writing code in Python",
        "Designing hardware for AI",
        "Crafting inputs to guide LLMs to desired outputs",
        "Managing database schemas"
      ],
      correctAnswer: 2,
      explanation: "Prompt Engineering is the art and science of designing inputs (prompts) to get the most accurate, relevant, and safe outputs from an LLM."
    }
  ],
  3: [
    {
      id: 1,
      text: "What does RAG stand for?",
      options: [
        "Rapid AI Generation",
        "Retrieval-Augmented Generation",
        "Real-time Analytics Gateway",
        "Recursive Algorithm Graph"
      ],
      correctAnswer: 1,
      explanation: "RAG stands for Retrieval-Augmented Generation. It combines retrieving relevant data from a source and using it to augment the generation process of an LLM."
    },
    {
      id: 2,
      text: "Which SAP HANA Cloud engine is used for vector similarity search?",
      options: [
        "Calculation Engine",
        "Graph Engine",
        "Vector Engine",
        "Spatial Engine"
      ],
      correctAnswer: 2,
      explanation: "The SAP HANA Vector Engine is specifically designed to store high-dimensional vectors and perform fast similarity searches like Cosine Similarity."
    },
    {
      id: 3,
      text: "Why do we 'chunk' documents before embedding them?",
      options: [
        "To save storage space",
        "To fit within the LLM's context window and improve retrieval precision",
        "To encrypt the data",
        "To translate them into English"
      ],
      correctAnswer: 1,
      explanation: "Chunking breaks large documents into smaller, semantic pieces. This ensures that retrieved context fits into the LLM's limit and is highly relevant to the specific query."
    }
  ]
};
