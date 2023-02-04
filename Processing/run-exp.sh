#!/bin/bash
# config file
# $1 is DBMS:
# $2 is dataset size

PROP_FILE=config.properties

function getProperty {
   PROP_KEY=$1
   PROP_VALUE=`cat $PROP_FILE | grep "$PROP_KEY" | cut -d'=' -f2`
   echo $PROP_VALUE
}
ONTONAME=$(getProperty "ontology.name")
QUERYDIR=$(getProperty "database.queries")



for filename in $QUERYDIR/*.queries; do
    ./run-exp-demo.sh $ONTONAME $2 $1 $ALL $filename
done

exit 0
