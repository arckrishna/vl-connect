-- ==============================================================================
-- VESIT VL-CONNECT: Supabase Schema & Initial Projects Seed
-- Run this in your Supabase Project Dashboard -> SQL Editor -> 'New query' -> Run
-- ==============================================================================

-- 1. Create projects table
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  group_number INTEGER NOT NULL,
  original_group TEXT,
  title TEXT NOT NULL,
  students TEXT[] NOT NULL DEFAULT '{}',
  virtual_lab TEXT,
  feasibility TEXT,
  architecture TEXT,
  report TEXT,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create index
CREATE INDEX IF NOT EXISTS idx_projects_group_number ON public.projects(group_number);

-- 3. Enable Row-Level Security (RLS)
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- 4. Read Policy: Anyone (public / anonymous) can view projects
DROP POLICY IF EXISTS "Allow public read access to projects" ON public.projects;
CREATE POLICY "Allow public read access to projects"
  ON public.projects
  FOR SELECT
  TO public
  USING (true);

-- 5. Write Policy: Authenticated users can modify projects
DROP POLICY IF EXISTS "Allow authenticated users to insert/update projects" ON public.projects;
CREATE POLICY "Allow authenticated users to insert/update projects"
  ON public.projects
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 6. Insert all 25 official projects
TRUNCATE TABLE public.projects;

