import { ScaleFade } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import HomeView from "./components/HomeView";
import MemberView from "./components/MemberView";
import DashboardView from "./components/DashboardView";
import SkeletonView from "./components/SkeletonView";
import SettingsView from "./components/SettingsView";
import MobileView from "./components/MobileView";
import { get } from "./common/api";
import { NavigationContext } from "./Contexts.js";

const App = () => {
  const [currentScreen, setCurrentScreen] = useState("tasks");
  const [members, loadMembers] = useState(null);
  const [tasks, loadTasks] = useState(null);
  const [dashboard, setDashboard] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [navOpened, openNav] = useState(true);

  const handleScreenChange = (screen) => {
    setCurrentScreen(screen);
  };

  const fetchData = async () => {
    try {
      const getMembers = await get("mgmt/members");
      const members = await getMembers.json();

      const getTasks = await get("mgmt/tasks");
      const tasks = await getTasks.json();

      const getDashboard = await get("mgmt/dashboard");
      const dashboard = await getDashboard.json();

      const userInfo = await get("mgmt/profile");
      const profile = await userInfo.json();

      loadTasks(tasks);
      loadMembers(members);
      setDashboard(dashboard);
      setUser(profile);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <SkeletonView />
      ) : (
        <NavigationContext.Provider
          value={{ handleScreenChange, currentScreen, navOpened, openNav }}
        >
          <MobileView>
            {currentScreen === "tasks" && <HomeView tasks={tasks} />}
            {currentScreen === "dashboard" && (
              <DashboardView dashboard={dashboard} profile={user} />
            )}
            {currentScreen === "users" && <MemberView members={members} />}
            {currentScreen === "settings" && <SettingsView members={members} />}
          </MobileView>
        </NavigationContext.Provider>
      )}
    </>
  );
};

export default App;
