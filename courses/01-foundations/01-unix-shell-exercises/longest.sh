# Script to print out filename which contains with the most lines in a directory among within same extension files.
# Usage: bash longest.sh directory extension
cd "$1"
wc *."$2" -l | sort -nr | head -n2 | tail -n1
