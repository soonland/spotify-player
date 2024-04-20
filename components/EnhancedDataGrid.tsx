import { FC } from "react";
import { DataGrid, DataGridProps } from "@mui/x-data-grid";
import { enUS, frFR } from "@mui/x-data-grid/locales";
import useTranslation from "next-translate/useTranslation";

const EnhancedDataGrid: FC<DataGridProps> = (props) => {
  const { lang } = useTranslation();
  const localeText =
    lang === "en"
      ? enUS.components.MuiDataGrid.defaultProps.localeText
      : frFR.components.MuiDataGrid.defaultProps.localeText;
  return <DataGrid {...props} localeText={localeText} />;
};

export default EnhancedDataGrid;
