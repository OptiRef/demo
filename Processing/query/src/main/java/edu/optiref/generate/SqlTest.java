package edu.optiref.generate;


/*Copyright 2011, 2013, 2015 Alexandros Chortaras

This file is part of Rapid.

Rapid is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Rapid is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with Rapid.  If not, see <http://www.gnu.org/licenses/>.*/


import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;


import edu.ntua.isci.qa.algorithm.ComputedRewriting;
import edu.ntua.isci.qa.algorithm.Engine;
import edu.ntua.isci.qa.algorithm.Stats;
import edu.ntua.isci.qa.algorithm.rapid.dllite.DLRapid;
import edu.ntua.isci.qa.algorithm.rapid.elhi.ETRapid;
import edu.ntua.isci.common.lp.Clause;
import edu.ntua.isci.common.lp.ClauseParser;
import edu.ntua.isci.qa.lp.theory.FCTheory;
import edu.ntua.isci.qa.owl.OWL2LogicTheory;
import edu.ntua.isci.common.dl.LoadedOntology;
import edu.ntua.isci.common.dl.LoadedOntologyAccess;
import edu.ntua.isci.qa.utils.Utils;
import edu.optiref.sql.SqlConverter;
import fr.lri.lahdak.cqapri.db.CQ2SQL;

public class SqlTest {


	private static FCTheory lp;
	private static ArrayList<Clause> queries;

	private static PrintStream out = System.out;

	private static LoadedOntology ontRef;

	private static NumberFormat nf = NumberFormat.getInstance(Locale.US);

	static File file;
	static File fileSQL;
	static File fileSQL2;
	static FileWriter fileWriter;
	static BufferedWriter writer;
	static FileWriter fileWriterSQL;
	static BufferedWriter writerSQL;
	static FileWriter fileWriterSQL2;
	static BufferedWriter writerSQL2;

	static {
		nf.setMinimumFractionDigits(2);
		nf.setMaximumFractionDigits(2);
		nf.setGroupingUsed(false);
	}

	public static void main(String[] args) throws Exception {
		String mode="DU";
		String iri="SHORT";
		String ontology;
		String query;
		String outputDir;
		String mainFileName;


		if (args.length < 5) {
			System.out.println("Rapid version 0.93");
			System.out.println("Syntax : RapidTest mode[DU/DD/EU/ED] pred[SHORT/FULL] ontologyURL queryFile outputDirectory");
			System.out.println("            mode:DU : UCQ rewriting for DL-Lite frament of input ontology");
			System.out.println("            mode:DD : datalog rewriting for DL-Lite frament of input ontology");
			System.out.println("            mode:ED : datalog rewriting for ELHI frament of input ontology");
			System.out.println("            mode:HD : datalog rewriting for Horn-SHIQ frament of input ontology");
			System.out.println("            pred:SHORT : use short IRIs as predicate names in queries");
			System.out.println("            pred:FULL  : use full IRIs as predicate names in queries");
			System.out.println("            ontologyURL  : full path to ontology file (owl)");
			System.out.println("            queryFile  : full path to query file (txt)");
			System.out.println("            outputDirectory  : full path to folder where output files will be printed ending with \"/\"");
			System.out.println();

			//Example Wafaa
			//DU SHORT /Users/wafaaelhusseini/eclipse-workspace/CQ2SQL/input/Data/LUBM-ex-20.owl /Users/wafaaelhusseini/eclipse-workspace/CQ2SQL/input/Data/CQ/bremen/q8.txt /Users/wafaaelhusseini/eclipse-workspace/CQ2SQL/output/Tests_May25/bremen/
			System.exit(0);

		}

		mode = args[0];
		iri = args[1];
		ontology = args[2];
		query = args[3];
		outputDir = args[4];



		try {
			Path path = Paths.get(outputDir);
			Files.createDirectories(path);

		} catch (IOException e) {
			System.err.println("Failed to create directory!" + e.getMessage());
		}
		mainFileName = query.substring(query.lastIndexOf("/")+1,query.lastIndexOf("."));
		file = new File(outputDir+mainFileName+"_output_DU.txt");
		fileSQL = new File(outputDir+mainFileName+"_output_DU_SQL.txt");
		fileSQL2 = new File(outputDir+mainFileName+"_output_DU_SQL.sql");

		try {
			fileWriter = new FileWriter(file, true);
			writer = new BufferedWriter(fileWriter);
			fileWriterSQL = new FileWriter(fileSQL, true);
			writerSQL = new BufferedWriter(fileWriterSQL);
			fileWriterSQL2 = new FileWriter(fileSQL2, true);
			writerSQL2 = new BufferedWriter(fileWriterSQL2);
		}catch(final IOException e) {
			throw new ExceptionInInitializerError(e.getMessage());
		}







		String ontologyFile = "file:" + ontology;
		String queryFile = query;

		Engine engine = null;

		Map<String, Object> props = new HashMap<>();

		if (iri.equals("FULL")) {
			props.put(LoadedOntologyAccess.PRESENTATION_TYPE, LoadedOntologyAccess.FULL_FORM);
		} else {
			props.put(LoadedOntologyAccess.PRESENTATION_TYPE, LoadedOntologyAccess.SIMPLE_SHORT_FORM);
		}

		loadData(ontologyFile, queryFile);
		LoadedOntologyAccess loa = new LoadedOntologyAccess(ontRef, props);

		if (mode.equals("DU")) {
			engine = DLRapid.createFastUnfoldRapid();
		} else {
			engine = ETRapid.createDatalogRapid();
		}


		run(engine, loa, mode);
		writer.close();
		writerSQL.close();
		writerSQL2.close();
	}

