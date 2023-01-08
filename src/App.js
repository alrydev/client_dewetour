import '../src/assets/style/App.css'

import HomeUser from './pages/HomeUser';
import DetailTripPage from './pages/DetailTripPage';
import BookingPage from './pages/BookingPage';
import ProfilePage from './pages/ProfilePage';
import AddTripPage from './pages/AddTripPage';
import IncomeTripAdminPage from './pages/IncomeTripAdminPage';
import PayPage from './pages/PayPage';
import TransactionAdminPage from './pages/TransactionAdminPage';
import AddCountryPage from './pages/AddCountryPage';
import { Router, useNavigate } from 'react-router-dom';

import { Routes, Route } from 'react-router-dom';
import { API, setAuthToken } from './config/api';
import { useContext, useEffect } from 'react';
import { UserContext } from './context/userContext';
import NavUser from './components/navbar/NavUser';

function App() {

  // =============================






  //  ===========================

  let navigate = useNavigate()

  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }

  const [state, dispatch] = useContext(UserContext)


  // =============================================



  // =================================================================

  useEffect(() => {
    // Redirect Auth
    if (state.isLogin === false) {
      navigate('/');
    } else {
      if (state.user.status === 'admin') {
        navigate('/transaction');
      } else if (state.user.status === 'user') {
        navigate('/');
      }
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get('/check-auth')

      if (response.status === 404) {
        return dispatch({
          type: 'AUTH_ERROR',
        })
      }

      let payload = response.data.data
      payload.token = localStorage.token

      dispatch({
        type: 'USER_SUCCESS',
        payload,
      })
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    checkUser()
  }, [])

  return (
    <>
      <Routes>

        <Route exacth path="/" element={< HomeUser />} />


        <Route exacth path="/detail/:id" element={< DetailTripPage />} />
        <Route exacth path="/booking" element={< BookingPage />} />
        <Route exacth path="/profile" element={< ProfilePage />} />
        <Route exacth path="/pay" element={< PayPage />} />


        <Route exacth path="/transaction" element={< TransactionAdminPage />} />
        <Route exacth path="/add-trip" element={< AddTripPage />} />
        <Route exacth path="/add-country" element={< AddCountryPage />} />
        <Route exacth path="/income-trip" element={< IncomeTripAdminPage />} />
      </Routes>
    </>
  );
}

export default App;
