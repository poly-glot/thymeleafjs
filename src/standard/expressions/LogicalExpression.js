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

import UnaryExpression         from './UnaryExpression';
import Rule                    from '../../parser/Rule';
import SequenceExpression      from '../../parser/SequenceExpression';
import OrderedChoiceExpression from '../../parser/OrderedChoiceExpression';
import SimpleExpression        from '../../parser/SimpleExpression';

export const Operand = new Rule('Operand',
	new SimpleExpression(
		UnaryExpression.name
	)
);

export const Comparator = new Rule('Comparator',
	new OrderedChoiceExpression([
		/===?/
	])
);

/**
 * A logical expression is any expression that resolves in a `true`/`false`
 * value.
 * 
 * @author Emanuel Rabina
 */
export default new Rule('LogicalExpression',
	new SequenceExpression(
		Operand.name,
		Comparator.name,
		Operand.name
	),
	([leftOperand, comparator, rightOperand]) => context => {
		let lhs = leftOperand(context);
		let rhs = rightOperand(context);
		switch (comparator) {
			case '==':  return lhs == rhs;
			case '===': return lhs === rhs;
		}
		return false;
	}
);