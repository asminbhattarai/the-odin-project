# Script to calculate stats for data files.
# Usage: bash do-stats.sh one_or_more_data_files
for datafile in "$@"
do
  echo $datafile
  bash goostats.sh $datafile stats-$datafile
done
