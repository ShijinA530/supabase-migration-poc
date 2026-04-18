ALTER TABLE public.adhan_audio
ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all to read"
ON public.adhan_audio
FOR SELECT
TO public
USING (true);

CREATE POLICY "Auth users can write"
ON public.adhan_audio
FOR ALL
TO authenticated
USING (auth.uid() IS NOT NULL)
WITH CHECK (auth.uid() IS NOT NULL);

ALTER TABLE public.district_t
ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.country_t
ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated to read"
ON public.country_t
FOR SELECT
TO authenticated
USING (true);

ALTER TABLE public.hijri_date_mapping
ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all to read"
ON public.hijri_date_mapping
FOR SELECT
TO public
USING (true);

CREATE POLICY "Auth users can write"
ON public.hijri_date_mapping
FOR ALL
TO authenticated
USING (auth.uid() IS NOT NULL)
WITH CHECK (auth.uid() IS NOT NULL);

ALTER TABLE public.hijri_dates
ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all to read"
ON public.hijri_dates
FOR SELECT
TO public
USING (true);

CREATE POLICY "Auth users can write"
ON public.hijri_dates
FOR ALL
TO authenticated
USING (auth.uid() IS NOT NULL)
WITH CHECK (auth.uid() IS NOT NULL);

ALTER TABLE public.hijri_month
ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all to read"
ON public.hijri_month
FOR SELECT
TO public
USING (true);

CREATE POLICY "Auth users can write"
ON public.hijri_month
FOR ALL
TO authenticated
USING (auth.uid() IS NOT NULL)
WITH CHECK (auth.uid() IS NOT NULL);

ALTER TABLE public.hijri_yearly_events
ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all to read"
ON public.hijri_yearly_events
FOR SELECT
TO public
USING (true);

CREATE POLICY "Auth users can write"
ON public.hijri_yearly_events
FOR ALL
TO authenticated
USING (auth.uid() IS NOT NULL)
WITH CHECK (auth.uid() IS NOT NULL);

ALTER TABLE public.layout
ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all to read"
ON public.layout
FOR SELECT
TO public
USING (true);

CREATE POLICY "Allow all to insert"
ON public.layout
FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Authenticated can update"
ON public.layout
FOR UPDATE
TO authenticated
USING (auth.uid() IS NOT NULL)
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated can delete"
ON public.layout
FOR DELETE
TO authenticated
USING (auth.uid() IS NOT NULL);

ALTER TABLE public.location_postnumber
ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all to read"
ON public.location_postnumber
FOR SELECT
TO public
USING (true);

CREATE POLICY "Auth users can write"
ON public.location_postnumber
FOR ALL
TO authenticated
USING (auth.uid() IS NOT NULL)
WITH CHECK (auth.uid() IS NOT NULL);

ALTER TABLE public.location_t
ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all to read"
ON public.location_t
FOR SELECT
TO public
USING (true);

CREATE POLICY "Auth users can write"
ON public.location_t
FOR ALL
TO authenticated
USING (auth.uid() IS NOT NULL)
WITH CHECK (auth.uid() IS NOT NULL);

ALTER TABLE public.logs
ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all to read"
ON public.logs
FOR SELECT
TO public
USING (true);

CREATE POLICY "Auth users can write"
ON public.logs
FOR INSERT
TO PUBLIC
WITH CHECK (true);

ALTER TABLE public.mosque_jamatperiode
ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all to read"
ON public.mosque_jamatperiode
FOR SELECT
TO public
USING (true);

CREATE POLICY "Auth users can write"
ON public.mosque_jamatperiode
FOR ALL
TO authenticated
USING (auth.uid() IS NOT NULL)
WITH CHECK (auth.uid() IS NOT NULL);

ALTER TABLE public.mosque_jummah
ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all to read"
ON public.mosque_jummah
FOR SELECT
TO public
USING (true);

CREATE POLICY "Auth users can write"
ON public.mosque_jummah
FOR ALL
TO authenticated
USING (auth.uid() IS NOT NULL)
WITH CHECK (auth.uid() IS NOT NULL);

ALTER TABLE public.mosque_t
ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all to read"
ON public.mosque_t
FOR SELECT
TO public
USING (true);

CREATE POLICY "Auth users can write"
ON public.mosque_t
FOR ALL
TO authenticated
USING (auth.uid() IS NOT NULL)
WITH CHECK (auth.uid() IS NOT NULL);

ALTER TABLE public.multimedia
ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all to read"
ON public.multimedia
FOR SELECT
TO public
USING (true);

CREATE POLICY "Auth users can write"
ON public.multimedia
FOR ALL
TO authenticated
USING (auth.uid() IS NOT NULL)
WITH CHECK (auth.uid() IS NOT NULL);

ALTER TABLE public.prayertime
ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all to read"
ON public.prayertime
FOR SELECT
TO public
USING (true);

ALTER TABLE public.roles_master
ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all to read"
ON public.roles_master
FOR SELECT
TO public
USING (true);

ALTER TABLE public.themes_master
ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all to read"
ON public.themes_master
FOR SELECT
TO public
USING (true);

ALTER TABLE public.users
ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all to read"
ON public.users
FOR SELECT
TO public
USING (true);

CREATE POLICY "Auth users can write"
ON public.users
FOR ALL
TO authenticated
USING (auth.uid() IS NOT NULL)
WITH CHECK (auth.uid() IS NOT NULL);

ALTER TABLE public.users_roles
ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all to read"
ON public.users_roles
FOR SELECT
TO public
USING (true);

CREATE POLICY "Auth users can write"
ON public.users_roles
FOR ALL
TO authenticated
USING (auth.uid() IS NOT NULL)
WITH CHECK (auth.uid() IS NOT NULL);