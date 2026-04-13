PrepAI

PrepAI is an AI-powered career guidance and interview preparation platform designed to help users improve their placement readiness.

🚀 Features

🎤 AI Mock Interview Agent

Conducts role-based mock interviews

Supports AI-generated interview questions

Provides interview analytics and feedback

Tracks interview history


💼 Career Copilot

Upload resume (PDF)

AI-powered resume analysis

Best-fit role recommendations with match percentage

Company type suggestions

Curated job application links

Skill gap analysis

Personalized improvement tips


🔗 Smart CTA Integration

Suggests the highest matching role after resume analysis

One-click redirect to role-specific mock interview

Creates a seamless flow: Analyze → Improve → Practice


🔐 Security & Reliability

Firebase Authentication

Secure payment integration with Razorpay

Helmet for secure HTTP headers

Express Rate Limiting to prevent abuse

SSL support


🛠️ Tech Stack

Frontend

React.js

Redux Toolkit

Tailwind CSS

Framer Motion


Backend

Node.js

Express.js



AI & Integrations

OpenRouter API

PDF.js for resume parsing

Firebase Authentication

Razorpay


📦 Installation

Clone the repository

git clone <your-repo-url>
cd prepai

Install dependencies

Frontend

cd client
npm install

Backend

cd server
npm install


⚙️ Environment Variables

Create a .env file in the server folder and add:

PORT=3008
OPENROUTER_API_KEY=your_api_key
FIREBASE_CONFIG=your_config
RAZORPAY_KEY_ID=your_key
RAZORPAY_SECRET=your_secret
JWT_SECRET=your_secret


▶️ Run Locally

Start backend

cd server
npm run dev

Start frontend

cd client
npm run dev


🌐 Deployment

Current deployment: Render

Planned improvements:

Docker containerization

CI/CD pipeline setup

VPS deployment (AWS EC2 or similar)


🔮 Future Improvements

Docker support

CI/CD pipeline

Better interview analytics

More role-based AI interviews

Improved resume insights


🤝 Contributing

Contributions, suggestions, and feedback are welcome.

📬 Contact

Created by Anik Chakraborty.

If you like this project, feel free to star the repo ⭐
