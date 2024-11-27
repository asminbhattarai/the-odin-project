# Script to count appearance of sister's name
# Usage: bash count-sisters.sh

# Loop
for sis in Jo Meg Beth Amy
do
  echo $sis:
  grep $sis -owi LittleWomen.txt | wc -l
done
