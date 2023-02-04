package fr.optiref.dlquery;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import edu.ntua.isci.common.dl.LoadedOntology;
import edu.ntua.isci.common.lp.Clause;
import fr.optiref.dlquery.jucq.JUCQ;
import fr.optiref.dlquery.pruning.JUCQPruner;
import fr.optiref.dlquery.pruning.UCQPruner;
import fr.optiref.dlquery.pruning.USCQPruner;
import fr.optiref.dlquery.ucq.UCQ;

public class Inconsistency {

	// private Connector connector;
	// private Properties properties;
	// private Map<String, String> prefixes;
	// private String queriesFile;
	// String engine, ontofile, dbname;
	// private UCQ rapid;
	// private Statement stmt;
	// private static LoadedOntology ontRef;
	// private double inconsistacy_ratio ;
	// static long highestIndex;
	// String outputFile;
	// public Inconsistency(Properties _properties, String _dbname) {
	//
	// 	this.properties = _properties;
	// 	highestIndex = DL2SQL.getInstace().getHighestIndex() + 1;
	// 	this.queriesFile = (String) properties.get("database.queries");
	// 	this.engine = properties.get("database.engine").toString();
	// 	inconsistacy_ratio = Double.parseDouble(properties.get("exps.inconsistacy_ratio").toString());
	// 	ontofile = "file:"+System.getProperty("user.dir") + "/"+properties.get("database.ontology").toString();
	// 	connector = QueryDL.getConnector();
	// 	stmt = connector.getStmt();
	// 	this.dbname = _dbname;
	//
	// 	String expsPath = System.getProperty("user.dir") + "/"+properties.get("exps.inconsistancy.output").toString();
  //       this.outputFile = String.format("%s/%s.inconsistancy.maxIndex.txt", expsPath, this.dbname);
  //       wrtiteMaxIndex();
	//
	// 	rapid = null;
	// 	try {
	// 		ontRef =  LoadedOntology.createFromPath(ontofile);
	// 	} catch (Exception e) {
	// 		// TODO Auto-generated catch block
	// 		e.printStackTrace();
	// 	}
	//
	// }
	//
	//
	// List<String> getQueries(){
	// 	List<String>queries = new ArrayList<String>();
	// 	String line ="";
	// 	BufferedReader reader;
	// 	//System.out.println("we are in get queries");
	// 	this.prefixes = QueryUtils.getPrefix(this.queriesFile);
	// 	DL2SQL.getInstace().setPrefixes(this.prefixes);
	// 	DL2SQL.getInstace().setPrefixes(this.prefixes);
	// 	try {
	// 		reader = new BufferedReader(new FileReader(this.queriesFile));
	// 		line = reader.readLine();
	// 		while(line != null) {
	// 			if(line.startsWith("q")) {
	// 				queries.add(line);
	// 			}
	// 			line = reader.readLine();
	// 		}
	// 	} catch (IOException e) {
	// 		// TODO Auto-generated catch block
	// 		e.printStackTrace();
	// 	}
	//
	// 	return queries;
	// }
	//
	// private void update(String query){
	// 	try {
	// 		stmt.executeUpdate(query);
	// 	} catch (Exception e) {
	// 		System.out.println(stmt);
	// 		e.printStackTrace();
	// 	}
	// }
	//
	// public void addConsistancy(List<Clause> rewriting) throws SQLException {
	// 	String source = null;
	// 	String target;
	// 	String[] atoms;
	// 	int n;
	// 	int found = 0;
	// 	String query = "";
	// 	int IndividualInconsistancy = 0;
	// 	if(inconsistacy_ratio == 1) {
	// 		n = 1;
	// 	}else {
	// 		n = (int) (inconsistacy_ratio*rewriting.size());
	// 	}
	// 	System.out.println("nb cq to update : "+n);
	//
	// 	Collections.shuffle(rewriting);
	// 	long c0, c1;
	// 	System.out.println(highestIndex);
	// 	for (Clause cq : rewriting) {
	// 		c0 = highestIndex;
	// 		highestIndex++;
	// 		c1 = highestIndex;
	// 		highestIndex++;
	// 		System.out.println(cq.toString());
	// 		atoms = cq.toString().split(" <- ")[1].split("\\), ");
	// 		System.out.println(atoms[0] + ") "+atoms[1]);
	// 		source = "table"+DL2SQL.getInstace().getTable(getShort(atoms[0]));
	// 		target = "table"+DL2SQL.getInstace().getTable(getShort(atoms[1]));
	// 		System.out.println(String.format("source = %s target = %s", source, target));
	//
	//
	// 		if(atoms[0].contains("(?_u0, ?0")) {
	//
	// 			query = String.format("insert into  %s values (%d,%d) ", source, c0, c1);
	// 			connector.update(query);
	// 			if(atoms[1].contains("(?_u1, ?0")) {
	// 				query = String.format("insert into  %s values (%d,%d) ", target, c0, c1);
	// 				connector.update(query);
	//
	// 			}else if(atoms[1].contains("(?0, ?_u1")) {
	// 				query = String.format("insert into  %s values (%d,%d) ", target, c1, c0);
	// 				connector.update(query);
	// 			}else {
	// 				query = String.format("insert into  %s values (%d) ", target, c1);
	// 				connector.update(query);
	// 			}
	// 			query = String.format("insert into predicate_vocabulary values ('IndividualInconsistancy%d',%d)",IndividualInconsistancy, c1);
	// 			IndividualInconsistancy++;
	// 			connector.update(query);
	// 			query = String.format("insert into predicate_vocabulary values ('IndividualInconsistancy%d',%d)",IndividualInconsistancy, c0);
	// 			IndividualInconsistancy++;
	// 			connector.update(query);
	// 		}
	// 		else if(atoms[0].contains("(?0, ?_u0")) {
	// 			query = String.format("insert into  %s values (%d,%d) ", source, c0, c1);
	// 			connector.update(query);
	// 			if(atoms[1].contains("(?_u1, ?0")) {
	// 				query = String.format("insert into  %s values (%d,%d) ", target, c1, c0);
	// 				connector.update(query);
	// 			}else if(atoms[1].contains("(?0, ?_u1")) {
	// 				query = String.format("insert into  %s values (%d,%d) ", target, c0, c1);
	// 				connector.update(query);
	// 			}else {
	// 				query = String.format("insert into  %s values (%d) ", target, c0);
	// 				connector.update(query);
	// 			}
	// 			query = String.format("insert into predicate_vocabulary values ('IndividualInconsistancy%d',%d)",IndividualInconsistancy, c1);
	// 			IndividualInconsistancy++;
	// 			connector.update(query);
	// 			query = String.format("insert into predicate_vocabulary values ('IndividualInconsistancy%d',%d)",IndividualInconsistancy, c0);
	// 			IndividualInconsistancy++;
	// 			connector.update(query);
	// 		}
	// 		else {
	// 			query = String.format("insert into  %s values (%d) ", source, c0);
	// 			connector.update(query);
	// 			if(atoms[1].contains("(?_u0, ?0")) {
	// 				query = String.format("insert into predicate_vocabulary values ('IndividualInconsistancy%d',%d)",IndividualInconsistancy, c1);
	// 				IndividualInconsistancy++;
	// 				connector.update(query);
	// 				query = String.format("insert into predicate_vocabulary values ('IndividualInconsistancy%d',%d)",IndividualInconsistancy, c0);
	// 				IndividualInconsistancy++;
	// 				connector.update(query);
	// 				query = String.format("insert into  %s values (%d,%d) ", target, c1, c0);
	// 				connector.update(query);
	// 			}else if(atoms[1].contains("(?0, ?_u0")) {
	// 				query = String.format("insert into predicate_vocabulary values ('IndividualInconsistancy%d',%d)",IndividualInconsistancy, c1);
	// 				IndividualInconsistancy++;
	// 				connector.update(query);
	// 				query = String.format("insert into predicate_vocabulary values ('IndividualInconsistancy%d',%d)",IndividualInconsistancy, c0);
	// 				IndividualInconsistancy++;
	// 				connector.update(query);
	// 				query = String.format("insert into  %s values (%d,%d) ", target, c0, c1);
	// 				connector.update(query);
	// 			}else {
	// 				query = String.format("insert into predicate_vocabulary values ('IndividualInconsistancy%d',%d)",IndividualInconsistancy, c0);
	// 				IndividualInconsistancy++;
	// 				connector.update(query);
	//
	// 				query = String.format("insert into  %s values (%d) ", target, c0);
	// 				connector.update(query);
	// 			}
	// 		}
	//
	// 		found ++ ;
	//
	// 		if(found >=n) {
	// 			break;
	// 		}
	// 	}
	// 	System.out.println("nb cq updated : "+found);
	// 	System.out.println("current highestIndex : "+highestIndex);
	// 	System.out.println("real highestIndex : "+DL2SQL.getInstace().getHighestIndex());
	// }
	//
	// public void removeConsistancy(List<Clause> rewriting) {
	// 	String source = null;
	// 	String target;
	// 	String query;
	// 	String[] atoms;
	//
	// 	System.out.println(highestIndex);
	// 	for (Clause cq : rewriting) {
	//
	// 		atoms = cq.toString().split(" <- ")[1].split("\\), ");
	// 		source = "table"+DL2SQL.getInstace().getTable(getShort(atoms[0]));
	// 		target = "table"+DL2SQL.getInstace().getTable(getShort(atoms[1]));
	// 		//System.out.println(String.format("source = %s and target = %s", source, target));
	// 		query = String.format("delete from %s where c0> %d ", source, highestIndex);
	// 		if(!connector.isConcept(source)) {
	// 			query += String.format("or c1>%d ", highestIndex);
	// 		}
	// 		connector.update(query);
	// 		query = String.format("delete from %s where c0> %d ", target, highestIndex);
	// 		if(!connector.isConcept(target)) {
	// 			query += String.format("or c1>%d ", highestIndex);
	// 		}
	// 		connector.update(query);
	// 		query =  String.format("delete from predicate_vocabulary where predicate_encoding>%d", highestIndex);
	// 		connector.update(query);
	//
	// 	}
	//
	//
	// }
	//
	// public void wrtiteMaxIndex() {
	// 	FileWriter writer = null;
	// 	try {
	// 		writer = new FileWriter(this.outputFile);
	// 		writer.write(""+DL2SQL.getInstace().getHighestIndex()+"\n");
	// 		writer.flush();
	// 	} catch (IOException e) {
	// 		// TODO Auto-generated catch block
	// 		e.printStackTrace();
	// 	}
	//
	// }
	// private String getShort(String atom) {
	// 	if(atom.startsWith("lubm:")) {
	// 		return atom.replace("lubm:", "").replace("(?0)", "");
	// 	}else {
	// 		return atom.substring(atom.indexOf("#")+1, atom.indexOf("(", atom.indexOf("#"))-1);
	// 	}
	// }
	// public void create() throws SQLException {
	// 	List<String> queries = getQueries();
	// 	List<Clause> rewriting = new ArrayList<>();
	// 	List<Clause> sourceCQs = new ArrayList<>();
	// 	List<Clause> targetCQs  = new ArrayList<>();
	// 	rapid = new UCQ(properties);
	// 	String sqlCode;
	// 	String[] atoms;
	// 	int index;
	// 	for (String query : queries) {
	// 		String qname = QueryUtils.getQName(query);
	// 		System.out.println("processing create for query : "+qname);
	// 		atoms = query.split(" <- ")[1].split(", ");
	// 		index = 0;
	// 		sqlCode = rapid.reformulate(query);
	// 		rewriting = rapid.getRewritingQueries();
	// 		//System.out.println(rewriting);
	// 		//System.out.println("before inconsistancy : " +connector.getAnswer(String.format("with qf as (%s) select count(*) from qf;", sqlCode)));
	//
	// 		System.out.println("adding inconsistancy..");
	// 		addConsistancy(rewriting);
	// 		//System.out.println("after adding inconsistancy : "+connector.getAnswer(String.format("with qf as (%s) select count(*) from qf;", sqlCode)));
	//
	// 	}
	// }
	//
	//
	// public void remove() throws SQLException {
	// 	List<String> queries = getQueries();
	// 	List<Clause> rewriting = new ArrayList<>();
	// 	List<Clause> sourceCQs = new ArrayList<>();
	// 	List<Clause> targetCQs  = new ArrayList<>();
	// 	rapid = new UCQ(properties);
	// 	String sqlCode;
	// 	String[] atoms;
	// 	int index;
	// 	List<String> lines = QueryUtils.loadFile(this.outputFile);
	// 	highestIndex = Integer.parseInt(lines.get(0));
	// 	System.out.println("highestIndex: "+highestIndex);
	// 	for (String query : queries) {
	// 		String qname = QueryUtils.getQName(query);
	// 		System.out.println("processing remove for query : "+qname);
	// 		atoms = query.split(" <- ")[1].split(", ");
	// 		index = 0;
	// 		sqlCode = rapid.reformulate(query);
	// 		rewriting = rapid.getRewritingQueries();
	// 		//System.out.println(rewriting);
	// 		//System.out.println("before inconsistancy : " +connector.getAnswer(String.format("with qf as (%s) select count(*) from qf;", sqlCode)));
	//
	// 		removeConsistancy(rewriting);
	// 		//System.out.println("after removing inconsistancy : "+connector.getAnswer(String.format("with qf as (%s) select count(*) from qf;", sqlCode)));
	// 	}
	// }

}
