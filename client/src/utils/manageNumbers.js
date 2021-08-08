const manageNumbers = (n) => {
	if (!n) return 0;
	const decimals = 18;
	n /= 10 ** decimals;
	// console.log("balance: ", n);
	if (n / 1000000000 >= 1) {
		return `${Math.floor(n / 100000000) / 10}B`;
	} else if (n / 1000000 >= 1) {
		return `${Math.floor(n / 100000) / 10}M`;
	} else if (n / 1000 >= 1) {
		return `${Math.floor(n / 100) / 10}K`;
	} else {
		return (Math.floor(n * 10) / 10).toString();
	}
};

export default manageNumbers;
