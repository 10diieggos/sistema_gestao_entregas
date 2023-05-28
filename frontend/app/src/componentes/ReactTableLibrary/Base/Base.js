import * as React from "react";

import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";

import DadosTeste from '../../DadosTeste';

const nodes = DadosTeste.slice(0, 10);

const Base = () => {
  const data = { nodes };

  const theme = useTheme(getTheme());

  const COLUMNS = [
    { label: 'ordem'.toUpperCase(), renderCell: (item) => item.ordem },
    { label: 'rastreamento'.toUpperCase(), renderCell: (item) => item.rastreamento },
    { label: 'destinatario'.toUpperCase(), renderCell: (item) => item.destinatario },
    { label: 'endereco'.toUpperCase(), renderCell: (item) => item.endereco },
    { label: 'num_endereco'.toUpperCase(), renderCell: (item) => item.num_endereco },
  ];

  return (
    <>
      <CompactTable columns={COLUMNS} data={data} theme={theme} />

      <br />
    </>
  );
};

export default Base;