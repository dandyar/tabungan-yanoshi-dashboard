import { ScaleFade } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import HomeView from "./components/HomeView";
import UploadView from "./components/UploadView";
import SkeletonView from "./components/SkeletonView";
import MobileView from "./components/MobileView";
import { get } from "./common/api";
import { NavigationContext } from "./Contexts.js";

const App = () => {
  const [currentScreen, setCurrentScreen] = useState("tasks");
  const [data, setData] = useState(null);
  const [activeRequest, setActiveRequest] = useState(null);
  const [report, setReport] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const handleScreenChange = (screen) => {
    setCurrentScreen(screen);
  };

  // const fetchData = async () => {
  //   setLoading(true); // Set loading indicator to true
  //   try {
  //     const getInfo = await get("info"); // Replace with your API URL
  //     const data = await getInfo.json();

  //     const getActiveRequest = await get("permintaan"); // Replace with your API URL
  //     const activeRequest = await getActiveRequest.json();

  //     const getReport = await get("tabungan"); // Replace with your API URL
  //     const reportList = await getReport.json();

  //     setData(data);
  //     setActiveRequest(activeRequest);
  //     setReport(reportList);

  //     setLoading(false);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  // useEffect(() => {
  //   if (currentScreen === "home") {
  //     fetchData();
  //   }
  // }, [currentScreen]);

  return (
    <NavigationContext.Provider value={{handleScreenChange, currentScreen}}>
      <MobileView>
        {currentScreen === "tasks" && <HomeView />}
        {currentScreen === "dashboard" && <UploadView />}
        {currentScreen === "users" && <SkeletonView />}
      </MobileView>
    </NavigationContext.Provider>
  );
};

export default App;
