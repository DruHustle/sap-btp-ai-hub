/**
 * Content Service
 * Implements Single Responsibility Principle by managing content operations
 * Follows Open/Closed Principle - extensible for new content types
 */

export interface ContentMetadata {
  title: string;
  description: string;
  lastUpdated: string;
  author: string;
}

export interface MarkdownContent {
  raw: string;
  html?: string;
  metadata?: ContentMetadata;
}

/**
 * Content service - handles content loading and processing
 * Follows Dependency Inversion Principle by exposing interfaces
 */
export class ContentService {
  /**
   * Load markdown content from a file path
   * @param path - The content file path
   * @returns Promise resolving to markdown content
   */
  static async loadMarkdown(path: string): Promise<MarkdownContent> {
    try {
      const response = await fetch(path);
      if (!response.ok) {
        throw new Error(`Failed to load content: ${response.statusText}`);
      }
      const raw = await response.text();
      return { raw };
    } catch (error) {
      console.error('Error loading markdown:', error);
      throw error;
    }
  }

  /**
   * Parse markdown metadata (frontmatter)
   * @param markdown - The markdown content
   * @returns Parsed metadata or null
   */
  static parseMetadata(markdown: string): ContentMetadata | null {
    const frontmatterRegex = /^---\n([\s\S]*?)\n---/;
    const match = markdown.match(frontmatterRegex);
    
    if (!match) {
      return null;
    }

    const frontmatter = match[1];
    const metadata: Partial<ContentMetadata> = {};

    frontmatter.split('\n').forEach((line) => {
      const [key, ...valueParts] = line.split(':');
      if (key && valueParts.length > 0) {
        const value = valueParts.join(':').trim();
        metadata[key.trim() as keyof ContentMetadata] = value;
      }
    });

    return metadata as ContentMetadata;
  }

  /**
   * Extract code blocks from markdown
   * @param markdown - The markdown content
   * @returns Array of code blocks with language info
   */
  static extractCodeBlocks(markdown: string): Array<{ language: string; code: string }> {
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    const blocks: Array<{ language: string; code: string }> = [];
    let match;

    while ((match = codeBlockRegex.exec(markdown)) !== null) {
      blocks.push({
        language: match[1] || 'text',
        code: match[2].trim(),
      });
    }

    return blocks;
  }

  /**
   * Extract headings from markdown
   * @param markdown - The markdown content
   * @returns Array of headings with level and text
   */
  static extractHeadings(markdown: string): Array<{ level: number; text: string; id: string }> {
    const headingRegex = /^(#{1,6})\s+(.+)$/gm;
    const headings: Array<{ level: number; text: string; id: string }> = [];
    let match;

    while ((match = headingRegex.exec(markdown)) !== null) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = text.toLowerCase().replace(/[^\w]+/g, '-');
      headings.push({ level, text, id });
    }

    return headings;
  }

  /**
   * Generate table of contents from markdown
   * @param markdown - The markdown content
   * @returns HTML string for table of contents
   */
  static generateTableOfContents(markdown: string): string {
    const headings = this.extractHeadings(markdown);
    
    if (headings.length === 0) {
      return '';
    }

    let toc = '<nav class="table-of-contents">\n<ul>\n';
    
    headings.forEach((heading) => {
      const indent = '  '.repeat(heading.level - 1);
      toc += `${indent}<li><a href="#${heading.id}">${heading.text}</a></li>\n`;
    });
    
    toc += '</ul>\n</nav>';
    return toc;
  }

  /**
   * Sanitize HTML content
   * @param html - The HTML string to sanitize
   * @returns Sanitized HTML string
   */
  static sanitizeHTML(html: string): string {
    // Basic sanitization - in production, use a library like DOMPurify
    const div = document.createElement('div');
    div.textContent = html;
    return div.innerHTML;
  }

  /**
   * Format code for syntax highlighting
   * @param code - The code string
   * @param language - The programming language
   * @returns Formatted code with language metadata
   */
  static formatCode(code: string, language: string): { code: string; language: string } {
    return {
      code: code.trim(),
      language: language || 'text',
    };
  }
}
