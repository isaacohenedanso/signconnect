function Accord() {
	return (
		<div className="container">
			<h3 className="text-center">FAQ&apos;s</h3>
			<br />
			<div className="accordion " id="accordionExample">
				<div className="accordion-item">
					<h2 className="accordion-header">
						<button
							className="accordion-button"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#collapseOne"
							aria-expanded="true"
							aria-controls="collapseOne">
							What is Signconnect?
						</button>
					</h2>
					<div
						id="collapseOne"
						className="accordion-collapse collapse show"
						data-bs-parent="#accordionExample">
						<div className="accordion-body">
							Lorem ipsum dolor sit amet consectetur adipisicing elit.
							Accusantium ab officiis corporis quasi, molestiae libero. Maxime
							sed quia omnis neque, veniam harum distinctio vitae, et dolore
							inventore aut necessitatibus quasi!
						</div>
					</div>
				</div>
				<div className="accordion-item">
					<h2 className="accordion-header">
						<button
							className="accordion-button collapsed"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#collapseTwo"
							aria-expanded="false"
							aria-controls="collapseTwo">
							Who is Signconnect?
						</button>
					</h2>
					<div
						id="collapseTwo"
						className="accordion-collapse collapse"
						data-bs-parent="#accordionExample">
						<div className="accordion-body">
							Lorem, ipsum dolor sit amet consectetur adipisicing elit.
							Consectetur voluptatum molestias dolorem consequatur voluptate in
							consequuntur tempore dicta, inventore adipisci. Non, ipsam
							perspiciatis modi ratione odio saepe perferendis labore itaque?
						</div>
					</div>
				</div>
				<div className="accordion-item">
					<h2 className="accordion-header">
						<button
							className="accordion-button collapsed"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#collapseThree"
							aria-expanded="false"
							aria-controls="collapseThree">
							Why is Signconnect?
						</button>
					</h2>
					<div
						id="collapseThree"
						className="accordion-collapse collapse"
						data-bs-parent="#accordionExample">
						<div className="accordion-body">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
							nesciunt unde, explicabo, quos illum molestias alias laudantium
							quam tenetur architecto exercitationem nihil amet necessitatibus
							optio minus consequatur molestiae fuga repellat!
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Accord;
