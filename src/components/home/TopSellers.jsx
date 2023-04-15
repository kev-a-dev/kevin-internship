import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const TopSellers = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const {data} = await axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers');
      setData(data);
      setLoading(false);
    }
    fetchData();
  }, [loading])

  console.log(data)

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {loading ? (
                new Array(12).fill(0).map((_, index) => (
                  <li key={index}>
                    <div className="author_list_pp">
                      <Link to="/author">
                        <div
                          className="lazy pp-author skeleton avatar"
                          src={''}
                          alt=""
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="author_list_info">
                      <div className="skeleton name">&nbsp;</div>
                      <span className="skeleton price">&nbsp;</span>
                    </div>
                  </li>
                ))
              ) : (
                data.map((nft, index) => (
                  <li key={index}>
                    <div className="author_list_pp">
                      <Link to={`/author/${nft.authorId}`}>
                        <img
                          className="lazy pp-author"
                          src={nft.authorImage}
                          alt=""
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="author_list_info">
                      <Link to={`/author/${nft.authorId}`}>{nft.authorName}</Link>
                      <span>{nft.price} ETH</span>
                    </div>
                  </li>
                ))
              )}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
