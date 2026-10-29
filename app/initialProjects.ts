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
    "report": "https://docs.google.com/document/d/1frxsJSDLEvTk1Qgc_908bGGsurInHH6af1m3Sumud5Y/edit?usp=sharing"
  },
  {
    "group": "4",
    "title": "Geo-Distributed Active-Active Cache Cluster",
    "student1": "Talha Mulani",
    "student2": "Meet Phulwani",
    "virtualLab": "https://system-design-virtual-lab.vercel.app/",
    "feasibility": "https://docs.google.com/document/d/1xlVBZT3XgxLM7UXHq5mye7iApNcn-CGL/edit?usp=sharing&ouid=116469198765214722605&rtpof=true&sd=true",
    "architecture": "https://drive.google.com/file/d/1CC05rXr5k7orGQVX-XmGTI_SlvZrxx9-/view?usp=sharing",
    "report": "https://drive.google.com/file/d/13-TLQjkTaqVwFB8DhvJ_S9AhMsdqDIy2/view?usp=sharing"
  },
  {
    "group": "5",
    "title": "TraceLab — Distributed Tracing & Telemetry Collector",
    "student1": "Anuj Ghagare",
    "student2": "Kunal Singh",
    "virtualLab": "https://tracelabvl.netlify.app/",
    "feasibility": "https://1drv.ms/w/c/8477c5e80e74da35/IQCuzFOxvEGGT5tVBa_1z2tUAZEAcJNaEeQxQ1wnUUcuU20?e=fNskH8",
    "architecture": "https://drive.google.com/file/d/1XhvmSLBSW9Vw1SMv30Bh5CYUdwrFduF8/view?usp=drive_link",
    "report": "https://1drv.ms/w/c/8477c5e80e74da35/IQAuLtC2Mb6ISLMg5hqyxadjAYrsAK1U1raj9fDbnhfbG68?e=d96auW"
  },
  {
    "group": "6",
    "title": "Chunk-Level Storage Deduplication Engine",
    "student1": "Shivam Ingulkar",
    "student2": "Rushil shitut",
    "virtualLab": "https://breakscale.tech/?s=SDuxZzGQICPBtg#k=4yj4wMvmaASruXAckss1lQ",
    "feasibility": "https://docs.google.com/document/d/1grOFFKJ_zZq9RGnmO_rrTzhjnDEA24i9_9fYhEtl1-Y/edit?usp=sharing",
    "architecture": "https://drive.google.com/file/d/1sjIZ35XY0LGKtlXySlP9MAo32--5Hojg/view?usp=drivesdk",
    "report": "https://docs.google.com/document/d/1oO9VAg7h4cyrMJTApW0GqhPKIFzk1Qu_jKvWY7RdqMA/edit?usp=sharing"
  },
  {
    "group": "7",
    "title": "Resilient Distributed DAG Orchestrator",
    "student1": "Sahil Mirchandani",
    "student2": "James Lijo",
    "virtualLab": "https://resilient-dag-orchestrator.onrender.com/virtual-lab",
    "feasibility": "https://drive.google.com/file/d/1MVIz1jLhWqcLD3wlKXRI4MdD8fgS1ARf/view?usp=drive_link",
    "architecture": "https://drive.google.com/file/d/1W2n91UqKs2RwjkKaoVYXtevYcvjxlmG_/view?usp=sharing",
    "report": "https://drive.google.com/file/d/1XZXDW2RqvJaAcsZqVx5XNrctonlNtpxx/view?usp=sharing"
  },
  {
    "group": "8",
    "title": "CortexAI — Edge-Based Distributed Rate Limiting Middleware",
    "student1": "Twinkle Gupta",
    "student2": "Krish Bhandari",
    "virtualLab": "https://breakscale.tech/?s=O31o-XdXgw-jeg#k=aLZZfzQjk8ea9ybn6fW_4A",
    "feasibility": "https://drive.google.com/file/d/1u8mKoA6noQmu_GTjWSJb9_ZYF7owaZLX/view?usp=drivesdk",
    "architecture": "https://drive.google.com/file/d/118ePRGAjgg4E7k5nzeVvxsDhLLwIriTE/view?usp=sharing",
    "report": "https://docs.google.com/document/d/1yxts_WV5Wkq3q48VxpBsEr-xeM7BAR74sD-TblPVpUE/edit?usp=sharing"
  },
  {
    "group": "9",
    "title": "ActorLab — Distributed Actor Runtime Virtual Lab",
    "student1": "Mohd Adil Shaikh",
    "student2": "Zaid Mulla",
    "virtualLab": "https://actor-runtime-virtual-lab.netlify.app/",
    "feasibility": "https://drive.google.com/file/d/1w45bNpTdhw1k7frwJPlYfCH3e84AxTxk/view?usp=sharing",
    "architecture": "https://drive.google.com/file/d/1rkvjOtzAZqOv66R4k6Fyb5Q-4006Mb4F/view?usp=sharing",
    "report": "https://drive.google.com/file/d/1g7YhupJK_VKpjurd3Pom8ygRKRVC8dNF/view?usp=sharing"
  },
  {
    "group": "11",
    "title": "Partitioned Distributed Commit Log Broker",
    "student1": "Khyati Keswani",
    "student2": "Malika Makhija",
    "virtualLab": "https://breakscale.tech/?utm_source=chatgpt.com&s=ONSaLW1Tvnn6yQ#k=wXejaT3IKGpTQSRm1xNIuw",
    "feasibility": "https://drive.google.com/file/d/1dGKuJXV0st1P5ULF7mkhme3GMgSTwlr5/view?usp=drive_link",
    "architecture": "https://drive.google.com/file/d/1P6ltb-QM1K8URj9gsBoDBO8uVgMdZb7r/view?usp=sharing",
    "report": "https://drive.google.com/file/d/1sS3I6ncVlKsVlX6d8qvw_R3Uu_iW4tvR/view?usp=sharing"
  },
  {
    "group": "13",
    "title": "Fault-Tolerant Distributed Lock Service",
    "student1": "Tanmay Maniyar",
    "student2": "",
    "virtualLab": "https://dist-lock-service-vlab.vercel.app/",
    "feasibility": "https://docs.google.com/document/d/1iK6x0Zn9DDbzwQbUOHZ8cLAWaGbyYf2Y/edit?usp=drive_link&ouid=112281299164541948615&rtpof=true&sd=true",
    "architecture": "https://drive.google.com/file/d/1NMduRQRmXzq6Xg1Oi8BfEkEZqFKH7RgN/view?usp=drive_link",
    "report": "https://docs.google.com/document/d/1Nl58mQnrpQKWJepbur7oCiy3yXutJN_P/edit?usp=drive_link&ouid=112281299164541948615&rtpof=true&sd=true"
  },
  {
    "group": "13",
    "title": "Distributed Lock Service Simulation",
    "student1": "Prathamesh Shelar",
    "student2": "Chandrabhanu Prusty",
    "virtualLab": "https://breakscale.tech/?s=ccWDYrnjafwMuQ#k=pfZZaDLN-aqbWrJ_WDIx9Q",
    "feasibility": "https://docs.google.com/document/d/1gQn1SJjVz_v0hdvlVOLwRQXZZ3D3nYXZQ4Ts7RVdVas/edit?usp=sharing",
    "architecture": "https://drive.google.com/file/d/1jfXwhRW-RrI2YEH9lwEmIcAs3WilLrAP/view?usp=sharing",
    "report": "https://docs.google.com/document/d/19e05Ohx_smSj2kcMIw0ypqgJqH0Son6NAs-gpp8cyMY/edit?usp=sharing"
  },
  {
    "group": "14",
    "title": "SocketScale — Real-Time Pub/Sub WebSocket Gateway",
    "student1": "Mahek Ahuja ",
    "student2": "Piyush Kandhari ",
    "virtualLab": "https://socketlab.vercel.app/",
    "feasibility": "https://drive.google.com/file/d/1vKTBr8x5LF2efReGxMmRgghAc4X5bR9i/view?usp=sharing",
    "architecture": "https://drive.google.com/file/d/1BE40CsGue0Hxn0wq0kwGlFIQJYRwMyzd/view?usp=sharing",
    "report": "https://docs.google.com/document/d/1D_TqmkYdO5BpTnnp8kZ8ttvHuNLQxsoKbANeH851lpc/edit?usp=sharing"
  },
  {
    "group": "15",
    "title": "Exactly-Once Event De-duplication Engine",
    "student1": "Mohit Kotwal ",
    "student2": "Aayush Jadhav ",
    "virtualLab": "https://mohitto099.github.io/Exactly-Once-Event-Deduplication-Engine",
    "feasibility": "https://docs.google.com/document/d/1BnQiuDVj6fFc1ZoKKsC023UOpLcO3IzfSSNzpFb4e7k/edit?usp=drivesdk",
    "architecture": "https://drive.google.com/file/d/18Kqnk3crL2F-FmQx8j9XzHihQ8t8EGWs/view?usp=drivesdk",
    "report": "https://docs.google.com/document/d/1PX-XC23-d6jRiR4z8Z6AYPCXsmUSd65Uf4eS55RpvEQ/edit?usp=drivesdk"
  },
  {
    "group": "16",
    "title": "Dynamic L7 API Gateway & Reverse Proxy",
    "student1": "Pranav Kule",
    "student2": "Rishabh Jha",
    "virtualLab": "https://breakscale.tech/?s=PuANS6iU35-KvQ#k=qj1btm6oSflFDO1LT__qRQ",
    "feasibility": "https://docs.google.com/document/d/1U5UU4hGHOwfTpkX6bkjWe5v5HGtIvJ17IYg9j4tOB8k/edit?usp=sharing",
    "architecture": "https://drive.google.com/file/d/1PXVNLsMImFMQ5eF0sJI2p53mrl5PpQwt/view?usp=sharing",
    "report": "https://docs.google.com/document/d/13RNZT9FzJG5R1kxfgSWGn6bt2wbVl99v8HbXfnbvj04/edit?usp=sharing"
  },
  {
    "group": "18",
    "title": "Dynamic Layer 7 (L7) API Gateway & Reverse Proxy Simulator",
    "student1": "Partha Dongre",
    "student2": "Shantanu Mokal",
    "virtualLab": "https://l7-gateway-simulator.vercel.app/",
    "feasibility": "https://docs.google.com/document/d/1NpZHqO4XVJrmKD6WBq7_8o534KDSSatFLZRFfbAytaI/edit?usp=sharing",
    "architecture": "https://drive.google.com/file/d/1J76u4prfN89RF7-Zcfya5KnA5tenfoMt/view?usp=sharing",
    "report": "https://docs.google.com/document/d/1h-MorwJsAR854XqMCcM-Yjr0XLsURvfT8KwqZieXLDA/edit?usp=sharing"
  },
  {
    "group": "19",
    "title": "Chunk-Level Storage Deduplication Engine",
    "student1": "Neilsen Vaz",
    "student2": "Krishna Lohana",
    "virtualLab": "https://breakscale.tech/?s=8pMPySiOi5Qvig#k=l_HoBkc_QEt1gATdX9E41A",
    "feasibility": "https://docs.google.com/document/d/1dcXsDUAwxgPzN5WxtDpO6NUG6ShMFSsX/edit?usp=sharing&ouid=103982045611998576438&rtpof=true&sd=true",
    "architecture": "https://drive.google.com/file/d/1BTGUrKNPSOps31j0he_bi427l2eFckZ_/view?usp=sharing",
    "report": "https://docs.google.com/document/d/1E7o7-3voeLWMW7JQ5cwv0jG3qjQ9tuMt8X-Fsu2GnwU/edit?usp=sharing"
  },
  {
    "group": "20",
    "title": "Fault-Tolerant Distributed Lock Service Simulation",
    "student1": "kripa ahuja",
    "student2": "aanchal ahuja",
    "virtualLab": "https://breakscale.tech/?s=O0AMPTVBqgfdMA#k=x2J6nYSKkehjB9WOYffEyg",
    "feasibility": "https://docs.google.com/document/d/1EnQ8Q0xrj1fwMd75db_Kg0mlIL88CvWW/edit?usp=sharing&ouid=108142653676572470237&rtpof=true&sd=true",
    "architecture": "https://drive.google.com/file/d/1JbWbu-qOxSTpVCn-A3UzFk1eK_4MGJri/view?usp=sharing",
    "report": "https://docs.google.com/document/d/1TXevWuoBFAriIRMxMi_DWhTgbfIyZFrm/edit?usp=sharing&ouid=108142653676572470237&rtpof=true&sd=true"
  },
  {
    "group": "22",
    "title": "Distributed Event Ingestion & Worker Queue Pipeline",
    "student1": "Ayush Pamnani ",
    "student2": "Palak Kingrani ",
    "virtualLab": "https://breakscale.tech/?s=Xc-GgWqS-asPHA#k=3aQniHFIqA98Q0xFwdZhmA",
    "feasibility": "https://1drv.ms/w/c/e20e97aa11025a3e/IQCuOanATnUsTbc64PFGR-eeAQorb_EHyclH2G0PyR0xmiU?e=3DxpEI",
    "architecture": "https://1drv.ms/w/c/e20e97aa11025a3e/IQAyJHGvBR-3T5cd-3C13XCZAd1TbsRsCGV20Ki_MoJh7ic?e=Rf3c6k",
    "report": "https://1drv.ms/w/c/e20e97aa11025a3e/IQChAb4IqcE0RKRo2JqP8Cx1AZAonO6xno7U_1_C7YYty6k?e=LFdRCB"
  },
  {
    "group": "23",
    "title": "Multi-Region Active-Passive Failover Controller",
    "student1": "Darshan Kankekar ",
    "student2": "Chetna Ramnani ",
    "virtualLab": "https://failoverlab.netlify.app/",
    "feasibility": "https://docs.google.com/document/d/1-HQtsyxuGASATk2lWnf5EmMkrWLioDoz/edit?usp=sharing&ouid=105732039565437281445&rtpof=true&sd=true",
    "architecture": "https://drive.google.com/file/d/1x9RCr8nuUdJlr2WVoRHr36yF9s4RTO8a/view?usp=sharing",
    "report": "https://docs.google.com/document/d/1iUFXhmog2gW-QbiF5B4LrFDJb-OA6Jdn/edit?usp=sharing&ouid=105732039565437281445&rtpof=true&sd=true"
  },
  {
    "group": "24",
    "title": "StreamLab — Real-Time Streaming Window Metrics Aggregator",
    "student1": "Ishika Gupta",
    "student2": "Harshita Panjwani",
    "virtualLab": "https://streamlabvl.netlify.app/",
    "feasibility": "https://docs.google.com/document/d/1F2WjSQbpC-BOC6dNZQ_fCPC1NdNOcOYC/edit?usp=drivesdk&ouid=102601827939325501684&rtpof=true&sd=true",
    "architecture": "https://drive.google.com/file/d/1qvZ7JOLM_AN5CwU_CUSVRq0fDclKhvqH/view?usp=drivesdk",
    "report": "https://docs.google.com/document/d/1f1Je_sgiZXvp5LamCWouKGfLZre13hy1/edit?usp=drivesdk&ouid=102601827939325501684&rtpof=true&sd=true"
  },
  {
    "group": "25",
    "title": "Distributed Log Aggregator & Indexer",
    "student1": "Jeegnasa Makwana",
    "student2": "Leena Chavan",
    "virtualLab": "https://breakscale.tech/?s=jZRH_cpv35twVQ&utm_source=chatgpt.com#k=DH7cEolTXlKc3MgUgEmWGQ",
    "feasibility": "https://docs.google.com/document/d/1Vg1dLyh-8b7j62pyqKn7ZelyUNWSlmbJ/edit?usp=drive_link&ouid=109785526487083907398&rtpof=true&sd=true",
    "architecture": "https://drive.google.com/file/d/1QdrgLIpxEx1bNztyRYogkfWjA9PIMaHu/view?usp=drive_link",
    "report": "https://docs.google.com/document/d/10Lp3OmW-A1xN_UBi13aPIMUfGGB8FqXy/edit?usp=drive_link&ouid=109785526487083907398&rtpof=true&sd=true"
  },
  {
    "group": "28",
    "title": "Low-Latency Distributed Feature Flag Service",
    "student1": "Kshitij giri",
    "student2": "Shruti belani",
    "virtualLab": "https://distributed-flag-simulator.vercel.app/",
    "feasibility": "https://docs.google.com/document/d/1cyBKzq6guUWg6QrOdrF4j_LyBQW9BaEj/edit?usp=sharing&ouid=117447354812724724240&rtpof=true&sd=true",
    "architecture": "https://drive.google.com/file/d/13NnP-AIGikDbSA-uEzJwHbbtmVrAJdyb/view?usp=sharing",
    "report": "https://docs.google.com/document/d/1ayCEliNfhg8nfQUNlw61eLwUEPXr3GCt/edit?usp=sharing&ouid=117447354812724724240&rtpof=true&sd=true"
  },
  {
    "group": "31",
    "title": "RegionGuard — Multi-Region Active-Passive Failover Controller",
    "student1": "Palak Lund",
    "student2": "Niyati Motiwani",
    "virtualLab": "https://region-guard.vercel.app",
    "feasibility": "https://drive.google.com/file/d/1ve_4qs5yaQocP9Xj_qxb_A36xgmvrlQ3/view?usp=drivesdk",
    "architecture": "https://drive.google.com/file/d/1gMdaBG6IP2LxeiKvW-WFAASYlGZg243R/view?usp=drivesdk",
    "report": "https://drive.google.com/file/d/1SAFCsZgBOLl0aONKAJ8AbwQT0r8b5hOO/view?usp=drivesdk"
  },
  {
    "group": "34",
    "title": "Cross-Cloud Service Discovery Registry",
    "student1": "Ketaki Patil",
    "student2": "Swarangi Savekar",
    "virtualLab": "https://breakscale.tech/?s=GZ3CUizVc9dxIw&utm_source=chatgpt.com#k=FaRLxgqryVBLwiZILdkIEg",
    "feasibility": "https://docs.google.com/document/d/12YVUYUo-CDyd2qqc-9RAH075nCSaWJmobvuWmhQqH1I/edit?usp=sharing",
    "architecture": "https://drive.google.com/drive/folders/1b0WPH1OrzYrpTITkQdsfBlEE8mZctY1i?usp=sharing",
    "report": "https://docs.google.com/document/d/1bOaNiMuLeYbV8753wh_1aRqSRTdWiWwDr6AJesAWz4E/edit?usp=sharing"
  },
  {
    "group": "35",
    "title": "Low-Latency Distributed Feature Flag Service",
    "student1": "sumit",
    "student2": "angad",
    "virtualLab": "https://breakscale.tech/?s=7WW1Up2kPfiygg#k=dOjs0Xs5XGaBEy-0zqejPg",
    "feasibility": "https://docs.google.com/document/d/1F2DY97fi4EUlKPK0kuTviN7nDx4ejkb6/edit?usp=drivesdk&ouid=106098027726614594997&rtpof=true&sd=true",
    "architecture": "https://drive.google.com/file/d/1tf43MCjVmJUBdBRbI6e8tSIGOCN2bKlG/view?usp=sharing",
    "report": "https://docs.google.com/document/d/1_OTYUEckHvz_rwhGR5mpMLxrPHkX4ngn/edit?usp=drivesdk&ouid=106098027726614594997&rtpof=true&sd=true"
  },
  {
    "group": "46",
    "title": "Distributed Tracing & Telemetry Collector",
    "student1": "Lavanya Reddy",
    "student2": "Khushboo Choudhary",
    "virtualLab": "https://breakscale.tech/?utm_source=chatgpt.com",
    "feasibility": "https://drive.google.com/file/d/1bn_tdqb5CMZFhhOyy7oCcwiandvcjxdq/view?usp=sharing",
    "architecture": "https://drive.google.com/file/d/1CIwaDocrrF4Mi3K166xP8bqfFF0VnM9F/view?usp=sharing",
    "report": "https://docs.google.com/document/d/1NiAkGB4C1WOcWsi1lHAPuNjFDPvgdDWzcO_OI649DEs/edit?usp=sharing"
  }
];
