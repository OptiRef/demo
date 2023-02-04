# Ontological Data Loading Module


## Setup
To execute this module, you must set up the parameters in the file `./config.properties` from the main directory.

## Build

```bash
mvn clean compile assembly:single
```

## Execute
To load the data from the .dlp format into a database, run the following script from the main directory:
```bash
./load_data.sh <DBMS> <DATASET SIZE>
```
