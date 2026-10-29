-- ==============================================================================
-- VESIT VL-CONNECT: Multi-Mentor Architecture Upgrade (Dr. Priya R. L. & Mr. Richard Joseph)
-- Run this script in Supabase Dashboard -> SQL Editor
-- ==============================================================================

-- 1. Ensure mentor column exists
ALTER TABLE projects ADD COLUMN IF NOT EXISTS mentor VARCHAR(100) DEFAULT 'Dr. Priya R. L.';

-- 2. Backfill existing 25 projects as Dr. Priya R. L.
UPDATE projects 
SET mentor = 'Dr. Priya R. L.' 
WHERE mentor IS NULL OR mentor = '';

-- 3. Ensure unique constraint on group_number for idempotent upserts
DO $$
BEGIN
  ALTER TABLE projects ADD CONSTRAINT projects_group_number_unique UNIQUE (group_number);
EXCEPTION
  WHEN duplicate_table OR duplicate_object THEN NULL;
END $$;

-- 4. Insert / Upsert Mr. Richard Joseph's 21 Projects

INSERT INTO projects (group_number, original_group, title, students, virtual_lab, feasibility, architecture, report, mentor)
VALUES (
  26,
  '02',
  'Multi tenant encrypted DB proxy engine',
  ARRAY['Ruturaj Amit Rajwade', 'Aayush Ajay Wanve'],
  'https://breakscale.tech/?s=xtcZJPGSEuJYLg#k=aeI-Gssx8x7JSn1OVgb11w',
  'https://docs.google.com/document/d/1faoYiqh9uGh35I_LRyCHeTCtQskxpAi5CP9HegwJCy0/edit?usp=sharing',
  'https://raw.githubusercontent.com/Aayush-coder1/legalvault/e257ba0055e811343a1c0c76cc6b252e431825cd/docs/architecture.svg',
  'https://docs.google.com/document/d/10_l2Z3ZQiaJC3yGPjYcZqnuyr3SCH7WBx5gmgyORa6M/edit?usp=sharing',
  'Mr. Richard Joseph'
)
ON CONFLICT (group_number) DO UPDATE SET
  original_group = EXCLUDED.original_group,
  title = EXCLUDED.title,
  students = EXCLUDED.students,
  virtual_lab = EXCLUDED.virtual_lab,
  feasibility = EXCLUDED.feasibility,
  architecture = EXCLUDED.architecture,
  report = EXCLUDED.report,
  mentor = EXCLUDED.mentor;

INSERT INTO projects (group_number, original_group, title, students, virtual_lab, feasibility, architecture, report, mentor)
VALUES (
  27,
  '03',
  'Dynamic L7 API Gateway & Reverse Proxy',
  ARRAY['Rahul Patil', 'Kushagra Kumar'],
  NULL,
  NULL,
  NULL,
  NULL,
  'Mr. Richard Joseph'
)
ON CONFLICT (group_number) DO UPDATE SET
  original_group = EXCLUDED.original_group,
  title = EXCLUDED.title,
  students = EXCLUDED.students,
  virtual_lab = EXCLUDED.virtual_lab,
  feasibility = EXCLUDED.feasibility,
  architecture = EXCLUDED.architecture,
  report = EXCLUDED.report,
  mentor = EXCLUDED.mentor;

INSERT INTO projects (group_number, original_group, title, students, virtual_lab, feasibility, architecture, report, mentor)
VALUES (
  28,
  '05',
  'Time-Series Storage & Ingestion Pipeline',
  ARRAY['Baibhav Pati'],
  'https://breakscale.tech/?s=wtik_Kx58n4vkA#k=qSXA6nER0mnod_sPZMD6Tw',
  'https://drive.google.com/file/d/1DnQK16muibLvlsRrloqN_xG6ViSP-0tJ/view?usp=sharing',
  'https://drive.google.com/file/d/1uZWOM7GHaTgrECobnQ2NxI6gcQ-0DNqq/view?usp=sharing',
  'https://drive.google.com/file/d/1w51p9aYI2feGCuhgSmKAMvmxQDXBCc8r/view?usp=sharing',
  'Mr. Richard Joseph'
)
ON CONFLICT (group_number) DO UPDATE SET
  original_group = EXCLUDED.original_group,
  title = EXCLUDED.title,
  students = EXCLUDED.students,
  virtual_lab = EXCLUDED.virtual_lab,
  feasibility = EXCLUDED.feasibility,
  architecture = EXCLUDED.architecture,
  report = EXCLUDED.report,
  mentor = EXCLUDED.mentor;

INSERT INTO projects (group_number, original_group, title, students, virtual_lab, feasibility, architecture, report, mentor)
VALUES (
  29,
  '08',
  'Multi tenant encrypted DB proxy engine',
  ARRAY['Aditya kukreja', 'Ronak Talreja'],
  'https://breakscale.tech/?s=5zADkRzYhVAX7g#k=ckjV-MYmuAj1XNymRGIlhg',
  'https://1drv.ms/w/c/2B545A2B3F062102/IQCisAYFYjAtT6AtMRBKrwktAVGq-WK1pM8VanBXBjDZQ8Q?e=VDptQa',
  'https://1drv.ms/b/c/2B545A2B3F062102/IQCFpwYz-2FkTppQ4twpH_JhAdZLRsM9ISA5YARgn3Znk6c?e=la9s2u',
  NULL,
  'Mr. Richard Joseph'
)
ON CONFLICT (group_number) DO UPDATE SET
  original_group = EXCLUDED.original_group,
  title = EXCLUDED.title,
  students = EXCLUDED.students,
  virtual_lab = EXCLUDED.virtual_lab,
  feasibility = EXCLUDED.feasibility,
  architecture = EXCLUDED.architecture,
  report = EXCLUDED.report,
  mentor = EXCLUDED.mentor;

INSERT INTO projects (group_number, original_group, title, students, virtual_lab, feasibility, architecture, report, mentor)
VALUES (
  30,
  '12',
  'Edge-Based Distributed Rate Limiting Middleware',
  ARRAY['Jagdish Padhi', 'Shlok Nemade'],
  NULL,
  'https://docs.google.com/document/d/1_gmHr-W4fQe7PPaHbgAdYYlUbr_6uyw7fYDLmcbf7II/edit?usp=drivesdk',
  'https://drive.google.com/file/d/1qOt90nhFvi5qpsflovju-JKIcrYlAFU8/view?usp=drivesdk',
  NULL,
  'Mr. Richard Joseph'
)
ON CONFLICT (group_number) DO UPDATE SET
  original_group = EXCLUDED.original_group,
  title = EXCLUDED.title,
  students = EXCLUDED.students,
  virtual_lab = EXCLUDED.virtual_lab,
  feasibility = EXCLUDED.feasibility,
  architecture = EXCLUDED.architecture,
  report = EXCLUDED.report,
  mentor = EXCLUDED.mentor;

INSERT INTO projects (group_number, original_group, title, students, virtual_lab, feasibility, architecture, report, mentor)
VALUES (
  31,
  '16',
  'Dynamic L7 Gateway API and Reverse Proxy',
  ARRAY['Tanishk Pati', 'Ayush Parab'],
  'https://breakscale.tech/?s=uhgjkQQyW0Ij3g#k=KK13NQL477X4vPADKlntgg',
  'https://docs.google.com/document/d/1Q3eAeDEeVRKrWB5o0CiyPr-If3ra3qzGl2CUwuIyfE8/edit?usp=sharing',
  NULL,
  'https://drive.google.com/file/d/1JB6jStIUCEIjdLbibLWzaYLinPCzpxlt/view?usp=drivesdk',
  'Mr. Richard Joseph'
)
ON CONFLICT (group_number) DO UPDATE SET
  original_group = EXCLUDED.original_group,
  title = EXCLUDED.title,
  students = EXCLUDED.students,
  virtual_lab = EXCLUDED.virtual_lab,
  feasibility = EXCLUDED.feasibility,
  architecture = EXCLUDED.architecture,
  report = EXCLUDED.report,
  mentor = EXCLUDED.mentor;

INSERT INTO projects (group_number, original_group, title, students, virtual_lab, feasibility, architecture, report, mentor)
VALUES (
  32,
  '17',
  'Edge CDN cache with origin shielding',
  ARRAY['Shreyash Singh', 'Rugved Vichare'],
  NULL,
  'https://docs.google.com/document/d/1P2HbtrmMd1v56XA4w-xG5bxpv-JT9LyWY6iSnOFhBXk/edit?usp=sharing',
  NULL,
  NULL,
  'Mr. Richard Joseph'
)
ON CONFLICT (group_number) DO UPDATE SET
  original_group = EXCLUDED.original_group,
  title = EXCLUDED.title,
  students = EXCLUDED.students,
  virtual_lab = EXCLUDED.virtual_lab,
  feasibility = EXCLUDED.feasibility,
  architecture = EXCLUDED.architecture,
  report = EXCLUDED.report,
  mentor = EXCLUDED.mentor;

INSERT INTO projects (group_number, original_group, title, students, virtual_lab, feasibility, architecture, report, mentor)
VALUES (
  33,
  '20',
  'Distributed Tracing & Telemetry Collector',
  ARRAY['Soham Raorane', 'Soumil Sethna'],
  NULL,
  'https://docs.google.com/document/d/1rVcPABs5ZcZPR-FLj_q_XxYLVjqlnAwpWCczfbQqdwI/edit?usp=sharing',
  NULL,
  NULL,
  'Mr. Richard Joseph'
)
ON CONFLICT (group_number) DO UPDATE SET
  original_group = EXCLUDED.original_group,
  title = EXCLUDED.title,
  students = EXCLUDED.students,
  virtual_lab = EXCLUDED.virtual_lab,
  feasibility = EXCLUDED.feasibility,
  architecture = EXCLUDED.architecture,
  report = EXCLUDED.report,
  mentor = EXCLUDED.mentor;

INSERT INTO projects (group_number, original_group, title, students, virtual_lab, feasibility, architecture, report, mentor)
VALUES (
  34,
  '21',
  'Sandboxed Multi-Tenant Code Execution Engine',
  ARRAY['Nikhil Wankhede', 'Saman Pandey'],
  NULL,
  NULL,
  NULL,
  NULL,
  'Mr. Richard Joseph'
)
ON CONFLICT (group_number) DO UPDATE SET
  original_group = EXCLUDED.original_group,
  title = EXCLUDED.title,
  students = EXCLUDED.students,
  virtual_lab = EXCLUDED.virtual_lab,
  feasibility = EXCLUDED.feasibility,
  architecture = EXCLUDED.architecture,
  report = EXCLUDED.report,
  mentor = EXCLUDED.mentor;

INSERT INTO projects (group_number, original_group, title, students, virtual_lab, feasibility, architecture, report, mentor)
VALUES (
  35,
  '24',
  'Streaming Window Metrics',
  ARRAY['Gayatri Agarwal'],
  'https://breakscale.tech/?s=JOYeRh8Q8pBTmQ#k=pTpDdAGjX7Awh9ZGqdLy9Q',
  'https://docs.google.com/document/d/12Un6KOLEUbphZWmgmIQWBXuW2AAtp7yqt39nYQcvenI/edit?tab=t.0#heading=h.vtlnuectlan2',
  'https://docs.google.com/document/d/17Or4UxhMV_Ruv1QYS6mM0fsghlrXgiCDZUz-Fas2nVY/edit?tab=t.0',
  'https://docs.google.com/document/d/1g1pcv0DNB7nCJ6GDLm94YLXSrrD1BnmhojsVZYEo6yo/edit?tab=t.0',
  'Mr. Richard Joseph'
)
ON CONFLICT (group_number) DO UPDATE SET
  original_group = EXCLUDED.original_group,
  title = EXCLUDED.title,
  students = EXCLUDED.students,
  virtual_lab = EXCLUDED.virtual_lab,
  feasibility = EXCLUDED.feasibility,
  architecture = EXCLUDED.architecture,
  report = EXCLUDED.report,
  mentor = EXCLUDED.mentor;

