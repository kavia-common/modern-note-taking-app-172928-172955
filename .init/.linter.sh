#!/bin/bash
cd /home/kavia/workspace/code-generation/modern-note-taking-app-172928-172955/notes_pro_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

