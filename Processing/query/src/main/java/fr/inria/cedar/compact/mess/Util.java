package fr.inria.cedar.compact.mess;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.apache.commons.lang3.tuple.ImmutablePair;
import org.apache.commons.lang3.tuple.Pair;

import com.google.common.collect.ImmutableList;

import fr.inria.cedar.compact.app.Compact;
import fr.inria.cedar.compact.loader.QueryLoader;
import fr.inria.cedar.compact.loader.RuleLoader;
import fr.inria.cedar.compact.query.SemiConjunctiveQuery;
import fr.inria.cedar.compact.query.SemiConjunctiveQueryLinkedList;
import fr.inria.cedar.compact.query.UnionSemiConjunctiveQuery;
import fr.inria.cedar.compact.query.UnionSemiConjunctiveQueryLinkedList;
import fr.lirmm.graphik.graal.api.core.Atom;
import fr.lirmm.graphik.graal.api.core.ConjunctiveQuery;
import fr.lirmm.graphik.graal.api.core.Rule;
import fr.lirmm.graphik.graal.api.core.Substitution;
import fr.lirmm.graphik.graal.core.ruleset.IndexedByHeadPredicatesRuleSet;
import fr.lirmm.graphik.util.stream.CloseableIteratorWithoutException;

public class Util {

	/**
	 * 
	 * @param path: a path to a file in dlgp format
	 * @return an iterator of the (positive) rules present in the file
	 */
	public static IndexedByHeadPredicatesRuleSet loadRules(String path){
		String pathRules = path;
		IndexedByHeadPredicatesRuleSet rules = new IndexedByHeadPredicatesRuleSet();
		RuleLoader rl = new RuleLoader(rules,pathRules);
		rl.load();
		return rules;	
	}
	
	/**
	 * 
	 * @param path: a path to a file in dlgp format
	 * @return an iterator of the conjunctive queries in the file 
	 */
	public static Iterator<ConjunctiveQuery> queryLoader(String path){
		Collection<ConjunctiveQuery> queries = new LinkedList<>();
		QueryLoader ql = new QueryLoader(queries,path);
		ql.load();
		return queries.iterator();
	}
	
	
	/**
	 * 
	 * @param s a substitution
	 * @return true if and only if s is injective (i.e., no two terms have the same image)
	 */
	public static boolean isInjective(final Substitution s){
		return (s.getTerms().size()==s.getValues().size());
	}
	
	
	/**
	 * 
	 * @param rule: an existential rule
	 * @return true if and only if rule is a linear rule (atomic body)
	 */
	public static boolean isLinear(Rule rule){
		CloseableIteratorWithoutException<Atom> it = rule.getBody().iterator();
		if (it.hasNext()){
			it.next();
			if (it.hasNext()){
				return false;
			}
			return true;
		}
		return false;
	}
	
	/**
	 * 
	 * @param rule
	 * @return true iff rule can lead to non local unifications
	 * It checks whether there is an existential and whether all terms of the head are distinct variables
	 */

	public static boolean mayBeNonLocal(Rule rule){
		return ((!rule.getExistentials().isEmpty())
				||(!isLinear(rule))
				||(rule.getHead().getVariables().size()!=rule.getHead().iterator().next().getPredicate().getArity()));
	}
	
	private static <T> List<List<T>> getTuples(final List<Iterator<T>> itrs, final int i){
		final List<List<T>> lists = new LinkedList<>();
		
		if(i == itrs.size()-1){
			while(itrs.get(i).hasNext()){
				lists.add(ImmutableList.of(itrs.get(i).next()));
			}
		}
		else {
			final List<List<T>> lists2 = getTuples(itrs,i+1);
			while(itrs.get(i).hasNext()){
				final T n = itrs.get(i).next();
				
				for (List<T> l : lists2) {
					final List<T> newList = new ArrayList<>();
					newList.addAll(l);
					newList.add(0,n);
					lists.add(newList);
				}
			}
		}
		
		return lists;
	}
	
