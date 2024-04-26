import { FC } from "react";
import { DataGrid, DataGridProps, gridClasses } from "@mui/x-data-grid";
import { enUS, frFR } from "@mui/x-data-grid/locales";
import useTranslation from "next-translate/useTranslation";
import { styled } from "@mui/material";

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  "& .MuiDataGrid-columnHeaders": {
    backgroundColor: theme.palette.mode === "light" ? "#fafafa" : "#1d1d1d",
  },
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: theme.palette.mode === "light" ? "#f5f5f5" : "#333",
  },
  [`& .${gridClasses.row}.odd`]: {
    backgroundColor: theme.palette.mode === "light" ? "#e8e8e8" : "#292929",
  },
}));

const EnhancedDataGrid: FC<DataGridProps> = (props) => {
  const { lang } = useTranslation();
  const localeText =
    lang === "en"
      ? enUS.components.MuiDataGrid.defaultProps.localeText
      : frFR.components.MuiDataGrid.defaultProps.localeText;
  return (
    <StyledDataGrid
      {...props}
      localeText={localeText}
      getRowClassName={(params) => (params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd")}
    />
  );
};

export default EnhancedDataGrid;