INSERT INTO projects (group_number, original_group, title, students, virtual_lab, feasibility, architecture, report, mentor)
VALUES (
  36,
  '26',
  'Multi-Cloud Service Mesh Data Plane Sidecar',
  ARRAY['Khushboo Talreja', 'Shreya Verma'],
  'https://breakscale.tech/?s=UrRB5mCmixWsoA#k=6yhxjLcu7wilz3c5K-6niQ',
  'https://docs.google.com/document/d/1k2VdFmJJUp_P4RN-roenI6ZjM4vI1XZSlHOhgoO2nFU/edit?usp=sharing',
  'https://drive.google.com/file/d/1y0uGTJj_97wxIUft-G9eF0Ba74D2xw3I/view?usp=drive_link',
  'https://docs.google.com/document/d/1XP5PFdZVax__D0YgkidzeBPwHsDpKnxf06t5FUu7xuk/edit?usp=sharing',
  'Mr. Richard Joseph'
)
ON CONFLICT (group_number) DO UPDATE SET
  original_group = EXCLUDED.original_group,
  title = EXCLUDED.title,
  students = EXCLUDED.students,
  virtual_lab = EXCLUDED.virtual_lab,
  feasibility = EXCLUDED.feasibility,
  architecture = EXCLUDED.architecture,
  report = EXCLUDED.report,
  mentor = EXCLUDED.mentor;

INSERT INTO projects (group_number, original_group, title, students, virtual_lab, feasibility, architecture, report, mentor)
VALUES (
  37,
  '27',
  'Real time pub/sub websocket gateway',
  ARRAY['Tanvi Jagade', 'Riya bhatt'],
  'https://breakscale.tech/?s=8D9H7lSpP5AEaA#k=pMQws3mPvZaZXCfIHufuyg',
  'https://docs.google.com/document/d/1yALme_Y0Q0zysGFcnM-R_eW9rBq56UBcqFEyPm3Tx3s/edit?usp=sharing',
  'https://drive.google.com/file/d/1QJK75gJI_ZNMYc1mh0P9D6Z96g1TTCKJ/view?usp=sharing',
  'https://docs.google.com/document/d/1DsmZZHWet8zwYIe0NJvgccsa3aiK4ofTVz9YML-I-78/edit?usp=sharing',
  'Mr. Richard Joseph'
)
ON CONFLICT (group_number) DO UPDATE SET
  original_group = EXCLUDED.original_group,
  title = EXCLUDED.title,
  students = EXCLUDED.students,
  virtual_lab = EXCLUDED.virtual_lab,
  feasibility = EXCLUDED.feasibility,
  architecture = EXCLUDED.architecture,
  report = EXCLUDED.report,
  mentor = EXCLUDED.mentor;

INSERT INTO projects (group_number, original_group, title, students, virtual_lab, feasibility, architecture, report, mentor)
VALUES (
  38,
  '28',
  'Low-Latency Distributed Feature Flag Service',
  ARRAY['Bhoomika Makhija', 'Purva Aruja'],
  'https://systemdesignstimulation.netlify.app/',
  'https://docs.google.com/document/d/1go_ULQpRDw9YX1xIa_UKSKJ5rb5bEW2z/edit?usp=sharing&ouid=116222605251192929325&rtpof=true&sd=true',
  'https://drive.google.com/file/d/1-NKILRQYhAcGyAQRDNm-MPY_dIRKF_QA/view?usp=sharing',
  'https://docs.google.com/document/d/1N2UoHOi9Whclfxov-HGWaa9D1wvtosCA/edit?usp=sharing&ouid=116222605251192929325&rtpof=true&sd=true',
  'Mr. Richard Joseph'
)
ON CONFLICT (group_number) DO UPDATE SET
  original_group = EXCLUDED.original_group,
  title = EXCLUDED.title,
  students = EXCLUDED.students,
  virtual_lab = EXCLUDED.virtual_lab,
  feasibility = EXCLUDED.feasibility,
  architecture = EXCLUDED.architecture,
  report = EXCLUDED.report,
  mentor = EXCLUDED.mentor;

INSERT INTO projects (group_number, original_group, title, students, virtual_lab, feasibility, architecture, report, mentor)
VALUES (
  39,
  '29',
  'Edge-Based Distributed Rate Limiting Middleware',
  ARRAY['Lavanya Gurbani', 'Anvi Patil'],
  NULL,
  'https://drive.google.com/file/d/1cQL0ZEL64sKUsfkj3Q4jKq-lHkdUUD0J/view?usp=sharing',
  'https://drive.google.com/drive/folders/131UeZvXjiPDCoPmb2Wb_8pa11XcUL61Q?usp=drive_link',
  'https://drive.google.com/file/d/13n5P7DmjV7GA8KqNiEw6WRgI-RuSh0rX/view?usp=sharing',
  'Mr. Richard Joseph'
)
ON CONFLICT (group_number) DO UPDATE SET
  original_group = EXCLUDED.original_group,
  title = EXCLUDED.title,
  students = EXCLUDED.students,
  virtual_lab = EXCLUDED.virtual_lab,
  feasibility = EXCLUDED.feasibility,
  architecture = EXCLUDED.architecture,
  report = EXCLUDED.report,
  mentor = EXCLUDED.mentor;

INSERT INTO projects (group_number, original_group, title, students, virtual_lab, feasibility, architecture, report, mentor)
VALUES (
  40,
  '30',
  'Chunk-Level Storage Deduplication Engine',
  ARRAY['Poorvaja Joshi', 'Bhoomi Singh'],
  'https://breakscale.tech/?s=CBwItcBcUo857w#k=7iuLP4KPPTnWEp_VI_HkOg',
  'https://docs.google.com/document/d/1cc2nAD0AD9iBf05Hl07E-V46afTDJOxF/edit?usp=sharing&ouid=115043821861994881963&rtpof=true&sd=true',
  'https://docs.google.com/document/d/1viy-OMu_C4eJ4UIf9_km4BtY6JaZoKIuGq2RQifeOxA/edit?usp=sharing',
  'https://docs.google.com/document/d/1HFYYaaAJhPQMuox_9Ypl9aktzanOoLtY/edit?usp=sharing&ouid=115043821861994881963&rtpof=true&sd=true',
  'Mr. Richard Joseph'
)
ON CONFLICT (group_number) DO UPDATE SET
  original_group = EXCLUDED.original_group,
  title = EXCLUDED.title,
  students = EXCLUDED.students,
  virtual_lab = EXCLUDED.virtual_lab,
  feasibility = EXCLUDED.feasibility,
  architecture = EXCLUDED.architecture,
  report = EXCLUDED.report,
  mentor = EXCLUDED.mentor;

INSERT INTO projects (group_number, original_group, title, students, virtual_lab, feasibility, architecture, report, mentor)
VALUES (
  41,
  '31',
  'Distributed Tracing & Telemetry Collector',
  ARRAY['muskan rohra', 'Tanvi kinger'],
  NULL,
  NULL,
  NULL,
  NULL,
  'Mr. Richard Joseph'
)
ON CONFLICT (group_number) DO UPDATE SET
  original_group = EXCLUDED.original_group,
  title = EXCLUDED.title,
  students = EXCLUDED.students,
  virtual_lab = EXCLUDED.virtual_lab,
  feasibility = EXCLUDED.feasibility,
  architecture = EXCLUDED.architecture,
  report = EXCLUDED.report,
  mentor = EXCLUDED.mentor;

INSERT INTO projects (group_number, original_group, title, students, virtual_lab, feasibility, architecture, report, mentor)
VALUES (
  42,
  '32',
  'Exactly -Once Event De-duplication Engine',
  ARRAY['heer dewani', 'yukta karwa'],
  'https://event-dedup-engine.netlify.app/',
  NULL,
  NULL,
  'https://docs.google.com/document/d/1ApMFvapqHz9owJ33lzVF7BZmaDF_4TLrHNTJZmNgUko/edit?usp=sharing',
  'Mr. Richard Joseph'
)
ON CONFLICT (group_number) DO UPDATE SET
  original_group = EXCLUDED.original_group,
  title = EXCLUDED.title,
  students = EXCLUDED.students,
  virtual_lab = EXCLUDED.virtual_lab,
  feasibility = EXCLUDED.feasibility,
  architecture = EXCLUDED.architecture,
  report = EXCLUDED.report,
  mentor = EXCLUDED.mentor;

INSERT INTO projects (group_number, original_group, title, students, virtual_lab, feasibility, architecture, report, mentor)
VALUES (
  43,
  '18',
  'Tiered edge caching hierarchy with request collapsing and origin',
  ARRAY['Lochna Paryani', 'Sanika Mejari'],
  'https://edge-cdn-virtual-lab.netlify.app/',
  'https://drive.google.com/file/d/14zhe_PiOGH2-FxMXkJynCXY_sXfnkWPT/view?usp=sharing',
  'https://drive.google.com/file/d/1KWVpoeZZV0P4XxXlGheU5oimaXGflNGf/view?usp=sharing',
  'https://drive.google.com/file/d/10wlkaKd1vmg2Jw6SkIKeDyspQg_3a5gJ/view?usp=sharing',
  'Mr. Richard Joseph'
)
ON CONFLICT (group_number) DO UPDATE SET
  original_group = EXCLUDED.original_group,
  title = EXCLUDED.title,
  students = EXCLUDED.students,
  virtual_lab = EXCLUDED.virtual_lab,
  feasibility = EXCLUDED.feasibility,
  architecture = EXCLUDED.architecture,
  report = EXCLUDED.report,
  mentor = EXCLUDED.mentor;

INSERT INTO projects (group_number, original_group, title, students, virtual_lab, feasibility, architecture, report, mentor)
VALUES (
  44,
  '19',
  'streaming window metrics aggregator',
  ARRAY['Reyansh Parchani', 'Piyush chug'],
  'https://breakscale.tech/?s=W1jFOM8ca_Od0Q#k=L-Z7i4l6r1eGBofcCwyGWQ',
  NULL,
  NULL,
  NULL,
  'Mr. Richard Joseph'
)
ON CONFLICT (group_number) DO UPDATE SET
  original_group = EXCLUDED.original_group,
  title = EXCLUDED.title,
  students = EXCLUDED.students,
  virtual_lab = EXCLUDED.virtual_lab,
  feasibility = EXCLUDED.feasibility,
  architecture = EXCLUDED.architecture,
  report = EXCLUDED.report,
  mentor = EXCLUDED.mentor;

INSERT INTO projects (group_number, original_group, title, students, virtual_lab, feasibility, architecture, report, mentor)
VALUES (
  45,
  '20',
  'Distributed Log Aggregator and Indexer',
  ARRAY['Aditya Bhosle', 'Bir Bhatia'],
  'https://breakscale.tech/?s=UpM8NB9E8sD5_A#k=eYeYnNRIzLxnQ7haClESEQ',
  'https://docs.google.com/document/d/1gE_x5UiuGwOO_nA7hHe3TmuUC0hspbFS4E1p3ChyVr4/edit?usp=sharing',
  'https://drive.google.com/file/d/1Ur8LVwMeuIbOFy5caSZ4kmLoJJZiWWlV/view?usp=sharing',
  'https://docs.google.com/document/d/1JgOIJ9c21vW8pPYm7Jt8G8r0xlX_bao_GUQAKBVqFac/edit?usp=sharing',
  'Mr. Richard Joseph'
)
ON CONFLICT (group_number) DO UPDATE SET
  original_group = EXCLUDED.original_group,
  title = EXCLUDED.title,
  students = EXCLUDED.students,
  virtual_lab = EXCLUDED.virtual_lab,
  feasibility = EXCLUDED.feasibility,
  architecture = EXCLUDED.architecture,
  report = EXCLUDED.report,
  mentor = EXCLUDED.mentor;

INSERT INTO projects (group_number, original_group, title, students, virtual_lab, feasibility, architecture, report, mentor)
VALUES (
  46,
  '13',
  'Fault-Tolerant Distributed Lock Service',
  ARRAY['Divyashree Bhagat'],
  'https://divyashreeb7.github.io/LockServiceSimulator/',
  'https://docs.google.com/document/d/1pE9pjCqfeQi3i63iiPXB6qRAZpQqcY-M/edit?usp=drive_link&ouid=107977398179170931087&rtpof=true&sd=true',
  'https://drive.google.com/file/d/1SadGURrLs5nTZ2YiVBDqIMr_lzOXtGeY/view?usp=drive_link',
  NULL,
  'Mr. Richard Joseph'
)
ON CONFLICT (group_number) DO UPDATE SET
  original_group = EXCLUDED.original_group,
  title = EXCLUDED.title,
  students = EXCLUDED.students,
  virtual_lab = EXCLUDED.virtual_lab,
  feasibility = EXCLUDED.feasibility,
  architecture = EXCLUDED.architecture,
  report = EXCLUDED.report,
  mentor = EXCLUDED.mentor;

-- Verification
SELECT mentor, count(*) as total_projects 
FROM projects 
GROUP BY mentor 
ORDER BY mentor;