	private static void run(Engine engine, LoadedOntologyAccess loa, String mode) throws Exception {
		if (engine == null) {
			return;
		}

		ArrayList<Clause>[] rewritings = new ArrayList[queries.size()];

		String engineName = engine.getEngineName();

		if (out != null) {
			out.println();
			out.println(engineName);
			writer.write("\n");
			writer.write(engineName);
		}

		if (mode.equals("DU") || mode.equals("DD")) {
			engine.importOntology(ontRef, loa, OWL2LogicTheory.DL_LITE);
		} else if (mode.equals("ED")) {
			engine.importOntology(ontRef, loa, OWL2LogicTheory.ELHI);
		} else if (mode.equals("HD")) {
			engine.importOntology(ontRef, loa, OWL2LogicTheory.HORN_SHIQ);
		}

		lp = engine.getCurrentTheory();

		System.out.println("Logic program size : " + lp.getClauses().size());
		writer.write("Logic program size : " + lp.getClauses().size());

		for (int j = 0; j < queries.size(); j++) {
			Clause query = queries.get(j);

			query.reset();

			System.out.println("Query " + (j + 1) + " : " + query);

			Stats st = new Stats();
			ComputedRewriting res = engine.computeRewritings(query, true);

			rewritings[j] = res.getFilteredRewritings();

			Stats rst = res.getStatistics();

			st.addIterationTimes(rst.qrewriteTime, rst.qcheckTime, rst.qmatchTime);
			st.finishIteration(res.getAllComputedRewritings().size(), res.getFilteredRewritings().size(), 0);

			if (out != null) {
				System.out.println();

				out.println("\tRewritten in " + st.qrewriteTime + " + " + st.qcheckTime + " (" + (st.qtotalTime) + ") ms. ");
				out.println("\tRewritings: " + st.qrewriteSize + " - " + st.qfinalSize);
				out.println();
			}


			Utils.printObjectArrayList(out, engineName + " - NON REDUNDANT ", rewritings[j]);
			printObjectArrayListV1(writer, engineName + " - NON REDUNDANT ", rewritings[j]);

			writer.close();

			printConversionToSQL(rewritings[j]);

		}

		System.out.println("FINISHED.");
	}


	public static void loadData(String ontologyFile, String queryFile) throws Exception {

		ontRef = LoadedOntology.createFromPath(ontologyFile);

		if (ontRef != null) {
			System.out.println("Ontology : " + ontologyFile);
			System.out.println("Query    : " + queryFile);
			System.out.println();

			System.out.println("Ontology axioms : " + ontRef.getMainOntology().getLogicalAxiomCount());
		}

		loadQueries(queryFile);
	}

	private static void loadQueries(String queryFile) throws Exception {
		queries = new ArrayList<Clause>();

		ClauseParser cp = new ClauseParser();

		BufferedReader qbf = new BufferedReader(new FileReader(queryFile));

		String qline;
		while ((qline = qbf.readLine()) != null) {
			if (qline.startsWith("%")) {
				continue;
			}
			queries.add(cp.parseClause(qline));
		}
		//HJ
		System.out.println("Debut LN");
//		CQ2SQL query = new CQ2SQL(false, false, false);
		SqlConverter query = new SqlConverter();
		/*if (queries.get(0)!=null) {
			String sqlq = query.getPostgresQuery(queries.get(0));
			System.out.println(sqlq);
			writerSQL.write("-------------------------------------------------------------");
			writerSQL.write("\n");
			writerSQL.write("Original Query Rewriting to SQL:");
			writerSQL.write("\n");
			writerSQL.write(sqlq);
			writerSQL.write("\n");
		}*/
		System.out.println("Fin LN");

	}
	private static void printObjectV1(BufferedWriter writer, int size, int i, Object s) throws IOException {
		char[] max = (size + "").toCharArray();
		char[] number = (i + "").toCharArray();

		String r = "";
		for (int j = number.length; j < max.length; j++) {
			r += " ";
		}

		r += i;

//		out.println(r + ": " + s);
		writer.write(r + ": " + s);
		writer.write("\n");
	}

	public static void printObjectArrayListV1(BufferedWriter writer, String title, Collection<?> set) throws IOException {
		out.println("-------------------------------------------------------------");
		out.println(title);
		out.println("-------------------------------------------------------------");
		int i = 0;
		for (Object c : set) {
			printObjectV1(writer, set.size(), i++, c);
		}
		out.println("-------------------------------------------------------------");
		out.println();
	}

	public static void printConversionToSQL(ArrayList<Clause> queriesList) throws IOException{
		writerSQL.write("-------------------------------------------------------------");
		writerSQL.write("\n");
//		CQ2SQL query = new CQ2SQL(false, false, false);
		SqlConverter query = new SqlConverter();
		writerSQL2.write("SELECT DISTINCT count(*)");
		writerSQL2.write("\n");
		writerSQL2.write("FROM(");
		writerSQL2.write("\n");
		for(int i=0;i<queriesList.size();i++) {
			if (queriesList.get(i)!=null) {
				String sqlq = query.getPostgresQuery(queriesList.get(i), new HashMap<String, String>());
				System.out.println(i+": "+sqlq);
				writerSQL.write(i+": "+sqlq);
				writerSQL.write("\n");
				if(i==0) {
					writerSQL2.write(sqlq);
					writerSQL2.write("\n");
				}else {
					writerSQL2.write("UNION");
					writerSQL2.write("\n");
					writerSQL2.write(sqlq);
					writerSQL2.write("\n");

				}

			}
		}
		writerSQL2.write(")x");

	}


}
