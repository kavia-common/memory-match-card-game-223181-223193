#!/bin/bash
cd /home/kavia/workspace/code-generation/memory-match-card-game-223181-223193/memory_match_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

