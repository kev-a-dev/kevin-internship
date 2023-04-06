import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const HotCollection = () => {
  const { id } = useParams();
  const [collection, setCollection] = useState([]);

  useEffect(() => {
    async function fetchCollection() {
      const response = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
      );
      setCollection(response.data);
      console.log(response.data);
    }
    fetchCollection();
  }, []);

  const options = {
    loop: true,
    margin: 10,
    nav: true,
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
  };

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
          {collection.length && (
            <OwlCarousel className="owl-rtl" {...options}>
              <div className="item">
                {collection.map((_, id) => (
                  <div className="nft_coll" key={id}>
                    <div className="nft_wrap">
                      <Link to="/item-details">
                        <img
                          src={_.nftImage}
                          className="lazy img-fluid"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to="/author">
                        <img
                          className="lazy pp-coll"
                          src={_.AuthorImage}
                          alt=""
                        />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to="/explore">
                        <h4>{_.title}</h4>
                      </Link>
                      <span>ERC-{_.code}</span>
                    </div>
                  </div>
                ))}
              </div>
            </OwlCarousel>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollection;