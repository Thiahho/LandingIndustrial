CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS user_accounts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  display_name TEXT NOT NULL,
  role TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  actor TEXT NOT NULL,
  action TEXT NOT NULL,
  entity TEXT NOT NULL,
  entity_id TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS landing_contents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  hero_eyebrow TEXT NOT NULL,
  hero_title TEXT NOT NULL,
  hero_lead TEXT NOT NULL,
  hero_primary_cta TEXT NOT NULL,
  hero_secondary_cta TEXT NOT NULL,
  hero_contact_cta TEXT NOT NULL,
  hero_image_url TEXT NOT NULL,
  guidance_eyebrow TEXT NOT NULL,
  guidance_title TEXT NOT NULL,
  guidance_text TEXT NOT NULL,
  contact_eyebrow TEXT NOT NULL,
  contact_title TEXT NOT NULL,
  contact_text TEXT NOT NULL,
  contact_whatsapp TEXT NOT NULL,
  contact_commercial_email TEXT NOT NULL,
  jobs_eyebrow TEXT NOT NULL,
  jobs_title TEXT NOT NULL,
  jobs_text TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS hero_highlights (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  landing_content_id UUID NOT NULL REFERENCES landing_contents(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  text TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS guidance_tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  landing_content_id UUID NOT NULL REFERENCES landing_contents(id) ON DELETE CASCADE,
  value TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  landing_content_id UUID NOT NULL REFERENCES landing_contents(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS service_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  service_item_id UUID NOT NULL REFERENCES services(id) ON DELETE CASCADE,
  value TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS solutions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  landing_content_id UUID NOT NULL REFERENCES landing_contents(id) ON DELETE CASCADE,
  tag TEXT NOT NULL,
  title TEXT NOT NULL,
  text TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS technology_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  landing_content_id UUID NOT NULL REFERENCES landing_contents(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  text TEXT NOT NULL,
  meta TEXT NOT NULL,
  image_url TEXT
);

CREATE TABLE IF NOT EXISTS product_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  landing_content_id UUID NOT NULL REFERENCES landing_contents(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT
);

CREATE TABLE IF NOT EXISTS company_metrics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  landing_content_id UUID NOT NULL REFERENCES landing_contents(id) ON DELETE CASCADE,
  value TEXT NOT NULL,
  label TEXT NOT NULL,
  text TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS news_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  landing_content_id UUID NOT NULL REFERENCES landing_contents(id) ON DELETE CASCADE,
  date TEXT NOT NULL,
  title TEXT NOT NULL,
  text TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS contact_channels (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  landing_content_id UUID NOT NULL REFERENCES landing_contents(id) ON DELETE CASCADE,
  label TEXT NOT NULL,
  value TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS resources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  landing_content_id UUID NOT NULL REFERENCES landing_contents(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  href TEXT NOT NULL,
  description TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS jobs_points (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  landing_content_id UUID NOT NULL REFERENCES landing_contents(id) ON DELETE CASCADE,
  value TEXT NOT NULL
);
