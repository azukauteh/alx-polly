-- Enable pgcrypto for gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Polls table: one row per poll
CREATE TABLE IF NOT EXISTS polls (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner uuid REFERENCES auth.users(id) ON DELETE SET NULL, -- nullable owner
  title text NOT NULL,
  description text,
  is_public boolean NOT NULL DEFAULT true,
  allow_multiple boolean NOT NULL DEFAULT false, -- allow multiple choices per voter
  created_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz
);

-- Options table: each poll can have multiple options
CREATE TABLE IF NOT EXISTS poll_options (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  poll_id uuid NOT NULL REFERENCES polls(id) ON DELETE CASCADE,
  label text NOT NULL,
  position integer NOT NULL DEFAULT 0, -- ordering hint
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Votes table: one row per vote. Voter can be a registered user (voter_uuid) or anonymous (voter_token/ip)
CREATE TABLE IF NOT EXISTS votes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  poll_id uuid NOT NULL REFERENCES polls(id) ON DELETE CASCADE,
  option_id uuid NOT NULL REFERENCES poll_options(id) ON DELETE CASCADE,
  voter_uuid uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  voter_token text, -- opaque token for anonymous voters (optional)
  voter_ip text, -- store IP if needed for abuse detection (consider privacy/legal)
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Prevent duplicate registered-user votes per poll (enforced only when voter_uuid is set)
-- Note: NULLs are allowed multiple times; this prevents same auth user voting twice.
CREATE UNIQUE INDEX IF NOT EXISTS votes_poll_voter_unique
  ON votes (poll_id, voter_uuid)
  WHERE voter_uuid IS NOT NULL;

-- Optional: prevent duplicate anonymous token votes per poll (if you issue a token)
CREATE UNIQUE INDEX IF NOT EXISTS votes_poll_token_unique
  ON votes (poll_id, voter_token)
  WHERE voter_token IS NOT NULL;

-- Indexes to speed common aggregations/queries
CREATE INDEX IF NOT EXISTS idx_votes_poll_id ON votes (poll_id);
CREATE INDEX IF NOT EXISTS idx_votes_option_id ON votes (option_id);
CREATE INDEX IF NOT EXISTS idx_poll_options_poll_id ON poll_options (poll_id);

-- View: aggregated results per poll option
CREATE OR REPLACE VIEW poll_results AS
SELECT
  p.id AS poll_id,
  o.id AS option_id,
  o.label AS option_label,
  COUNT(v.id) AS votes_count
FROM polls p
JOIN poll_options o ON o.poll_id = p.id
LEFT JOIN votes v ON v.option_id = o.id
GROUP BY p.id, o.id, o.label;

-- NOTES:
-- - Apply Row Level Security (RLS) policies according to your auth rules in Supabase dashboard.
-- - Use server-side Supabase client (Server Actions) for inserts/transactions to enforce any business logic:
--   e.g., prevent voting after expires_at, enforce allow_multiple flag, validate poll ownership on edits.
-- - Run this file in Supabase SQL Editor or via psql connected to your Supabase DB.
