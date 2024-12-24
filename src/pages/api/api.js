// @ts-ignore
import axios from "axios";

// const BASE_URL = "http://localhost/echelon-revamp/backend/wp-json/wp/v2/";
const LIVE_BASE_URL = "https://backend.echelon.lk/wp-json/wp/v2/";
const LIVE_BASE_URL2 = "https://backend.echelon.lk/wp-json/custom/v1/";

// @ts-ignore
// @ts-ignore
let token =
  "/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2JhY2tlbmQuZWNoZWxvbi5sayIsImlhdCI6MTcxNDM3NjkyMiwibmJmIjoxNzE0Mzc2OTIyLCJleHAiOjE3MTQ5ODE3MjIsImRhdGEiOnsidXNlciI6eyJpZCI6IjE1MCJ9fX0.rOE2U_Lzroxli4DWqhZpgA_r6YipfqkJxecQNB0YWRw";

// @ts-ignore

let jwtAuth = ""; // Initialize jwtAuth variable

const username = "Sachintha";
const password = "xJ(cMWpDUpY1*Vy9";

// Example function to refresh the JWT token
const refreshJwtToken = async () => {
  try {
    // Make a request to your token refresh endpoint
    const refreshResponse = await axios.post(
      `https://backend.echelon.lk/wp-json/jwt-auth/v1/token?username=${username}&password=${password}`
    );

    // Assuming the response contains a new access token
    const newToken = refreshResponse.data.token;
    // console.log(`Token is ${newToken}`);

    // Update jwtAuth with the new token
    jwtAuth = `Bearer ${newToken}`;
  } catch (error) {
    // If token refresh fails due to authentication error ( token expired),
    // handle the error gracefully by refreshing the token
    // @ts-ignore
    if (error.response && error.response.status === 401) {
      console.log("Token expired. Refreshing...");
      await refreshJwtToken(); // Refresh the token
    } else {
      // For other errors, rethrow the error or handle as needed
      throw error;
    }
  }
};

// Example usage
refreshJwtToken()
  .then(() => {
    // Proceed with  API requests using jwtAuth
    // console.log("Using JWT:", jwtAuth);
  })
  // @ts-ignore
  .catch((error) => {
    // console.error("Error:", error);
    // Handle other errors or redirect to re-authenticate if needed
  });

export async function getPosts() {
  try {
    const postsRes = await axios.get(`${LIVE_BASE_URL}posts?_embed`, {
      headers: {
        Authorization: jwtAuth,
      },
    });
    return postsRes.data;
  } catch (error) {
    // @ts-ignore
    if (error.response && error.response.status === 401) {
      await refreshJwtToken();

      return getPost();
    } else {
      // console.error("Error fetching data:", error);
      throw error;
    }
  }
}

// @ts-ignore
async function fetchData(endpoint) {
  try {
    const response = await axios.get(`${LIVE_BASE_URL2}${endpoint}`, {
      headers: {
        Authorization: jwtAuth,
      },
    });
    return response.data.results;
  } catch (error) {
    // @ts-ignore
    if (error.response && error.response.status === 401) {
      // Token refresh logic
      await refreshJwtToken();
      // Retry request after token refresh
      return fetchData(endpoint);
    } else {
      throw error;
    }
  }
}

export async function getEditorials() {
  return fetchData("editorials");
}

export async function getAdvertorials() {
  return fetchData("advertorials");
}

//ALL issues API end point
export async function getIssues() {
  try {
    const issueRes = await axios.get(
      `${LIVE_BASE_URL}issues?acf_format=standard&per_page=99`,
      {
        headers: {
          Authorization: jwtAuth,
        },
      }
    );
    // console.log("Response issues:", issueRes);
    return issueRes.data;
  } catch (error) {
    // console.error("Error fetching Issues:", error);
    throw error; // Re-throw the error to handle it in the component
  }
}

//Editor's picks end point
export async function getEditorsPicks() {
  return fetchData("editors-picks-editorials");
}

// get search data
// @ts-ignore
export async function getSearchResults(term) {
  try {
    const adRes = await axios.get(`${LIVE_BASE_URL2}search?s=${term}`, {
      headers: {
        Authorization: jwtAuth,
      },
    });
    //console.log("Response:", adRes);
    return adRes.data;
  } catch (error) {
    // console.error("Error fetching Search resutls:", error);
    throw error; // Re-throw the error to handle it in the component
  }
}

//  export async function getPost(slug) {
//   const posts = await getPosts();
//   const postArray = posts.filter((post) => post.slug == slug);
//   const post = postArray.length > 0 ? postArray[0] : null;
//   return post;
// }

