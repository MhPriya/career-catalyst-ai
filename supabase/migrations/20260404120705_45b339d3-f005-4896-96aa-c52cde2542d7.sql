
-- Blog posts table
CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL DEFAULT '',
  excerpt TEXT NOT NULL DEFAULT '',
  featured_image TEXT,
  tags TEXT[] DEFAULT '{}',
  meta_title TEXT,
  meta_description TEXT,
  published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Public can read published posts
CREATE POLICY "Anyone can read published posts"
ON public.blog_posts
FOR SELECT
TO public
USING (published = true);

-- Public can manage all posts (admin panel - no auth yet)
CREATE POLICY "Allow public insert"
ON public.blog_posts
FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Allow public update"
ON public.blog_posts
FOR UPDATE
TO public
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow public delete"
ON public.blog_posts
FOR DELETE
TO public
USING (true);

-- Storage bucket for blog images
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-images', 'blog-images', true);

-- Allow public uploads to blog-images bucket
CREATE POLICY "Allow public uploads to blog-images"
ON storage.objects
FOR INSERT
TO public
WITH CHECK (bucket_id = 'blog-images');

-- Allow public reads from blog-images bucket
CREATE POLICY "Allow public reads from blog-images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'blog-images');

-- Allow public deletes from blog-images bucket
CREATE POLICY "Allow public deletes from blog-images"
ON storage.objects
FOR DELETE
TO public
USING (bucket_id = 'blog-images');
