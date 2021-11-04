# Decision record

## 🏗️ {{ record.id }}: {{ record.title }}

<!--
  Prerequisites, context and initial info
  in order to understand what this ADR is about.
  What is the issue that is motivating this decision or change?
-->

Prerequisites

---

## 🤝 Decision

<!--
  What was decided?
  What is the proposed change or what should be done?
-->

Decision

---

## ⚖️ Rationale

<!--
  Why it was decided so?
  Which alternatives where considered?
-->

Rationale

---

## ✨ Consequences

<!--
  What positive and/or negative consiquences
  will follow this decision?
  What becomes easier or more difficult
  to do because of this change?
-->

Consequences

---

## 👨‍💻 Participants

<!--
  Who participated in making the decision
-->

- @participant-github-user

---
<!--
********************************
* DO NOT EDIT BELOW THIS POINT *
********************************
-->

## ⚡️ Status

<!--status:start-->

{{ record.statusIcon }} {{ record.status | title }}

<!--status:end-->

---

## ♻ Replacements

**Replaced by:**

<!--replaced-by:start-->
{% if record.replacedBy %}

- [{{ record.replacedBy.title }}](./{{ recrod.replacedBy.fileName }})

{% else %}

- None

{% endif %}
<!--replaced-by:end-->

**Replaced records:**

<!--replaced-records:start-->
{% if record.replacedRecords | length %}

{% for item in record.replacedRecords %}

- [{{ item.id }} {{ item.title }}](./{{ item.fileName }})

{% endfor %}

{% else %}

- None

{% endif %}
<!--replaced-records:end-->

---

<!--date:start-->

{{ record.date }}

<!--date:end-->
