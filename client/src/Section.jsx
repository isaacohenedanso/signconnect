import "bootstrap/dist/css/bootstrap.css";

const Section = (props) => (
	<section className={props.className}>
		<span>
			<h3 className="header">{props.header}</h3>
			<p className="message pt-5 pr-5">{props.message}</p>
		</span>
		<img src={props.img} alt={props.img} />
	</section>
);
export default Section;
