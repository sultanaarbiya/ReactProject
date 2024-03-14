import './App.css';
import Counter from './Components/Counter';
import UserDataForm from './Components/UserDataForm';
import RichTextEditor from './Components/RichtextEditor';
import Beizercurve from './Components/BeizerCurve'




function App() {
  return (

    <div className='main'>

      <div className='count'><Counter /></div>
      <div className='richedit'><RichTextEditor /></div>
      <div className='data'><UserDataForm /></div>
      <div className='box3'>
        <div className="box" id="json" >JsonData</div>
        <div className="box" id="user-id">userID</div>
        <div className="box" id="saved">SavedData</div>

      </div>
      <Beizercurve />
      <Beizercurve />
      <Beizercurve />
    </div>

  );
}


export default App;