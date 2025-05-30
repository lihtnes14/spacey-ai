require('dotenv').config();
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function test() {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'user', content: 'Hello, who are you?' },
      ],
    });
    console.log(response.choices[0].message.content);
  } catch (err) {
    console.error(err);
  }
}

test();
