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

// TODO: This is a pretty empty object, and probably not needed in JavaScript (I
//       was only mirroring what it was like in OG Thymeleaf, so there are a lot
//       of classes here where they aren't needed).  Should be replaced by the
//       result of a rule matching being a function that, when executed,
//       performs what `execute` here did.

/**
 * An expression is any piece of code to be processed in the current context.
 * 
 * @author Emanuel Rabina
 */
export default class Expression {

	/**
	 * @param {String} expression
	 */
	constructor(expression) {

		this.expression = expression;
	}

	/**
	 * Execute the expression and return the result for the given context.
	 * 
	 * @param {Object} context
	 * @return {Object}
	 */
	execute(context) {

		console.error(`Not implemented for this expression: ${this.expression}`);
		return null;
	}

	/**
	 * Output the string used to build this expression.
	 * 
	 * @return {String}
	 */
	toString() {

		return this.expression;
	}
}
