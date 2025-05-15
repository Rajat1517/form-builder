import './styles/global.css';
import Builder from './pages/Builder';
import PublishedForm from './pages/PublishedForm';
import { createBrowserRouter, RouterProvider } from 'react-router';

function  App() {

  const router= createBrowserRouter([
    {
      path: "/",
      Component: Builder,
    },
    {
      path: "/forms/:formId",
      Component: PublishedForm,
    }
  ]);


  return (
    <RouterProvider router={router}/>
  );
}

export default App;
