import "./AlertStyles.css"; // We'll create this CSS file

function Alerter(props) {
	const [showAlert, setShowAlert] = useState(false);

	const displayAlert = () => {
		setShowAlert(true);
		// Automatically hide the alert after 5 seconds
		setTimeout(() => setShowAlert(false), 5000);
	};

	return (
		<div>
			{showAlert && (
				<div className="alert-container">
					<div
						className="alert alert-success alert-dismissible fade show"
						role="alert">
						Sign up successful
						<button
							type="button"
							className="btn-close"
							data-bs-dismiss="alert"
							aria-label="Close"
							onClick={() => setShowAlert(false)}></button>
					</div>
				</div>
			)}

			{/* Your other components */}

			<button onClick={displayAlert}>Show Alert</button>
		</div>
	);
}

export default Alerter;
