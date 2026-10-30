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
    "group": "01",
    "student1": "Bhagyashri Joshi",
    "student2": "Neha Karkhanis",
    "title": "LSM-Tree Storage Engine over Object Storage",
    "feasibility": "https://docs.google.com/document/d/1b9e-8tFBF5M9lhGAKXHlwbCBg1pNyvCf9SBbhOrw9hI/edit?usp=sharing",
    "architecture": "https://drive.google.com/file/d/1Hd2XUXoui_KpBahwMAZqvMKX0ABV1IpQ/view?usp=drivesdk",
    "report": "https://docs.google.com/document/d/1lkFxkuFFfDYcb6RldLCiXz2PvrrfCfA7vlLMI28rvpA/edit?usp=sharing",
    "virtualLab": "https://breakscale.tech/?s=7DHFQBUjGAB2bg#k=HbL_86S-uT1mHvZxmnXarg",
    "mentor": "Department of Computer Engineering"
  },
  {
    "group": "02",
    "student1": "Ruturaj Amit Rajwade",
    "student2": "Aayush Ajay Wanve",
    "title": "Multi tenant encrypted DB proxy engine",
    "feasibility": "https://docs.google.com/document/d/1faoYiqh9uGh35I_LRyCHeTCtQskxpAi5CP9HegwJCy0/edit?usp=sharing",
    "architecture": "https://raw.githubusercontent.com/Aayush-coder1/legalvault/e257ba0055e811343a1c0c76cc6b252e431825cd/docs/architecture.svg",
    "report": "https://docs.google.com/document/d/10_l2Z3ZQiaJC3yGPjYcZqnuyr3SCH7WBx5gmgyORa6M/edit?usp=sharing",
    "virtualLab": "https://breakscale.tech/?s=xtcZJPGSEuJYLg#k=aeI-Gssx8x7JSn1OVgb11w",
    "mentor": "Department of Computer Engineering"
  },
  {
    "group": "03",
    "student1": "Talha Mulani",
    "student2": "Meet Phulwani",
    "title": "Geo-Distributed Active-Active Cache Cluster",
    "feasibility": "https://docs.google.com/document/d/1xlVBZT3XgxLM7UXHq5mye7iApNcn-CGL/edit?usp=sharing&ouid=116469198765214722605&rtpof=true&sd=true",
    "architecture": "https://drive.google.com/file/d/1CC05rXr5k7orGQVX-XmGTI_SlvZrxx9-/view?usp=sharing",
    "report": "https://drive.google.com/file/d/13-TLQjkTaqVwFB8DhvJ_S9AhMsdqDIy2/view?usp=sharing",
    "virtualLab": "https://breakscale.tech/?s=_sXJbhNWyzaflw#k=CdmbD0_OuO7HlQawOk3NXA",
    "mentor": "Department of Computer Engineering"
  },
  {
    "group": "04",
    "student1": "Baibhav Pati",
    "student2": "",
    "title": "Time-Series Storage & Ingestion Pipeline",
    "feasibility": "https://drive.google.com/file/d/1DnQK16muibLvlsRrloqN_xG6ViSP-0tJ/view?usp=sharing",
    "architecture": "https://drive.google.com/file/d/1uZWOM7GHaTgrECobnQ2NxI6gcQ-0DNqq/view?usp=sharing",
    "report": "https://drive.google.com/file/d/1w51p9aYI2feGCuhgSmKAMvmxQDXBCc8r/view?usp=sharing",
    "virtualLab": "https://breakscale.tech/?s=wtik_Kx58n4vkA#k=qSXA6nER0mnod_sPZMD6Tw",
    "mentor": "Department of Computer Engineering"
  },
  {
    "group": "05",
    "student1": "James Lijo",
    "student2": "Sahil Mirchandani",
    "title": "Resilient Distributed DAG Orchestrator",
    "feasibility": "https://drive.google.com/file/d/1MVIz1jLhWqcLD3wlKXRI4MdD8fgS1ARf/view?usp=drive_link",
    "architecture": "https://drive.google.com/file/d/1W2n91UqKs2RwjkKaoVYXtevYcvjxlmG_/view?usp=sharing",
    "report": "https://drive.google.com/file/d/1XZXDW2RqvJaAcsZqVx5XNrctonlNtpxx/view?usp=sharing",
    "virtualLab": "https://resilient-dag-orchestrator.onrender.com/",
    "mentor": "Department of Computer Engineering"
  },
  {
    "group": "06",
    "student1": "Khyati Keswani",
    "student2": "Malika Makhija",
    "title": "Partitioned Distributed Commit Log Broker",
    "feasibility": "https://drive.google.com/file/d/1dGKuJXV0st1P5ULF7mkhme3GMgSTwlr5/view?usp=drive_link",
    "architecture": "https://drive.google.com/file/d/1P6ltb-QM1K8URj9gsBoDBO8uVgMdZb7r/view?usp=sharing",
    "report": "https://drive.google.com/file/d/1sS3I6ncVlKsVlX6d8qvw_R3Uu_iW4tvR/view?usp=sharing",
    "virtualLab": "https://breakscale.tech/?utm_source=chatgpt.com&s=ONSaLW1Tvnn6yQ#k=wXejaT3IKGpTQSRm1xNIuw",
    "mentor": "Department of Computer Engineering"
  },
  {
    "group": "07",
    "student1": "Twinkle Gupta",
    "student2": "Krish Bhandari",
    "title": "Edge-Based Distributed Rate Limiting Middleware",
    "feasibility": "https://docs.google.com/document/d/1NDqr3MumUV9BAEevj98OfE2PcLktDsFHVqFS-Dj8vXY/edit?tab=t.0",
    "architecture": "https://drive.google.com/file/d/118ePRGAjgg4E7k5nzeVvxsDhLLwIriTE/view?usp=sharing",
    "report": "https://docs.google.com/document/d/1yxts_WV5Wkq3q48VxpBsEr-xeM7BAR74sD-TblPVpUE/edit?usp=sharing",
    "virtualLab": "https://breakscale.tech/?s=O31o-XdXgw-jeg#k=aLZZfzQjk8ea9ybn6fW_4A",
    "mentor": "Department of Computer Engineering"
  },
  {
    "group": "08",
    "student1": "Prathamesh Shelar",
    "student2": "Chandrabhanu Prusty",
    "title": "Fault Tolerant Distributed Lock Service",
    "feasibility": "https://docs.google.com/document/d/1gQn1SJjVz_v0hdvlVOLwRQXZZ3D3nYXZQ4Ts7RVdVas/edit?usp=sharing",
    "architecture": "https://drive.google.com/file/d/1jfXwhRW-RrI2YEH9lwEmIcAs3WilLrAP/view?usp=sharing",
    "report": "https://docs.google.com/document/d/19e05Ohx_smSj2kcMIw0ypqgJqH0Son6NAs-gpp8cyMY/edit?usp=sharing",
    "virtualLab": "https://breakscale.tech/?s=ccWDYrnjafwMuQ#k=pfZZaDLN-aqbWrJ_WDIx9Q",
    "mentor": "Department of Computer Engineering"
  },
  {
    "group": "09",
    "student1": "Mohit Kotwal",
    "student2": "Aayush Jadhav",
    "title": "Exactly-Once Event De-duplication Engine",
    "feasibility": "https://docs.google.com/document/d/1BnQiuDVj6fFc1ZoKKsC023UOpLcO3IzfSSNzpFb4e7k/edit?usp=sharing",
    "architecture": "https://drive.google.com/file/d/18Kqnk3crL2F-FmQx8j9XzHihQ8t8EGWs/view?usp=sharing",
    "report": "https://docs.google.com/document/d/1PX-XC23-d6jRiR4z8Z6AYPCXsmUSd65Uf4eS55RpvEQ/edit?usp=drivesdk",
    "virtualLab": "https://mohitto099.github.io/Exactly-Once-Event-Deduplication-Engine/",
    "mentor": "Department of Computer Engineering"
  },
  {
    "group": "10",
    "student1": "Krishna Lohana",
    "student2": "Neilsen Vaz",
    "title": "Chunk-Level Storage Deduplication Engine",
    "feasibility": "https://docs.google.com/document/d/1KFSip_EB7tz5ztQ7EkOaIcsvdwhkc3C4/edit?usp=sharing&ouid=106974183702480184252&rtpof=true&sd=true",
    "architecture": "https://drive.google.com/file/d/19pU4ncwBBnCS_F8lgzTmoIa6vX7E-3dz/view?usp=sharing",
    "report": "https://docs.google.com/document/d/1ILAsJjsTJiZc2KhQSJz-QSGSm6m-gHQMO3HsdlvzthM/edit?usp=sharing",
    "virtualLab": "https://breakscale.tech/?s=8pMPySiOi5Qvig#k=l_HoBkc_QEt1gATdX9E41A",
    "mentor": "Department of Computer Engineering"
  },
  {
    "group": "11",
    "student1": "Darshan Kankekar",
    "student2": "Chetna Ramnani",
    "title": "Multi-Region Active-Passive Failover Controller",
    "feasibility": "https://docs.google.com/document/d/1-HQtsyxuGASATk2lWnf5EmMkrWLioDoz/edit?usp=sharing&ouid=105732039565437281445&rtpof=true&sd=true",
    "architecture": "https://drive.google.com/file/d/1x9RCr8nuUdJlr2WVoRHr36yF9s4RTO8a/view?usp=sharing",
    "report": "https://docs.google.com/document/d/1iUFXhmog2gW-QbiF5B4LrFDJb-OA6Jdn/edit?usp=sharing&ouid=105732039565437281445&rtpof=true&sd=true",
    "virtualLab": "https://failoverlab.netlify.app/",
    "mentor": "Department of Computer Engineering"
  },
  {
    "group": "12",
    "student1": "Gayatri Agarwal",
    "student2": "Nirmayee Toke",
    "title": "Streaming Window Metrics",
    "feasibility": "https://docs.google.com/document/d/12Un6KOLEUbphZWmgmIQWBXuW2AAtp7yqt39nYQcvenI/edit?tab=t.0#heading=h.vtlnuectlan2",
    "architecture": "https://docs.google.com/document/d/17Or4UxhMV_Ruv1QYS6mM0fsghlrXgiCDZUz-Fas2nVY/edit?tab=t.0",
    "report": "https://docs.google.com/document/d/1g1pcv0DNB7nCJ6GDLm94YLXSrrD1BnmhojsVZYEo6yo/edit?tab=t.0",
    "virtualLab": "https://breakscale.tech/?s=JOYeRh8Q8pBTmQ#k=pTpDdAGjX7Awh9ZGqdLy9Q",
    "mentor": "Department of Computer Engineering"
  },
  {
    "group": "13",
    "student1": "Jeegnasa Makwana",
    "student2": "Leena Chavan",
    "title": "Distributed Log Aggregator & Indexer",
    "feasibility": "https://docs.google.com/document/d/1Vg1dLyh-8b7j62pyqKn7ZelyUNWSlmbJ/edit?usp=drive_link&ouid=109785526487083907398&rtpof=true&sd=true",
    "architecture": "https://drive.google.com/file/d/1QdrgLIpxEx1bNztyRYogkfWjA9PIMaHu/view?usp=drive_link",
    "report": "https://docs.google.com/document/d/10Lp3OmW-A1xN_UBi13aPIMUfGGB8FqXy/edit?usp=drive_link&ouid=109785526487083907398&rtpof=true&sd=true",
    "virtualLab": "https://breakscale.tech/?s=jZRH_cpv35twVQ&utm_source=chatgpt.com#k=DH7cEolTXlKc3MgUgEmWGQ",
    "mentor": "Department of Computer Engineering"
  },
  {
    "group": "14",
    "student1": "Khushboo Talreja",
    "student2": "Shreya Verma",
    "title": "Multi-Cloud Service Mesh Data Plane Sidecar",
    "feasibility": "https://docs.google.com/document/d/1k2VdFmJJUp_P4RN-roenI6ZjM4vI1XZSlHOhgoO2nFU/edit?usp=sharing",
    "architecture": "https://drive.google.com/file/d/1y0uGTJj_97wxIUft-G9eF0Ba74D2xw3I/view?usp=drive_link",
    "report": "https://docs.google.com/document/d/1XP5PFdZVax__D0YgkidzeBPwHsDpKnxf06t5FUu7xuk/edit?usp=sharing",
    "virtualLab": "https://breakscale.tech/?s=UrRB5mCmixWsoA#k=6yhxjLcu7wilz3c5K-6niQ",
    "mentor": "Department of Computer Engineering"
  },
  {
    "group": "15",
    "student1": "Tanvi Jagade",
    "student2": "Riya bhatt",
    "title": "Real time pub/sub websocket gateway",
    "feasibility": "https://docs.google.com/document/d/1yALme_Y0Q0zysGFcnM-R_eW9rBq56UBcqFEyPm3Tx3s/edit?usp=sharing",
    "architecture": "https://drive.google.com/file/d/1QJK75gJI_ZNMYc1mh0P9D6Z96g1TTCKJ/view?usp=sharing",
    "report": "https://docs.google.com/document/d/1DsmZZHWet8zwYIe0NJvgccsa3aiK4ofTVz9YML-I-78/edit?usp=sharing",
    "virtualLab": "https://breakscale.tech/?s=8D9H7lSpP5AEaA#k=pMQws3mPvZaZXCfIHufuyg",
    "mentor": "Department of Computer Engineering"
  },
  {
    "group": "16",
    "student1": "Bhoomika Makhija",
    "student2": "Purva Aruja",
    "title": "Low-Latency Distributed Feature Flag Service",
    "feasibility": "https://docs.google.com/document/d/1go_ULQpRDw9YX1xIa_UKSKJ5rb5bEW2z/edit?usp=sharing&ouid=116222605251192929325&rtpof=true&sd=true",
    "architecture": "https://drive.google.com/file/d/1-NKILRQYhAcGyAQRDNm-MPY_dIRKF_QA/view?usp=sharing",
    "report": "https://docs.google.com/document/d/1N2UoHOi9Whclfxov-HGWaa9D1wvtosCA/edit?usp=sharing&ouid=116222605251192929325&rtpof=true&sd=true",
    "virtualLab": "https://systemdesignstimulation.netlify.app/",
    "mentor": "Department of Computer Engineering"
  },
  {
    "group": "17",
    "student1": "Ketaki Patil",
    "student2": "Swarangi Savekar",
    "title": "Cross cloud service discovery Registry",
    "feasibility": "https://docs.google.com/document/d/12YVUYUo-CDyd2qqc-9RAH075nCSaWJmobvuWmhQqH1I/edit?usp=sharing",
    "architecture": "https://drive.google.com/drive/folders/1b0WPH1OrzYrpTITkQdsfBlEE8mZctY1i?usp=sharing",
    "report": "https://docs.google.com/document/d/1bOaNiMuLeYbV8753wh_1aRqSRTdWiWwDr6AJesAWz4E/edit?usp=sharing",
    "virtualLab": "https://breakscale.tech/?s=PZMQ5BxVwfzB7g#k=glm4yn7M6l1ulZoHca9yzw",
    "mentor": "Department of Computer Engineering"
  },
  {
    "group": "18",
    "student1": "Mamta Mirani",
    "student2": "Trupti Kriplani",
    "title": "Raft-Consolidated Append-Only Log Engine",
    "feasibility": "https://docs.google.com/document/d/16CzRb5Od1UC-bVlkmuN73tEaTN6rEge1d_0a0XV0FE4/edit?usp=sharing",
    "architecture": "https://drive.google.com/file/d/1u9fveOle9P2JjIK4K1pbuyvaGs-lKzL-/view?usp=sharing",
    "report": "https://docs.google.com/document/d/1frxsJSDLEvTk1Qgc_908bGGsurInHH6af1m3Sumud5Y/edit?usp=sharing",
    "virtualLab": "https://raft-lab-beta.vercel.app/",
    "mentor": "Department of Computer Engineering"
  },
  {
    "group": "19",
    "student1": "Anuj Ghagare",
    "student2": "Kunal Singh",
    "title": "Distributed Tracing & Telemetry Collector",
    "feasibility": "https://1drv.ms/w/c/8477c5e80e74da35/IQCuzFOxvEGGT5tVBa_1z2tUAZEAcJNaEeQxQ1wnUUcuU20?e=fNskH8",
    "architecture": "https://drive.google.com/file/d/1XhvmSLBSW9Vw1SMv30Bh5CYUdwrFduF8/view?usp=drive_link",
    "report": "https://1drv.ms/w/c/8477c5e80e74da35/IQAuLtC2Mb6ISLMg5hqyxadjAYrsAK1U1raj9fDbnhfbG68?e=d96auW",
    "virtualLab": "https://tracelabvl.netlify.app/",
    "mentor": "Department of Computer Engineering"
  },
  {
    "group": "20",
    "student1": "Mohd Adil Shaikh",
    "student2": "Zaid Mulla",
    "title": "Actor Model Runtime on Kubernetes",
    "feasibility": "https://drive.google.com/file/d/1w45bNpTdhw1k7frwJPlYfCH3e84AxTxk/view?usp=sharing",
    "architecture": "https://drive.google.com/file/d/1rkvjOtzAZqOv66R4k6Fyb5Q-4006Mb4F/view?usp=sharing",
    "report": "https://drive.google.com/file/d/1g7YhupJK_VKpjurd3Pom8ygRKRVC8dNF/view?usp=sharing",
    "virtualLab": "https://actor-runtime-virtual-lab.netlify.app/",
    "mentor": "Department of Computer Engineering"
  },
  {
    "group": "21",
    "student1": "Pranav Kule",
    "student2": "Rishabh Jha",
    "title": "Dynamic L7 API Gateway & Reverse Proxy",
    "feasibility": "https://docs.google.com/document/d/1U5UU4hGHOwfTpkX6bkjWe5v5HGtIvJ17IYg9j4tOB8k/edit?usp=sharing",
    "architecture": "https://drive.google.com/file/d/1PXVNLsMImFMQ5eF0sJI2p53mrl5PpQwt/view?usp=sharing",
    "report": "https://docs.google.com/document/d/13RNZT9FzJG5R1kxfgSWGn6bt2wbVl99v8HbXfnbvj04/edit?usp=sharing",
    "virtualLab": "https://breakscale.tech/?s=PuANS6iU35-KvQ#k=qj1btm6oSflFDO1LT__qRQ",
    "mentor": "Department of Computer Engineering"
  }
];
