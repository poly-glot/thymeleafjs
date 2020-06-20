/* 
 * Copyright 2017, Emanuel Rabina (http://www.ultraq.net.nz/)
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

import ExpressionProcessor            from '../expressions/ExpressionProcessor.js';
import SelfRemovingAttributeProcessor from '../../processors/SelfRemovingAttributeProcessor.js';

import {clearChildren} from '@ultraq/dom-utils';

/**
 * JS equivalent of Thymeleaf's `th:if` attribute processor, includes or
 * excludes the current element and its children from rendering, depending on
 * the evaluation of the expression in the attribute value.
 * 
 * @author Emanuel Rabina
 */
export default class IfAttributeProcessor extends SelfRemovingAttributeProcessor {

	static NAME = 'if';

	/**
	 * Constructor, set this processor to use the `if` name and supplied prefix.
	 * 
	 * @param {String} prefix
	 * @param {Object} isomorphic
	 */
	constructor(prefix, isomorphic) {

		super(prefix, IfAttributeProcessor.NAME, isomorphic);
	}

	/**
	 * Processes an element that contains a `th:if` or `data-th-if` attribute
	 * on it, evaluating the expression for truthy/falsey, rendering/excluding the
	 * element and its children based on the result.
	 * 
	 * @param {Element} element 
	 *   Element being processed.
	 * @param {String} attribute
	 *   The attribute that was encountered to invoke this processor.
	 * @param {String} attributeValue
	 *   The value given by the attribute.
	 * @param {Object} context
	 * @return {Boolean} `true` if the element was removed.
	 */
	process(element, attribute, attributeValue, context) {

		let expressionResult = new ExpressionProcessor().process(attributeValue, context);
		if (!expressionResult) {
			clearChildren(element);
			// TODO: element.remove()?
			element.parentNode.removeChild(element);
			return true;
		}
		return super.process(element, attribute, attributeValue, context);
	}
}
