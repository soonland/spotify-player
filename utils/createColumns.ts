/* eslint-disable @typescript-eslint/no-explicit-any */
// utils/createColumns.ts
import { GridAlignment, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import useTranslation from "next-translate/useTranslation";

interface ICreateColumnOptions {
  width?: number;
  align?: GridAlignment;
  valueGetter?: (value: never) => string;
  renderCell?: (params: GridRenderCellParams<any, string>) => JSX.Element;
}

interface ICreateColumn {
  field: string;
  options?: ICreateColumnOptions;
}

export const useCreateColumn = () => {
  const { t } = useTranslation();

  const createColumn = (columnDef: ICreateColumn): GridColDef => {
    return {
      field: columnDef.field,
      headerName: t(`dataGrid.search.${columnDef.field}`),
      width: columnDef.options?.width ?? 150,
      headerAlign: "center",
      align: columnDef.options?.align ?? "center",
      valueGetter: columnDef.options?.valueGetter,
      renderCell: columnDef.options?.renderCell,
    };
  };

  return createColumn;
};
