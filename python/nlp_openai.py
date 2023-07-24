import openai
import random
import json

openai.api_key = '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'

def ask_gpt(question):
    response = openai.Completion.create(
        engine="text-davinci-002",
        prompt=f"Describe '{question}' in the context of computer science.",
        max_tokens=40,
        n=1
    )
    full_description = response.choices[0].text.strip()
    description_words = full_description.split()[:10]  # limit to first 10 words
    return ' '.join(description_words)

# List of computer science terms, you can add more to it
computer_science_terms = ["algorithm", "array", "function", "database", "loop", "variable", "object", "class", "method", "interface"]

questions = []

for _ in range(3):  # we want to generate 3 questions
    word = random.choice(computer_science_terms)  # we randomly select a word from our list
    real_description = ask_gpt(word)

    # Generate fake descriptions
    fake_words = random.sample([term for term in computer_science_terms if term != word], 3)  # select 3 different words
    fake_descriptions = [ask_gpt(fake_word) for fake_word in fake_words]

    choices = fake_descriptions + [real_description]
    random.shuffle(choices)  # shuffle choices so correct answer is not always at the end
    answer = choices.index(real_description) + 1  # +1 to convert from 0-indexed to 1-indexed

    question = {
        "question": f"What is the correct description for '{word}'?",
        "choice1": choices[0],
        "choice2": choices[1],
        "choice3": choices[2],
        "choice4": choices[3],
        "answer": answer
    }
    questions.append(question)

with open('questions.json', 'w') as f:
    json.dump(questions, f, indent=2)
