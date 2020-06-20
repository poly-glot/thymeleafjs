/* 
 * Copyright 2020, Emanuel Rabina (http://www.ultraq.net.nz/)
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

import AttributeProcessor from './AttributeProcessor.js';

/**
 * An attribute processor that removes itself from the element being processed.
 * Used for providing this behaviour to the standard processors, and for being
 * able to work with isomorphic use cases.
 * 
 * @author Emanuel Rabina
 */
export default class SelfRemovingAttributeProcessor extends AttributeProcessor {

	/**
	 * Constructor, saves the isomorphic information for processing.
	 *
	 * @param {String} prefix
	 * @param {String} name
	 * @param {Object} isomorphic
	 */
	constructor(prefix, name, isomorphic) {

		super(prefix, name);
		this.isomorphic = isomorphic;
	}

	/**
	 * Removes this attribute from the element being processed.
	 * 
	 * @param {Element} element
	 *   Element being processed.
	 * @param {String} attribute
	 *   The attribute that was encountered to invoke this processor.
	 * @param {String} attributeValue
	 *   The value given by the attribute.
	 * @param {Object} context
	 * @return {Boolean} `false` as removing an attribute never requires
	 *   repropcessing.
	 */
	async process(element, attribute, attributeValue, context) {

		element.removeAttribute(attribute);
		if (this.isomorphic) {
			element.removeAttribute(`${context.standardDialect.prefix}:${this.name}`);
		}
		return false;
	}
}
