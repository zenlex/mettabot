# mettabot
Maitrī (Sanskrit; Pali: mettā) means benevolence, loving-kindness, friendliness, amity, good will, and active interest in others.

A creative project for experimenting with css/svg animation, speech synthesis, and chat bot APIs. 

## Contribution
If you'd like to add additional phrases to mettabot, submit a pull request on the files in `/messages` that adds suggested strings to the array. 

The format is simple - there are 4 parts (files labeled p1...p4). 
- Part 1 - The greeting: e.g."Hello there,"
- Part 2 - The subject of the compliment: e.g. "your hair today"
- Part 3 - The compliment: e.g. "is the best I've ever seen"
- Part 4 - The closer: e.g. "without a doubt."

*follow exisiting examples in the array for formatting*

## API Endpoint
Submit a GET request to /api and you should recieve a JSON object with a text property containing your message. 
## Description
Keeping it simple on this one to study 'the bones':

- Vanilla Node Server
- Vanilla HTML Single Page Client with CSS Animations

Coming Attractions:

- Chatbot API
- Speech Synthesis
- New Phrase Submission Form

Under Consideration:

- Twillio / SMS connection
- SVG Animation 
- Programmatically generated character level animation
