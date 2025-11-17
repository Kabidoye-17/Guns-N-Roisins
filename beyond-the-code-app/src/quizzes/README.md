# Quiz Files

This folder contains JSON files that define quiz content for the application. Each quiz file follows a standard structure to ensure consistency and easy integration.

## Quiz JSON Structure

```json
{
  "id": "unique-quiz-identifier",
  "title": "Quiz Title",
  "description": "Brief description of what this quiz covers",
  "difficulty": "Beginner | Intermediate | Advanced",
  "category": "Category Name",
  "questions": [
    {
      "id": "q1",
      "question": "The question text?",
      "options": [
        { "text": "Option 1", "correct": false },
        { "text": "Option 2", "correct": true },
        { "text": "Option 3", "correct": false }
      ],
      "explanation": "Explanation of why the correct answer is correct"
    }
  ]
}
```

## Field Descriptions

### Quiz Level
- **id**: Unique identifier for the quiz (kebab-case recommended)
- **title**: Display title shown to users
- **description**: Brief summary of quiz content
- **difficulty**: One of "Beginner", "Intermediate", or "Advanced"
- **category**: Topic category (e.g., "JavaScript Basics", "React Fundamentals")

### Question Level
- **id**: Unique identifier within the quiz (e.g., "q1", "q2")
- **question**: The question text to display
- **options**: Array of 2-4 answer choices
  - **text**: The option text
  - **correct**: Boolean indicating if this is the correct answer (only one should be true)
- **explanation**: (Optional) Additional context shown after answering

## Guidelines

1. **Question Count**: Each quiz should have between 2-4 questions
2. **Answer Options**: Each question should have 2-4 options
3. **Exactly One Correct Answer**: Each question must have exactly one correct option
4. **Clear Explanations**: Always provide explanations to help users learn
5. **Consistent Naming**: Use descriptive, consistent naming for quiz IDs

## Creating a New Quiz

1. Create a new JSON file in this directory (e.g., `episode3-arrays.json`)
2. Follow the structure outlined above
3. Import the quiz in your page component:
   ```javascript
   import quizData from './quizzes/episode3-arrays.json';
   ```
4. Use it with the EmbedPage component:
   ```javascript
   <EmbedPage
     gameType="quiz"
     quizData={quizData}
     onQuizComplete={handleQuizComplete}
     title={quizData.title}
     description={quizData.description}
     difficulty={quizData.difficulty}
     category={quizData.category}
     instructions={[...]}
   />
   ```

## Example Quizzes

- `episode1-variables.json` - Variables & Data Types (3 questions, Beginner)
- `episode2-functions.json` - Functions & Scope (4 questions, Intermediate)
