import './App.css';
import { Button, Card } from "antd"
import styled from "@emotion/styled"

const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
min-height: 100vh;
`


function App() {
  return (
    <div className="App">
      <Container>
        <Card>
          <Button type="primary" >按钮</Button>

        </Card>

      </Container>
    </div>
  );
}

export default App;
