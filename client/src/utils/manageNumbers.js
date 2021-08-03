const manageNumbers = (n) => {
	if (Math.floor(n / 1000000000) > 0) {
		return `${Math.floor(n / 1000000000)}B`;
	} else if (Math.floor(n / 1000000) > 0) {
		return `${Math.floor(n / 1000000)}M`;
	} else if (Math.floor(n / 1000) > 0) {
		return `${Math.floor(n / 1000)}K`;
	} else {
		return `${n}`;
	}
};

export default manageNumbers;
