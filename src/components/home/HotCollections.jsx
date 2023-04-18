import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const HotCollections = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
      async function fetchData() {
        const {data} = await axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections');
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
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <OwlCarousel {...options}>
            {loading ? (
              data.map((item, index) => (
                <div className="nft_coll" key={index}>
                  <div className="nft_wrap">
                    <Link to={`/item-details/${item.nftId}`}>
                      <div className="lazy img-fluid skeleton img" alt="">&nbsp;</div>
                    </Link>
                  </div>
                  <div className="nft_coll_pp">
                    <Link to={`/authors?author=${item.authorId}`}>
                      <div className="lazy pp-coll skeleton avatar" alt="">&nbsp;</div>
                    </Link>
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info">
                    <Link to={`/explore`}>
                      <h4 className="skeleton name">&nbsp;</h4>
                    </Link>
                    <h4 className="skeleton erc">&nbsp;</h4>
                  </div>
                </div>
              ))
              ) : (
              data.map((item, index) => (
                <div className="nft_coll" key={index}>
                  <div className="nft_wrap">
                    <Link to={`/item-details/${item.nftId}`}>
                      <img src={item.nftImage} className="lazy img-fluid" alt="" />
                    </Link>
                  </div>
                  <div className="nft_coll_pp">
                    <Link to={`/author/${item.authorId}`}>
                      <img className="lazy pp-coll" src={item.authorImage} alt="" />
                    </Link>
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info">
                    <Link to={`/explore`}>
                      <h4>{item.title}</h4>
                    </Link>
                    <div>ERC-{item.code}</div>
                  </div>
                </div>
              ))
              )
            }
          </OwlCarousel>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
