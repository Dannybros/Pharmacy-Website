import React from 'react'
import {Row, Col, Button} from 'react-bootstrap'
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';

function ProductList({handleShow, handleDelete, data, search}) {

    const filterEmployee=(data, searchQuery)=>{
        if(!searchQuery) return data;
  
        const searchTerm = searchQuery.toLowerCase()
  
        const filterData = data.filter((item)=>{
            const name = item.name.toLowerCase();
            return name.includes(searchTerm)
        })
        
        return filterData
    }

  return (
    <main className='card-main'>
        <Row className="card-table-header">
            <Col xs={2} lg={1} className="card-table-cell"> Image</Col>
            <Col xs={3} lg={4} className="card-table-cell"> Name </Col>
            <Col xs={2} className="card-table-cell"> Amount </Col>
            <Col xs={2} className="card-table-cell"> Price </Col>
            <Col xs={3} className="card-table-cell"> Action </Col>
        </Row>
        {data.length > 0 &&
            filterEmployee(data, search).map((item, i)=>{
                return(
                <Row key={i}>
                    <Col xs={2} md={2} lg={1} className="card-table-cell"> 
                        <img src={item.img} alt=""/>
                    </Col>
                    <Col xs={3} md={3} lg={4} className="card-table-cell"> {item.name} </Col>
                    <Col xs={2} className="card-table-cell"> Amount </Col>
                    <Col xs={2} className="card-table-cell"> Price </Col>
                    <Col xs={3} className="card-table-cell"> 
                        <Button className='card_table_icon' variant='primary' name="update" onClick={()=>handleShow(item)}><CreateIcon/></Button>
                        &nbsp; &nbsp;
                        <Button className='card_table_icon' variant='danger' onClick={()=>handleDelete(item)}><DeleteIcon/></Button>
                    </Col>
                </Row>
                )
            })
        }
       
    </main>
  )
}

export default ProductList