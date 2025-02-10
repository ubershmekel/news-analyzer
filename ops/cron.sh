#!/bin/bash
#
# update_and_build.sh
# This script replicates the logic of the cron job that:
#   1. Goes to the news-analyzer/back directory
#   2. Pulls latest changes from Git
#   3. Runs `pnpm run buildNews`
#   4. Appends all output to the specified log file
#

# Where your log file is stored:
ROOT="/home/ubershmekel/news-analyzer"
LOG_FILE="$ROOT/back/data/cron.log"

# Go to the project directory
cd $ROOT/back || {
  echo "Failed to cd into $ROOT/back" >> "$LOG_FILE" 2>&1
  exit 1
}

# Pull the latest changes from git
echo "===== Starting git pull at $(date) =====" >> "$LOG_FILE" 2>&1
git pull >> "$LOG_FILE" 2>&1

# Run the build script using pnpm
echo "===== Starting pnpm run buildNews at $(date) =====" >> "$LOG_FILE" 2>&1
pnpm run buildNews >> "$LOG_FILE" 2>&1

# Final log message
echo "===== Finished build at $(date) =====" >> "$LOG_FILE" 2>&1
