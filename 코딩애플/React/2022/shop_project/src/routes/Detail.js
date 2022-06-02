import { Row, Col, Card } from 'react-bootstrap';   // 부트스트랩
import Image from 'react-random-image';   // 랜덤이미지
import { useParams } from 'react-router-dom';



const Detail = (props) => { 

  // URL 파라미터 가져오기
  let { id } = useParams();

  // 찾은 상품 id 가져오기
  // let findProduct = props.shoes.find(function(x){
  //   console.log(x);
  //   return x.id == id
  // });



  return (
    <div>
      <div className='detail-container'>
      <Row xs={1} md={3} className="g-4">
        {
          <Col>
            <Card className='card-container'>
                <Image width={200} height={200} />
              <Card.Body>
                <Card.Title>{ props.shoes[id].title }</Card.Title>
                <Card.Text>
                  { props.shoes[id].content }
                  { props.shoes[id].price }
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        }
      </Row>
    </div>
    </div>
  )
}

export default Detail;