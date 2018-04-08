/*
 * Copyright 2018, Emanuel Rabina (http://www.ultraq.net.nz/)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import InputBuffer from './InputBuffer';

/**
 * A recursive descent parser for any parsing expression grammar defined by the
 * constructs in this module.
 * 
 * TODO: Own module?
 * 
 * @author Emanuel Rabina
 */
export default class Parser {

	/**
	 * @param {Grammar} grammar
	 */
	constructor(grammar) {

		this.grammar = grammar;
	}

	/**
	 * Parse a string, attempting to build the parse tree defined by the rules in
	 * the configured grammar.  Parsing is considered successful when there are no
	 * more non-terminating symbols in the grammar and all of the input has been
	 * read.
	 * 
	 * @param {String} input
	 * @return {Object} The parse tree if the input could be parsed, `null`
	 *   otherwise.
	 */
	parse(input) {

		let inputBuffer = new InputBuffer(input);
		let matchResult = this.grammar.accept(inputBuffer, this);
		if (!matchResult || !inputBuffer.exhausted()) {
			throw new Error(`Failed to parse "${input}"`);
		}
		return matchResult;
	}

	/**
	 * Parse the input against the given expression.  An expression can either be
	 * a reference to another rule in the current grammar, or a regular expression
	 * that consumes input.
	 * 
	 * @param {InputBuffer} input
	 * @param {String|RegExp} expression
	 * @return {Object}
	 */
	parseWithExpression(input, expression) {

		// Name of another rule in the grammar
		if (typeof expression === 'string') {
			let ruleFromExpression = this.grammar.findRuleByName(expression);
			return ruleFromExpression ? ruleFromExpression.match(input, this) : null;
		}

		// A regular expression that must be matched
		else {
			let result = input.read(expression);
			if (result) {
				return result[0];
			}
		}

		return null;
	}
}