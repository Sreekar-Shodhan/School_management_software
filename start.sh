#!/bin/bash

# Activate virtual environment if it exists
if [ -d "backend/venv" ]; then
    source backend/venv/bin/activate
fi

# Install required Python packages
cd backend
pip install -r requirements.txt || { echo "Failed to install Python packages"; exit 1; }

# Start the backend server
python3 app.py &
BACKEND_PID=$!

# Check if backend started successfully
sleep 2
if ! ps -p $BACKEND_PID > /dev/null; then
    echo "Backend failed to start"
    exit 1
fi

# Start the frontend server
cd ../frontend
npm start

# Keep the script running
wait $BACKEND_PID