// @ts-ignore
export async function getPost(slug, type) {
  const postRes = await axios.get(`${LIVE_BASE_URL}${type}/${slug}`, {
    headers: {
      Authorization: jwtAuth,
    },
  });
  return postRes;
}

export async function getCategories() {
  // @ts-ignore
  const response = await axios.get(`${BASE_URL}categories?per_page=30`, {
    headers: {
      Authorization: jwtAuth,
    },
  });
  return response.data;
}

export async function getPhotos() {
  const response = await axios.get(`${LIVE_BASE_URL}categories?per_page=30`, {
    headers: {
      Authorization: jwtAuth,
    },
  });
  return response.data;
}

export async function getPostTypes() {
  const response = await axios.get(`${LIVE_BASE_URL}types?per_page=30`, {
    headers: {
      Authorization: jwtAuth,
    },
  });
  return response.data;
}

//backend.echelon.lk/wp-json/wp/v2/pages?slug=privacy-policy

// @ts-ignore
export async function getPages(slug) {
  try {
    const response = await axios.get(`${LIVE_BASE_URL}pages?slug=${slug}`, {
      headers: {
        Authorization: jwtAuth,
      },
    });
    console.log("Response for priacy:", response);
    return response.data;
  } catch (error) {
    // console.error("Error fetching pages:", error);
    throw error; // Re-throw the error to handle it in the component
  }
}

//posviews for popular
export async function getPostViews() {
  try {
    const postviewRes = await axios.get(`${LIVE_BASE_URL2}postviews`, {
      headers: {
        Authorization: jwtAuth,
      },
    });
    // console.log(`postview results ${postviewRes}`);

    return postviewRes;
  } catch (error) {
    console.log(`error fetching postview data`, error);
  }
}

// @ts-ignore
export async function getPostById(postId, type) {
  try {
    // Iterate over postTypes array to find the correct type

    const response = await axios.get(`${LIVE_BASE_URL}${type}/${postId}`, {
      headers: {
        Authorization: jwtAuth,
      },
    });
    if (response) {
      return response;
    }

    // If no post is found, return null or throw an error as per your requirement
    return null;
  } catch (error) {
    // @ts-ignore
    if (error.response && error.response.status === 404) {
      // Handle 404 error gracefully
      return null;
    } else {
      // Log other errors to the console
      // console.error(
      //   // @ts-ignore
      //   `Error fetching post with ID ${postId} and type ${postType}:`,
      //   error
      // );
    }
  }
}

//update post views for each post
// @ts-ignore
export async function updatePostviews({ postId }) {
  try {
    const updatepOstview = await axios.post(
      `${LIVE_BASE_URL2}updatepostviews/${postId}`,
      {
        Headers: {
          Authorization: jwtAuth,
        },
      }
    );
    return updatepOstview;
  } catch (error) {
    console.log(`Error to update post views`, error);
  }
}

//get categories from slug
// @ts-ignore
export async function getCategory(slug) {
  const response = await axios.get(`${LIVE_BASE_URL}categories?slug=${slug}`, {
    headers: {
      Authorization: jwtAuth,
    },
  });
  return response.data;
}
//category pages

// @ts-ignore
export async function getCategoryPosts(categoryslug, pageNumber) {
  try {
    const categoryPosts = await axios.get(
      `${LIVE_BASE_URL2}category-posts?category=${categoryslug}&page=${pageNumber}`,
      {
        headers: {
          Authorization: jwtAuth,
        },
      }
    );
    return categoryPosts.data;
  } catch (error) {
    console.log("Error fetching Category posts data", error);
  }
}

// Branded picks

export async function getBrandedPicks() {
  return fetchData("editors-picks-branded");
}

//More Videos
export async function getVideos() {
  try {
    const response = await axios.get(`${LIVE_BASE_URL}videos`, {
      headers: {
        Authorization: jwtAuth,
      },
    });

    return response;
  } catch (error) {
    console.log(`Error fetching `, error);
  }
}

