import { faClose, faUndo, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getIssues } from "@/pages/api/api";
import mag from "@/images/mag.jpg";

const Sidebar = ({ isOpen, onClose }) => {
  const [newIssue, setNewIssue] = useState([]);

  useEffect(() => {
    async function fetchIssues() {
      try {
        const issuesData = await getIssues();
        // console.log(`data  set-  ${issuesData}`);

        if (issuesData.length > 0) {
          const sortedArray = issuesData.sort((a, b) => {
            const dateA = new Date(a.acf.issue_date);
            const dateB = new Date(b.acf.issue_date);

            return dateB - dateA;
          });

          setNewIssue(sortedArray[0]);
          // console.log(`issue is ${JSON.stringify(issues)}`);
        }
      } catch (error) {
        console.error("Error fetching issues:", error);
      }
    }

    fetchIssues();
  }, []);

  return (
    <div
      style={{ zIndex: 10000, overflowY: "scroll", height: "1000vh" }}
      className={`fixed top-0 left-0  w-64 scroll bg-white shadow-lg transform ${
        isOpen ? "translate-x-0 sidebar-mobile" : "-translate-x-64"
      } transition-transform duration-300 ease-in-out`}
    >
      <div className="" style={{ marginLeft: "80%", marginTop: "7%" }}>
        <svg
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={onClose}
        >
          <path
            d="M18 6L6 18"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M6 6L18 18"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      </div>

      {/* Sidebar content */}
      <ul className="sidebar no-transition">
        <li className="home-sidebar-li-text">
          <Link href={"/"}>
            <span className="icon"></span>Home
          </Link>
        </li>
        <li className="home-sidebar-li-text">
          <Link href={"https://ne100.echelon.lk"}>
            <span className="icon"></span>NE100
          </Link>
        </li>
        <li className="home-sidebar-li-text">
          <Link href={"/category/features"}>
            {" "}
            <span className="icon"></span>Features
          </Link>
        </li>
        <li className="home-sidebar-li-text">
          <Link href={"/category/brand-voice"}>
            {" "}
            <span className="icon"></span>Brand Voice
          </Link>
        </li>

        <li className="home-sidebar-li-text line">
          <Link href={"/category/innovation"}>
            <span className="icon"></span>Innovation
          </Link>
        </li>
        <li className="home-sidebar-li-text line">
          <Link href={"/category/leadership"}>
            <span className="icon"></span>Leadership
          </Link>
        </li>

        <li className="home-sidebar-li-text line">
          <Link href={"/category/public-policy"}>
            <span className="icon"></span>public policy
          </Link>
        </li>

        <li className="home-sidebar-li-text line">
          <Link href={"/category/collection"}>
            <span className="icon"></span>collection
          </Link>
        </li>

        <li className="home-sidebar-li-text line">
          <Link href={"/videos"}>
            <span className="icon"></span>Video
          </Link>
        </li>
        <li>
          <Link href={`/issues-view`}>
            <ul>
              <li className="home-sidebar-li-text" style={{marginTop:"5%"}}>Current issue</li>
              <li className=" pt-2   mb-5" style={{ margin: "0px 20px 20px" }}>
                {newIssue?.acf?.issues_cover_image?.url ? (
                  <Image
                    className={`currentIssueImg sm:float-right`}
                    src={newIssue?.acf?.issues_cover_image.url}
                    alt={`Magazine issue ${newIssue.name}`}
                    width={153}
                    height={198}
                  />
                ) : (
                  <Image
                    className={`currentIssueImg sm:float-right`}
                    src={mag}
                    alt={`Magazine issue ${newIssue.name}`}
                    width={489}
                    height={633}
                  />
                )}
              </li>
            </ul>
          </Link>
        </li>

      
        {/* <li className="titlefont text-left ml-6 mb-5 text-xl">
          <a href={"http://echelon.lk/ne100/"}>New Establishment 100</a>
        </li> */}
      </ul>
    </div>
  );
};

export default Sidebar;
