-- Create buckets
insert into storage.buckets (id, name, public)
values
  ('general', 'general', true),
  ('mosques', 'mosques', true),
  ('theme-background-images', 'theme-background-images', true),
  ('theme-display-images', 'theme-display-images', true)
on conflict (id) do nothing;

-- Enable RLS for mosques bucket
create policy "Allow all operations on mosques bucket"
on storage.objects
for all
using (bucket_id = 'mosques')
with check (bucket_id = 'mosques');