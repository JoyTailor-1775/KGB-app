export interface TableDataStructure {
  [key: string]: string | number;
}

export interface ColumnSortingFunctionParams {
  dataKey: string;
  order: 'asc' | 'desc';
}

export interface RowColSpanConfig {
  rowSpan?: number;
  colSpan?: number;
}

export interface CellRenderProps {
  children?: JSX.Element | string;
  props?: RowColSpanConfig;
}

export interface RenderFuncArgs {
  value: JSX.Element | string | number;
  index: number;
  rowKey: string | number;
  dataLength: number;
}

export interface TableColumn {
  heading: string;
  dataKey: string;
  width?: string;
  sortable?: boolean;
  sortFunc?: (args: ColumnSortingFunctionParams) => TableDataStructure;
  render?: (args: RenderFuncArgs) => CellRenderProps;
  onCellClick?: () => void;
}

export type TableTheme = 'grey' | 'red' | 'green';

export interface SortingObject {
  [key: string]: 'asc' | 'desc';
}

export type PaginationDirection = 'asc' | 'desc';
