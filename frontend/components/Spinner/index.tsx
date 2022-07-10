const Spinner = () => {
	return (
		<div className="fixed top-0 bg-black w-full h-full flex justify-center items-center bg-opacity-70">
			<div className="lds-ripple">
				<div></div>
				<div></div>
			</div>
		</div>
	);
};

export default Spinner;
