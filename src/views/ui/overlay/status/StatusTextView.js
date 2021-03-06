import ui.View as View;
import ui.ImageView as ImageView;
import ui.ImageScaleView as ImageScaleView;
import ui.ScoreView as ScoreView;

import src.constants.characterConstants as characterConstants;

exports = Class(ImageView, function (supr) {
	this.init = function (opts) {
		opts = merge(
			opts,
			{
				image: [
					'resources/images/ui/uiBoxCapLeftLong.png',
					'resources/images/ui/uiBoxMidLong.png',
					'resources/images/ui/uiBoxCapRightLong.png'
				][opts.side],
				y: 0,
				height: 110
			}
		);
		supr(this, 'init', [opts]);

		var padding = (opts.side === 2) ? 20 : 0;

		new ImageScaleView({
			superview: this,
			x: 35,
			y: 18,
			width: this.style.width - 41 - padding,
			height: 50,
			image: 'resources/images/ui/buttonBoxInset.png',
			scaleMethod: '9slice',
			sourceSlices: {
				horizontal: {left: 46, center: 16, right: 46},
				vertical: {top: 47, middle: 2, bottom: 47}
			},
			destSlices: {
				horizontal: {left: 20, right: 20},
				vertical: {top: 20, bottom: 20}
			}
		});

		this._icon = new ImageView({
			superview: this,
			x: 0,
			y: 4,
			width: 70,
			height: 70,
			image: opts.icon
		});
		this._text = new ScoreView({
			superview: this,
			x: 65,
			y: 22,
			width: this.style.width - 78 - padding,
			height: 44,
			characterData: characterConstants.white,
			text: opts.text,
			textAlign: 'right',
			visible: (opts.text !== '')
		});
	};

	this.setText = function (text) {
		if (text === false) {
			this._text.style.visible = false;
		} else {
			this._text.setText(text);
			this._text.style.visible = true;
		}
	};

	this.setIcon = function (icon) {
		this._icon.setImage(icon);
	};
});