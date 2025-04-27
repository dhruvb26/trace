# Trace

Official repository for the source code of **Trace**, built for **LA Hacks '25**.  
This project focuses on the **Clean Code (Sustainability)** track, aiming to streamline **traceability** and **insight** into supply chains for mid-cap to low-cap companies.

---

## Overview

**Trace.ai** is a platform designed to help companies **track the sustainability** of their supply chains.  
We use publicly available data to trace how a product was sourced, estimate its **CO₂ emissions**, and ultimately evaluate the company's overall environmental impact.

Through a **seamless dashboard**, companies can:

- View all their factories and suppliers in one place
- Analyze suppliers and recruiters to determine if they meet the company's sustainability standards
- Simulate company-supplier communications to assess partnerships

Our goal is to **empower mid-size and small companies** to independently track and manage their **Environmental, Social, and Governance (ESG)** performance.

---

## Technology Stack

- **Frontend**: Next.js (React) with TypeScript
- **UI Components**: Open-source libraries with customizations
- **Automation & Agents**:
  - Built with **Crew.ai** and **Fetch.ai**
  - Custom agents automate processes like:
    - Web scraping
    - Communication (e.g., emailing suppliers)
- **Backend**: FastAPI

---

## How It Works

- We take the url of a product as input
- Using that, we figure out where the different parts of the product were sourced from.
- Companies can also change suppliers.
- This leads to the dashboard where the company gets a detailed view of their metrics.
- We create **two agents**:
  - **Company Agent**: Represents the company, outlining its sustainability metrics and expectations.
  - **Supplier Agent**: Simulates supplier responses based on their sustainability data.
- The agents interact autonomously, helping the company evaluate potential partnerships based on ESG criteria.

---

## Vision

Trace aims to make **sustainability tracking** more **accessible** and **actionable** for companies without the massive resources of large corporations.  
By making ESG tracking simple, automated, and insightful, we help businesses move toward a more sustainable future.
