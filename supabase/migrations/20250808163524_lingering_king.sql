/*
  # Update recommendations table for authenticated users

  1. Changes
    - Add `user_id` column to link recommendations to users
    - Update RLS policies to ensure users can only access their own recommendations
    - Allow anonymous users to create recommendations (for non-authenticated flow)

  2. Security
    - Enable RLS on `recommendations` table
    - Add policies for authenticated users to manage their own recommendations
    - Add policy for anonymous users to create recommendations
*/

-- Update recommendations table to include user_id
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'recommendations' AND column_name = 'user_id'
  ) THEN
    ALTER TABLE recommendations ADD COLUMN user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;
  END IF;
END $$;

-- Enable Row Level Security
ALTER TABLE recommendations ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users
CREATE POLICY "Authenticated users can read own recommendations"
  ON recommendations
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can create own recommendations"
  ON recommendations
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Authenticated users can update own recommendations"
  ON recommendations
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Authenticated users can delete own recommendations"
  ON recommendations
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Allow anonymous users to create recommendations (for guest flow)
CREATE POLICY "Anonymous users can create recommendations"
  ON recommendations
  FOR INSERT
  TO anon
  WITH CHECK (user_id IS NULL);

-- Allow anonymous users to read their own recommendations (by ID)
CREATE POLICY "Anonymous users can read recommendations by ID"
  ON recommendations
  FOR SELECT
  TO anon
  USING (user_id IS NULL);