import React, { useState,useEffect } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";
import axios from "axios";

const ItemDetails = () => {
  const {itemId} = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
      async function fetchData() {
        let url = 'https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=';
        const {data} = await axios.get(url + itemId);
        setData(data);
        setLoading(false);
      }
      fetchData();
  }, [loading])

  console.log(data)

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          {loading ?
          (
            <div className="container">
              <div className="row">
                <div className="col-md-6 text-center">
                  <div
                    className="img-fluid img-rounded mb-sm-30 nft-image skeleton"
                    alt=""
                  />
                </div>
                <div className="col-md-6">
                  <div className="item_info">
                    <h2 className="skeleton">&nbsp;</h2>

                    <div className="item_info_counts skeleton">
                        
                        &nbsp;
                    </div>
                    <p className="skeleton">
                    &nbsp;
                    </p>
                    <div className="d-flex flex-row">
                      <div className="mr40">
                        <h6 className="skeleton">&nbsp;</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Link to={`/author/${data.ownerId}`}>
                              <div className="lazy skeleton avatar" alt="">&nbsp;</div>
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <div className="author_list_info skeleton">
                            &nbsp;
                          </div>
                        </div>
                      </div>
                      <div></div>
                    </div>
                    <div className="de_tab tab_simple">
                      <div className="de_tab_content">
                        <h6 className="skeleton">&nbsp;</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Link to={`/author/${data.creatorId}`}>
                              <div className="lazy skeleton avatar" alt="">&nbsp;</div>
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <div className="author_list_info skeleton">
                            &nbsp;
                          </div>
                        </div>
                      </div>
                      <div className="spacer-40"></div>
                      <h6 className="skeleton">&nbsp;</h6>
                      <div className="nft-item-price skeleton">
                        <span>&nbsp;</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="container">
              <div className="row">
                <div className="col-md-6 text-center">
                  <img
                    src={data.nftImage}
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    alt=""
                  />
                </div>
                <div className="col-md-6">
                  <div className="item_info">
                    <h2>{data.title} #{data.tag}</h2>

                    <div className="item_info_counts">
                      <div className="item_info_views">
                        <i className="fa fa-eye"></i>
                        {data.views}
                      </div>
                      <div className="item_info_like">
                        <i className="fa fa-heart"></i>
                        {data.likes}
                      </div>
                    </div>
                    <p>
                      {data.description}
                    </p>
                    <div className="d-flex flex-row">
                      <div className="mr40">
                        <h6>Owner</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Link to={`/author/${data.ownerId}`}>
                              <img className="lazy" src={data.ownerImage} alt="" />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Link to={`/author/${data.ownerId}`}>{data.ownerName}</Link>
                          </div>
                        </div>
                      </div>
                      <div></div>
                    </div>
                    <div className="de_tab tab_simple">
                      <div className="de_tab_content">
                        <h6>Creator</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Link to={`/author/${data.creatorId}`}>
                              <img className="lazy" src={data.creatorImage} alt="" />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Link to={`/author/${data.creatorId}`}>{data.creatorName}</Link>
                          </div>
                        </div>
                      </div>
                      <div className="spacer-40"></div>
                      <h6>Price</h6>
                      <div className="nft-item-price">
                        <img src={EthImage} alt="" />
                        <span>{data.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
