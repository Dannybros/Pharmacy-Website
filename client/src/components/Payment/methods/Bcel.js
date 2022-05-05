import React, {useState} from 'react'
import {Row, Col, Button, Spinner} from 'react-bootstrap';

function BCEL() {

    const [btnPayLoad, setBtnPayLoad] = useState(false);

    const handleClick=()=>{
        setBtnPayLoad(true)
    }

    return (
        <div className='Bcel_form'>
            <Row className="mx-0">
                <Col className="my-2" md lg={12} >
                    <label className='card-name' htmlFor="card-name">Card Name</label>
                    <input 
                        className='form-control'
                        type="text"
                        name="cardName"
                        id="card-name" 
                        placeholder="Card Name*"
                    />
                </Col>
                <Col className="my-3" lg={12}>
                    <Button 
                        variant="primary"
                        onClick={handleClick}
                        disabled={btnPayLoad}
                    >
                        {btnPayLoad?
                            <Spinner animation="border" variant="light" size="sm"/>
                        :
                            "Pay"
                        }
                    </Button>
                </Col>
            </Row>
        </div>
    )
}

export default BCEL