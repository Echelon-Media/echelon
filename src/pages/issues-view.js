import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ScrollToTop from "@/components/story-components/ScrollToTop";
import Image from "next/image";
import Link from "next/link";
import { react, useEffect, useState } from "react";
import { getIssues } from "./api/api";
import MagIssueCard from "@/components/story-components/MagIssueCard";
import Head from "next/head";

const MagazineIssues = () => {
  const [newIssue, setNewIssue] = useState([]);
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    async function fetchIssues() {
      try {
        const issuesData = await getIssues();

        if (issuesData.length > 0) {
          const sortedArray = issuesData.sort((a, b) => {
            const dateA = new Date(a.acf.issue_date);
            const dateB = new Date(b.acf.issue_date);

            return dateB - dateA;
          });

          setNewIssue(sortedArray[0]);
          //except 1st one
          const otherIssues = sortedArray.slice(1);
          setIssues(otherIssues);
        }
      } catch (error) {
        console.error("Error fetching issues:", error);
      }
    }

    fetchIssues();
  }, []);
  // console.log(`all issues here except 1st ${issues}`);
  // issues.forEach((issue, index) => {
  //   console.log(`Issue ${index + 1}:`, issue);
  // });

  return (
    <>
      <Head>
        <title>Magazine Issues | Echelon</title>
        <meta name="description" content="All Echelon Magazine Issues" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />

        <meta name="description" content="All Echelon Magazine Issues" />

        <meta
          name="viewport"
          content=" initial-scale=1.0, width=device-width"
        />

        <link rel="canonical" href="https://echelon.lk/issues-view" />

        {/* <!-- Facebook Meta Tags --> */}
        <meta property="og:url" content="https://echelon.lk/issues-view" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Echelon Magazines" />
        <meta property="og:description" content="All Echelon Magazine Issues" />
        <meta
          property="og:image"
          content={newIssue?.acf?.issues_cover_image.url}
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/jpg" />

        <meta
          property="og:image"
          content={newIssue?.acf?.issues_cover_image.url}
        />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="400" />
        <meta property="og:image:height" content="400" />

        {/* <!-- Twitter Meta Tags --> */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="echelon.lk" />
        <meta property="twitter:url" content="https://echelon.lk/issues-view" />
        <meta name="twitter:title" content="Echelon Magazines" />
        <meta
          name="twitter:description"
          content="All Echelon Magazine Issues"
        />
        <meta
          name="twitter:image"
          content="https://echelon.lk/_next/static/media/logo.c39512be.png"
        />

        <link
          rel="preload"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
          as="style"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
          media="print"
          onload="this.media='all'"
        />
      </Head>
      <Navbar />
      <main>
        <div className="magazinepage-topic listfont">
          <h1>Echelon Magazine</h1>
        </div>
      </main>
      <div className="new-mag-issue ">
        <Link href={"issues/[slug]"} as={`issues/${newIssue.slug}`}>
          {newIssue?.acf?.issues_cover_image?.url ? (
            <Image
              className={`justify-center sm:center`}
              src={newIssue?.acf?.issues_cover_image.url}
              alt={`Magazine issue ${newIssue.name}`}
              width={489}
              height={633}
            />
          ) : (
            <></>
          )}
        </Link>
        <div className="issue-content">
          {/* <h2 className="issuetitle titlefont">
            {newIssue.description ? (
              <>{newIssue.description}</>
            ) : (
              <>Echelon Magazine</>
            )}
          </h2> */}

          <div class="flex items-center justify-center space-x-2">
            <h3 class="text-gray-700 font-bold">{newIssue.name}</h3>
            <span class="flex items-center px-2 border-l border-gray-300">
              {" "}
              <ul class="list-none pl-0 m-0">
                <li class="inline">
                  <a
                    class="text-blue-500 hover:text-blue-700"
                    href={newIssue?.acf?.issue_pdf}
                    title={newIssue.description}
                  >
                    PDF
                  </a>
                </li>
              </ul>
            </span>
          </div>
        </div>
      </div>
      <div className="magazine-collection">
        <div className="archive-magazines-topic listfont">
          <h1>Echelon Magazine Archives</h1>
          <p class="story-strapline">Browse Our Previous Magazine Issues</p>
        </div>

        <div className="archive-mags">
          {issues.map((issue, index) => (
            <MagIssueCard
              key={index}
              imageUrl={issue?.acf?.issue_banner_image?.url}
              title={issue?.description}
              name={issue?.name}
              slug={issue?.slug}
              pdf={issue?.acf?.issue_pdf}
            />
          ))}
        </div>
      </div>

      <ScrollToTop />
      <Footer />
    </>
  );
};

export default MagazineIssues;
