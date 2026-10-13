# Graph Report - .  (2026-08-02)

## Corpus Check
- Corpus is ~3,729 words - fits in a single context window. You may not need a graph.

## Summary
- 44 nodes · 62 edges · 6 communities
- Extraction: 94% EXTRACTED · 6% INFERRED · 0% AMBIGUOUS · INFERRED: 4 edges (avg confidence: 0.7)
- Token cost: 5,610 input · 6,210 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Interaction and Motion System|Interaction and Motion System]]
- [[_COMMUNITY_Portfolio Positioning and Philosophy|Portfolio Positioning and Philosophy]]
- [[_COMMUNITY_Zestt SaaS Architecture|Zestt SaaS Architecture]]
- [[_COMMUNITY_React Experience and Projects|React Experience and Projects]]
- [[_COMMUNITY_Frontend Technology Stack|Frontend Technology Stack]]
- [[_COMMUNITY_Services and Delivery Outcomes|Services and Delivery Outcomes]]

## God Nodes (most connected - your core abstractions)
1. `Technical Capability Map` - 9 edges
2. `Aman Sharma Portfolio` - 7 edges
3. `Zestt` - 7 edges
4. `Services` - 6 edges
5. `MySQL` - 5 edges
6. `Node API` - 4 edges
7. `React` - 4 edges
8. `Selected Projects` - 4 edges
9. `Trading Leagues` - 4 edges
10. `Professional Journey` - 4 edges

## Surprising Connections (you probably didn't know these)
- `Aman Sharma Portfolio` --references--> `Technical Capability Map`  [EXTRACTED]
  index.html → index.html  _Bridges community 1 → community 4_
- `Aman Sharma Portfolio` --references--> `Professional Journey`  [EXTRACTED]
  index.html → index.html  _Bridges community 1 → community 3_
- `Aman Sharma Portfolio` --references--> `Services`  [EXTRACTED]
  index.html → index.html  _Bridges community 1 → community 5_
- `Aman Sharma Portfolio` --references--> `Zestt`  [EXTRACTED]
  index.html → index.html  _Bridges community 1 → community 2_
- `Services` --references--> `SaaS and White-Label Systems`  [EXTRACTED]
  index.html → index.html  _Bridges community 5 → community 2_

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Zestt System Architecture** — index_restaurant_tenant, index_zestt_admin, index_node_api, index_mysql, index_guest_menu [EXTRACTED 1.00]
- **Product Engineering Technology Stack** — index_react, index_next_js, index_node_api, index_typescript, index_mysql, index_rest_apis, index_firebase [EXTRACTED 1.00]

## Communities (6 total, 0 thin omitted)

### Community 0 - "Interaction and Motion System"
Cohesion: 0.22
Nodes (4): cycleRole(), manageRoleTimer(), requestScrollUpdate(), updateScrollScene()

### Community 1 - "Portfolio Positioning and Philosophy"
Cohesion: 0.25
Nodes (9): Aman Sharma, Architectural Foresight, Clear Communication, Full-Stack Product Engineering, Performance and Technical SEO, Aman Sharma Portfolio, Selected Projects, Vinayak Bikers (+1 more)

### Community 2 - "Zestt SaaS Architecture"
Cohesion: 0.36
Nodes (8): Guest Menu, Multi-Tenant Architecture, MySQL, Node API, Restaurant Tenant and Branding, SaaS and White-Label Systems, Zestt, Zestt Admin

### Community 3 - "React Experience and Projects"
Cohesion: 0.33
Nodes (6): DecisionArc, Firebase, Fleapo, Professional Journey, React, Superchat

### Community 4 - "Frontend Technology Stack"
Cohesion: 0.60
Nodes (5): Technical Capability Map, Next.js, REST APIs, Trading Leagues, TypeScript

### Community 5 - "Services and Delivery Outcomes"
Cohesion: 0.40
Nodes (5): Payment and API Flows, Product Delivery Process, Rain Platforms, Services, Web and Mobile Products

## Knowledge Gaps
- **4 isolated node(s):** `Web and Mobile Products`, `Product Delivery Process`, `Guest Menu`, `Clear Communication`
  These have ≤1 connection - possible missing edges or undocumented components.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Aman Sharma Portfolio` connect `Portfolio Positioning and Philosophy` to `Zestt SaaS Architecture`, `React Experience and Projects`, `Frontend Technology Stack`, `Services and Delivery Outcomes`?**
  _High betweenness centrality (0.260) - this node is a cross-community bridge._
- **Why does `Technical Capability Map` connect `Frontend Technology Stack` to `Portfolio Positioning and Philosophy`, `Zestt SaaS Architecture`, `React Experience and Projects`?**
  _High betweenness centrality (0.168) - this node is a cross-community bridge._
- **Why does `Services` connect `Services and Delivery Outcomes` to `Portfolio Positioning and Philosophy`, `Zestt SaaS Architecture`?**
  _High betweenness centrality (0.125) - this node is a cross-community bridge._
- **What connects `Web and Mobile Products`, `Product Delivery Process`, `Guest Menu` to the rest of the system?**
  _4 weakly-connected nodes found - possible documentation gaps or missing edges._