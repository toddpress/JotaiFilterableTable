import React, { useState } from "react";
import { Suspense } from "react";
import { useAtom, useAtomValue } from "jotai";
import {
  loadablePlantsAtom,
  searchResultsAtom,
  searchTextAtom,
  tableHeadersMapAtom,
} from "./molecule";

import "./styles.css";

const FilterableResponsiveTable = () => {
  // const loadablePlants = useAtom(loadablePlantsAtom);
  const [searchText, setSearchText] = useAtom(searchTextAtom);
  const tableData = useAtomValue(searchResultsAtom);
  const tableHeadersMap = useAtomValue(tableHeadersMapAtom);

  const handleSearch = (e: any) => {
    setSearchText(e.target.value);
  };
  //TODO: create Highlight<text: string, highlight: string> component
  const getHighlightedText = (text: string, highlight: string) => {
    const parts = text
      .split(new RegExp(`(${highlight})`, "gi"))
      .map((part) => part.toLowerCase());

    const highlights = parts.map((part, i) => {
      return parts.length > 0 && part === highlight.toLowerCase() ? (
        <span key={i} className="highlight">
          {part}
        </span>
      ) : (
        <>{part}</>
      );
    });

    return <>{highlights}</>;
  };

  function getHeaderTextForProperty(property: string): string {
    return tableHeadersMap[property] ?? "";
  }

  return (
    // @ts-ignore
    <search className="FilterableTable">
      <div className="filter-input-wrapper">
        <label>
          <span className="sr-only">Filter results table rows</span>
          <input type="text" value={searchText} onChange={handleSearch} />
        </label>
      </div>
      <div className="filter-table-wrapper">
        <table>
          <caption className="sr-only">Filtered plants table</caption>
          <thead>
            <tr className="FilterableTable_header-row">
              {Object.values(tableHeadersMap).map((header) => {
                return <th className="FilterableTable_header">{header}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index}>
                {Object.entries(row).map(([header, cell], cellIndex) => {
                  const cellKey = header + "_" + cellIndex;
                  const headerText = getHeaderTextForProperty(header);
                  return (
                    <td
                      title={headerText}
                      data-header={headerText}
                      key={cellKey}
                    >
                      {getHighlightedText(`${cell}`, searchText)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <footer>
        {/* 
          Implement support for selection and totals  
        */}
      </footer>
    </search>
  );
};

const App = () => (
  <>
    <Suspense fallback={`Loading plants...`}>
      <FilterableResponsiveTable />
    </Suspense>
  </>
);

export default App;
