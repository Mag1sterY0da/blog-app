import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import store from './api/store';
import AppWrapper from './components/AppWrapper';
import Footer from './components/Footer';
import Header from './components/Header';
import Wrapper from './components/Wrapper';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import ProfileSettings from './pages/ProfileSettings';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppWrapper>
          <Header />
          <Wrapper>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/settings' element={<ProfileSettings />} />
              <Route path='/user/:id' element={<ProfilePage />} />
            </Routes>
          </Wrapper>
          <Footer />
        </AppWrapper>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
