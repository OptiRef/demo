#!/bin/bash

# $1 is the database engine: postgresql, mysql, db2
# $2 is datasetsize eg: 1MT, 150MT


#Properties file
PROP_FILE=config.properties
#Summary creation JAR file
SUM_JAR="summary/target/dlsummary-jar-with-dependencies.jar"

function getProperty {
   PROP_KEY=$1
   PROP_VALUE=`cat $PROP_FILE | grep "$PROP_KEY" | cut -d'=' -f2`
   echo $PROP_VALUE
}

echo "# Reading property from $PROPERTY_FILE"
ONTONAME=$(getProperty "ontology.name")

DBNAME=$(getProperty "database.$1.$ONTONAME.$2.name")



# When using Postgresql
if [[ "$1" == 'postgresql' ]] || [[ "$1" == 'psql' ]] || [[ "$1" == 'POSTGRESQL' ]]|| [[ "$1" == 'PSQL' ]]; then
   #Run summary creation script
   CMD="java -Xmx100G -jar $SUM_JAR $PROP_FILE postgresql $2 $ONTONAME"
   echo $CMD
   $CMD

   # Load stats
 	 vacuumdb --analyze $DBNAME

fi

# When using mysql
if [[ "$1" == 'mysql' ]] || [[ "$1" == 'MySQL' ]] || [[ "$1" == 'MYSQL' ]]|| [[ "$1" == 'MySql' ]]; then
   #Run summary creation script
   CMD="java -Xmx100G -jar $SUM_JAR $PROP_FILE mysql $2 $ONTONAME"
   echo $CMD
   $CMD

   #Run mysql check
   mysqlcheck --defaults-extra-file=mysql.conf -o $DBNAME >logs/mysql_$DBNAME.log
fi



# When using DB2
if [[ "$1" == 'db2' ]] || [[ "$1" == 'DB2' ]] || [[ "$1" == 'Db2' ]]|| [[ "$1" == 'dB2' ]]; then
  #Run summary creation script
   CMD="java -Xmx100G -jar $SUM_JAR $PROP_FILE db2 $2 $ONTONAME"
   echo $CMD
   $CMD

   db2 connect to $DBNAME

   #DB2 stats/logs
 	db2 -x "select 'reorg table',substr(rtrim(tabschema)||'.'||rtrim(tabname),1,50),';'from syscat.tables where type = 'T' " > logs/reorg_$DBNAME.out
 	db2 -tvf  logs/reorg_$DBNAME.out > logs/db2_out_$DBNAME.out

 	db2 -x "select 'reorgchk update statistics on table',substr(rtrim(tabschema)||'.'||rtrim(tabname),1,50),';' from syscat.tables where type = 'T' " > logs/reorgchk_$DBNAME.out
 	db2 -tvf logs/reorgchk_$DBNAME.out >> logs/db2_out_$DBNAME.out

 	db2 -x "select 'runstats on table',substr(rtrim(tabschema)||'.'||rtrim(tabname),1,50),' and indexes all;'from syscat.tables where type = 'T' " > logs/runstats_$DBNAME.out
 	db2 -tvf logs/runstats_$DBNAME.out  >> logs/db2_out_$DBNAME.out

  DBUSER=$(getProperty "database.db2.user")

  DBPASS=$(getProperty "database.db2.password")
 	db2rbind $DBNAME -l logs/db2_$DBNAME.log all -u $DBUSER -p $DBPASS

 	db2 connect reset

fi

exit 0
