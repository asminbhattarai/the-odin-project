# Calculate stats for data files
for datafile in "$@"
do
  echo $datfile
  bash goostats.sh $datafile stats-$datafile
done
