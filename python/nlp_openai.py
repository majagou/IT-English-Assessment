import openai
import random
import json

openai.api_key = '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'

def ask_gpt(questions):
    prompts = "\n".join([f"{i+1}: What is a correct synonym for '{word}' in the context of computer science?" for i, word in enumerate(questions)])
    response = openai.Completion.create(
        engine="text-davinci-002",
        prompt=prompts,
        max_tokens=60*len(questions)
    )
    responses = response.choices[0].text.strip().split("\n")
    return [resp.split(", ") for resp in responses]

# List of computer science terms, you can add more to it
computer_science_terms = ["algorithm", "array", "function", "database", "loop", "variable", "object", "class", "method", "interface"]

questions = []

for _ in range(3): # we want to generate 3 questions
    word = random.choice(computer_science_terms) # we randomly select a word from our list
    question_prompt = f"What is a correct synonym for '{word}' in the context of computer science?"
    response = ask_gpt([word for _ in range(3)])
    
    for idx, synonyms in enumerate(response):
        if len(synonyms) >= 3:
            question = {
                "question": f"What is a correct synonym for '{word}' in the context of computer science?",
                "choice1": synonyms[0],
                "choice2": synonyms[1],
                "choice3": synonyms[2],
                "choice4": word,
                "answer": random.randint(1, 3)
            }
            questions.append(question)

with open('questions.json', 'w') as f:
    json.dump(questions, f, indent=2)
