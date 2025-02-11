#!/bin/bash
#
# update_and_build.sh
# This script replicates the logic of the cron job that:
#   1. Goes to the news-analyzer/back directory
#   2. Pulls latest changes from Git
#   3. Runs `pnpm run buildNews`
#   4. Appends all output to the specified log file
#

ROOT="/home/ubershmekel/news-analyzer/back/"
PNPM="/home/ubershmekel/.local/share/pnpm/pnpm"

echo "===== Starting cron.sh at $(date) ====="
echo "===== User is $(whoami) ====="

# Go to the project directory
cd $ROOT || {
  echo "Failed to cd into $ROOT"
  exit 1
}

# Pull the latest changes from git
echo "===== Starting git pull at $(date) ====="
git pull

# Run the build script using pnpm
echo "===== Starting pnpm run buildNews at $(date) ====="
$PNPM run buildNews

# Final log message
echo "===== Finished build at $(date) ====="
