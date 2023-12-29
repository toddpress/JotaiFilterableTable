import React, { useState } from "react";
import { Suspense } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useRenderCount } from "./useRenderCount";
import {
  searchResultsAtom,
  searchTextAtom,
  tableHeadersMapAtom,
  debouncedSearchTextAtom,
} from "./molecule";

import "./styles.css";

const FilterInput = () => {
  const searchText = useAtomValue(searchTextAtom);
  const handleSearch = useSetAtom(debouncedSearchTextAtom);

  const FILTER_INPUT_LABEL = "Filter results table rows";
  return (
    <div className="filter-input-wrapper">
      <label>
        <span className="sr-only">{FILTER_INPUT_LABEL}</span>
        <input
          type="text"
          placeholder={FILTER_INPUT_LABEL}
          value={searchText}
          onChange={(e) => handleSearch(e.target.value.toLowerCase())}
        />
      </label>
    </div>
  );
};

const HighlightText = ({ text, highlight }) => {
  const parts = text
    .split(new RegExp(`(${highlight})`, "gi"))
    .map((part) => part.toLowerCase());

  const highlights = parts.map((part, i) => {
    return part === highlight ? (
      <span key={i} className="highlight">
        {part}
      </span>
    ) : (
      <>{part}</>
    );
  });

  return <>{highlights}</>;
};

const FilterableResponsiveTable = () => {
  const searchText = useAtomValue(debouncedSearchTextAtom);
  const tableData = useAtomValue(searchResultsAtom);
  const tableHeadersMap = useAtomValue(tableHeadersMapAtom);
  const renderCount = useRenderCount();
  console.log("FilterableTable rendered %s times.", renderCount);

  function getHeaderTextForProperty(property: string): string {
    return tableHeadersMap[property] ?? "";
  }

  return (
    // @ts-ignore
    <search className="FilterableTable">
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
                      <HighlightText text={`${cell}`} highlight={searchText} />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </search>
  );
};

const App = () => (
  <>
    <FilterInput />
    <Suspense fallback={`Loading plants...`}>
      <FilterableResponsiveTable />
    </Suspense>
  </>
);

export default App;
