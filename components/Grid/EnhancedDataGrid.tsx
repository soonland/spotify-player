import { FC } from "react";
import { DataGrid, DataGridProps, gridClasses } from "@mui/x-data-grid";
import { enUS, frFR } from "@mui/x-data-grid/locales";
import useTranslation from "next-translate/useTranslation";
import { darken, styled } from "@mui/material";

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: darken(theme.palette.background.paper, 0.2),
  },
  [`& .${gridClasses.row}.odd`]: {
    backgroundColor: darken(theme.palette.background.paper, 0.3),
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
