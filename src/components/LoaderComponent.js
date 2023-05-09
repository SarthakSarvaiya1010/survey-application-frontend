import React from "react";
import { useSelector } from "react-redux";
import "../components/LoaderComponent.css";
export default function LoaderComponent() {
  const { isLoading } = useSelector((store) => store.survey);
  const isLoading1 = useSelector((store) => store.surveyUser?.isLoading);
  const isWorkerLoading = useSelector((store) => store.worker?.isLoading);
  const isSuperviosrLoading = useSelector(
    (store) => store.supervisor?.isLoading
  );

  return isLoading || isLoading1 || isWorkerLoading || isSuperviosrLoading ? (
    <div
      style={{
        display: "flex",
        position: "fixed",
        height: "100vh",
        width: "100%",
        top: 0,
        justifyContent: "space-evenly",
        alignItems: "center",
        zIndex: "9999",
        backgroundColor: "#fff9",
        left: 0,
      }}
    >
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  ) : null;
}
