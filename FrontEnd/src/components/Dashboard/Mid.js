import './dashboard.css'
import { LeetcodeCard, CodeChefCard, CodeforcesCard } from "./Card";
import GitProfile from "./GitProfile";
import Upcoming from "./Upcoming";
import Chart from "../highcharts";


const Mid = () => {


  const github_data = { topic: "bg-cd1_purple" };
  return (
    <>
      {
        <section className="mid-top">
          <div className="mid-left">
            <div className="cards">
              <LeetcodeCard />
              <CodeChefCard />
              <CodeforcesCard />
            </div>
            <div className="graph-git mb-2">
              <div className="rounded-xl h-full item2 hover:shadow bg-[#fff] slowmo shadow-xl dark:bg-[#1d1d1d] dark:text-[#f3f3f3] mr-2">
                <GitProfile modify={github_data} />
              </div>
              <div className="p-2 bg-white dark:bg-[#1d1d1d] rounded-xl shadow-md ">
                <Chart />
              </div>
            </div>
          </div>
          <div className="mid-right mt-1 mb-2 shadow-lg hover:shadow">
            <Upcoming />
          </div>
        </section>
      }
    </>
  );
};

export default Mid;
