
import Todo from './components/Todo'

const style= {
  appMain : `todoMain relative w-full h-screen flex justify-center items-start py-20 bg-zinc-800 px-4`
}

function App() {

  return (
    <>
      <div className={style.appMain}>
        
      <Todo />
      </div>
    </>
  )
}

export default App
