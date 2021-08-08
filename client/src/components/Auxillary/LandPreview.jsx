const getImage = (cellData) => {
	//
	if (cellData.x === 0 && cellData.y === 0) return "spawn";
	if (cellData.seed === -1) return "locked";
	const mod = cellData.seed % 100;
	if (mod > 90) return `pixplot_4`;
	if (mod > 80) return `pixplot_3`;
	if (mod > 60) return `pixplot_2`;
	if (mod > 30) return `pixplot_1`;
	return `pixplot_0`;
};
const LandPreview = ({ cellData }) => {
	const image = getImage(cellData);
	let seed = cellData.seed.toString();
	return (
		<div className="land-preview">
			<img draggable="false" src={`./assets/img/${image}.png`} alt={`${image}.png`} />
			{cellData?.factory ? (
				<img
					draggable="false"
					className="factory"
					style={{ top: `${seed[1]}%`, left: `${seed[0]}%` }}
					src={`./assets/img/factories/factory_${cellData.factory.type}.png`}
					alt={`${"factory"}.png`}
				/>
			) : null}
		</div>
	);
};
export default LandPreview;
