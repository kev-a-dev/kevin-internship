import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";

const AuthorItems = (props) => {
  const {url, img} = props;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  function Countdown({ expiryDate }) {
    const [timeLeft, setTimeLeft] = useState(getTimeLeft());
  
    useEffect(() => {
      const timer = setInterval(() => {
        setTimeLeft(getTimeLeft());
      }, 1000);
      return () => clearInterval(timer);
    }, []);
  
    function getTimeLeft() {
      const totalSeconds = Math.floor((new Date(expiryDate) - new Date()) / 1000);
      if (totalSeconds < 0) return null;
      const days = Math.floor(totalSeconds / 86400);
      const hours = Math.floor((totalSeconds % 86400) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = Math.floor(totalSeconds % 60);
      return { days, hours, minutes, seconds };
    }
  
    if (!timeLeft) return null;
  
    return (
      <div className="de_countdown">
        {timeLeft.hours ? `${timeLeft.hours}h ` : ''}
        {timeLeft.minutes ? `${timeLeft.minutes}m ` : ''}
        {`${timeLeft.seconds}s`}
      </div>
    );
  }
  
  useEffect(() => {
    async function fetchData() {
        const {data} = await axios.get(url);
        setData(data);
        setLoading(false);
      }
      fetchData();
  }, [loading])

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
        {loading ? (
            new Array(8).fill(0).map((_, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item skeleton new item" key={index}>
                <div className="author_list_pp">
                  <Link
                    to="/author"

                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Creator: Monica Lucas"
                  >
                    <div className="lazy skeleton avatar" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                <div className="skeleton countdown">&nbsp;</div>

                <div className="nft__item_wrap ">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>
                        <a href="">
                          <i className="fa fa-envelope fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>

                  <Link to="/item-details">
                    <div                        
                      className="lazy nft__item_preview"
                      alt=""
                    >&nbsp;</div>
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to="/item-details">
                    <h4 className="skeleton new item name">&nbsp;</h4>
                  </Link>
                  <div className="nft__item_price skeleton price">&nbsp;</div>
                  <div className="nft__item_like skeleton likes">
                    <i className="fa fa-heart"></i>
                    <span>&nbsp;</span>
                  </div>
                </div>
              </div>
            </div>
          ))
          ) : (
            data.nftCollection.map((nft, index) => (
              <div
                key={index}
                className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
                style={{ display: "block", backgroundSize: "cover" }}
              >
                <div className="nft__item">
                  <div className="author_list_pp">
                    <Link
                      to={`/author/${nft.authorId}`}
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                    >
                      <img className="lazy" src={data.authorImage} alt="" /> 
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  { nft.expiryDate ? ( <Countdown expiryDate={nft.expiryDate} /> ) : null}
      
                  <div className="nft__item_wrap">
                    <div className="nft__item_extra">
                      <div className="nft__item_buttons">
                        <button>Buy Now</button>
                        <div className="nft__item_share">
                          <h4>Share</h4>
                          <a href="" target="_blank" rel="noreferrer">
                            <i className="fa fa-facebook fa-lg"></i>
                          </a>
                          <a href="" target="_blank" rel="noreferrer">
                            <i className="fa fa-twitter fa-lg"></i>
                          </a>
                          <a href="">
                            <i className="fa fa-envelope fa-lg"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                    <Link to={`/item-details/${nft.nftId}`}>
                      <img src={nft.nftImage} className="lazy nft__item_preview" alt="" />
                    </Link>
                  </div>
                  <div className="nft__item_info">
                    <Link to={`/item-details/${nft.nftId}`}>
                      <h4>{nft.title}</h4>
                    </Link>
                    <div className="nft__item_price">{nft.price} ETH</div>
                    <div className="nft__item_like">
                      <i className="fa fa-heart"></i>
                      <span>{nft.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
