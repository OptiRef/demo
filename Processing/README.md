# OptiRef: Optimization for data management in KBs

## Requirements & Dependencies

### Dependencies

For the Data Processing Module:
* Java 14
* Maven
* One or more of the following DBMSs:
  * DB2 (v11.5)
  * MySQL Community (v8.0.25)
  * PostgreSQL (v14.2)

### Data
To run OptiRef, data in the .owl or .dlp format is required:
* One file containing the ontology.
* One or more files containing the data.

If the data is in .owl format, the `owl2dlp.sh` script should be executed to generate the .dlp version of the files.

#### Example: LUBM Dataset
We used  the EUGen (v0.1b) data generator, provided with the extended LUBM benchmark to generate datasets in .owl format.

The ontology used is LUBM-ex-20.owl.

Both the generator and the ontology are available at: http://www.informatik.uni-bremen.de/~clu/combined/

We generated data for for 1200 universities, from which we generated subsets of data of increasing sizes.
The datasets were chosen as follows:
* 1 Million Triples: 9 Universities (0 to 8)
* 10 Million Triples: 75 Universities (0 to 74)
* 50 Million Triples: 373 Universities (0 to 372)
* 100 Million Triples: 745 Universities (0 to 744)
* 150 Million Triples: 1118 Universities (0 to 1117)
Each university is described by around 20 files, all of which were used for completeness and to avoid bias.

### Queries
The queries used in experiments are in the folders:
* `ressources/LUBM-CC-Queries`
* `ressources/LUBM-QA-Queries`

#### Example: ***Consistency Checking*** Queries for LUBM

- C0c|C0i(?0) <- lubm:Person(?0), lubm:Organization(?0)

- C1c|C1i(?0) <- lubm:Organization(?0), lubm:Student(?0)

- C2c|C2i(?0) <- lubm:Organization(?0), lubm:Publication(?0)

- C3c|C3i(?0) <- lubm:Professor(?0), lubm:Department(?0)

- C4c|C4i(?0) <- lubm:Professor(?0), lubm:Publication(?0)


#### Example:  ***Query Answering*** Queries for LUBM

- QA0(?0,?2) <- lubm:Student(?0), lubm:takesCourse(?0,?1), lubm:Subj1Course(?1), lubm:teacherOf(?2,?1), lubm:Professor(?2), lubm:headOf(?2,?3), lubm:Subj1Department(?3), lubm:memberOf(?0,?3)

- QA1(?0) <- lubm:Person(?0), lubm:worksFor(?0,?1), lubm:Department(?1), lubm:takesCourse(?0,?2), lubm:Course(?2)

- QA2(?0) <- lubm:Student(?0), lubm:publicationAuthor(?1,?0), lubm:Publication(?1), lubm:teachingAssistantOf(?0,?2), lubm:Course(?2)

- QA3(?0) <- lubm:Faculty(?0), lubm:degreeFrom(?0,?1), lubm:University(?1), lubm:subOrganizationOf(?2,?1), lubm:Subj10Department(?2), lubm:memberOf(?0,?2)

- QA4(?1,?4) <- lubm:Subj3Department(?1), lubm:Subj4Department(?4), lubm:Subj10Professor(?0), lubm:memberOf(?0,?1), lubm:publicationAuthor(?2,?0), lubm:Professor(?3), lubm:memberOf(?3,?4), lubm:publicationAuthor(?2,?3)

- QA5(?0,?1,?2) <- lubm:Professor(?0), lubm:teacherOf(?0,?1), lubm:worksFor(?0,?2), lubm:degreeFrom(?0,"http://www.University870.edu"), lubm:researchInterest(?0,"Research21"), lubm:name(?0,"AssociateProfessor2"), lubm:emailAddress(?0,"AssociateProfessor2@Department1.University0.edu"), lubm:telephone(?0,"xxx-xxx-xxxx")

- QA6(?0,?2) <- lubm:Student(?0), lubm:takesCourse(?0,?1), lubm:Course(?1), lubm:teacherOf(?2,?1), lubm:Faculty(?2), lubm:worksFor(?2,?3), lubm:Subj5Department(?3), lubm:memberOf(?0,?3)

- QA7(?0,?1) <- lubm:Professor(?0), lubm:teacherOf(?0,?1), lubm:degreeFrom(?0,"http://www.University870.edu"), lubm:researchInterest(?0,"Research21"), lubm:name(?0,"AssociateProfessor2"), lubm:telephone(?0,"xxx-xxx-xxxx"), lubm:emailAddress(?0,"AssociateProfessor2@Department1.University0.edu")

- QA8(?0) <- lubm:Faculty(?0), lubm:mastersDegreeFrom(?0,?1), lubm:University(?1), lubm:subOrganizationOf(?2,?1), lubm:Subj10Department(?2), lubm:memberOf(?0,?2)

- QA9(?1,?4) <- lubm:Subj3Department(?1), lubm:Subj4Department(?4), lubm:Subj3Professor(?0), lubm:memberOf(?0,?1), lubm:publicationAuthor(?2,?0), lubm:Subj5Professor(?3), lubm:memberOf(?3,?4), lubm:publicationAuthor(?2,?3)

## Installation

The following modules must be compiled separately as follows:

### Data Loader

```bash
cd loadDL
mvn clean compile assembly:single
```
### Summary Generator

```bash
cd ../summary
mvn clean compile assembly:single
```

### Query Executor

```bash
cd ../query
mvn clean compile assembly:single
```
## Configuration Setup
Prior to running the scripts, the following file must be modified to fit your setup:
* `config.properties`
All properties between brackets must be modified.


Once the properties file is properly configured, run the `create-exp-dirs.sh` script to generate the proper results file structure.
This is very important as it will be used for the Visualisation Module.
```bash
./create-exp-dirs.sh <Experiment Name>
```
eg:
```bash
./create-exp-dirs.sh 03-02-2023
```
## Usage

### Loading the data:

First, to load the data from the .dlp format into a database, run:

```bash
./load_data.sh <DBMS> <DATASET SIZE>
```
eg:
```bash
./load_data.sh MySQL 1MT
```
To create a MySQL database of size 1 million triples from the chosen ontology in `config.properties`.

### Creating the summary :
Next, to generate the summary tables (one table per concept and role) for the created database, run:

```bash
./run_summary.sh <DBMS> <DATASET SIZE>
```
eg:
```bash
./run_summary.sh MySQL 1MT
```
To generate the summary for the MySQL database of size 1 million triples from the chosen ontology in `config.properties`.

### Querying the data:
Finally, to execute queries on the created database, and generate the results, run:
```bash
./run_exp.sh <DBMS> <DATASET SIZE>
```
eg:
```bash
./run_exp.sh MySQL 1MT
```
To to execute all queries for the MySQL database of size 1 million triples from the chosen ontology in `config.properties`.
