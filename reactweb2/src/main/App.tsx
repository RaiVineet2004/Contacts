
import './App.css';
import Header from './Header';
import ContactList from '../contact/ContactList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ContactDetails from '../contact/ContactDetails';
import ContactAdd from '../contact/ContactAdd';
import ContactEdit from '../contact/ContactEdit';


function App()
{
  return (
    <BrowserRouter>
    <div className='container'>
      <h1><br></br><Header subtitle= 'Contact Details'></Header></h1>
      
      <Routes>
        <Route path="/" element = {<ContactList/>}></Route>
        <Route path="/contact/:id" element={<ContactDetails/>}></Route>
        <Route path="/contact/add" element={<ContactAdd/>}></Route>
        <Route path="/contact/edit/:id" element={<ContactEdit/>}></Route>

      </Routes>

    </div>
    </BrowserRouter>
  );
}

export default App;
