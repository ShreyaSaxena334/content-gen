# Content-Gen


## Overview

Trainers are required to support learners even after training sessions, often through manual follow-ups. Learners, on the other hand, find it difficult to navigate recorded sessions and access focused or personalized content.

Content-Gen addresses this by enabling trainers to upload course resources that are automatically transformed into a searchable knowledge base. Learners can then query the content and generate summaries, mind maps, and flashcards.

Built on Amazon Web Services, the platform provides a scalable, event-driven solution with minimal infrastructure management.


---

## Architecture (High-Level)

Content-Gen follows a serverless, event-driven architecture:

### Flow:
```
UI (React via Amplify) → Amazon API Gateway → AWS Lambda → Amazon Bedrock → Response → UI
```

### Core Components
**Frontend**
- React + Vite UI deployed on AWS Amplify for hosting and delivery
  
**API Layer**
- Amazon API Gateway handles all incoming requests and routes them to appropriate services
  
**Compute Layer**
- AWS Lambda functions process requests (chat, mindmap, flashcards, course management)
  
**Data Layer**
- Amazon DynamoDB stores course metadata (course_id, users, mappings)
- Amazon S3 stores uploaded sources, summaries, and generated artifacts
  
**LLM and Retrieval Layer**
- Amazon Bedrock for model inference using Amazon Nova-Pro
- Bedrock Knowledge Base for context retrieval from ingested sources
- AgentCore for orchestration, integrated with Strands Agent
- Short-term conversational memory managed via AgentCore memory for contextual interactions

### System Architecture Diagram
![WhatsApp Image 2026-04-08 at 12 05 30 PM](https://github.com/user-attachments/assets/a6913be7-57c8-4727-920c-d0eba26363aa)

---

## API Endpoints

Endpoints are exposed via Amazon API Gateway and handled by AWS Lambda.

|API Endpoint|Lambda|Purpose|
|---|---|---|
|GET /course|GetCourse|Retrieves all available courses from Amazon DynamoDB.|
|POST /course|course_creation|Creates a new course and initializes associated storage and metadata.|
|POST /course/{course_id}|add_source-course|Performs course-specific operations for an existing course.|
|POST /course/{course_id}/ask|ask-lambda-short-term-memory|Processes user queries using Amazon Bedrock with knowledge base context.|
|GET /course/{course_id}/flashcards|flashcard_generator_lambda|Generates flashcards from course content.|
|GET /course/{course_id}/mindmap|mindmap-generator|Generates a structured mind map of course topics.|
|POST /course/{course_id}/source|add-source-course|Uploads and ingests source files into Amazon S3 and syncs with the knowledge base.|
|GET /course/{course_id}/summary|Summary-lambda|Generates a concise summary of the course content.|

---


## Environment Variables

The following environment variables must be configured for each AWS Lambda function.


### course_creation Lambda

| Variable     | Description                                    |
| ------------ | ---------------------------------------------- |
| `S3_BUCKET`  | S3 bucket used for storing course-related data |
| `TABLE_NAME` | DynamoDB table storing course metadata         |


### add_source-course Lambda

| Variable            | Description                            |
| ------------------- | -------------------------------------- |
| `DATA_SOURCE_ID`    | Identifier for the Bedrock data source |
| `KNOWLEDGE_BASE_ID` | Knowledge Base identifier              |
| `S3_BUCKET_NAME`    | S3 bucket for storing uploaded sources |
| `TABLE_NAME`        | DynamoDB table for course metadata     |


### ask-lambda-short-term-memory Lambda

| Variable            | Description                                                                        |
| ------------------- | ---------------------------------------------------------------------------------- |
| `AGENT_RUNTIME_ARN` | Bedrock Agent runtime ARN for handling conversational queries with session context |


### flashcard_generator_lambda Lambda

| Variable            | Description                                     |
| ------------------- | ----------------------------------------------- |
| `BUCKET_NAME`       | S3 bucket containing course data                |
| `KNOWLEDGE_BASE_ID` | Knowledge Base identifier                       |
| `MODEL_ARN`         | Bedrock model ARN used for flashcard generation |


### mindmap-generator Lambda

| Variable         | Description                              |
| ---------------- | ---------------------------------------- |
| `BEDROCK_REGION` | AWS region for Bedrock services          |
| `BUCKET_NAME`    | S3 bucket containing course data sources |
| `KB_ID`          | Knowledge Base identifier                |
| `MODEL_ID`       | Bedrock model inference profile ARN      |

---


## Set-Up Instructions

Follow the steps below to configure and run the system locally and on AWS.

### 1. Prerequisites

* Amazon Web Services account with access to:

  * Amazon S3
  * Amazon DynamoDB
  * AWS Lambda
  * Amazon API Gateway
  * Amazon Bedrock (with model access enabled)
* Node.js (v18+)
* AWS CLI configured with appropriate IAM permissions


### 2. Clone Repository

```bash
git clone <repo-url>
cd content-gen
```


### 3. Configure Core Resources

* **DynamoDB**

  * Create table: `courses`
  * Primary key: `course_id`

* **S3**

  * Create bucket: `lnd-contentgen-knowledgebase-datasource`
  * Used for storing all course sources and generated artifacts

* **Bedrock**

  * Create Knowledge Base → note `KB_ID` (`HYQPHQ53FW`)
  * Create Data Source → note `DATA_SOURCE_ID` (`QN8ESKVWYJ`)
  * Enable model access and note inference profile ARN
  * Configure Agent runtime → note `AGENT_RUNTIME_ARN`


### 4. Configure Lambda Functions

For each AWS Lambda function, set the environment variables, as mentioned above.


### 5. Configure API Layer

* Create endpoints in Amazon API Gateway
* Map each route to the corresponding Lambda.


### 6. Deploy Frontend

```bash
cd frontend
npm install
npm run dev
```

* Set API base URL to the deployed API Gateway endpoint

