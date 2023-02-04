# OptiRef: Optimization for data management in KBs

This repository contains two main modules that make up OptiRef:
* Data Processing: A Java based module to generate the databases, compute the summaries and run the queries.
* Data Visualisation: A PHP/Javascript demo to visualise and interact with the results.

A video explanation of the work done is provided!


## Requirements & Dependencies

### Dependencies

For the Data Processing Module:
* Java 14
* Maven
* One or more of the following DBMSs:
  * DB2 (v11.5)
  * MySQL Community (v8.0.25)
  * PostgreSQL (v14.2)

For the Data Visualisation Module:
* PHP running on an Apache server
* A javascript enabled browser  


## Execution

To properly use Optiref, first visit the Processing Module and follow the steps to generate the databases, their summaries and execute the queries locally.

Next, using the data generated from the experiments, you can use our PHP interface to visualise and interact with the results. The interface also allows you to query the created databases, as seen in the video. 
