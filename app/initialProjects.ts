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
    "feasibility": "/Feasibility_reports/lsm_tree_storage_engine_over_object_storage.html",
    "architecture": "/architecture/group-01-lsm-tree.jpeg",
    "report": "/reports/lsm-tree-storage-engine.html",
    "virtualLab": "https://breakscale.tech/?s=7DHFQBUjGAB2bg#k=HbL_86S-uT1mHvZxmnXarg",
    "mentor": "Department of Computer Engineering"
  },
  {
    "group": "02",
    "student1": "Ruturaj Amit Rajwade",
    "student2": "Aayush Ajay Wanve",
    "title": "Multi tenant encrypted DB proxy engine",
    "feasibility": "/Feasibility_reports/legalvault_zero_knowledge_legal_evidence_virtual_lab.html",
    "architecture": "/architecture/group-02-db-proxy.jpeg",
    "report": "/reports/multi-tenant-encrypted-db-proxy.html",
    "virtualLab": "https://breakscale.tech/?s=xtcZJPGSEuJYLg#k=aeI-Gssx8x7JSn1OVgb11w",
    "mentor": "Department of Computer Engineering"
  },
  {
    "group": "03",
    "student1": "Talha Mulani",
    "student2": "Meet Phulwani",
    "title": "Geo-Distributed Active-Active Cache Cluster",
    "feasibility": "/Feasibility_reports/geo_distributed_active_active_cache_cluster.html",
    "architecture": "/architecture/group-03-active-cache.jpeg",
    "report": "/reports/geo-distributed-active-active-cache.html",
    "virtualLab": "https://breakscale.tech/?s=_sXJbhNWyzaflw#k=CdmbD0_OuO7HlQawOk3NXA",
    "mentor": "Department of Computer Engineering"
  },
  {
    "group": "04",
    "student1": "Baibhav Pati",
    "student2": "",
    "title": "Time-Series Storage & Ingestion Pipeline",
    "feasibility": "/Feasibility_reports/flowstore_time_series_storage_ingestion_virtual_lab.html",
    "architecture": "/architecture/group-04-time-series.jpeg",
    "report": "/reports/time-series-storage-pipeline.html",
    "virtualLab": "https://breakscale.tech/?s=wtik_Kx58n4vkA#k=qSXA6nER0mnod_sPZMD6Tw",
    "mentor": "Department of Computer Engineering"
  },
  {
    "group": "05",
    "student1": "James Lijo",
    "student2": "Sahil Mirchandani",
    "title": "Resilient Distributed DAG Orchestrator",
    "feasibility": "/Feasibility_reports/resilient_distributed_dag_orchestrator_virtual_lab.html",
    "architecture": "/architecture/group-05-dag-orchestrator.jpeg",
    "report": "/reports/resilient-distributed-dag-orchestrator.html",
    "virtualLab": "https://resilient-dag-orchestrator.onrender.com/",
    "mentor": "Department of Computer Engineering"
  },
  {
    "group": "06",
    "student1": "Khyati Keswani",
    "student2": "Malika Makhija",
    "title": "Partitioned Distributed Commit Log Broker",
    "feasibility": "/Feasibility_reports/partitioned_distributed_commit_log_broker_virtual_lab.html",
    "architecture": "/architecture/group-06-commit-log.jpeg",
    "report": "/reports/partitioned-distributed-commit-log.html",
    "virtualLab": "https://breakscale.tech/?utm_source=chatgpt.com&s=ONSaLW1Tvnn6yQ#k=wXejaT3IKGpTQSRm1xNIuw",
    "mentor": "Department of Computer Engineering"
  },
  {
    "group": "07",
    "student1": "Twinkle Gupta",
    "student2": "Krish Bhandari",
    "title": "Edge-Based Distributed Rate Limiting Middleware",
    "feasibility": "/Feasibility_reports/cortexai_edge_based_distributed_rate_limiting_virtual_lab.html",
    "architecture": "/architecture/group-07-rate-limiting.jpeg",
    "report": "/reports/edge-based-distributed-rate-limiting.html",
    "virtualLab": "https://breakscale.tech/?s=O31o-XdXgw-jeg#k=aLZZfzQjk8ea9ybn6fW_4A",
    "mentor": "Department of Computer Engineering"
  },
  {
    "group": "08",
    "student1": "Prathamesh Shelar",
    "student2": "Chandrabhanu Prusty",
    "title": "Fault Tolerant Distributed Lock Service",
    "feasibility": "/Feasibility_reports/fault_tolerant_distributed_lock_service_virtual_lab.html",
    "architecture": "/architecture/group-08-distributed-lock.jpeg",
    "report": "/reports/fault-tolerant-distributed-lock.html",
    "virtualLab": "https://breakscale.tech/?s=ccWDYrnjafwMuQ#k=pfZZaDLN-aqbWrJ_WDIx9Q",
    "mentor": "Department of Computer Engineering"
  },
  {
    "group": "09",
    "student1": "Mohit Kotwal",
    "student2": "Aayush Jadhav",
    "title": "Exactly-Once Event De-duplication Engine",
    "feasibility": "/Feasibility_reports/exactly_once_event_deduplication_engine_virtual_lab.html",
    "architecture": "/architecture/group-09-event-dedup.jpeg",
    "report": "/reports/exactly-once-event-deduplication.html",
    "virtualLab": "https://mohitto099.github.io/Exactly-Once-Event-Deduplication-Engine/",
    "mentor": "Department of Computer Engineering"
  },
  {
    "group": "10",
    "student1": "Krishna Lohana",
    "student2": "Neilsen Vaz",
    "title": "Chunk-Level Storage Deduplication Engine",
    "feasibility": "/Feasibility_reports/chunk_level_storage_deduplication_engine_virtual_lab.html",
    "architecture": "/architecture/group-10-storage-dedup.jpeg",
    "report": "/reports/chunk-level-storage-deduplication.html",
    "virtualLab": "https://breakscale.tech/?s=8pMPySiOi5Qvig#k=l_HoBkc_QEt1gATdX9E41A",
    "mentor": "Department of Computer Engineering"
  },
  {
    "group": "11",
    "student1": "Darshan Kankekar",
    "student2": "Chetna Ramnani",
    "title": "Multi-Region Active-Passive Failover Controller",
    "feasibility": "/Feasibility_reports/multi_region_active_passive_failover_controller_virtual_lab.html",
    "architecture": "/architecture/group-11-failover-controller.jpeg",
    "report": "/reports/multi-region-active-passive-failover.html",
    "virtualLab": "https://failoverlab.netlify.app/",
    "mentor": "Department of Computer Engineering"
  },
  {
    "group": "12",
    "student1": "Gayatri Agarwal",
    "student2": "Nirmayee Toke",
    "title": "Streaming Window Metrics",
    "feasibility": "/Feasibility_reports/streaming_window_metrics_aggregator_virtual_lab.html",
    "architecture": "/architecture/group-12-streaming-metrics.jpeg",
    "report": "/reports/streaming-window-metrics.html",
    "virtualLab": "https://breakscale.tech/?s=JOYeRh8Q8pBTmQ#k=pTpDdAGjX7Awh9ZGqdLy9Q",
    "mentor": "Department of Computer Engineering"
  },
  {
    "group": "13",
    "student1": "Jeegnasa Makwana",
    "student2": "Leena Chavan",
    "title": "Distributed Log Aggregator & Indexer",
    "feasibility": "/Feasibility_reports/distributed_log_aggregator_indexer_virtual_lab.html",
    "architecture": "/architecture/group-13-log-aggregator.jpeg",
    "report": "/reports/distributed-log-aggregator.html",
    "virtualLab": "https://breakscale.tech/?s=jZRH_cpv35twVQ&utm_source=chatgpt.com#k=DH7cEolTXlKc3MgUgEmWGQ",
    "mentor": "Department of Computer Engineering"
  },
  {
    "group": "14",
    "student1": "Khushboo Talreja",
    "student2": "Shreya Verma",
    "title": "Multi-Cloud Service Mesh Data Plane Sidecar",
    "feasibility": "/Feasibility_reports/multi_cloud_library_management_sidecar_data_plane_virtual_lab.html",
    "architecture": "/architecture/group-14-service-mesh.pdf",
    "report": "/reports/multi-cloud-service-mesh-data-plane.html",
    "virtualLab": "https://breakscale.tech/?s=UrRB5mCmixWsoA#k=6yhxjLcu7wilz3c5K-6niQ",
    "mentor": "Department of Computer Engineering"
  },
  {
    "group": "15",
    "student1": "Tanvi Jagade",
    "student2": "Riya bhatt",
    "title": "Real time pub/sub websocket gateway",
    "feasibility": "/Feasibility_reports/real_time_pubsub_websocket_gateway_mini_discord_virtual_lab.html",
    "architecture": "/architecture/group-15-websocket-gateway.jpeg",
    "report": "/reports/real-time-pubsub-websocket-gateway.html",
    "virtualLab": "https://breakscale.tech/?s=8D9H7lSpP5AEaA#k=pMQws3mPvZaZXCfIHufuyg",
    "mentor": "Department of Computer Engineering"
  },
  {
    "group": "16",
    "student1": "Bhoomika Makhija",
    "student2": "Purva Aruja",
    "title": "Low-Latency Distributed Feature Flag Service",
    "feasibility": "/Feasibility_reports/low_latency_distributed_feature_flag_service_virtual_lab.html",
    "architecture": "/architecture/group-16-feature-flag.jpeg",
    "report": "/reports/low-latency-feature-flag-service.html",
    "virtualLab": "https://systemdesignstimulation.netlify.app/",
    "mentor": "Department of Computer Engineering"
  },
  {
    "group": "17",
    "student1": "Ketaki Patil",
    "student2": "Swarangi Savekar",
    "title": "Cross cloud service discovery Registry",
    "feasibility": "/Feasibility_reports/cross_cloud_service_discovery_registry_virtual_lab.html",
    "architecture": "/architecture/group-17-service-discovery.jpeg",
    "report": "/reports/cross-cloud-service-discovery-registry.html",
    "virtualLab": "https://breakscale.tech/?s=PZMQ5BxVwfzB7g#k=glm4yn7M6l1ulZoHca9yzw",
    "mentor": "Department of Computer Engineering"
  },
  {
    "group": "18",
    "student1": "Mamta Mirani",
    "student2": "Trupti Kriplani",
    "title": "Raft-Consolidated Append-Only Log Engine",
    "feasibility": "/Feasibility_reports/raftlab_virtual_raft_consolidated_append_only_log_engine.html",
    "architecture": "/architecture/group-18-raft-log.jpeg",
    "report": "/reports/raft-consolidated-log-engine.html",
    "virtualLab": "https://raft-lab-beta.vercel.app/",
    "mentor": "Department of Computer Engineering"
  },
  {
    "group": "19",
    "student1": "Anuj Ghagare",
    "student2": "Kunal Singh",
    "title": "Distributed Tracing & Telemetry Collector",
    "feasibility": "/Feasibility_reports/tracelab_distributed_tracing_telemetry_collector_pipeline.html",
    "architecture": "/architecture/group-19-telemetry-collector.jpeg",
    "report": "/reports/distributed-tracing-telemetry-collector.html",
    "virtualLab": "https://tracelabvl.netlify.app/",
    "mentor": "Department of Computer Engineering"
  },
  {
    "group": "20",
    "student1": "Mohd Adil Shaikh",
    "student2": "Zaid Mulla",
    "title": "Actor Model Runtime on Kubernetes",
    "feasibility": "/Feasibility_reports/actorlab_actor_model_runtime_on_kubernetes.html",
    "architecture": "/architecture/group-20-actor-runtime.jpeg",
    "report": "/reports/actor-model-runtime-kubernetes.html",
    "virtualLab": "https://actor-runtime-virtual-lab.netlify.app/",
    "mentor": "Department of Computer Engineering"
  },
  {
    "group": "21",
    "student1": "Pranav Kule",
    "student2": "Rishabh Jha",
    "title": "Dynamic L7 API Gateway & Reverse Proxy",
    "feasibility": "/Feasibility_reports/dynamic_l7_api_gateway_reverse_proxy_virtual_lab.html",
    "architecture": "/architecture/group-21-l7-gateway.jpeg",
    "report": "/reports/dynamic-l7-api-gateway.html",
    "virtualLab": "https://breakscale.tech/?s=PuANS6iU35-KvQ#k=qj1btm6oSflFDO1LT__qRQ",
    "mentor": "Department of Computer Engineering"
  }
];
