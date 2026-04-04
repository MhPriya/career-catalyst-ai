import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Calendar, Linkedin, MessageCircle, Share2, ArrowRight } from "lucide-react";

interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featured_image: string | null;
  tags: string[];
  meta_title: string | null;
  meta_description: string | null;
  created_at: string;
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [related, setRelated] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;
      const { data } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .maybeSingle();
      setPost(data);
      setLoading(false);

      if (data?.tags?.length) {
        const { data: rel } = await supabase
          .from("blog_posts")
          .select("*")
          .eq("published", true)
          .neq("id", data.id)
          .overlaps("tags", data.tags)
          .limit(3);
        setRelated(rel || []);
      }
    };
    fetchPost();
    window.scrollTo(0, 0);
  }, [slug]);

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareLinkedIn = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
  const shareWhatsApp = `https://wa.me/?text=${encodeURIComponent((post?.title || "") + " " + shareUrl)}`;

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 pt-28 pb-16 max-w-3xl">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-3/4" />
            <div className="h-64 bg-muted rounded" />
            <div className="h-4 bg-muted rounded w-full" />
            <div className="h-4 bg-muted rounded w-2/3" />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 pt-28 pb-16 text-center">
          <h1 className="font-heading text-3xl font-bold mb-4 text-foreground">Post Not Found</h1>
          <Link to="/blog">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Blog
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{post.meta_title || post.title} | BrandUp Blog</title>
        <meta name="description" content={post.meta_description || post.excerpt} />
        <meta property="og:title" content={post.meta_title || post.title} />
        <meta property="og:description" content={post.meta_description || post.excerpt} />
        {post.featured_image && <meta property="og:image" content={post.featured_image} />}
        <link rel="canonical" href={shareUrl} />
      </Helmet>
      <Navbar />
      <article className="container mx-auto px-4 pt-28 pb-16 max-w-3xl">
        <Link to="/blog" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to Blog
        </Link>

        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Calendar className="h-4 w-4" />
          {new Date(post.created_at).toLocaleDateString("en-IN", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>

        <h1 className="font-heading text-3xl md:text-4xl font-bold mb-6 text-foreground">{post.title}</h1>

        <div className="flex flex-wrap gap-2 mb-6">
          {(post.tags || []).map((tag) => (
            <Badge key={tag} variant="secondary">{tag}</Badge>
          ))}
        </div>

        {post.featured_image && (
          <div className="rounded-lg overflow-hidden mb-8">
            <img src={post.featured_image} alt={post.title} className="w-full object-cover" />
          </div>
        )}

        <div
          className="prose prose-lg max-w-none mb-10 text-foreground
            prose-headings:font-heading prose-headings:text-foreground
            prose-p:text-muted-foreground prose-a:text-primary
            prose-strong:text-foreground prose-li:text-muted-foreground"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Social Share */}
        <div className="flex items-center gap-3 border-t border-b border-border py-4 mb-10">
          <Share2 className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Share:</span>
          <a href={shareLinkedIn} target="_blank" rel="noopener noreferrer">
            <Button size="sm" variant="outline" className="gap-1.5">
              <Linkedin className="h-4 w-4" /> LinkedIn
            </Button>
          </a>
          <a href={shareWhatsApp} target="_blank" rel="noopener noreferrer">
            <Button size="sm" variant="outline" className="gap-1.5">
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </Button>
          </a>
        </div>

        {/* Related Posts */}
        {related.length > 0 && (
          <section>
            <h2 className="font-heading text-2xl font-bold mb-6 text-foreground">Related Posts</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {related.map((r) => (
                <Link key={r.id} to={`/blog/${r.slug}`}>
                  <Card className="group hover:shadow-md transition-all border-border/50 h-full">
                    {r.featured_image && (
                      <div className="aspect-video overflow-hidden rounded-t-lg">
                        <img src={r.featured_image} alt={r.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                      </div>
                    )}
                    <CardContent className="p-4">
                      <h3 className="font-heading font-semibold text-sm mb-1 text-foreground group-hover:text-primary transition-colors line-clamp-2">{r.title}</h3>
                      <span className="inline-flex items-center text-xs text-primary">
                        Read More <ArrowRight className="h-3 w-3 ml-1" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
      <Footer />
    </div>
  );
};

export default BlogPost;
