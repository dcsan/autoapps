---
title: Order example
---

test doc

```mermaid
erDiagram
    CUSTOMER ||--o{ ORDER : places
    ORDER ||--|{ LINE-ITEM : contains
    CUSTOMER }|..|{ DELIVERY-ADDRESS : uses
```

```mermaid
sequenceDiagram
  A-->B: Works!
```

<div class="mermaid">sequenceDiagram A-->B: Works!</div>

