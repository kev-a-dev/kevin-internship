import React, {useState, useEffect} from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import axios from "axios";

const Author = () => {
  const { authorId } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [followers, setFollowers] = useState(data.followers)
  const [added, setAdded] = useState(false);
  
  useEffect(() => {
    async function fetchData() {
        let url = 'https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=' + authorId;
        const {data} = await axios.get(url);
        setData(data);
        setLoading(false);
      }
      fetchData();
      setFollowers(data.followers)
  }, [loading])

  function handleAddFollower(event) {
    if (added === false) {
      setFollowers(followers + 1);
      event.target.innerHTML = 'Unfollow';
      setAdded(true);
    } else if (added === true) {
      setFollowers(followers - 1);
      event.target.innerHTML = 'Follow';
      setAdded(false);
    }
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              {loading ? 
              (
                <div className="col-md-12">
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <div className="skeleton author avatar" alt="" />

                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4 className="skeleton author info">
                            &nbsp;
                            <span className="profile_username">&nbsp;</span>
                            <span id="wallet" className="profile_wallet">
                              &nbsp;
                            </span>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div className="profile_follower skeleton author follower">&nbsp;</div>
                        <Link to="#" className="btn-main">
                          Follow
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="col-md-12">
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <img src={data.authorImage} alt="" />

                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4>
                            {data.authorName}
                            <span className="profile_username">@{data.tag}</span>
                            <span id="wallet" className="profile_wallet">
                              {data.address}
                            </span>
                            <button id="btn_copy" title="Copy Text">
                              Copy
                            </button>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div className="profile_follower">{followers} followers</div>
                        <Link to="#" className="btn-main" onClick={handleAddFollower}>
                          Follow
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems 
                    url={'https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=' + authorId}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
