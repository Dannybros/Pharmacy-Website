import React from 'react'
import {Col, Row, Button} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { useStateValue } from '../../../Reducer/StateProvider';
import { useTranslation } from 'react-i18next';

function ProductGrid({data}) {
  const navigate = useNavigate();
  const {t} = useTranslation();

  const [{lang}] = useStateValue();

  return (
    <Row>
        {data.map((item, i)=>{
          return(
          <>
          {item.quantity>2&&
            <Col lg={3} md={4} sm={6} xs={6} className="product_item_box" key={i}>
              <div className='product'>
                <img src={item.img} alt=""/>
                <div className='product_info_box'>
                  <h4>{item.name[lang]}</h4>
                  <p>
                    <span>{item.price.toLocaleString()} KIP</span>
                    <span style={{fontSize:"14px"}}>
                      <em>{item.type[lang]}</em>
                    </span>
                  </p>
                  <Button variant='primary' className="w-100" onClick={()=>navigate(`../product/${item._id}`)}>
                    {t('Shop.btn1')}
                  </Button>
                </div>
              </div>
            </Col>
          }
          </>
          )
        })}
    </Row>
  )
}

export default ProductGrid