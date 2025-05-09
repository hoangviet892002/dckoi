import { Loading, Title } from "@/components";
import { selectedContract } from "@/redux/slices/contract/contractSlices";
import { projectStateDetailActions } from "@/redux/slices/projectStateDetail/projectStateDetailSlices";
import { useAppDispatch, useAppSelector } from "@/redux/store/hook";
import { Divider } from "antd";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import InformationProject from "./InformationProject";
import Design from "./Design";
import Staff from "./Staff";
import TableContract from "./TableContract";
import TablePayment from "./TablePayment";
import Constructions from "./Constructions";
import { ProjectStatus } from "@/models/enums/Status";

const ManagementProjectDetail = () => {
  const dispatch = useAppDispatch();
  const project = useAppSelector((state) => state.projectStateDetail.project);
  const design = useAppSelector((state) => state.projectStateDetail.design);
  const construction = useAppSelector(
    (state) => state.projectStateDetail.construction
  );

  const contracts = useAppSelector(
    (state) => state.projectStateDetail.contract
  );
  const loading = useAppSelector((state) => state.contract.loading);
  const contractActive = useAppSelector(selectedContract);

  const { id } = useParams();

  useEffect(() => {
    dispatch(projectStateDetailActions.fetchProjectDetail(id));
    dispatch(projectStateDetailActions.fetchDesigns(id));
    dispatch(projectStateDetailActions.fetchConstructions(id));
    dispatch(projectStateDetailActions.fetchContracts(id));
  }, []);

  return (
    <div className="flex flex-col justify-between items-stretch mb-5 mt-8 mx-10 h-full w-full">
      <Title name="Thông tin dự án" />
      <Divider orientation="left">1. Chi tiết dự án</Divider>
      {project.loading ? (
        <Loading />
      ) : (
        <InformationProject {...project.detail} />
      )}

      <Divider orientation="left">2. Nhân viên tham gia</Divider>
      {project.loading ? <Loading /> : <Staff staff={project.detail.staff} />}

      <Divider orientation="left">3. Hợp đồng </Divider>
      {contracts.loading ? (
        <Loading />
      ) : (
        <TableContract contracts={contracts.contracts} project={project} />
      )}

      <Divider orientation="left">4. Đợt thanh toán</Divider>
      {loading ? (
        <Loading />
      ) : (
        <TablePayment payments={contractActive.paymentBatches} />
      )}

      <Divider orientation="left">5. Bản vẽ thiết kể</Divider>
      {project.detail.status != ProjectStatus.DESIGNING &&
        project.detail.status != ProjectStatus.PROCESSING &&
        project.detail.status != ProjectStatus.REQUESTING &&
        (design.loading ? <Loading /> : <Design designs={design.designs} />)}

      <Divider orientation="left">6. Tiến trình thi công</Divider>
      {construction.loading ? (
        <Loading />
      ) : (
        <Constructions constructionItem={construction.constructions} />
      )}
    </div>
  );
};

export default ManagementProjectDetail;
