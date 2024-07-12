import { Col, Row } from 'react-bootstrap';

export default function Footer() {
	const currentYear = new Date().getFullYear();
	return (
		<footer className="footer">
			<div className="container-fluid">
				<Row>
					<Col md={6}>{currentYear}- Oficina Registro y Control -</Col>
					<Col md={6}>
						<div className="text-md-end footer-links d-none d-md-block">
							&nbsp;
						</div>
					</Col>
				</Row>
			</div>
		</footer>
	);
}
