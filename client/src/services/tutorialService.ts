/**
 * Tutorial Service
 * Implements Single Responsibility Principle by managing tutorial data operations
 * Follows Open/Closed Principle - extensible for new tutorial types
 */

export interface Tutorial {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  category: string;
  tags: string[];
}

export interface TutorialContent {
  id: string;
  content: string;
  codeExamples?: CodeExample[];
  diagrams?: string[];
}

export interface CodeExample {
  language: string;
  code: string;
  description?: string;
}

/**
 * Tutorial service - handles all tutorial-related data operations
 * Follows Dependency Inversion Principle by exposing interfaces
 */
export class TutorialService {
  /**
   * Get all available tutorials
   * @returns Array of tutorial metadata
   */
  static getAllTutorials(): Tutorial[] {
    return [
      {
        id: 'getting-started',
        title: 'Getting Started with SAP BTP AI',
        description: 'Introduction to SAP Business Technology Platform AI services',
        difficulty: 'Beginner',
        duration: '15 min',
        category: 'Fundamentals',
        tags: ['SAP BTP', 'AI Core', 'Introduction'],
      },
      {
        id: 'ai-core-setup',
        title: 'Setting Up SAP AI Core',
        description: 'Step-by-step guide to configure SAP AI Core',
        difficulty: 'Intermediate',
        duration: '30 min',
        category: 'Setup',
        tags: ['SAP AI Core', 'Configuration', 'Setup'],
      },
      {
        id: 'generative-ai-hub',
        title: 'Generative AI Hub',
        description: 'Explore Generative AI capabilities on SAP BTP',
        difficulty: 'Intermediate',
        duration: '25 min',
        category: 'AI Services',
        tags: ['Generative AI', 'LLM', 'SAP BTP'],
      },
      {
        id: 'model-deployment',
        title: 'Deploying ML Models',
        description: 'Deploy and manage machine learning models',
        difficulty: 'Advanced',
        duration: '45 min',
        category: 'Deployment',
        tags: ['ML', 'Deployment', 'Production'],
      },
      {
        id: 'api-integration',
        title: 'API Integration',
        description: 'Integrate AI services with your applications',
        difficulty: 'Intermediate',
        duration: '35 min',
        category: 'Integration',
        tags: ['API', 'Integration', 'Development'],
      },
      {
        id: 'best-practices',
        title: 'AI Best Practices',
        description: 'Best practices for AI development on SAP BTP',
        difficulty: 'Advanced',
        duration: '40 min',
        category: 'Best Practices',
        tags: ['Best Practices', 'Architecture', 'Security'],
      },
    ];
  }

  /**
   * Get tutorial by ID
   * @param tutorialId - The tutorial identifier
   * @returns Tutorial metadata or null if not found
   */
  static getTutorialById(tutorialId: string): Tutorial | null {
    const tutorials = this.getAllTutorials();
    return tutorials.find((t) => t.id === tutorialId) || null;
  }

  /**
   * Get tutorials by category
   * @param category - The category to filter by
   * @returns Array of tutorials in the specified category
   */
  static getTutorialsByCategory(category: string): Tutorial[] {
    return this.getAllTutorials().filter((t) => t.category === category);
  }

  /**
   * Get tutorials by difficulty level
   * @param difficulty - The difficulty level to filter by
   * @returns Array of tutorials at the specified difficulty
   */
  static getTutorialsByDifficulty(
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  ): Tutorial[] {
    return this.getAllTutorials().filter((t) => t.difficulty === difficulty);
  }

  /**
   * Search tutorials by keyword
   * @param keyword - The search keyword
   * @returns Array of matching tutorials
   */
  static searchTutorials(keyword: string): Tutorial[] {
    const lowerKeyword = keyword.toLowerCase();
    return this.getAllTutorials().filter(
      (t) =>
        t.title.toLowerCase().includes(lowerKeyword) ||
        t.description.toLowerCase().includes(lowerKeyword) ||
        t.tags.some((tag) => tag.toLowerCase().includes(lowerKeyword))
    );
  }

  /**
   * Get all unique categories
   * @returns Array of category names
   */
  static getCategories(): string[] {
    const categories = this.getAllTutorials().map((t) => t.category);
    return Array.from(new Set(categories));
  }

  /**
   * Get all unique tags
   * @returns Array of tag names
   */
  static getTags(): string[] {
    const allTags = this.getAllTutorials().flatMap((t) => t.tags);
    return Array.from(new Set(allTags));
  }
}
