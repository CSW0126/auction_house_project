import { BrowserRouter} from 'react-router-dom';
import AnimatedRoute from './AnimatedRoute';

function App() {

  return (
    <main className="app transition-all ease-in">
        <BrowserRouter>
          <AnimatedRoute/>
        </BrowserRouter>
    </main>
  )
}

export default App
