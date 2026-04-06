**1. GET /course**

**Description:** Retrieve all courses

Response (200):
```json
[
  {
    "course_id": "string",
    "name": "string",
    "description": "string",
    "owner": "string",
    "trainees": ["string"],
    "createdAt": "timestamp"
  }
]
```


**2. POST /course**

**Description:** Create a new course

Request Body:
```json
{
  "name": "string",
  "description": "string",
  "owner": "string",
  "trainees": ["string"]
}
```
Response (200):
```json
{
  "course_id": "uuid",
  "name": "string",
  "description": "string",
  "owner": "string",
  "trainees": ["string"],
  "createdAt": "timestamp"
}
```
Error (400):
```json
{
  "message": "name is required"
}
```


**3. POST /course/{course_id}**

**Description:** Upload course content and trigger knowledge base ingestion

Headers:
```
Content-Type: multipart/form-data
```
Request Body:
```
file (binary)
```
Response (200):
```json
{
  "message": "File uploaded and Bedrock sync job started successfully.",
  "s3_path": "s3://bucket/path",
  "ingestionJobId": "string"
}
```
Error (400):
```json
{
  "error": "Request must be multipart/form-data"
}
```


**4. POST /course/{course_id}/ask**

**Description:** Ask questions using LLM with knowledge base context

Request Body:
```json
{
  "question": "string",
  "session_id": "string",
  "user_id": "string"
}
```
Response (200):
```json
{
  "answer": "string",
  "session_id": "string"
}
```
Error (400):
```json
{
  "message": "question required"
}
```


**5. GET /course/{course_id}/flashcards**

**Description:** Generate flashcards from course material

Response (200):
```json
{
  "course_id": "string",
  "flashcards": [
    {
      "q": "Question",
      "a": "Answer"
    }
  ]
}
```


**6. GET /course/{course_id}/mindmap**

**Description:** Generate a structured mind map of the course

Response (200):
```json
{
  "course_id": "string",
  "mindmap": {
    "topic": "Main Topic",
    "subtopics": []
  }
}
```
Error (500):
```json
{
  "message": "Internal Server Error"
}
```
