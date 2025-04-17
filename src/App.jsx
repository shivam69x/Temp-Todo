import Todoapp from "./Todo/Todoapp"
import { Toaster } from 'react-hot-toast';
// import Checkbox from "./Todo/Checkbox"

function App() {
  return (
    <>
      <Todoapp/>
      <Toaster />

      {/* <Checkbox /> */}
    </>
  );
}

export default App;