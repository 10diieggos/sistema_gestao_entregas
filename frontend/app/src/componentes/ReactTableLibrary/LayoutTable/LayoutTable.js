import * as React from "react";

import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";

import DadosTeste from '../../DadosTeste';

const nodes = DadosTeste.slice(0, 10);

const LayoutTable = () => {
  const data = { nodes };

  const theme = useTheme(getTheme());

  const COLUMNS = [
    { label: 'ordem'.toUpperCase(), renderCell: (item) => item.ordem, resize: true },
    { label: 'rastreamento'.toUpperCase(), renderCell: (item) => item.rastreamento, resize: true },
    { label: 'destinatario'.toUpperCase(), renderCell: (item) => item.destinatario, resize: true },
    { label: 'endereco'.toUpperCase(), renderCell: (item) => item.endereco, resize: true },
    { label: 'num_endereco'.toUpperCase(), renderCell: (item) => item.num_endereco, resize: true },
  ];

  return (
    <>
      <CompactTable
        columns={COLUMNS}
        data={data}
        theme={theme}
        layout={{ custom: true }}
      />

      <br />
    </>
  );
};

export default LayoutTable;