const getLandRate = (seed, type) => {
	let rate;
	const base = {
		0: 100,
		1: 50,
		2: 20,
		3: 10,
		4: 5,
	};
	const land_dependent = {
		0: true,
		1: true,
		2: true,
		3: true,
		4: true,
	};
	if (land_dependent[type]) rate = 50 + ((seed / 10 ** (type % 35)) % 51);
	else rate = 100;
	return parseInt((base[type] * rate) / 100);
};

export default getLandRate;
