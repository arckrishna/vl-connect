export type RawProject = {
  group?: string;
  title?: string;
  projectTitle?: string;
  student1?: string;
  student2?: string;
  virtualLab?: string;
  feasibility?: string;
  architecture?: string;
  report?: string;
  mentor?: string;
};

export const initialRawProjects: RawProject[] = [
  {
    "group": "3",
    "title": "RaftLab — Virtual Raft-Consolidated Append-Only Log Engine",
    "student1": "Mamta Mirani",
    "student2": "Trupti Kriplani",
    "virtualLab": "https://raft-lab-beta.vercel.app/",
    "feasibility": "https://docs.google.com/document/d/16CzRb5Od1UC-bVlkmuN73tEaTN6rEge1d_0a0XV0FE4/edit?usp=sharing",
    "architecture": "https://drive.google.com/file/d/1u9fveOle9P2JjIK4K1pbuyvaGs-lKzL-/view?usp=sharing",
    "report": "https://docs.google.com/document/d/1frxsJSDLEvTk1Qgc_908bGGsurInHH6af1m3Sumud5Y/edit?usp=sharing",
    "mentor": "Dr. Priya R. L."
  },
  {
    "group": "4",
    "title": "Geo-Distributed Active-Active Cache Cluster",
    "student1": "Talha Mulani",
    "student2": "Meet Phulwani",
    "virtualLab": "https://system-design-virtual-lab.vercel.app/",
    "feasibility": "https://docs.google.com/document/d/1xlVBZT3XgxLM7UXHq5mye7iApNcn-CGL/edit?usp=sharing&ouid=116469198765214722605&rtpof=true&sd=true",
    "architecture": "https://drive.google.com/file/d/1CC05rXr5k7orGQVX-XmGTI_SlvZrxx9-/view?usp=sharing",
    "report": "https://drive.google.com/file/d/13-TLQjkTaqVwFB8DhvJ_S9AhMsdqDIy2/view?usp=sharing",
    "mentor": "Dr. Priya R. L."
  },
  {
    "group": "5",
    "title": "TraceLab — Distributed Tracing & Telemetry Collector",
    "student1": "Anuj Ghagare",
    "student2": "Kunal Singh",
    "virtualLab": "https://tracelabvl.netlify.app/",
    "feasibility": "https://1drv.ms/w/c/8477c5e80e74da35/IQCuzFOxvEGGT5tVBa_1z2tUAZEAcJNaEeQxQ1wnUUcuU20?e=fNskH8",
    "architecture": "https://drive.google.com/file/d/1XhvmSLBSW9Vw1SMv30Bh5CYUdwrFduF8/view?usp=drive_link",
    "report": "https://1drv.ms/w/c/8477c5e80e74da35/IQAuLtC2Mb6ISLMg5hqyxadjAYrsAK1U1raj9fDbnhfbG68?e=d96auW",
    "mentor": "Dr. Priya R. L."
  },
  {
    "group": "6",
    "title": "Chunk-Level Storage Deduplication Engine",
    "student1": "Shivam Ingulkar",
    "student2": "Rushil shitut",
    "virtualLab": "https://breakscale.tech/?s=SDuxZzGQICPBtg#k=4yj4wMvmaASruXAckss1lQ",
    "feasibility": "https://docs.google.com/document/d/1grOFFKJ_zZq9RGnmO_rrTzhjnDEA24i9_9fYhEtl1-Y/edit?usp=sharing",
    "architecture": "https://drive.google.com/file/d/1sjIZ35XY0LGKtlXySlP9MAo32--5Hojg/view?usp=drivesdk",
    "report": "https://docs.google.com/document/d/1oO9VAg7h4cyrMJTApW0GqhPKIFzk1Qu_jKvWY7RdqMA/edit?usp=sharing",
    "mentor": "Dr. Priya R. L."
  },
  {
    "group": "7",
    "title": "Resilient Distributed DAG Orchestrator",
    "student1": "Sahil Mirchandani",
    "student2": "James Lijo",
    "virtualLab": "https://resilient-dag-orchestrator.onrender.com/virtual-lab",
    "feasibility": "https://drive.google.com/file/d/1MVIz1jLhWqcLD3wlKXRI4MdD8fgS1ARf/view?usp=drive_link",
    "architecture": "https://drive.google.com/file/d/1W2n91UqKs2RwjkKaoVYXtevYcvjxlmG_/view?usp=sharing",
    "report": "https://drive.google.com/file/d/1XZXDW2RqvJaAcsZqVx5XNrctonlNtpxx/view?usp=sharing",
    "mentor": "Dr. Priya R. L."
  },
  {
    "group": "8",
    "title": "CortexAI — Edge-Based Distributed Rate Limiting Middleware",
    "student1": "Twinkle Gupta",
    "student2": "Krish Bhandari",
    "virtualLab": "https://breakscale.tech/?s=O31o-XdXgw-jeg#k=aLZZfzQjk8ea9ybn6fW_4A",
    "feasibility": "https://drive.google.com/file/d/1u8mKoA6noQmu_GTjWSJb9_ZYF7owaZLX/view?usp=drivesdk",
    "architecture": "https://drive.google.com/file/d/118ePRGAjgg4E7k5nzeVvxsDhLLwIriTE/view?usp=sharing",
    "report": "https://docs.google.com/document/d/1yxts_WV5Wkq3q48VxpBsEr-xeM7BAR74sD-TblPVpUE/edit?usp=sharing",
    "mentor": "Dr. Priya R. L."
  },
  {
    "group": "9",
    "title": "ActorLab — Distributed Actor Runtime Virtual Lab",
    "student1": "Mohd Adil Shaikh",
    "student2": "Zaid Mulla",
    "virtualLab": "https://actor-runtime-virtual-lab.netlify.app/",
    "feasibility": "https://drive.google.com/file/d/1w45bNpTdhw1k7frwJPlYfCH3e84AxTxk/view?usp=sharing",
    "architecture": "https://drive.google.com/file/d/1rkvjOtzAZqOv66R4k6Fyb5Q-4006Mb4F/view?usp=sharing",
    "report": "https://drive.google.com/file/d/1g7YhupJK_VKpjurd3Pom8ygRKRVC8dNF/view?usp=sharing",
    "mentor": "Dr. Priya R. L."
  },
  {
    "group": "11",
    "title": "Partitioned Distributed Commit Log Broker",
    "student1": "Khyati Keswani",
    "student2": "Malika Makhija",
    "virtualLab": "https://breakscale.tech/?utm_source=chatgpt.com&s=ONSaLW1Tvnn6yQ#k=wXejaT3IKGpTQSRm1xNIuw",
    "feasibility": "https://drive.google.com/file/d/1dGKuJXV0st1P5ULF7mkhme3GMgSTwlr5/view?usp=drive_link",
    "architecture": "https://drive.google.com/file/d/1P6ltb-QM1K8URj9gsBoDBO8uVgMdZb7r/view?usp=sharing",
    "report": "https://drive.google.com/file/d/1sS3I6ncVlKsVlX6d8qvw_R3Uu_iW4tvR/view?usp=sharing",
    "mentor": "Dr. Priya R. L."
  },
  {
    "group": "13",
    "title": "Fault-Tolerant Distributed Lock Service",
    "student1": "Tanmay Maniyar",
    "student2": "",
    "virtualLab": "https://dist-lock-service-vlab.vercel.app/",
    "feasibility": "https://docs.google.com/document/d/1iK6x0Zn9DDbzwQbUOHZ8cLAWaGbyYf2Y/edit?usp=drive_link&ouid=112281299164541948615&rtpof=true&sd=true",
    "architecture": "https://drive.google.com/file/d/1NMduRQRmXzq6Xg1Oi8BfEkEZqFKH7RgN/view?usp=drive_link",
    "report": "https://docs.google.com/document/d/1Nl58mQnrpQKWJepbur7oCiy3yXutJN_P/edit?usp=drive_link&ouid=112281299164541948615&rtpof=true&sd=true",
    "mentor": "Dr. Priya R. L."
  },
  {
    "group": "13",
    "title": "Distributed Lock Service Simulation",
    "student1": "Prathamesh Shelar",
    "student2": "Chandrabhanu Prusty",
    "virtualLab": "https://breakscale.tech/?s=ccWDYrnjafwMuQ#k=pfZZaDLN-aqbWrJ_WDIx9Q",
    "feasibility": "https://docs.google.com/document/d/1gQn1SJjVz_v0hdvlVOLwRQXZZ3D3nYXZQ4Ts7RVdVas/edit?usp=sharing",
    "architecture": "https://drive.google.com/file/d/1jfXwhRW-RrI2YEH9lwEmIcAs3WilLrAP/view?usp=sharing",
    "report": "https://docs.google.com/document/d/19e05Ohx_smSj2kcMIw0ypqgJqH0Son6NAs-gpp8cyMY/edit?usp=sharing",
    "mentor": "Dr. Priya R. L."
  },
  {
    "group": "14",
    "title": "SocketScale — Real-Time Pub/Sub WebSocket Gateway",
    "student1": "Mahek Ahuja ",
    "student2": "Piyush Kandhari ",
    "virtualLab": "https://socketlab.vercel.app/",
    "feasibility": "https://drive.google.com/file/d/1vKTBr8x5LF2efReGxMmRgghAc4X5bR9i/view?usp=sharing",
    "architecture": "https://drive.google.com/file/d/1BE40CsGue0Hxn0wq0kwGlFIQJYRwMyzd/view?usp=sharing",
    "report": "https://docs.google.com/document/d/1D_TqmkYdO5BpTnnp8kZ8ttvHuNLQxsoKbANeH851lpc/edit?usp=sharing",
    "mentor": "Dr. Priya R. L."
  },
  {
    "group": "15",
    "title": "Exactly-Once Event De-duplication Engine",
    "student1": "Mohit Kotwal ",
    "student2": "Aayush Jadhav ",
    "virtualLab": "https://mohitto099.github.io/Exactly-Once-Event-Deduplication-Engine",
    "feasibility": "https://docs.google.com/document/d/1BnQiuDVj6fFc1ZoKKsC023UOpLcO3IzfSSNzpFb4e7k/edit?usp=drivesdk",
    "architecture": "https://drive.google.com/file/d/18Kqnk3crL2F-FmQx8j9XzHihQ8t8EGWs/view?usp=drivesdk",
    "report": "https://docs.google.com/document/d/1PX-XC23-d6jRiR4z8Z6AYPCXsmUSd65Uf4eS55RpvEQ/edit?usp=drivesdk",
    "mentor": "Dr. Priya R. L."
  },
  {
    "group": "16",
    "title": "Dynamic L7 API Gateway & Reverse Proxy",
    "student1": "Pranav Kule",
    "student2": "Rishabh Jha",
    "virtualLab": "https://breakscale.tech/?s=PuANS6iU35-KvQ#k=qj1btm6oSflFDO1LT__qRQ",
    "feasibility": "https://docs.google.com/document/d/1U5UU4hGHOwfTpkX6bkjWe5v5HGtIvJ17IYg9j4tOB8k/edit?usp=sharing",
    "architecture": "https://drive.google.com/file/d/1PXVNLsMImFMQ5eF0sJI2p53mrl5PpQwt/view?usp=sharing",
    "report": "https://docs.google.com/document/d/13RNZT9FzJG5R1kxfgSWGn6bt2wbVl99v8HbXfnbvj04/edit?usp=sharing",
    "mentor": "Dr. Priya R. L."
  },
  {
    "group": "18",
    "title": "Dynamic Layer 7 (L7) API Gateway & Reverse Proxy Simulator",
    "student1": "Partha Dongre",
    "student2": "Shantanu Mokal",
    "virtualLab": "https://l7-gateway-simulator.vercel.app/",
    "feasibility": "https://docs.google.com/document/d/1NpZHqO4XVJrmKD6WBq7_8o534KDSSatFLZRFfbAytaI/edit?usp=sharing",
    "architecture": "https://drive.google.com/file/d/1J76u4prfN89RF7-Zcfya5KnA5tenfoMt/view?usp=sharing",
    "report": "https://docs.google.com/document/d/1h-MorwJsAR854XqMCcM-Yjr0XLsURvfT8KwqZieXLDA/edit?usp=sharing",
    "mentor": "Dr. Priya R. L."
  },
  {
    "group": "19",
    "title": "Chunk-Level Storage Deduplication Engine",
    "student1": "Neilsen Vaz",
    "student2": "Krishna Lohana",
    "virtualLab": "https://breakscale.tech/?s=8pMPySiOi5Qvig#k=l_HoBkc_QEt1gATdX9E41A",
    "feasibility": "https://docs.google.com/document/d/1dcXsDUAwxgPzN5WxtDpO6NUG6ShMFSsX/edit?usp=sharing&ouid=103982045611998576438&rtpof=true&sd=true",
    "architecture": "https://drive.google.com/file/d/1BTGUrKNPSOps31j0he_bi427l2eFckZ_/view?usp=sharing",
    "report": "https://docs.google.com/document/d/1E7o7-3voeLWMW7JQ5cwv0jG3qjQ9tuMt8X-Fsu2GnwU/edit?usp=sharing",
    "mentor": "Dr. Priya R. L."
  },
  {
    "group": "20",
    "title": "Fault-Tolerant Distributed Lock Service Simulation",
    "student1": "kripa ahuja",
    "student2": "aanchal ahuja",
    "virtualLab": "https://breakscale.tech/?s=O0AMPTVBqgfdMA#k=x2J6nYSKkehjB9WOYffEyg",
    "feasibility": "https://docs.google.com/document/d/1EnQ8Q0xrj1fwMd75db_Kg0mlIL88CvWW/edit?usp=sharing&ouid=108142653676572470237&rtpof=true&sd=true",
    "architecture": "https://drive.google.com/file/d/1JbWbu-qOxSTpVCn-A3UzFk1eK_4MGJri/view?usp=sharing",
    "report": "https://docs.google.com/document/d/1TXevWuoBFAriIRMxMi_DWhTgbfIyZFrm/edit?usp=sharing&ouid=108142653676572470237&rtpof=true&sd=true",
    "mentor": "Dr. Priya R. L."
  },
  {
    "group": "22",
    "title": "Distributed Event Ingestion & Worker Queue Pipeline",
    "student1": "Ayush Pamnani ",
    "student2": "Palak Kingrani ",
    "virtualLab": "https://breakscale.tech/?s=Xc-GgWqS-asPHA#k=3aQniHFIqA98Q0xFwdZhmA",
    "feasibility": "https://1drv.ms/w/c/e20e97aa11025a3e/IQCuOanATnUsTbc64PFGR-eeAQorb_EHyclH2G0PyR0xmiU?e=3DxpEI",
    "architecture": "https://1drv.ms/w/c/e20e97aa11025a3e/IQAyJHGvBR-3T5cd-3C13XCZAd1TbsRsCGV20Ki_MoJh7ic?e=Rf3c6k",
    "report": "https://1drv.ms/w/c/e20e97aa11025a3e/IQChAb4IqcE0RKRo2JqP8Cx1AZAonO6xno7U_1_C7YYty6k?e=LFdRCB",
    "mentor": "Dr. Priya R. L."
  },
  {
    "group": "23",
    "title": "Multi-Region Active-Passive Failover Controller",
    "student1": "Darshan Kankekar ",
    "student2": "Chetna Ramnani ",
    "virtualLab": "https://failoverlab.netlify.app/",
    "feasibility": "https://docs.google.com/document/d/1-HQtsyxuGASATk2lWnf5EmMkrWLioDoz/edit?usp=sharing&ouid=105732039565437281445&rtpof=true&sd=true",
    "architecture": "https://drive.google.com/file/d/1x9RCr8nuUdJlr2WVoRHr36yF9s4RTO8a/view?usp=sharing",
    "report": "https://docs.google.com/document/d/1iUFXhmog2gW-QbiF5B4LrFDJb-OA6Jdn/edit?usp=sharing&ouid=105732039565437281445&rtpof=true&sd=true",
    "mentor": "Dr. Priya R. L."
  },
  {
    "group": "24",
    "title": "StreamLab — Real-Time Streaming Window Metrics Aggregator",
    "student1": "Ishika Gupta",
    "student2": "Harshita Panjwani",
    "virtualLab": "https://streamlabvl.netlify.app/",
    "feasibility": "https://docs.google.com/document/d/1F2WjSQbpC-BOC6dNZQ_fCPC1NdNOcOYC/edit?usp=drivesdk&ouid=102601827939325501684&rtpof=true&sd=true",
    "architecture": "https://drive.google.com/file/d/1qvZ7JOLM_AN5CwU_CUSVRq0fDclKhvqH/view?usp=drivesdk",
    "report": "https://docs.google.com/document/d/1f1Je_sgiZXvp5LamCWouKGfLZre13hy1/edit?usp=drivesdk&ouid=102601827939325501684&rtpof=true&sd=true",
    "mentor": "Dr. Priya R. L."
  },
  {
    "group": "25",
    "title": "Distributed Log Aggregator & Indexer",
    "student1": "Jeegnasa Makwana",
    "student2": "Leena Chavan",
    "virtualLab": "https://breakscale.tech/?s=jZRH_cpv35twVQ&utm_source=chatgpt.com#k=DH7cEolTXlKc3MgUgEmWGQ",
    "feasibility": "https://docs.google.com/document/d/1Vg1dLyh-8b7j62pyqKn7ZelyUNWSlmbJ/edit?usp=drive_link&ouid=109785526487083907398&rtpof=true&sd=true",
    "architecture": "https://drive.google.com/file/d/1QdrgLIpxEx1bNztyRYogkfWjA9PIMaHu/view?usp=drive_link",
    "report": "https://docs.google.com/document/d/10Lp3OmW-A1xN_UBi13aPIMUfGGB8FqXy/edit?usp=drive_link&ouid=109785526487083907398&rtpof=true&sd=true",
    "mentor": "Dr. Priya R. L."
  },
  {
    "group": "28",
    "title": "Low-Latency Distributed Feature Flag Service",
    "student1": "Kshitij giri",
    "student2": "Shruti belani",
    "virtualLab": "https://distributed-flag-simulator.vercel.app/",
    "feasibility": "https://docs.google.com/document/d/1cyBKzq6guUWg6QrOdrF4j_LyBQW9BaEj/edit?usp=sharing&ouid=117447354812724724240&rtpof=true&sd=true",
    "architecture": "https://drive.google.com/file/d/13NnP-AIGikDbSA-uEzJwHbbtmVrAJdyb/view?usp=sharing",
    "report": "https://docs.google.com/document/d/1ayCEliNfhg8nfQUNlw61eLwUEPXr3GCt/edit?usp=sharing&ouid=117447354812724724240&rtpof=true&sd=true",
    "mentor": "Dr. Priya R. L."
  },
  {
    "group": "31",
    "title": "RegionGuard — Multi-Region Active-Passive Failover Controller",
    "student1": "Palak Lund",
    "student2": "Niyati Motiwani",
    "virtualLab": "https://region-guard.vercel.app",
    "feasibility": "https://drive.google.com/file/d/1ve_4qs5yaQocP9Xj_qxb_A36xgmvrlQ3/view?usp=drivesdk",
    "architecture": "https://drive.google.com/file/d/1gMdaBG6IP2LxeiKvW-WFAASYlGZg243R/view?usp=drivesdk",
    "report": "https://drive.google.com/file/d/1SAFCsZgBOLl0aONKAJ8AbwQT0r8b5hOO/view?usp=drivesdk",
    "mentor": "Dr. Priya R. L."
  },
  {
    "group": "34",
    "title": "Cross-Cloud Service Discovery Registry",
    "student1": "Ketaki Patil",
    "student2": "Swarangi Savekar",
    "virtualLab": "https://breakscale.tech/?s=GZ3CUizVc9dxIw&utm_source=chatgpt.com#k=FaRLxgqryVBLwiZILdkIEg",
    "feasibility": "https://docs.google.com/document/d/12YVUYUo-CDyd2qqc-9RAH075nCSaWJmobvuWmhQqH1I/edit?usp=sharing",
    "architecture": "https://drive.google.com/drive/folders/1b0WPH1OrzYrpTITkQdsfBlEE8mZctY1i?usp=sharing",
    "report": "https://docs.google.com/document/d/1bOaNiMuLeYbV8753wh_1aRqSRTdWiWwDr6AJesAWz4E/edit?usp=sharing",
    "mentor": "Dr. Priya R. L."
  },
  {
    "group": "35",
    "title": "Low-Latency Distributed Feature Flag Service",
    "student1": "sumit",
    "student2": "angad",
    "virtualLab": "https://breakscale.tech/?s=7WW1Up2kPfiygg#k=dOjs0Xs5XGaBEy-0zqejPg",
    "feasibility": "https://docs.google.com/document/d/1F2DY97fi4EUlKPK0kuTviN7nDx4ejkb6/edit?usp=drivesdk&ouid=106098027726614594997&rtpof=true&sd=true",
    "architecture": "https://drive.google.com/file/d/1tf43MCjVmJUBdBRbI6e8tSIGOCN2bKlG/view?usp=sharing",
    "report": "https://docs.google.com/document/d/1_OTYUEckHvz_rwhGR5mpMLxrPHkX4ngn/edit?usp=drivesdk&ouid=106098027726614594997&rtpof=true&sd=true",
    "mentor": "Dr. Priya R. L."
  },
  {
    "group": "46",
    "title": "Distributed Tracing & Telemetry Collector",
    "student1": "Lavanya Reddy",
    "student2": "Khushboo Choudhary",
    "virtualLab": "https://breakscale.tech/?utm_source=chatgpt.com",
    "feasibility": "https://drive.google.com/file/d/1bn_tdqb5CMZFhhOyy7oCcwiandvcjxdq/view?usp=sharing",
    "architecture": "https://drive.google.com/file/d/1CIwaDocrrF4Mi3K166xP8bqfFF0VnM9F/view?usp=sharing",
    "report": "https://docs.google.com/document/d/1NiAkGB4C1WOcWsi1lHAPuNjFDPvgdDWzcO_OI649DEs/edit?usp=sharing",
    "mentor": "Dr. Priya R. L."
  },
  {
    "group": "02",
    "title": "Multi tenant encrypted DB proxy engine",
    "student1": "Ruturaj Amit Rajwade",
    "student2": "Aayush Ajay Wanve",
    "virtualLab": "https://breakscale.tech/?s=xtcZJPGSEuJYLg#k=aeI-Gssx8x7JSn1OVgb11w",
    "feasibility": "https://docs.google.com/document/d/1faoYiqh9uGh35I_LRyCHeTCtQskxpAi5CP9HegwJCy0/edit?usp=sharing",
    "architecture": "https://raw.githubusercontent.com/Aayush-coder1/legalvault/e257ba0055e811343a1c0c76cc6b252e431825cd/docs/architecture.svg",
    "report": "https://docs.google.com/document/d/10_l2Z3ZQiaJC3yGPjYcZqnuyr3SCH7WBx5gmgyORa6M/edit?usp=sharing",
    "mentor": "Mr. Richard Joseph"
  },
  {
    "group": "03",
    "title": "Dynamic L7 API Gateway & Reverse Proxy",
    "student1": "Rahul Patil",
    "student2": "Kushagra Kumar",
    "virtualLab": "",
    "feasibility": "",
    "architecture": "",
    "report": "",
    "mentor": "Mr. Richard Joseph"
  },
  {
    "group": "05",
    "title": "Time-Series Storage & Ingestion Pipeline",
    "student1": "Baibhav Pati",
    "student2": "",
    "virtualLab": "https://breakscale.tech/?s=wtik_Kx58n4vkA#k=qSXA6nER0mnod_sPZMD6Tw",
    "feasibility": "https://drive.google.com/file/d/1DnQK16muibLvlsRrloqN_xG6ViSP-0tJ/view?usp=sharing",
    "architecture": "https://drive.google.com/file/d/1uZWOM7GHaTgrECobnQ2NxI6gcQ-0DNqq/view?usp=sharing",
    "report": "https://drive.google.com/file/d/1w51p9aYI2feGCuhgSmKAMvmxQDXBCc8r/view?usp=sharing",
    "mentor": "Mr. Richard Joseph"
  },
  {
    "group": "08",
    "title": "Multi tenant encrypted DB proxy engine",
    "student1": "Aditya kukreja",
    "student2": "Ronak Talreja",
    "virtualLab": "https://breakscale.tech/?s=5zADkRzYhVAX7g#k=ckjV-MYmuAj1XNymRGIlhg",
    "feasibility": "https://1drv.ms/w/c/2B545A2B3F062102/IQCisAYFYjAtT6AtMRBKrwktAVGq-WK1pM8VanBXBjDZQ8Q?e=VDptQa",
    "architecture": "https://1drv.ms/b/c/2B545A2B3F062102/IQCFpwYz-2FkTppQ4twpH_JhAdZLRsM9ISA5YARgn3Znk6c?e=la9s2u",
    "report": "",
    "mentor": "Mr. Richard Joseph"
  },
  {
    "group": "12",
    "title": "Edge-Based Distributed Rate Limiting Middleware",
    "student1": "Jagdish Padhi",
    "student2": "Shlok Nemade",
    "virtualLab": "",
    "feasibility": "https://docs.google.com/document/d/1_gmHr-W4fQe7PPaHbgAdYYlUbr_6uyw7fYDLmcbf7II/edit?usp=drivesdk",
    "architecture": "https://drive.google.com/file/d/1qOt90nhFvi5qpsflovju-JKIcrYlAFU8/view?usp=drivesdk",
    "report": "",
    "mentor": "Mr. Richard Joseph"
  },
  {
    "group": "16",
    "title": "Dynamic L7 Gateway API and Reverse Proxy",
    "student1": "Tanishk Pati",
    "student2": "Ayush Parab",
    "virtualLab": "https://breakscale.tech/?s=uhgjkQQyW0Ij3g#k=KK13NQL477X4vPADKlntgg",
    "feasibility": "https://docs.google.com/document/d/1Q3eAeDEeVRKrWB5o0CiyPr-If3ra3qzGl2CUwuIyfE8/edit?usp=sharing",
    "architecture": "",
    "report": "https://drive.google.com/file/d/1JB6jStIUCEIjdLbibLWzaYLinPCzpxlt/view?usp=drivesdk",
    "mentor": "Mr. Richard Joseph"
  },
  {
    "group": "17",
    "title": "Edge CDN cache with origin shielding",
    "student1": "Shreyash Singh",
    "student2": "Rugved Vichare",
    "virtualLab": "",
    "feasibility": "https://docs.google.com/document/d/1P2HbtrmMd1v56XA4w-xG5bxpv-JT9LyWY6iSnOFhBXk/edit?usp=sharing",
    "architecture": "",
    "report": "",
    "mentor": "Mr. Richard Joseph"
  },
  {
    "group": "20",
    "title": "Distributed Tracing & Telemetry Collector",
    "student1": "Soham Raorane",
    "student2": "Soumil Sethna",
    "virtualLab": "",
    "feasibility": "https://docs.google.com/document/d/1rVcPABs5ZcZPR-FLj_q_XxYLVjqlnAwpWCczfbQqdwI/edit?usp=sharing",
    "architecture": "",
    "report": "",
    "mentor": "Mr. Richard Joseph"
  },
  {
    "group": "21",
    "title": "Sandboxed Multi-Tenant Code Execution Engine",
    "student1": "Nikhil Wankhede",
    "student2": "Saman Pandey",
    "virtualLab": "",
    "feasibility": "",
    "architecture": "",
    "report": "",
    "mentor": "Mr. Richard Joseph"
  },
  {
    "group": "24",
    "title": "Streaming Window Metrics",
    "student1": "Gayatri Agarwal",
    "student2": "",
    "virtualLab": "https://breakscale.tech/?s=JOYeRh8Q8pBTmQ#k=pTpDdAGjX7Awh9ZGqdLy9Q",
    "feasibility": "https://docs.google.com/document/d/12Un6KOLEUbphZWmgmIQWBXuW2AAtp7yqt39nYQcvenI/edit?tab=t.0#heading=h.vtlnuectlan2",
    "architecture": "https://docs.google.com/document/d/17Or4UxhMV_Ruv1QYS6mM0fsghlrXgiCDZUz-Fas2nVY/edit?tab=t.0",
    "report": "https://docs.google.com/document/d/1g1pcv0DNB7nCJ6GDLm94YLXSrrD1BnmhojsVZYEo6yo/edit?tab=t.0",
    "mentor": "Mr. Richard Joseph"
  },
  {
    "group": "26",
    "title": "Multi-Cloud Service Mesh Data Plane Sidecar",
    "student1": "Khushboo Talreja",
    "student2": "Shreya Verma",
    "virtualLab": "https://breakscale.tech/?s=UrRB5mCmixWsoA#k=6yhxjLcu7wilz3c5K-6niQ",
    "feasibility": "https://docs.google.com/document/d/1k2VdFmJJUp_P4RN-roenI6ZjM4vI1XZSlHOhgoO2nFU/edit?usp=sharing",
    "architecture": "https://drive.google.com/file/d/1y0uGTJj_97wxIUft-G9eF0Ba74D2xw3I/view?usp=drive_link",
    "report": "https://docs.google.com/document/d/1XP5PFdZVax__D0YgkidzeBPwHsDpKnxf06t5FUu7xuk/edit?usp=sharing",
    "mentor": "Mr. Richard Joseph"
  },
  {
    "group": "27",
    "title": "Real time pub/sub websocket gateway",
    "student1": "Tanvi Jagade",
    "student2": "Riya bhatt",
    "virtualLab": "https://breakscale.tech/?s=8D9H7lSpP5AEaA#k=pMQws3mPvZaZXCfIHufuyg",
    "feasibility": "https://docs.google.com/document/d/1yALme_Y0Q0zysGFcnM-R_eW9rBq56UBcqFEyPm3Tx3s/edit?usp=sharing",
    "architecture": "https://drive.google.com/file/d/1QJK75gJI_ZNMYc1mh0P9D6Z96g1TTCKJ/view?usp=sharing",
    "report": "https://docs.google.com/document/d/1DsmZZHWet8zwYIe0NJvgccsa3aiK4ofTVz9YML-I-78/edit?usp=sharing",
    "mentor": "Mr. Richard Joseph"
  },
  {
    "group": "28",
    "title": "Low-Latency Distributed Feature Flag Service",
    "student1": "Bhoomika Makhija",
    "student2": "Purva Aruja",
    "virtualLab": "https://systemdesignstimulation.netlify.app/",
    "feasibility": "https://docs.google.com/document/d/1go_ULQpRDw9YX1xIa_UKSKJ5rb5bEW2z/edit?usp=sharing&ouid=116222605251192929325&rtpof=true&sd=true",
    "architecture": "https://drive.google.com/file/d/1-NKILRQYhAcGyAQRDNm-MPY_dIRKF_QA/view?usp=sharing",
    "report": "https://docs.google.com/document/d/1N2UoHOi9Whclfxov-HGWaa9D1wvtosCA/edit?usp=sharing&ouid=116222605251192929325&rtpof=true&sd=true",
    "mentor": "Mr. Richard Joseph"
  },
  {
    "group": "29",
    "title": "Edge-Based Distributed Rate Limiting Middleware",
    "student1": "Lavanya Gurbani",
    "student2": "Anvi Patil",
    "virtualLab": "",
    "feasibility": "https://drive.google.com/file/d/1cQL0ZEL64sKUsfkj3Q4jKq-lHkdUUD0J/view?usp=sharing",
    "architecture": "https://drive.google.com/drive/folders/131UeZvXjiPDCoPmb2Wb_8pa11XcUL61Q?usp=drive_link",
    "report": "https://drive.google.com/file/d/13n5P7DmjV7GA8KqNiEw6WRgI-RuSh0rX/view?usp=sharing",
    "mentor": "Mr. Richard Joseph"
  },
  {
    "group": "30",
    "title": "Chunk-Level Storage Deduplication Engine",
    "student1": "Poorvaja Joshi",
    "student2": "Bhoomi Singh",
    "virtualLab": "https://breakscale.tech/?s=CBwItcBcUo857w#k=7iuLP4KPPTnWEp_VI_HkOg",
    "feasibility": "https://docs.google.com/document/d/1cc2nAD0AD9iBf05Hl07E-V46afTDJOxF/edit?usp=sharing&ouid=115043821861994881963&rtpof=true&sd=true",
    "architecture": "https://docs.google.com/document/d/1viy-OMu_C4eJ4UIf9_km4BtY6JaZoKIuGq2RQifeOxA/edit?usp=sharing",
    "report": "https://docs.google.com/document/d/1HFYYaaAJhPQMuox_9Ypl9aktzanOoLtY/edit?usp=sharing&ouid=115043821861994881963&rtpof=true&sd=true",
    "mentor": "Mr. Richard Joseph"
  },
  {
    "group": "31",
    "title": "Distributed Tracing & Telemetry Collector",
    "student1": "muskan rohra",
    "student2": "Tanvi kinger",
    "virtualLab": "",
    "feasibility": "",
    "architecture": "",
    "report": "",
    "mentor": "Mr. Richard Joseph"
  },
  {
    "group": "32",
    "title": "Exactly -Once Event De-duplication Engine",
    "student1": "heer dewani",
    "student2": "yukta karwa",
    "virtualLab": "https://event-dedup-engine.netlify.app/",
    "feasibility": "",
    "architecture": "",
    "report": "https://docs.google.com/document/d/1ApMFvapqHz9owJ33lzVF7BZmaDF_4TLrHNTJZmNgUko/edit?usp=sharing",
    "mentor": "Mr. Richard Joseph"
  },
  {
    "group": "18",
    "title": "Tiered edge caching hierarchy with request collapsing and origin",
    "student1": "Lochna Paryani",
    "student2": "Sanika Mejari",
    "virtualLab": "https://edge-cdn-virtual-lab.netlify.app/",
    "feasibility": "https://drive.google.com/file/d/14zhe_PiOGH2-FxMXkJynCXY_sXfnkWPT/view?usp=sharing",
    "architecture": "https://drive.google.com/file/d/1KWVpoeZZV0P4XxXlGheU5oimaXGflNGf/view?usp=sharing",
    "report": "https://drive.google.com/file/d/10wlkaKd1vmg2Jw6SkIKeDyspQg_3a5gJ/view?usp=sharing",
    "mentor": "Mr. Richard Joseph"
  },
  {
    "group": "19",
    "title": "streaming window metrics aggregator",
    "student1": "Reyansh Parchani",
    "student2": "Piyush chug",
    "virtualLab": "https://breakscale.tech/?s=W1jFOM8ca_Od0Q#k=L-Z7i4l6r1eGBofcCwyGWQ",
    "feasibility": "",
    "architecture": "",
    "report": "",
    "mentor": "Mr. Richard Joseph"
  },
  {
    "group": "20",
    "title": "Distributed Log Aggregator and Indexer",
    "student1": "Aditya Bhosle",
    "student2": "Bir Bhatia",
    "virtualLab": "https://breakscale.tech/?s=UpM8NB9E8sD5_A#k=eYeYnNRIzLxnQ7haClESEQ",
    "feasibility": "https://docs.google.com/document/d/1gE_x5UiuGwOO_nA7hHe3TmuUC0hspbFS4E1p3ChyVr4/edit?usp=sharing",
    "architecture": "https://drive.google.com/file/d/1Ur8LVwMeuIbOFy5caSZ4kmLoJJZiWWlV/view?usp=sharing",
    "report": "https://docs.google.com/document/d/1JgOIJ9c21vW8pPYm7Jt8G8r0xlX_bao_GUQAKBVqFac/edit?usp=sharing",
    "mentor": "Mr. Richard Joseph"
  },
  {
    "group": "13",
    "title": "Fault-Tolerant Distributed Lock Service",
    "student1": "Divyashree Bhagat",
    "student2": "",
    "virtualLab": "https://divyashreeb7.github.io/LockServiceSimulator/",
    "feasibility": "https://docs.google.com/document/d/1pE9pjCqfeQi3i63iiPXB6qRAZpQqcY-M/edit?usp=drive_link&ouid=107977398179170931087&rtpof=true&sd=true",
    "architecture": "https://drive.google.com/file/d/1SadGURrLs5nTZ2YiVBDqIMr_lzOXtGeY/view?usp=drive_link",
    "report": "",
    "mentor": "Mr. Richard Joseph"
  }
];
