# Script to extract data on animal sighting date and total sightings
# Usage: bash count-species.sh species_name directory

cd "$2/"
grep "$1" *".csv" | cut -d: -f2 | cut -d, --complement -f2 | sort -n | uniq > "$1".txt
echo $1.txt
cat $1.txt
