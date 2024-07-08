// @flow
import { Popover, OverlayTrigger } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { DashboardContext } from '../../../layouts/context/DashboardContext';
import { useContext } from 'react';

const BtnActions = (props) => {
    const { itemUrl } = useContext(DashboardContext);
    const popover = (
        <Popover id={`1_${props?.titulo}_2`}>
            <Popover.Header as="h3">{props.titulo}</Popover.Header>
            <Popover.Body>{props.descripcion}</Popover.Body>
        </Popover>
    );
    let Ids = localStorage.getItem('Ids'),
    ITEM_SELECT = sessionStorage.getItem('ITEM_SELECT'),
    tipo = JSON.parse(ITEM_SELECT),
    idUrls = JSON.parse(Ids);
    let q = Number(idUrls?.q) === 0 ? props?.row : idUrls?.q;
    const url = `?p=${idUrls?.p}&q=${q}`;
    const urlb = `/dashboard/${itemUrl}/${tipo?.tipo}`;
    return (
        <OverlayTrigger trigger={['hover', 'focus']} placement="left" overlay={popover} key={`1_${props?.titulo}_2`}>
           
                <Link
                    key={`1_${props?.titulo}_2`}
                    to={Number(idUrls?.p) > 0 ? url : urlb}
                    className="action-icon "
                    onClick={() => props?.toggleActions(props?.row, props?.titulo)}>
                    <i className={`${props?.icon} pt-2`}></i>
                </Link>
             
        </OverlayTrigger>
    );
};
export default BtnActions;
