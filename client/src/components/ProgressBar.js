const ProgressBar = ({ progress }) => {
	return (
		<div className='outer-bar'>
			<div
				style={{ width: `${progress}%`, backgroundColor: `#16C6DE` }}
				className='inner-bar'
			></div>
		</div>
	);
};
export default ProgressBar;
