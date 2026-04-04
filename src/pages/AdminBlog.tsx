import { useEffect, useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, ArrowLeft, Upload, Eye, EyeOff } from "lucide-react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featured_image: string | null;
  tags: string[];
  meta_title: string | null;
  meta_description: string | null;
  published: boolean;
  created_at: string;
}

const emptyForm = {
  title: "",
  slug: "",
  content: "",
  excerpt: "",
  featured_image: null as string | null,
  tags: [] as string[],
  meta_title: "",
  meta_description: "",
  published: false,
};

const AdminBlog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState({ ...emptyForm });
  const [showForm, setShowForm] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchPosts = useCallback(async () => {
    const { data } = await supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });
    setPosts(data || []);
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const generateSlug = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const handleTitleChange = (title: string) => {
    setForm((f) => ({
      ...f,
      title,
      slug: editing ? f.slug : generateSlug(title),
    }));
  };

  const addTag = () => {
    const tag = tagInput.trim();
    if (tag && !form.tags.includes(tag)) {
      setForm((f) => ({ ...f, tags: [...f.tags, tag] }));
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setForm((f) => ({ ...f, tags: f.tags.filter((t) => t !== tag) }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("blog-images").upload(path, file);
    if (error) {
      toast.error("Image upload failed");
      setUploading(false);
      return;
    }
    const { data: urlData } = supabase.storage.from("blog-images").getPublicUrl(path);
    setForm((f) => ({ ...f, featured_image: urlData.publicUrl }));
    setUploading(false);
    toast.success("Image uploaded");
  };

  const handleSave = async () => {
    if (!form.title || !form.slug) {
      toast.error("Title and slug are required");
      return;
    }
    setSaving(true);
    const payload = {
      title: form.title,
      slug: form.slug,
      content: form.content,
      excerpt: form.excerpt,
      featured_image: form.featured_image,
      tags: form.tags,
      meta_title: form.meta_title || form.title,
      meta_description: form.meta_description || form.excerpt,
      published: form.published,
      updated_at: new Date().toISOString(),
    };

    if (editing) {
      const { error } = await supabase.from("blog_posts").update(payload).eq("id", editing);
      if (error) toast.error("Update failed");
      else toast.success("Post updated");
    } else {
      const { error } = await supabase.from("blog_posts").insert(payload);
      if (error) toast.error(error.message);
      else toast.success("Post created");
    }
    setSaving(false);
    setShowForm(false);
    setEditing(null);
    setForm({ ...emptyForm });
    fetchPosts();
  };

  const handleEdit = (post: BlogPost) => {
    setForm({
      title: post.title,
      slug: post.slug,
      content: post.content,
      excerpt: post.excerpt,
      featured_image: post.featured_image,
      tags: post.tags || [],
      meta_title: post.meta_title || "",
      meta_description: post.meta_description || "",
      published: post.published,
    });
    setEditing(post.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    await supabase.from("blog_posts").delete().eq("id", id);
    toast.success("Post deleted");
    fetchPosts();
  };

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["blockquote", "link", "image"],
      ["clean"],
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-28 pb-16 max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
            Blog <span className="gradient-text">Manager</span>
          </h1>
          {!showForm ? (
            <Button onClick={() => { setForm({ ...emptyForm }); setEditing(null); setShowForm(true); }} className="gradient-bg border-0 text-primary-foreground">
              <Plus className="h-4 w-4 mr-1" /> New Post
            </Button>
          ) : (
            <Button variant="outline" onClick={() => { setShowForm(false); setEditing(null); }}>
              <ArrowLeft className="h-4 w-4 mr-1" /> Back
            </Button>
          )}
        </div>

        {showForm ? (
          <Card>
            <CardContent className="p-6 space-y-5">
              <div>
                <Label>Title</Label>
                <Input value={form.title} onChange={(e) => handleTitleChange(e.target.value)} placeholder="Post title" maxLength={200} />
              </div>
              <div>
                <Label>Slug</Label>
                <Input value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))} placeholder="url-friendly-slug" maxLength={200} />
              </div>
              <div>
                <Label>Excerpt</Label>
                <Textarea value={form.excerpt} onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))} placeholder="Short description..." rows={2} maxLength={500} />
              </div>
              <div>
                <Label>Content</Label>
                <div className="bg-card rounded-lg border border-border">
                  <ReactQuill theme="snow" value={form.content} onChange={(val) => setForm((f) => ({ ...f, content: val }))} modules={quillModules} className="min-h-[200px]" />
                </div>
              </div>
              <div>
                <Label>Featured Image</Label>
                <div className="flex items-center gap-3 mt-1">
                  <label className="cursor-pointer">
                    <div className="flex items-center gap-2 px-4 py-2 border border-border rounded-md text-sm text-muted-foreground hover:bg-secondary transition-colors">
                      <Upload className="h-4 w-4" /> {uploading ? "Uploading..." : "Upload Image"}
                    </div>
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </label>
                  {form.featured_image && (
                    <img src={form.featured_image} alt="preview" className="h-16 w-24 object-cover rounded" />
                  )}
                </div>
              </div>
              <div>
                <Label>Tags</Label>
                <div className="flex items-center gap-2 mt-1">
                  <Input value={tagInput} onChange={(e) => setTagInput(e.target.value)} placeholder="Add tag" className="max-w-[200px]" onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())} maxLength={50} />
                  <Button variant="outline" size="sm" onClick={addTag}>Add</Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {form.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="cursor-pointer" onClick={() => removeTag(tag)}>
                      {tag} ×
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <Label>Meta Title</Label>
                <Input value={form.meta_title} onChange={(e) => setForm((f) => ({ ...f, meta_title: e.target.value }))} placeholder="SEO title (defaults to post title)" maxLength={60} />
              </div>
              <div>
                <Label>Meta Description</Label>
                <Textarea value={form.meta_description} onChange={(e) => setForm((f) => ({ ...f, meta_description: e.target.value }))} placeholder="SEO description (defaults to excerpt)" rows={2} maxLength={160} />
              </div>
              <div className="flex items-center gap-3">
                <Switch checked={form.published} onCheckedChange={(v) => setForm((f) => ({ ...f, published: v }))} />
                <Label className="mb-0">{form.published ? "Published" : "Draft"}</Label>
              </div>
              <Button onClick={handleSave} disabled={saving} className="gradient-bg border-0 text-primary-foreground w-full">
                {saving ? "Saving..." : editing ? "Update Post" : "Create Post"}
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {posts.length === 0 ? (
              <p className="text-center text-muted-foreground py-16">No blog posts yet. Create your first one!</p>
            ) : (
              posts.map((post) => (
                <Card key={post.id} className="border-border/50">
                  <CardContent className="p-4 flex items-center gap-4">
                    {post.featured_image && (
                      <img src={post.featured_image} alt="" className="h-16 w-24 object-cover rounded flex-shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-heading font-semibold text-foreground truncate">{post.title}</h3>
                        {post.published ? (
                          <Badge className="bg-green-500/10 text-green-600 border-green-500/20 flex-shrink-0">
                            <Eye className="h-3 w-3 mr-1" /> Live
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="flex-shrink-0">
                            <EyeOff className="h-3 w-3 mr-1" /> Draft
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{post.excerpt}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(post)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="text-destructive hover:text-destructive" onClick={() => handleDelete(post.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AdminBlog;