INSERT INTO public.projects (group_number, original_group, title, students, virtual_lab, feasibility, architecture, report)
VALUES
  (1, '3', 'RaftLab — Virtual Raft-Consolidated Append-Only Log Engine', ARRAY['Mamta Mirani', 'Trupti Kriplani']::TEXT[], 'https://raft-lab-beta.vercel.app/', 'https://docs.google.com/document/d/16CzRb5Od1UC-bVlkmuN73tEaTN6rEge1d_0a0XV0FE4/edit?usp=sharing', 'https://drive.google.com/file/d/1u9fveOle9P2JjIK4K1pbuyvaGs-lKzL-/view?usp=sharing', 'https://docs.google.com/document/d/1frxsJSDLEvTk1Qgc_908bGGsurInHH6af1m3Sumud5Y/edit?usp=sharing'),
  (2, '4', 'Geo-Distributed Active-Active Cache Cluster', ARRAY['Talha Mulani', 'Meet Phulwani']::TEXT[], 'https://system-design-virtual-lab.vercel.app/', 'https://docs.google.com/document/d/1xlVBZT3XgxLM7UXHq5mye7iApNcn-CGL/edit?usp=sharing&ouid=116469198765214722605&rtpof=true&sd=true', 'https://drive.google.com/file/d/1CC05rXr5k7orGQVX-XmGTI_SlvZrxx9-/view?usp=sharing', 'https://drive.google.com/file/d/13-TLQjkTaqVwFB8DhvJ_S9AhMsdqDIy2/view?usp=sharing'),
  (3, '5', 'TraceLab — Distributed Tracing & Telemetry Collector', ARRAY['Anuj Ghagare', 'Kunal Singh']::TEXT[], 'https://tracelabvl.netlify.app/', 'https://1drv.ms/w/c/8477c5e80e74da35/IQCuzFOxvEGGT5tVBa_1z2tUAZEAcJNaEeQxQ1wnUUcuU20?e=fNskH8', 'https://drive.google.com/file/d/1XhvmSLBSW9Vw1SMv30Bh5CYUdwrFduF8/view?usp=drive_link', 'https://1drv.ms/w/c/8477c5e80e74da35/IQAuLtC2Mb6ISLMg5hqyxadjAYrsAK1U1raj9fDbnhfbG68?e=d96auW'),
  (4, '6', 'Chunk-Level Storage Deduplication Engine', ARRAY['Shivam Ingulkar', 'Rushil shitut']::TEXT[], 'https://breakscale.tech/?s=SDuxZzGQICPBtg#k=4yj4wMvmaASruXAckss1lQ', 'https://docs.google.com/document/d/1grOFFKJ_zZq9RGnmO_rrTzhjnDEA24i9_9fYhEtl1-Y/edit?usp=sharing', 'https://drive.google.com/file/d/1sjIZ35XY0LGKtlXySlP9MAo32--5Hojg/view?usp=drivesdk', 'https://docs.google.com/document/d/1oO9VAg7h4cyrMJTApW0GqhPKIFzk1Qu_jKvWY7RdqMA/edit?usp=sharing'),
  (5, '7', 'Resilient Distributed DAG Orchestrator', ARRAY['Sahil Mirchandani', 'James Lijo']::TEXT[], 'https://resilient-dag-orchestrator.onrender.com/virtual-lab', 'https://drive.google.com/file/d/1MVIz1jLhWqcLD3wlKXRI4MdD8fgS1ARf/view?usp=drive_link', 'https://drive.google.com/file/d/1W2n91UqKs2RwjkKaoVYXtevYcvjxlmG_/view?usp=sharing', 'https://drive.google.com/file/d/1XZXDW2RqvJaAcsZqVx5XNrctonlNtpxx/view?usp=sharing'),
  (6, '8', 'CortexAI — Edge-Based Distributed Rate Limiting Middleware', ARRAY['Twinkle Gupta', 'Krish Bhandari']::TEXT[], 'https://breakscale.tech/?s=O31o-XdXgw-jeg#k=aLZZfzQjk8ea9ybn6fW_4A', 'https://drive.google.com/file/d/1u8mKoA6noQmu_GTjWSJb9_ZYF7owaZLX/view?usp=drivesdk', 'https://drive.google.com/file/d/118ePRGAjgg4E7k5nzeVvxsDhLLwIriTE/view?usp=sharing', 'https://docs.google.com/document/d/1yxts_WV5Wkq3q48VxpBsEr-xeM7BAR74sD-TblPVpUE/edit?usp=sharing'),
  (7, '9', 'ActorLab — Distributed Actor Runtime Virtual Lab', ARRAY['Mohd Adil Shaikh', 'Zaid Mulla']::TEXT[], 'https://actor-runtime-virtual-lab.netlify.app/', 'https://drive.google.com/file/d/1w45bNpTdhw1k7frwJPlYfCH3e84AxTxk/view?usp=sharing', 'https://drive.google.com/file/d/1rkvjOtzAZqOv66R4k6Fyb5Q-4006Mb4F/view?usp=sharing', 'https://drive.google.com/file/d/1g7YhupJK_VKpjurd3Pom8ygRKRVC8dNF/view?usp=sharing'),
  (8, '11', 'Partitioned Distributed Commit Log Broker', ARRAY['Khyati Keswani', 'Malika Makhija']::TEXT[], 'https://breakscale.tech/?utm_source=chatgpt.com&s=ONSaLW1Tvnn6yQ#k=wXejaT3IKGpTQSRm1xNIuw', 'https://drive.google.com/file/d/1dGKuJXV0st1P5ULF7mkhme3GMgSTwlr5/view?usp=drive_link', 'https://drive.google.com/file/d/1P6ltb-QM1K8URj9gsBoDBO8uVgMdZb7r/view?usp=sharing', 'https://drive.google.com/file/d/1sS3I6ncVlKsVlX6d8qvw_R3Uu_iW4tvR/view?usp=sharing'),
  (9, '13', 'Fault-Tolerant Distributed Lock Service', ARRAY['Tanmay Maniyar']::TEXT[], 'https://dist-lock-service-vlab.vercel.app/', 'https://docs.google.com/document/d/1iK6x0Zn9DDbzwQbUOHZ8cLAWaGbyYf2Y/edit?usp=drive_link&ouid=112281299164541948615&rtpof=true&sd=true', 'https://drive.google.com/file/d/1NMduRQRmXzq6Xg1Oi8BfEkEZqFKH7RgN/view?usp=drive_link', 'https://docs.google.com/document/d/1Nl58mQnrpQKWJepbur7oCiy3yXutJN_P/edit?usp=drive_link&ouid=112281299164541948615&rtpof=true&sd=true'),
  (10, '13', 'Distributed Lock Service Simulation', ARRAY['Prathamesh Shelar', 'Chandrabhanu Prusty']::TEXT[], 'https://breakscale.tech/?s=ccWDYrnjafwMuQ#k=pfZZaDLN-aqbWrJ_WDIx9Q', 'https://docs.google.com/document/d/1gQn1SJjVz_v0hdvlVOLwRQXZZ3D3nYXZQ4Ts7RVdVas/edit?usp=sharing', 'https://drive.google.com/file/d/1jfXwhRW-RrI2YEH9lwEmIcAs3WilLrAP/view?usp=sharing', 'https://docs.google.com/document/d/19e05Ohx_smSj2kcMIw0ypqgJqH0Son6NAs-gpp8cyMY/edit?usp=sharing'),
  (11, '14', 'SocketScale — Real-Time Pub/Sub WebSocket Gateway', ARRAY['Mahek Ahuja', 'Piyush Kandhari']::TEXT[], 'https://socketlab.vercel.app/', 'https://drive.google.com/file/d/1vKTBr8x5LF2efReGxMmRgghAc4X5bR9i/view?usp=sharing', 'https://drive.google.com/file/d/1BE40CsGue0Hxn0wq0kwGlFIQJYRwMyzd/view?usp=sharing', 'https://docs.google.com/document/d/1D_TqmkYdO5BpTnnp8kZ8ttvHuNLQxsoKbANeH851lpc/edit?usp=sharing'),
  (12, '15', 'Exactly-Once Event De-duplication Engine', ARRAY['Mohit Kotwal', 'Aayush Jadhav']::TEXT[], 'https://mohitto099.github.io/Exactly-Once-Event-Deduplication-Engine', 'https://docs.google.com/document/d/1BnQiuDVj6fFc1ZoKKsC023UOpLcO3IzfSSNzpFb4e7k/edit?usp=drivesdk', 'https://drive.google.com/file/d/18Kqnk3crL2F-FmQx8j9XzHihQ8t8EGWs/view?usp=drivesdk', 'https://docs.google.com/document/d/1PX-XC23-d6jRiR4z8Z6AYPCXsmUSd65Uf4eS55RpvEQ/edit?usp=drivesdk'),
  (13, '16', 'Dynamic L7 API Gateway & Reverse Proxy', ARRAY['Pranav Kule', 'Rishabh Jha']::TEXT[], 'https://breakscale.tech/?s=PuANS6iU35-KvQ#k=qj1btm6oSflFDO1LT__qRQ', 'https://docs.google.com/document/d/1U5UU4hGHOwfTpkX6bkjWe5v5HGtIvJ17IYg9j4tOB8k/edit?usp=sharing', 'https://drive.google.com/file/d/1PXVNLsMImFMQ5eF0sJI2p53mrl5PpQwt/view?usp=sharing', 'https://docs.google.com/document/d/13RNZT9FzJG5R1kxfgSWGn6bt2wbVl99v8HbXfnbvj04/edit?usp=sharing'),
  (14, '18', 'Dynamic Layer 7 (L7) API Gateway & Reverse Proxy Simulator', ARRAY['Partha Dongre', 'Shantanu Mokal']::TEXT[], 'https://l7-gateway-simulator.vercel.app/', 'https://docs.google.com/document/d/1NpZHqO4XVJrmKD6WBq7_8o534KDSSatFLZRFfbAytaI/edit?usp=sharing', 'https://drive.google.com/file/d/1J76u4prfN89RF7-Zcfya5KnA5tenfoMt/view?usp=sharing', 'https://docs.google.com/document/d/1h-MorwJsAR854XqMCcM-Yjr0XLsURvfT8KwqZieXLDA/edit?usp=sharing'),
  (15, '19', 'Chunk-Level Storage Deduplication Engine', ARRAY['Neilsen Vaz', 'Krishna Lohana']::TEXT[], 'https://breakscale.tech/?s=8pMPySiOi5Qvig#k=l_HoBkc_QEt1gATdX9E41A', 'https://docs.google.com/document/d/1dcXsDUAwxgPzN5WxtDpO6NUG6ShMFSsX/edit?usp=sharing&ouid=103982045611998576438&rtpof=true&sd=true', 'https://drive.google.com/file/d/1BTGUrKNPSOps31j0he_bi427l2eFckZ_/view?usp=sharing', 'https://docs.google.com/document/d/1E7o7-3voeLWMW7JQ5cwv0jG3qjQ9tuMt8X-Fsu2GnwU/edit?usp=sharing'),
  (16, '20', 'Fault-Tolerant Distributed Lock Service Simulation', ARRAY['kripa ahuja', 'aanchal ahuja']::TEXT[], 'https://breakscale.tech/?s=O0AMPTVBqgfdMA#k=x2J6nYSKkehjB9WOYffEyg', 'https://docs.google.com/document/d/1EnQ8Q0xrj1fwMd75db_Kg0mlIL88CvWW/edit?usp=sharing&ouid=108142653676572470237&rtpof=true&sd=true', 'https://drive.google.com/file/d/1JbWbu-qOxSTpVCn-A3UzFk1eK_4MGJri/view?usp=sharing', 'https://docs.google.com/document/d/1TXevWuoBFAriIRMxMi_DWhTgbfIyZFrm/edit?usp=sharing&ouid=108142653676572470237&rtpof=true&sd=true'),
  (17, '22', 'Distributed Event Ingestion & Worker Queue Pipeline', ARRAY['Ayush Pamnani', 'Palak Kingrani']::TEXT[], 'https://breakscale.tech/?s=Xc-GgWqS-asPHA#k=3aQniHFIqA98Q0xFwdZhmA', 'https://1drv.ms/w/c/e20e97aa11025a3e/IQCuOanATnUsTbc64PFGR-eeAQorb_EHyclH2G0PyR0xmiU?e=3DxpEI', 'https://1drv.ms/w/c/e20e97aa11025a3e/IQAyJHGvBR-3T5cd-3C13XCZAd1TbsRsCGV20Ki_MoJh7ic?e=Rf3c6k', 'https://1drv.ms/w/c/e20e97aa11025a3e/IQChAb4IqcE0RKRo2JqP8Cx1AZAonO6xno7U_1_C7YYty6k?e=LFdRCB'),
  (18, '23', 'Multi-Region Active-Passive Failover Controller', ARRAY['Darshan Kankekar', 'Chetna Ramnani']::TEXT[], 'https://failoverlab.netlify.app/', 'https://docs.google.com/document/d/1-HQtsyxuGASATk2lWnf5EmMkrWLioDoz/edit?usp=sharing&ouid=105732039565437281445&rtpof=true&sd=true', 'https://drive.google.com/file/d/1x9RCr8nuUdJlr2WVoRHr36yF9s4RTO8a/view?usp=sharing', 'https://docs.google.com/document/d/1iUFXhmog2gW-QbiF5B4LrFDJb-OA6Jdn/edit?usp=sharing&ouid=105732039565437281445&rtpof=true&sd=true'),
  (19, '24', 'StreamLab — Real-Time Streaming Window Metrics Aggregator', ARRAY['Ishika Gupta', 'Harshita Panjwani']::TEXT[], 'https://streamlabvl.netlify.app/', 'https://docs.google.com/document/d/1F2WjSQbpC-BOC6dNZQ_fCPC1NdNOcOYC/edit?usp=drivesdk&ouid=102601827939325501684&rtpof=true&sd=true', 'https://drive.google.com/file/d/1qvZ7JOLM_AN5CwU_CUSVRq0fDclKhvqH/view?usp=drivesdk', 'https://docs.google.com/document/d/1f1Je_sgiZXvp5LamCWouKGfLZre13hy1/edit?usp=drivesdk&ouid=102601827939325501684&rtpof=true&sd=true'),
  (20, '25', 'Distributed Log Aggregator & Indexer', ARRAY['Jeegnasa Makwana', 'Leena Chavan']::TEXT[], 'https://breakscale.tech/?s=jZRH_cpv35twVQ&utm_source=chatgpt.com#k=DH7cEolTXlKc3MgUgEmWGQ', 'https://docs.google.com/document/d/1Vg1dLyh-8b7j62pyqKn7ZelyUNWSlmbJ/edit?usp=drive_link&ouid=109785526487083907398&rtpof=true&sd=true', 'https://drive.google.com/file/d/1QdrgLIpxEx1bNztyRYogkfWjA9PIMaHu/view?usp=drive_link', 'https://docs.google.com/document/d/10Lp3OmW-A1xN_UBi13aPIMUfGGB8FqXy/edit?usp=drive_link&ouid=109785526487083907398&rtpof=true&sd=true'),
  (21, '28', 'Low-Latency Distributed Feature Flag Service', ARRAY['Kshitij giri', 'Shruti belani']::TEXT[], 'https://distributed-flag-simulator.vercel.app/', 'https://docs.google.com/document/d/1cyBKzq6guUWg6QrOdrF4j_LyBQW9BaEj/edit?usp=sharing&ouid=117447354812724724240&rtpof=true&sd=true', 'https://drive.google.com/file/d/13NnP-AIGikDbSA-uEzJwHbbtmVrAJdyb/view?usp=sharing', 'https://docs.google.com/document/d/1ayCEliNfhg8nfQUNlw61eLwUEPXr3GCt/edit?usp=sharing&ouid=117447354812724724240&rtpof=true&sd=true'),
  (22, '31', 'RegionGuard — Multi-Region Active-Passive Failover Controller', ARRAY['Palak Lund', 'Niyati Motiwani']::TEXT[], 'https://region-guard.vercel.app', 'https://drive.google.com/file/d/1ve_4qs5yaQocP9Xj_qxb_A36xgmvrlQ3/view?usp=drivesdk', 'https://drive.google.com/file/d/1gMdaBG6IP2LxeiKvW-WFAASYlGZg243R/view?usp=drivesdk', 'https://drive.google.com/file/d/1SAFCsZgBOLl0aONKAJ8AbwQT0r8b5hOO/view?usp=drivesdk'),
  (23, '34', 'Cross-Cloud Service Discovery Registry', ARRAY['Ketaki Patil', 'Swarangi Savekar']::TEXT[], 'https://breakscale.tech/?s=GZ3CUizVc9dxIw&utm_source=chatgpt.com#k=FaRLxgqryVBLwiZILdkIEg', 'https://docs.google.com/document/d/12YVUYUo-CDyd2qqc-9RAH075nCSaWJmobvuWmhQqH1I/edit?usp=sharing', 'https://drive.google.com/drive/folders/1b0WPH1OrzYrpTITkQdsfBlEE8mZctY1i?usp=sharing', 'https://docs.google.com/document/d/1bOaNiMuLeYbV8753wh_1aRqSRTdWiWwDr6AJesAWz4E/edit?usp=sharing'),
  (24, '35', 'Low-Latency Distributed Feature Flag Service', ARRAY['sumit', 'angad']::TEXT[], 'https://breakscale.tech/?s=7WW1Up2kPfiygg#k=dOjs0Xs5XGaBEy-0zqejPg', 'https://docs.google.com/document/d/1F2DY97fi4EUlKPK0kuTviN7nDx4ejkb6/edit?usp=drivesdk&ouid=106098027726614594997&rtpof=true&sd=true', 'https://drive.google.com/file/d/1tf43MCjVmJUBdBRbI6e8tSIGOCN2bKlG/view?usp=sharing', 'https://docs.google.com/document/d/1_OTYUEckHvz_rwhGR5mpMLxrPHkX4ngn/edit?usp=drivesdk&ouid=106098027726614594997&rtpof=true&sd=true'),
  (25, '46', 'Distributed Tracing & Telemetry Collector', ARRAY['Lavanya Reddy', 'Khushboo Choudhary']::TEXT[], 'https://breakscale.tech/?utm_source=chatgpt.com', 'https://drive.google.com/file/d/1bn_tdqb5CMZFhhOyy7oCcwiandvcjxdq/view?usp=sharing', 'https://drive.google.com/file/d/1CIwaDocrrF4Mi3K166xP8bqfFF0VnM9F/view?usp=sharing', 'https://docs.google.com/document/d/1NiAkGB4C1WOcWsi1lHAPuNjFDPvgdDWzcO_OI649DEs/edit?usp=sharing');
