-- ============================================
-- Exeris Uitzendbureau — Supabase Schema (NL)
-- ============================================

-- Extensions
create extension if not exists "uuid-ossp";

-- ============================================
-- OPDRACHTGEVERS (klanten/bedrijven)
-- ============================================
create table opdrachtgevers (
  id uuid primary key default uuid_generate_v4(),
  naam text not null,
  kvk_nummer text unique,
  sector text,
  contactpersoon text,
  email text,
  telefoon text,
  adres text,
  postcode text,
  stad text,
  actief boolean default true,
  aangemaakt_op timestamptz default now(),
  bijgewerkt_op timestamptz default now()
);

-- ============================================
-- KANDIDATEN
-- ============================================
create table kandidaten (
  id uuid primary key default uuid_generate_v4(),
  voornaam text not null,
  achternaam text not null,
  email text unique not null,
  telefoon text,
  geboortedatum date,
  nationaliteit text,
  woonplaats text,
  postcode text,
  cv_url text,                        -- link naar opgeslagen CV
  beschikbaarheid text,               -- bijv. "per direct", "1 maand"
  uren_per_week int,                  -- gewenste uren
  gewenst_salaris_min numeric(10,2),
  gewenst_salaris_max numeric(10,2),
  opleidingsniveau text,              -- bijv. MBO, HBO, WO
  status text default 'actief',       -- actief | inactief | geplaatst
  notities text,
  aangemaakt_op timestamptz default now(),
  bijgewerkt_op timestamptz default now()
);

-- ============================================
-- VACATURES
-- ============================================
create table vacatures (
  id uuid primary key default uuid_generate_v4(),
  opdrachtgever_id uuid references opdrachtgevers(id) on delete set null,
  titel text not null,
  omschrijving text,
  sector text,
  stad text,
  uren_per_week int,
  salaris_min numeric(10,2),
  salaris_max numeric(10,2),
  opleidingsniveau text,
  contract_type text,                 -- tijdelijk | vast | zzp | uitzend
  status text default 'open',         -- open | ingevuld | gesloten
  publicatiedatum date default current_date,
  sluitingsdatum date,
  aangemaakt_op timestamptz default now(),
  bijgewerkt_op timestamptz default now()
);

-- ============================================
-- SOLLICITATIES (kandidaat → vacature)
-- ============================================
create table sollicitaties (
  id uuid primary key default uuid_generate_v4(),
  kandidaat_id uuid references kandidaten(id) on delete cascade,
  vacature_id uuid references vacatures(id) on delete cascade,
  status text default 'nieuw',        -- nieuw | in_behandeling | gesprek | afgewezen | aangenomen
  notities text,
  ingediend_op timestamptz default now(),
  bijgewerkt_op timestamptz default now(),
  unique(kandidaat_id, vacature_id)
);

-- ============================================
-- PLAATSINGEN (definitieve match)
-- ============================================
create table plaatsingen (
  id uuid primary key default uuid_generate_v4(),
  kandidaat_id uuid references kandidaten(id) on delete restrict,
  vacature_id uuid references vacatures(id) on delete restrict,
  opdrachtgever_id uuid references opdrachtgevers(id) on delete restrict,
  startdatum date not null,
  einddatum date,
  uren_per_week int,
  uurtarief numeric(10,2),
  status text default 'actief',       -- actief | afgerond | gestopt
  notities text,
  aangemaakt_op timestamptz default now(),
  bijgewerkt_op timestamptz default now()
);

-- ============================================
-- MEDEWERKERS (Exeris intern — dashboard users)
-- ============================================
create table medewerkers (
  id uuid primary key references auth.users(id) on delete cascade,
  voornaam text,
  achternaam text,
  email text unique not null,
  rol text default 'recruiter',       -- admin | recruiter | manager
  actief boolean default true,
  aangemaakt_op timestamptz default now()
);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

alter table opdrachtgevers   enable row level security;
alter table kandidaten        enable row level security;
alter table vacatures         enable row level security;
alter table sollicitaties     enable row level security;
alter table plaatsingen       enable row level security;
alter table medewerkers       enable row level security;

-- Alleen ingelogde medewerkers mogen alles lezen/schrijven
create policy "Medewerkers kunnen alles lezen"
  on opdrachtgevers for all
  using (auth.role() = 'authenticated');

create policy "Medewerkers kunnen alles lezen"
  on kandidaten for all
  using (auth.role() = 'authenticated');

create policy "Medewerkers kunnen alles lezen"
  on vacatures for all
  using (auth.role() = 'authenticated');

create policy "Medewerkers kunnen alles lezen"
  on sollicitaties for all
  using (auth.role() = 'authenticated');

create policy "Medewerkers kunnen alles lezen"
  on plaatsingen for all
  using (auth.role() = 'authenticated');

-- Medewerkers zien alleen hun eigen profiel, admins alles
create policy "Eigen profiel of admin"
  on medewerkers for select
  using (
    id = auth.uid()
    or exists (
      select 1 from medewerkers m
      where m.id = auth.uid() and m.rol = 'admin'
    )
  );

-- ============================================
-- AUTO-UPDATE bijgewerkt_op
-- ============================================
create or replace function update_bijgewerkt_op()
returns trigger as $$
begin
  new.bijgewerkt_op = now();
  return new;
end;
$$ language plpgsql;

create trigger trg_opdrachtgevers_update
  before update on opdrachtgevers
  for each row execute function update_bijgewerkt_op();

create trigger trg_kandidaten_update
  before update on kandidaten
  for each row execute function update_bijgewerkt_op();

create trigger trg_vacatures_update
  before update on vacatures
  for each row execute function update_bijgewerkt_op();

create trigger trg_sollicitaties_update
  before update on sollicitaties
  for each row execute function update_bijgewerkt_op();

create trigger trg_plaatsingen_update
  before update on plaatsingen
  for each row execute function update_bijgewerkt_op();

-- ============================================
-- INDEXEN (snelheid)
-- ============================================
create index on kandidaten(status);
create index on vacatures(status);
create index on vacatures(opdrachtgever_id);
create index on sollicitaties(kandidaat_id);
create index on sollicitaties(vacature_id);
create index on plaatsingen(kandidaat_id);
create index on plaatsingen(opdrachtgever_id);
