#!/bin/bash

# $1 is the database engine: postgresql, mysql, db2
# $2 is datasetsize eg: 1MT, 150MT


#Properties file
PROP_FILE=config.properties

#Data Loading JAR file
LOAD_JAR="loadDL/target/loadDL-jar-with-dependencies.jar"


function getProperty {
   PROP_KEY=$1
   PROP_VALUE=`cat $PROP_FILE | grep "$PROP_KEY" | cut -d'=' -f2`
   echo $PROP_VALUE
}

echo "# Reading property from $PROPERTY_FILE"
ONTONAME=$(getProperty "ontology.name")
DBNAME=$(getProperty "database.$1.$ONTONAME.$2.name")

# When using Postgresql
if [[ "$1" == 'postgresql' ]] || [[ "$1" == 'psql' ]] || [[ "$1" == 'POSTGRESQL' ]] || [[ "$1" == 'PSQL' ]]; then
   #Drop db if it exits
   dropdb $DBNAME
   #Create db if it does not exit
   createdb $DBNAME

   #Run data loading script
   CMD="java -Xmx100G -jar $LOAD_JAR $PROP_FILE postgresql $2 $ONTONAME"
   echo $CMD
   $CMD
fi

# When using mysql
if [[ "$1" == 'mysql' ]] || [[ "$1" == 'MySQL' ]] || [[ "$1" == 'MYSQL' ]] || [[ "$1" == 'MySql' ]]; then
  #Drop db if it exits
   mysqladmin --defaults-extra-file=mysql.conf -f  drop $DBNAME
   #Create db if it does not exit
   mysqladmin --defaults-extra-file=mysql.conf create $DBNAME

   #Run data loading script
   CMD="java -Xmx100G -jar $LOAD_JAR $PROP_FILE mysql $2 $ONTONAME"
   echo $CMD
   $CMD
fi

# When using DB2
if [[ "$1" == 'db2' ]] || [[ "$1" == 'DB2' ]] || [[ "$1" == 'Db2' ]] || [[ "$1" == 'dB2' ]]; then
  #Drop db if it exits
  db2 drop database $DBNAME
  #Create db if it does not exit
  db2 create database $DBNAME on '/local/data/'
  #Setup DB2 Configurations
  db2 update db cfg for $DBNAME using LOGPRIMARY 128
	db2 update db cfg for $DBNAME using LOGSECOND 128
	db2 update db cfg for $DBNAME using LOGFILSIZ 4096
	db2 "CALL SYSPROC.SYSINSTALLOBJECTS('EXPLAIN','C',NULL,CURRENT SCHEMA)"
	db2 connect reset

  #Run data loading script
   CMD="java -Xmx100G -jar $LOAD_JAR $PROP_FILE db2 $2 $ONTONAME"
   echo $CMD
   $CMD
fi


exit 0
