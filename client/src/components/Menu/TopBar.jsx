import { useSpring, animated, config } from "@react-spring/web";
import { useContext } from "react";
import { Web3Context } from "../../context/Web3Context";
import useInterval from "../../hooks/useInterval";
import manageNumbers from "../../utils/manageNumbers";

function hslToRgb(h, s, l) {
	let r, g, b;

	if (s === 0) {
		r = g = b = l; // achromatic
	} else {
		let hue2rgb = function hue2rgb(p, q, t) {
			if (t < 0) t += 1;
			if (t > 1) t -= 1;
			if (t < 1 / 6) return p + (q - p) * 6 * t;
			if (t < 1 / 2) return q;
			if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
			return p;
		};

		let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
		let p = 2 * l - q;
		r = hue2rgb(p, q, h + 1 / 3);
		g = hue2rgb(p, q, h);
		b = hue2rgb(p, q, h - 1 / 3);
	}

	return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}
function numberToColorHsl(i, min, max) {
	let ratio = i;
	if (min > 0 || max < 1) {
		if (i < min) {
			ratio = 0;
		} else if (i > max) {
			ratio = 1;
		} else {
			let range = max - min;
			ratio = (i - min) / range;
		}
	}
	let hue = (ratio * 1.2) / 3.6;
	let rgb = hslToRgb(hue, 1, 0.5);

	return "rgb(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + ")";
}
const randomBetweenFiftyHun = () => {
	return Math.round(Math.random() * 100);
};

const TopBar = () => {
	const { account, getWeb3ModalProvider, balances, lastClaimed } = useContext(Web3Context);
	const [borderStyles, borderStylesApi] = useSpring(() => ({
		borderColor: numberToColorHsl(50, 0.3, 0.7),
		background: numberToColorHsl(50, 0.3, 0.7),
		width: "50%",
		config: config.molasses,
	}));

	useInterval(() => {
		if (!account) {
			borderStylesApi.stop();
			const random = randomBetweenFiftyHun();
			borderStylesApi.start({
				borderColor: numberToColorHsl((100 - random) / 100, 0.3, 0.7),
				background: numberToColorHsl((100 - random) / 100, 0.3, 0.7),
				width: `${Math.floor(random / 2 + 50)}%`,
			});
		} else {
			if (lastClaimed) {
				borderStylesApi.stop();
				const hoursPassedPercent = (Date.now() - parseInt(lastClaimed) * 1000) / 86400 / 24;
				borderStylesApi.start({
					borderColor: numberToColorHsl((100 - hoursPassedPercent) / 100, 0.3, 0.7),
					background: numberToColorHsl((100 - hoursPassedPercent) / 100, 0.3, 0.7),
					width: `${Math.floor(hoursPassedPercent / 2 + 50)}%`,
				});
			} else {
				borderStylesApi.start({
					borderColor: numberToColorHsl(100, 0.3, 0.7),
					background: numberToColorHsl(100, 0.3, 0.7),
					width: `${Math.floor(50)}%`,
				});
			}
		}
	}, 5000);

	return (
		<div className="topbar bar">
			<div className="item Fe">
				<div className="value">
					<h1>{manageNumbers(balances?.fe)}</h1>
				</div>
				<div className="key">
					<h3>Fe</h3>
				</div>
			</div>
			<div className="item Au">
				<div className="value">
					<h1>{manageNumbers(balances?.au)}</h1>
				</div>
				<div className="key">
					<h3>Au</h3>
				</div>
			</div>
			<div className="item Ti">
				<div className="value">
					<h1>{manageNumbers(balances?.ti)}</h1>
				</div>
				<div className="key">
					<h3>Ti</h3>
				</div>
			</div>
			<div className="item Cu">
				<div className="value">
					<h1>{manageNumbers(balances?.cu)}</h1>
				</div>
				<div className="key">
					<h3>Cu</h3>
				</div>
			</div>
			<div className="item Al">
				<div className="value">
					<h1>{manageNumbers(balances?.al)}</h1>
				</div>
				<div className="key">
					<h3>Al</h3>
				</div>
			</div>
			<div className={`holding ${!account ? "not-" : ""}connected`} onClick={getWeb3ModalProvider}>
				{!account ? (
					<span className="cta">Connect Wallet</span>
				) : (
					<span className="cta">
						<span className="bal">Balance</span>
						<span className="main">
							{manageNumbers(balances?.mlo)}
							<span>MLO</span>
						</span>
					</span>
				)}
			</div>
			<div className="claim-progress">
				<animated.div className="progress" style={borderStyles}></animated.div>
			</div>
		</div>
	);
};

export default TopBar;
