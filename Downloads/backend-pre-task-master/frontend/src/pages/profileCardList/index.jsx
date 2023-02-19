import React, { useEffect, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Pagination } from "antd";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import useAxios from "../../context/hooks/useAxios";
import { DEFAULT_COLUMN_DEFINITIONS, SIDE_BAR_SETTING } from "./constants";

import CreateProfileCardModal from "./components/CreateProfileCardModal";

import "./index.scss";

const DetailPageLink = React.memo((props) => {
  const {
    data: { id, name },
  } = props;

  if (!id) return null;

  return <Link to={`/${id}`}>{name}</Link>;
});

const ProfileCardList = () => {
  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: "이름",
      field: "name",
      cellClass: "default-cell",
      cellRenderer: DetailPageLink,
    },
  ]);
  const [paginationInfo, setPaginationInfo] = useState({
    current: 1,
    total: 0,
    pageSize: 10,
    locale: { items_per_page: "명" },
  });
  const [orderInfo, setOrderInfo] = useState(["name", "asc"]);
  const [visibleCreateProfileCardModal, setVisibleCreateProfileCardModal] =
    useState(false);

  const openCreateProfileCardModal = useCallback(
    () => setVisibleCreateProfileCardModal(true),
    []
  );
  const closeCreateProfileCardModal = useCallback(
    () => setVisibleCreateProfileCardModal(false),
    []
  );

  const { request } = useAxios();

  const listFetchDependencies = [paginationInfo, orderInfo, columnDefs];
  const fetchProfileList = useCallback(
    async (targetPage, sort = ["name", "asc"]) => {
      if (typeof sort === "number") sort = ["name", "asc"];
      // TODO: Change your api
      console.log(sort);
      const response = await request({
        method: "GET",
        url: "http://localhost:4000/api/user",
        params: {
          current: targetPage || paginationInfo.current,
          columns: columnDefs.map(({ field }) => field),
          pageSize: paginationInfo.pageSize,
          sort: sort || orderInfo,
        },
      });

      if (!response || response.rows.length === 0) return;
      setRowData(response.rows);
      setPaginationInfo((prev) => ({
        ...prev,
        current: targetPage || prev.current,
        total: response.count,
      }));
      setOrderInfo(sort);
    },
    listFetchDependencies
  );

  const fetchAvailableColumns = useCallback(async () => {
    // TODO: Change your api
    const response = await request({
      method: "GET",
      url: "http://localhost:4000/api/profile-column",
    });
    if (!response || response.list.length === 0) return;

    setColumnDefs([
      {
        headerName: "이름",
        field: "name",
        cellClass: "default-cell",
        cellRenderer: DetailPageLink,
      },
      ...response.list.map(({ label, dataKey, parentDataKey }) => ({
        headerName: label,
        field:
          parentDataKey !== "null" ? `${parentDataKey}_${dataKey}` : dataKey,
        cellClass: "default-cell",
        comparator: () => 0,
      })),
    ]);
  }, []);
  useEffect(() => {
    fetchProfileList();
    fetchAvailableColumns();
  }, []);

  const onCreateProfileCard = useCallback(
    async (name) => {
      // TODO: Change your api
      const response = await request({
        method: "POST",
        url: "http://localhost:4000/api/user",
        data: { name },
      });

      if (!response || !response.success) return;

      await fetchProfileList(paginationInfo.current);
      closeCreateProfileCardModal();
    },
    [paginationInfo, orderInfo]
  );

  const handleSortChange = useCallback((e) => {
    const columnState = e.columnApi.getColumnState();

    const sortedColumn = columnState.find(({ sort }) => !!sort);
    if (!sortedColumn) {
      fetchProfileList();
      return;
    }
    const { colId, sort } = sortedColumn;
    fetchProfileList(undefined, [colId, sort]);
  }, []);

  return (
    <div className="profile-card-list">
      <div className="header">
        <h1>연락처 목록</h1>
        <Button type="primary" onClick={openCreateProfileCardModal}>
          새로운 연락처 추가
        </Button>
      </div>
      <div className="ag-theme-alpine">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={DEFAULT_COLUMN_DEFINITIONS}
          onSortChanged={handleSortChange}
          suppressContextMenu
          sideBar={SIDE_BAR_SETTING}
          enableRangeSelection
          rowSelection="multiple"
          domLayout="autoHeight"
        />
      </div>
      <Pagination
        className="pagination"
        {...paginationInfo}
        onChange={fetchProfileList}
      />

      <CreateProfileCardModal
        visible={visibleCreateProfileCardModal}
        onClose={closeCreateProfileCardModal}
        onCreate={onCreateProfileCard}
      />
    </div>
  );
};

export default ProfileCardList;
