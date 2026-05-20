#!/bin/bash

# Define the absolute path to the app directory dynamically based on script location
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" &> /dev/null && pwd)"
APP_DIR="$SCRIPT_DIR/app"

echo "========================================================="
echo "Starting Motion Guide Next.js App"
echo "========================================================="

if [ ! -d "$APP_DIR" ]; then
  echo "❌ Error: App directory '$APP_DIR' not found."
  exit 1
fi

echo "✅ Moving into project directory: $APP_DIR"
cd "$APP_DIR" || exit 1

# Automatically check and install dependencies if node_modules is missing
if [ ! -d "node_modules" ]; then
  echo "📦 node_modules not found. Installing dependencies with pnpm..."
  pnpm install
fi

echo "🚀 Starting development server..."
echo "👉 You can access the app at: http://localhost:3000"
echo "========================================================="

# Start the Next.js dev server
pnpm dev
