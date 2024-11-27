# Script to print file contents of first three files matching the argument
# Usage: bash script2.sh filename1 filename2 filename3

for filename in $1 $2 $3
do
  cat $filename
done
