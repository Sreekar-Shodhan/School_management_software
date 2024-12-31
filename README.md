# School Management System

A comprehensive school management solution built to streamline academic and administrative operations.

## Tech Stack

### Frontend
- React.js
- Tailwind CSS
- HTML5

### Backend
- Python Flask
- SQLite
- SQLAlchemy ORM

### Deployment
- Docker

## Project Structure
```
school-management-system/
├── backend/
│   ├── app/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   ├── migrations/
│   ├── tests/
│   ├── config.py
│   └── requirements.txt
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── utils/
│   ├── package.json
│   └── tailwind.config.js
└── docker-compose.yml
```

## Features

1. Student Information Management
2. Staff Information Management
3. Admission and Enrollment
4. Fee Management
5. Academic Management
6. Examination and Report Cards
7. Communication and Notifications
8. Parent Portal
9. Library Management
10. Transport Management

## Setup Instructions

### Backend Setup
1. Create a virtual environment:
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Initialize the database:
   ```bash
   flask db init
   flask db migrate
   flask db upgrade
   ```

### Frontend Setup
1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```

2. Start development server:
   ```bash
   npm start
   ```

### Docker Setup
1. Build and run containers:
   ```bash
   docker-compose up --build
   ```

## Contributing
Please read CONTRIBUTING.md for details on our code of conduct and the process for submitting pull requests.

## License
This project is licensed under the MIT License - see the LICENSE file for details.
