require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const transcript = {
  intro: "[0:00 - 0:30] — Intro\nImagine sending your own satellite into space — a tiny robot that orbits Earth, collects data, and helps solve big problems like climate change or global internet access. Today, I'll show you the basics of building your own small satellite.",

  whatIsSatellite: "[0:30 - 1:30] — What is a Satellite?\nA satellite is basically a smart device that orbits Earth. It can take pictures, measure weather, track signals, or relay communications. Satellites come in all sizes — from huge ones weighing tons, to tiny CubeSats that fit in your backpack.",

  howToBuild: `[1:30 - 2:30] — How to Build One (Basic Parts):
Structure: A lightweight frame, often a CubeSat size (10cm cube), to hold everything together.
Power: Solar panels + batteries to keep the satellite running in space.
Payload: The “mission” part — cameras, sensors, or communication tools.
Control System: A small onboard computer to operate the satellite and send data.
Communication: An antenna to talk back and forth with Earth.`,

  launchAndOrbit: "[2:30 - 3:00] — Launch & Orbit\nOnce your satellite is ready, it hitchhikes to space on a rocket, often as a secondary payload. Then, it enters orbit, starts collecting data, and beams it back to Earth for scientists, companies, or anyone to use.",

  closing: "Closing line:\nBuilding a satellite is like building a tiny explorer that flies high above us, helping us understand and improve our planet. And guess what? Anyone with curiosity and creativity can get started!"
};

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  console.log("User message:", message);

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: `You are Hena, and you are a doubt clearing assisatant regarding the information given in the ${transcript}. And all the users interacting with you are kids who are willing to learn space science, so respond accordingly, if asked about any other thing reply, "I can't respond to that"` },
        { role: 'user', content: message },
      ],
    });

    const reply = response.choices[0].message.content;
    res.json({ reply });
  } catch (err) {
    console.error("Error from OpenAI:", err);
    res.status(500).json({ reply: "Server error: " + err.message });
  }
});

app.listen(5001, () => {
  console.log("Server running on http://localhost:5001");
});
