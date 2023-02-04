# chmod +x run-exp-demo.sh

#!/bin/bash
# config file
#PROP_FILE=query.properties

PROP_FILE=config.properties




# ontology name ex: lubm
dbName=$1

# database size ex: 1MT
dbSize=$2

#DBMS
dbms=$3

#Reformulation Language ex: UCQ
ref=$4

#queryFile
queryFile=$5

SUM_JAR="query/target/query-jar-with-dependencies.jar"
if [[ "$ref" == 'ALL' ]]; then
	array=( "UCQ" "USCQ" "JUCQ" )
	for i in "${array[@]}"
	do
		echo "$i"

	  CMD="java -Xmx100G  -jar $SUM_JAR $PROP_FILE $dbName $dbSize $dbms $i $queryFile"
	  #-XX:MaxPermSize
	  echo $CMD

	  $CMD
	  echo $CMD
	done
fi

if [[ "$ref" == 'UCQ' ]] || [[ "$ref" == 'USCQ' ]] || [[ "$ref" == 'JUCQ' ]]; then
	echo $ref
	CMD="java -Xmx100G  -jar $SUM_JAR $PROP_FILE $dbName $dbSize $dbms $ref $queryFile"
	#-XX:MaxPermSize
	echo $CMD

	$CMD
	echo $CMD

fi


exit 0
