# Print a list of the unique species appearing in 2nd column of the csv files.
# Usage: bash species.sh one_or_more_filenames

# Loop over all the files
for file in $@
do
  echo "Uniques species in $file:"
  # Extract species name
  cut -d, -f2 $file | sort | uniq
done
