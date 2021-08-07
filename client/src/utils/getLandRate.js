const getLandrate = (seed, type) => {
	const land_dependent = {
		0: true,
		1: true,
		2: true,
		3: true,
		4: true
	};
	if (land_dependent[type]) return 50 + ((seed / 10 ** (ftype % 35)) % 51);
	else return 100;
};
