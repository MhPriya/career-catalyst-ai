CREATE TABLE public.bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  service_type text NOT NULL,
  booking_date date NOT NULL,
  time_slot text NOT NULL,
  amount integer NOT NULL,
  razorpay_order_id text,
  razorpay_payment_id text,
  payment_status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public inserts" ON public.bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public select own booking" ON public.bookings FOR SELECT USING (true);