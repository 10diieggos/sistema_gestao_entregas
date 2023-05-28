import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
// import EnhancedTable from './componentes/EnhancedTable/EnhancedTable';
// import DataTable from './componentes/DataTable/DataTable';
// import TableMantineShowrell from './componentes/TableMantineShowrell';
// import GettingStarted from './componentes/ReactTableLibrary/GettingStarted';
// import Base from './componentes/ReactTableLibrary/Base';
// import StoriesTheme from './componentes/ReactTableLibrary/StoriesTheme';
// import LayoutTable from './componentes/ReactTableLibrary/LayoutTable';
// import Component from './componentes/ReactTableLibrary/Component';
import Basic from './componentes/ReactTable/Basic';


function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <div className="App">
        {/* <h2>Getting Started</h2>
        <GettingStarted />
        <h2>Base</h2>
        <Base />
        <h2>Stories Theme</h2>
        <StoriesTheme />
        <h2>Layout</h2>
        <LayoutTable />
        <h2>Sort Table</h2>
        <Component /> */}
        <h2>Basic</h2>
        <Basic />
      </div>
    </React.Fragment>
  );
}

export default App;
