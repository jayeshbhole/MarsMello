const manageNumbers = (n) => {
	if (!n) return 0;
	const decimals = 18;
	n /= 10 ** decimals;
	if (n / 1000000000 >= 1) {
		return `${(n / 1000000000).toFixed(1)}B`;
	} else if (n / 1000000 >= 1) {
		return `${(n / 1000000).toFixed(1)}M`;
	} else if (n / 1000 >= 1) {
		return `${(n / 1000).toFixed(1)}K`;
	} else {
		return n.toString();
	}
};

export default manageNumbers;