//More Videos
export async function getBrandedVideos() {
  try {
    const response = await axios.get(`${LIVE_BASE_URL}brandedvideos`, {
      headers: {
        Authorization: jwtAuth,
      },
    });

    return response;
  } catch (error) {
    console.log(`Error fetching `, error);
  }
}
//paginate all posts
// @ts-ignore
export async function getAllPostsPaginate(perPage, pageNumber) {
  try {
    const response = await axios.get(
      `${LIVE_BASE_URL2}all-posts-pagination?per_page=${perPage}&page=${pageNumber}`,
      {
        headers: {
          Authorization: jwtAuth,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log(`Error fetching `, error);
  }
}

//category
// @ts-ignore
export async function getPostCategories(catId) {
  try {
    const response = await axios.get(`${LIVE_BASE_URL}categories/${catId}`, {
      headers: {
        Authorization: jwtAuth,
      },
    });
    console.log(`category is `, response);
    return response.data;
  } catch (error) {
    // console.error("Error fetching category:", error);
  }
}

//https://backend.echelon.lk/wp-json/custom/v1/issues-posts

//category
// @ts-ignore
export async function getIssuesPosts(issueId, pageNumber) {
  try {
    const response = await axios.get(
      `${LIVE_BASE_URL2}issues-posts?issues=${issueId}&page=${pageNumber}`,
      {
        headers: {
          Authorization: jwtAuth,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching category:", error);
  }
}

//https://backend.echelon.lk/wp-json/custom/v1/postviews-posts?per_page=5

//POpular-posts
// @ts-ignore
export async function getPopularPosts() {
  try {
    const response = await axios.get(
      `${LIVE_BASE_URL2}postviews-posts?per_page=99`,
      {
        headers: {
          Authorization: jwtAuth,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(`error fetching data popular post`, error);
  }
}

//popular in this category

// @ts-ignore
export async function getCategoryPopularPosts(category_id) {
  try {
    const response = await axios.get(
      `${LIVE_BASE_URL2}postviews-posts?per_page=4&category_id=${category_id}`,
      {
        headers: {
          Authorization: jwtAuth,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(`error fetching data popular post`, error);
  }
}

//author name
//@ts-ignore
export async function getAuthor(attribute) {
  try {
    const response = await axios.get(`${LIVE_BASE_URL}author${attribute}`, {
      headers: {
        Authorization: jwtAuth,
      },
    });
    return response.data;
  } catch (error) {
    console.log("error fetching auther name", error);
  }
}

//author-posts
//author-posts?author_id
//@ts-ignore
export async function getAuthorPosts(authorId, pageNumber) {
  try {
    const response = await axios.get(
      `${LIVE_BASE_URL2}author-posts?author_id=${authorId}&page=${pageNumber}`,
      {
        headers: {
          Authorization: jwtAuth,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching category:", error);
  }
}

//Video categories

// @ts-ignore
export async function getVideoCategories(slug) {
  const catSlug = slug ? slug : "";
  try {
    const issueRes = await axios.get(
      `${LIVE_BASE_URL}video-categories?slug=${catSlug}&per_page=99`,
      {
        headers: {
          Authorization: jwtAuth,
        },
      }
    );
    // console.log("Response issues:", issueRes);
    return issueRes.data;
  } catch (error) {
    // console.error("Error fetching Issues:", error);
    throw error; // Re-throw the error to handle it in the component
  }
}

//Video Category pages
// @ts-ignore
export async function getVideoCategoryPosts(slug, pageNumber, perPage) {
  try {
    const response = await axios.get(
      `${LIVE_BASE_URL2}video-category-posts?video_categories=${slug}&per_page=${
        perPage || 99
      }&page=${pageNumber}`,
      {
        headers: {
          Authorization: jwtAuth,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(`error fetch cat vid posts`, error);
  }
}

// ********************************************************************
// ************          SHINE 50 API Requests           **************
//*********************************************************************

//https://backend.echelon.lk/wp-json/wp/v2/shine50-english?shine50-category=4400

export async function getProfiles() {
  try {
    const response = await axios.get(
      `${LIVE_BASE_URL}shine50-english?shine50-category=4400&per_page=${50}`,
      {
        headers: {
          Authorization: jwtAuth,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(`error fetch cat vid posts`, error);
  }
}

//get videos

export async function getShine50Videos() {
  try {
    const response = await axios.get(
      `${LIVE_BASE_URL}shine50-english?shine50-category=4399&per_page=${50}`,
      {
        headers: {
          Authorization: jwtAuth,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(`error fetch cat vid posts`, error);
  }
}

//get relavent profile
// @ts-ignore
export async function getProfile(slug) {
  try {
    const response = await axios.get(
      `${LIVE_BASE_URL}shine50-english?shine50-category=4400&slug=${slug}`,
      {
        headers: {
          Authorization: jwtAuth,
        },
      }
    );
    // console.log('profile data',response.data);
    
    return response.data;
  } catch (error) {
    console.log("error fetching data", error);
  }
}
