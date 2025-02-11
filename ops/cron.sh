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

# At first `pnpm` wasn't found, then `node` wasn't found.
# So I'm just throwing the entire `echo $PATH` in here.
export PATH=/home/ubershmekel/.local/share/pnpm:/run/user/1000/fnm_multishells/8891_1739255640602/bin:/home/ubershmekel/.local/share/fnm:/usr/local/bin:/usr/bin:/bin:/usr/local/games:/usr/games

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
pnpm run buildNews

# Final log message
echo "===== Finished build at $(date) ====="
