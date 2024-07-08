
//import { useContext } from "react";
import { useContext } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { DashboardContext } from "../../../layouts/context/DashboardContext";
const Navbar = (props) => {
    const {handleRegresar } = useContext(DashboardContext)

      return (
        <Row>
            <div className={`navbar-custom`}>
                <Row>
                    <Col xl={4}><div className="mb-3 mb-0 text-center"></div></Col>
                    <Col xl={4}><div className="mb-3 mb-0 text-center btnhistorial">
                    </div></Col>
                    <Col xl={4}><div className="mb-0 mb-0 text-center btnregresar"><Button className="btn btn-success " variant="primary" type="submit" onClick={() => handleRegresar(props?.tipo)}>{'Regresar'} </Button> </div></Col>
                </Row>
            </div>
        </Row>
    );
};
export default Navbar;