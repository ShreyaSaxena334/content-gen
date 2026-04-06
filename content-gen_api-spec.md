# Content-Generation

## API - Lambda Mapping

| API Endpoint | Lambda | Purpose | Status |
|-------------|--------|---------|--------|
| GET /course | GetCourse | Retrieves all courses by fetching course metadata from DynamoDB and returning a list of available courses |--|
| POST /course | course_creation | Creates a new course by storing metadata in DynamoDB and initializing storage (S3/KB linkage) for future content ingestion |--|
| POST /course/{course_id} | add_source-course | Handles course-specific operations such as attaching or processing additional resources for an existing course |--|
| POST /course/{course_id}/ask | ask-lambda-short-term-memory | Processes user questions using Bedrock LLM with short-term conversational memory and retrieves context from the Knowledge Base to generate answers |--|
| GET /course/{course_id}/flashcards | flashcard_generator_lambda | Generates flashcards by extracting key concepts from course content stored in the Knowledge Base using LLM |--|
| GET /course/{course_id}/mindmap | mindmap-generator | Generates a structured mindmap representation of the course by organizing key topics and relationships using LLM |--|
| POST /course/{course_id}/query | query-lambda | Executes direct queries against the Bedrock Knowledge Base and returns retrieved information without conversational formatting |--|
| POST /course/{course_id}/source | add-source-course | Uploads and ingests source files into S3, updates metadata in DynamoDB, updates the summary.txt file in the course folder in S3, and syncs content with Bedrock Knowledge Base |--|
| GET /course/{course_id}/summary | Summary-lambda | Generates a concise summary of the entire course content using LLM based on Knowledge Base data |--|
