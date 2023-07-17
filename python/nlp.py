import json
import random
from nltk.corpus import wordnet
from nltk.tokenize import word_tokenize
from nltk.tag import pos_tag

## Generat random quesstion and three answers plus one correct answer(random order)
def generate_synonym_questions(text):
    words_with_pos = get_words_with_pos(text)
    verb_adj_words = get_noun_adj_words(words_with_pos)

    questions = []
    for word, pos in verb_adj_words:
        synonyms = get_synonyms(word, pos)
        if len(synonyms) >= 1:
            correct_answer = random.choice(synonyms)
            choices = get_unique_choices(correct_answer, synonyms, 3)  # Generate three unique choices
            choices.append(correct_answer)
            random.shuffle(choices)

            question = {
                'question': f"What is the correct synonym for '{word}'?",
                'choice1': choices[0],
                'choice2': choices[1],
                'choice3': choices[2],
                'choice4': word,
                'answer': choices.index(correct_answer) + 1
            }

            questions.append(question)

    return questions

## get the word postion in the given text
def get_words_with_pos(text):
    words = word_tokenize(text)
    tagged_words = pos_tag(words)
    return tagged_words

## select the verb or adjective words from the text
def get_noun_adj_words(words_with_pos):
    verb_adj_words = [(word, pos) for word, pos in words_with_pos if pos.startswith(('VB', 'JJ'))]
    num_choices = min(len(verb_adj_words), 3)  # Limit the number of choices to 3
    return random.sample(verb_adj_words, k=num_choices)

## get the synonyms of the selected word
def get_synonyms(word, pos):
    synsets = wordnet.synsets(word, pos=get_wordnet_pos(pos))
    synonyms = []
    for synset in synsets:
        for lemma in synset.lemmas():
            synonyms.append(lemma.name())
    return list(set(synonyms))  # Remove duplicates

def get_wordnet_pos(tag):
    if tag.startswith('VB'):
        return wordnet.VERB
    elif tag.startswith('JJ'):
        return wordnet.ADJ
    else:
        return wordnet.NOUN  # Default to noun if unable to determine the POS tag

def get_unique_choices(correct_answer, synonyms, num_choices):
    choices = [choice for choice in synonyms if choice != correct_answer]
    num_choices = min(len(choices), num_choices)  # Limit the number of choices
    if len(choices) >= num_choices:
        return random.sample(choices, k=num_choices)
    else:
        return random.sample(synonyms, k=num_choices)


# 从JSON文件中随机选择一段文本
def select_random_text_from_json(filename):
    with open(filename, 'r') as f:
        data = json.load(f)
    return random.choice(data)['text']

# Example text
filename = 'text.json'
text = select_random_text_from_json(filename)

questions = generate_synonym_questions(text)
if questions:
    with open('questions.json', 'w') as f:
        json.dump(questions, f, indent=4)
else:
    print("No suitable words with synonyms found in the text.")
