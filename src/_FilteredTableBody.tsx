import { ccc } from "./util";
const _FilerableTableBody = (props) => {
  const { loadingState, data, columnCount } = props;

  if (loadingState === "loading") {
    return (
      <tr className={ccc("no-results")} colSpan={colCount}>
        Loading...
      </tr>
    );
  }
  if (loadingState === "hasError") {
    return (
      <tr className={ccc("no-results")} colSpan={colCount}>
        An issue occured while loading the data.
      </tr>
    );
  }
  return (
    <>
      {tableData.map((row, index) => (
        <tr key={index}>
          {Object.entries(row).map(([header, cell], cellIndex) => {
            const cellKey = header + "_" + cellIndex;
            const headerText = getHeaderTextForProperty(header);
            return (
              <td title={headerText} data-header={headerText} key={cellKey}>
                {getHighlightedText(`${cell}`, searchText)}
              </td>
            );
          })}
        </tr>
      ))}
    </>
  );
};
