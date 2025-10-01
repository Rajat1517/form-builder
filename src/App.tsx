import './styles/global.css';
import Builder from './pages/Builder';
import PublishedForm from './pages/PublishedForm';
import { createBrowserRouter, RouterProvider } from 'react-router';
import UserForms from './pages/UserForms';

function  App() {

  const router= createBrowserRouter([
    {
      path: "/",
      Component: Builder,
    },
    {
      path: "/forms/:formId",
      Component: PublishedForm,
    },
    {
      path: "/user/forms",
      Component: UserForms,
    }
  ]);


  return (
    <RouterProvider router={router}/>
  );
}

export default App;
