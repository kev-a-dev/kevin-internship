import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const NewItems = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const {data} = await axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems');
      setData(data);
      setLoading(false);
    }
    fetchData();
}, [loading])

const options = {
  items: 4,
  loop: true,
  nav: true,
  margin: 10,
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 2,
    },
    900: {
      items: 3,
    },
    1200: {
      items: 4,
    },
  },
}

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <OwlCarousel {...options}>
          {loading ? (
            new Array(4).fill(0).map((_, index) => (
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
          )) 
          ) : ( 
            data.map((nft, index) => (
              <div className="nft__item" key={index}>
                <div className="author_list_pp">
                  <Link
                    to={`/author/${nft.authorId}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Creator: Monica Lucas"
                  >
                    <img className="lazy" src={nft.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                <div className="de_countdown">5h 30m 32s</div>

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
                    <img
                      src={nft.nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
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
            ))
          )}
          </OwlCarousel>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
