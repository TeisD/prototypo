import React from 'react';
import ReactDOM from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import DOM from '../../helpers/dom.helpers.js';

import HandlegripBar from './handlegrip-bar.components.jsx';

/**
*	Component : a letter where you can set spacing
*	With a drag'n'dropable handlegrip
*	@extends React.Component
*/
export default class HandlegripLetter extends React.Component {
	constructor(props) {
		super(props);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}

	/**
	*	get the current letter's clientWidth property
	*	@returns {number} the clientWidth property
	*/
	getClientWidth() {
		return this.refs.letterWrapLetter.clientWidth;
	}

	/**
	*	get the current letter's offsetLeft property
	*	@returns {number} the offsetLeft property
	*/
	getAbsOffset() {
		return DOM.getAbsOffset(this.refs.letterWrapLetter).offsetLeft;
	}


	/**
	*	get the current left bar's offsetLeft and clientWidth properties
	*	@returns {object} - the object containing offsetLeft and clientWidth properties
	*	@returns {number} object.offsetLeft - the offsetLeft property
	*	@returns {number} object.clientWidth - the clientWidth property
	*/
	getLeftBar() {
		const leftbarElement = ReactDOM.findDOMNode(this.refs.leftbar);
		const offsetLeft = DOM.getAbsOffset(leftbarElement).offsetLeft;
		const clientWidth = leftbarElement.clientWidth;

		return {offsetLeft, clientWidth};
	}

	/**
	*	get the current right bar's offsetLeft and clientWidth properties
	*	@returns {object} - the object containing offsetLeft and clientWidth properties
	*	@returns {number} object.offsetLeft - the offsetLeft property
	*	@returns {number} object.clientWidth - the clientWidth property
	*/
	getRightBar() {
		const rightbarElement = ReactDOM.findDOMNode(this.refs.rightbar);
		const offsetLeft = DOM.getAbsOffset(rightbarElement).offsetLeft;
		const clientWidth = rightbarElement.clientWidth;

		return {offsetLeft, clientWidth};
	}

	render() {
		const spacingLeft = Math.round(Math.abs(this.props.spacingLeft));
		const spacingRight = Math.round(Math.abs(this.props.spacingRight));
		const advanceWidth = Math.round(Math.abs(this.props.advanceWidth));

		return (
			<span className="letter-wrap">
				<HandlegripBar
					ref="leftbar"
					side="left"
					spacing={spacingLeft}
					min={this.props.min}
					max={this.props.max}
					letter={this.props.letter}
				/>
				<span className="letter-wrap-wrap">
					<span ref="letterWrapLetter" className="letter-wrap-letter" dangerouslySetInnerHTML={{__html:this.props.letter.replace(/ /g, '&nbsp;')}}>
					</span>
					<span className="handlegrip-spacing-number">
						{advanceWidth}
					</span>
				</span>
				<HandlegripBar
					ref="rightbar"
					side="right"
					spacing={spacingRight}
					min={this.props.min}
					max={this.props.max}
					letter={this.props.letter}
				/>
			</span>
		);
	}
}
