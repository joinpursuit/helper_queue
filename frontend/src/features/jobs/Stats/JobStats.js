import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectJobs, fetchAllJobs, selectJobCount } from "../jobsSlice";
import "./JobStats.css";

export default () => {
  const dispatch = useDispatch();
  const jobs = useSelector(selectJobs);
  const jobCount = useSelector(selectJobCount)
  const [appsThisWeek, setAppsThisWeek] = useState(0);
  const [totalRejections, setTotalRejections] = useState(0);
  const [phoneScreens, setPhoneScreens] = useState(0);
  const [techScreens, setTechScreens] = useState(0);
  const [codingChallenges, setCodingChallenges] = useState(0);
  const [activeApplied, setActiveApplied] = useState(0);
  const [activeWishList, setActiveWishList] = useState(0);
  const [totalOnsites, setTotalOnsites] = useState(0);
  const [totalOffers, setTotalOffers] = useState(0);

  useEffect(() => {
    if (!jobs.length) {
      dispatch(fetchAllJobs());
    }
    calculateStats();
    calcCurrentStatus();
  }, [jobs.length]);

  const calculateStats = () => {
    let totalAppsThisWeek = 0;
    let oneWeekAgo = new Date(new Date().getTime() - 60 * 60 * 24 * 7 * 1000);
    let rejections = 0;
    let phoneScreensTotal = 0;
    let techScreensTotal = 0;
    let codingChallengeTotal = 0;
    let onsites = 0;
    let offers = 0;
    jobs.forEach((job) => {
      job.timelines.forEach((timeObj) => {
        if (
          timeObj.status === "applied" &&
          new Date(timeObj.created_at) > oneWeekAgo
        ) {
          totalAppsThisWeek++;
        }
        if (timeObj.status === "rejected") {
          rejections++;
        } else if (timeObj.status === "phoneScreen") {
          phoneScreensTotal++;
        } else if (timeObj.status === "techScreen") {
          techScreensTotal++;
        } else if (timeObj.status === "codingChallenge") {
          codingChallengeTotal++;
        } else if (timeObj.status === "onsite") {
          onsites++;
        } else if (timeObj.status === "offer") {
          offers++;
        }
      });
    });
    setAppsThisWeek(totalAppsThisWeek);
    setTotalRejections(rejections);
    setPhoneScreens(phoneScreensTotal);
    setTechScreens(techScreensTotal);
    setCodingChallenges(codingChallengeTotal);
    setTotalOnsites(onsites);
    setTotalOffers(offers);
  };

  const calcCurrentStatus = () => {
    let applied = 0;
    let wishlist = 0;
    jobs.forEach((job) => {
      let status = job.status.toLowerCase();
      if (status === "applied") {
        applied++;
      } else if (status === "wishlist") {
        wishlist++;
      }
    });
    setActiveApplied(applied);
    setActiveWishList(wishlist);
  };
  return (
    <div className="adminContainer">
      <h1>Stats Page</h1>
      <div className="statsDisplay">
        <div className="statItem">
          <p>Total Applications: </p>
          <p>{jobCount}</p>
        </div>
        <div className="statItem">
          <p>Number Of Applications this week: </p>
          <p>{appsThisWeek}</p>
        </div>
        <div className="statItem">
          <p>Current Wishlist Length: </p>
          <p>{activeWishList}</p>
        </div>
        <div className="statItem">
          <p>Applications still in applied stage: </p>
          <div>
            <p>
              {activeApplied} -->{" "}
              {Math.floor((activeApplied / jobs.length) * 100)}%
            </p>
          </div>
        </div>
        <div className="statItem">
          <p>Total rejections: </p>
          <div>
            <p>
              {totalRejections} -->{" "}
              {Math.floor((totalRejections / jobs.length) * 100)}%
            </p>
          </div>
        </div>
        <div className="statItem">
          <p>Total phone screens ever: </p>
          <div>
            <p>
              {phoneScreens}--> {Math.floor((phoneScreens / jobs.length) * 100)}
              %
            </p>
          </div>
        </div>
        <div className="statItem">
          <p>Total coding challenges: </p>
          <div>
            <p>
              {codingChallenges} -->{" "}
              {Math.floor((codingChallenges / jobs.length) * 100)}%
            </p>
          </div>
        </div>
        <div className="statItem">
          <p>Total technical screens: </p>
          <div>
            <p>
              {techScreens} --> {Math.floor((techScreens / jobs.length) * 100)}%
            </p>
          </div>
        </div>

        <div className="statItem">
          <p>Total onsites: </p>
          <div>
            <p>
              {totalOnsites} -->{" "}
              {Math.floor((totalOnsites / jobs.length) * 100)}%
            </p>
          </div>
        </div>
        <div className="statItem">
          <p>Total offers: </p>
          <div>
            <p>{totalOffers} --> {" "}{Math.floor((totalOffers / jobs.length) * 100)}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};
