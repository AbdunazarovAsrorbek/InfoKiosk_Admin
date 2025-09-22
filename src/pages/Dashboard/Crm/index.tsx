import React from 'react'
import BreadCrumb from 'Common/BreadCrumb';
import { Container, Row } from 'react-bootstrap';
import BalanceOverview from './balanceOverview';

const Crm = () => {
    document.title = "TUIT Assessment";
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Assessment" pageTitle="Dashboards" />
                    <Row>
                        <BalanceOverview />
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    )
}

export default Crm;
