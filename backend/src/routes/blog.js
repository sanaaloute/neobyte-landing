import express from "express";

const router = express.Router();

const blogPosts = [
  {
    id: "introduction-to-rag-chatbots",
    slug: "introduction-to-rag-chatbots",
    title: "Introduction to RAG-Powered Chatbots",
    excerpt:
      "Learn how Retrieval-Augmented Generation is revolutionizing conversational AI and enabling more accurate, context-aware chatbots.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
    author: "Alex Thompson",
    date: "2024-01-15",
    readTime: "5 min read",
    category: "AI & Machine Learning",
    content: `# Introduction to RAG-Powered Chatbots

Retrieval-Augmented Generation (RAG) is transforming the landscape of conversational AI. Unlike traditional chatbots that rely solely on their training data, RAG-powered chatbots can access and retrieve information from external knowledge bases in real-time.

## What is RAG?

RAG combines the power of large language models with information retrieval systems. When a user asks a question, the system:

1. Retrieves relevant information from a knowledge base
2. Augments the prompt with this context
3. Generates a response using the language model

This approach enables chatbots to provide accurate, up-to-date information without retraining the model.

## Benefits of RAG Chatbots

- **Accuracy**: Access to real-time, verified information
- **Context-Aware**: Understands your specific business domain
- **Cost-Effective**: No need for constant model retraining
- **Scalable**: Easy to update knowledge bases

## Implementation Considerations

When building a RAG chatbot, consider:

- Vector database selection (Pinecone, Weaviate, etc.)
- Embedding models for semantic search
- Chunking strategies for documents
- Prompt engineering for optimal responses

## Conclusion

RAG-powered chatbots represent the future of conversational AI, offering a perfect balance between intelligence and accuracy.`,
  },
  {
    id: "building-scalable-mobile-apps",
    slug: "building-scalable-mobile-apps",
    title: "Building Scalable Mobile Apps in 2024",
    excerpt:
      "Best practices and modern frameworks for developing mobile applications that scale with your business needs.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
    author: "Sarah Kim",
    date: "2024-01-10",
    readTime: "7 min read",
    category: "Mobile Development",
    content: `# Building Scalable Mobile Apps in 2024

Mobile app development has evolved significantly, and building scalable applications requires careful planning and the right technology choices.

## Key Considerations

- Architecture patterns (MVVM, Clean Architecture)
- State management solutions
- Performance optimization
- Scalable backend integration`,
  },
  {
    id: "ai-agents-automation",
    slug: "ai-agents-automation",
    title: "AI Agents: The Future of Workflow Automation",
    excerpt:
      "Discover how AI agents are transforming business processes and automating complex workflows with intelligence.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop",
    author: "Michael Rodriguez",
    date: "2024-01-05",
    readTime: "6 min read",
    category: "AI & Automation",
    content: `# AI Agents: The Future of Workflow Automation

AI agents are revolutionizing how businesses automate complex workflows and decision-making processes.

## What Are AI Agents?

AI agents are autonomous systems that can perform tasks, make decisions, and interact with other systems without constant human intervention.`,
  },
];

// GET /api/blog - Get all blog posts
router.get("/", (req, res) => {
  const { category, author } = req.query;
  
  let filteredPosts = blogPosts;
  
  if (category) {
    filteredPosts = filteredPosts.filter((p) =>
      p.category.toLowerCase().includes(category.toLowerCase())
    );
  }
  
  if (author) {
    filteredPosts = filteredPosts.filter((p) =>
      p.author.toLowerCase().includes(author.toLowerCase())
    );
  }

  res.json({
    success: true,
    data: filteredPosts,
    count: filteredPosts.length,
  });
});

// GET /api/blog/:slug - Get single blog post
router.get("/:slug", (req, res) => {
  const { slug } = req.params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return res.status(404).json({
      success: false,
      error: "Blog post not found",
    });
  }

  res.json({
    success: true,
    data: post,
  });
});

export default router;


