#A script for creating the correct folder structure for the project

#$1 is the subdirectory of Experiments

#Properties file
PROP_FILE=config.properties
function getProperty {
   PROP_KEY=$1
   PROP_VALUE=`cat $PROP_FILE | grep "$PROP_KEY" | cut -d'=' -f2`
   echo $PROP_VALUE
}


mkdir Experiments
mkdir Experiments/$1

for benchmark in LUBM; do


mkdir Experiments/$1/$benchmark

mkdir Experiments/$1/$benchmark/DBMS

for x in DB2 MYSQL POSTGRESQL; do

  mkdir Experiments/$1/$benchmark/DBMS/$x

  for y in 1MT 10MT 50MT 100MT 150MT; do

  mkdir Experiments/$1/$benchmark/DBMS/$x/$y

  mkdir Experiments/$1/$benchmark/DBMS/$x/$y/Queries

  mkdir Experiments/$1/$benchmark/DBMS/$x/$y/Stats

done

done


mkdir Experiments/$1/$benchmark/Info

mkdir Experiments/$1/$benchmark/Info/Prefix

touch Experiments/$1/$benchmark/Info/Prefix/prefix.txt
echo "PREFIX lubm: http://swat.cse.lehigh.edu/onto/univ-bench.owl#" >> Experiments/$1/$benchmark/Info/Prefix/prefix.txt

#touch Experiments/$1/$benchmark/Info/Prefix/db_prefix.txt


mkdir Experiments/$1/$benchmark/Queries

mkdir Experiments/$1/$benchmark/Queries/Compact

mkdir Experiments/$1/$benchmark/Queries/Original

QUERYDIR=$(getProperty "database.queries")

cp $QUERYDIR/* Experiments/$1/$benchmark/Queries/Original/

mkdir Experiments/$1/$benchmark/Queries/Reformulations

for r in UCQ USCQ JUCQ; do

mkdir Experiments/$1/$benchmark/Queries/Reformulations/$r

  for y in 1MT 10MT 50MT 100MT 150MT; do

  mkdir Experiments/$1/$benchmark/Queries/Reformulations/$r/$y

done

done

done

echo stats.output.prefix = $1 >> $PROP_FILE
echo exps.output = $1 >> $PROP_FILE