	/**
	 * 
	 * @param lists a list of lists
	 * @return a list of lists, which is obtained by performing the cartesian products of the lists in the input
	 */
	public static <T> List<List<T>> computeCartesianProduct(final List<List<T>> lists){
		if(lists == null || lists.isEmpty())
			throw new IllegalArgumentException("Cannot compute the cartesian "
					+ "product over an empty or null list");
		
		final List<Iterator<T>> itrs = 
				lists.stream()
				.map(List::iterator)
				.collect(Collectors.toList());
		
		return getTuples(itrs,0);
	}
	
	/**
	 * 
	 * @param path: path to the repositories containing queries, ontologies and a UCQ rewriting according to an oracle
	 * @return a pair of USCQS, the first one being generated by Compact, the second being the union of the UCQs generated by the oracle
	 */
	public static Pair<List<UnionSemiConjunctiveQuery>,List<UnionSemiConjunctiveQuery>> testCompact(String path){
		IndexedByHeadPredicatesRuleSet rules = Util.loadRules(path + "-atomic.dlp");
		List<UnionSemiConjunctiveQuery> compactRes = new ArrayList<>();
		List<UnionSemiConjunctiveQuery> pureRes = new ArrayList<>();
		Iterator<ConjunctiveQuery> queryIt =
				Util.queryLoader(path + "_queries.dlp");

		int index = 0;
		while (queryIt.hasNext()){
			ConjunctiveQuery query = queryIt.next();
			index++;
			compactRes.add(Compact.solve(query,rules));
			Iterator<ConjunctiveQuery> solLoader=
					Util.queryLoader(path + "_Q" + index + "_rew.dlp");
			UnionSemiConjunctiveQuery pureRewriting = new UnionSemiConjunctiveQueryLinkedList();

			while (solLoader.hasNext()){
				ConjunctiveQuery rew = solLoader.next();
				SemiConjunctiveQuery rewSCQ = new SemiConjunctiveQueryLinkedList(rew);
				rewSCQ.clean("_ans");
				pureRewriting.add(rewSCQ);
			}
			pureRes.add(pureRewriting);
		}
		ImmutablePair<List<UnionSemiConjunctiveQuery>,List<UnionSemiConjunctiveQuery>> result = new ImmutablePair<>(compactRes,pureRes);
		return result;
	}
	
	/**
	 * 
	 * @param a pair of USCQs
	 * @return (bool1,bool2) such that bool1 is true if the first uscq is more general than the second, and bool2 is true if the second uscq
	 * is more general than the first
	 */
	public static Pair<Boolean,Boolean> checkEquivalence(Pair<List<UnionSemiConjunctiveQuery>,List<UnionSemiConjunctiveQuery>> toCompare){
		if (toCompare.getLeft().size()!=toCompare.getRight().size()){
			return new ImmutablePair<>(false,false);
		}
		boolean isComplete = true;
		boolean isSound = true;
		for (int i=0;i<toCompare.getLeft().size();i++){
			UnionSemiConjunctiveQuery entailing = toCompare.getLeft().get(i);
			UnionSemiConjunctiveQuery entailed = toCompare.getRight().get(i);
			for (SemiConjunctiveQuery scq:entailed.getSCQs()){
				if (!entailing.entails(scq)){
					isComplete = false;
				}
			}
		}
		for (int i=0;i<toCompare.getLeft().size();i++){
			UnionSemiConjunctiveQuery entailing = toCompare.getRight().get(i);
			UnionSemiConjunctiveQuery entailed = toCompare.getLeft().get(i);
			for (SemiConjunctiveQuery scq:entailed.getSCQs()){
				if (!entailing.entails(scq)){
					isSound = false;
				}
			}
		}
		return new ImmutablePair<>(isComplete,isSound);
	}
	
	public static Map<Integer,Integer> composition(Map<Integer,Integer> toParent,Map<Integer,Integer> fromChild){
		Map<Integer,Integer> result = new HashMap<Integer,Integer>();
		for (Integer i:fromChild.keySet()){
			if (toParent.containsKey(fromChild.get(i)))
				result.put(i, toParent.get(fromChild.get(i)));
		}
		return result;
	}
}
