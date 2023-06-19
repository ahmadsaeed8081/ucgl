import React, { useState } from "react";
import Modal from "../../components/Modal";
import Loader from "../../components/Loader";
import Wrapper from "../../routes/Wrapper";
import ProductUpload from "../../components/ProductUpload";

const Products = () => {
  const [open, setOpen] = useState(false);
  const productsList = [{}, {}, {}, {}, {}, {}, {}, {}, {}];
  return (
    <Wrapper>
      <div className="products-pages flex flex-col">
        <div className="_bg_vector w-full">
          <div className="top-vector"></div>
          <div className="btm-vector"></div>
        </div>
        <div className="page-body">
          <div className="wrap wrapWidth flex flex-col">
            <div className="page-hdr flex items-center w-full justify-between">
              <div className="sec-tag">Products</div>
              <button className="btn-add button" onClick={(e) => setOpen(true)}>
                Add Product
              </button>
            </div>
            <div className="products-grid">
              {productsList.map((item, index) => (
                <div key={index} className="product-box flex flex-col">
                  <div className="overlay flex items-center justify-center">
                    <div className="coming-soon">Coming Soon</div>
                  </div>
                  <div
                    className="prd-image"
                    style={{ backgroundImage: `url("/images/prd.png")` }}
                  />
                  <div className="box-meta flex flex-col">
                    <div className="prd-name">Product 1</div>
                    <div className="prd-desc">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      In quis dignissim magna. Sed et neque at nulla sagittis
                      vestibulum. Quisque a ante at nulla feugiat porta eget ut
                      nibh.
                    </div>
                    <button className="buy-btn button">Buy Now</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Modal open={open} onClose={() => setOpen(false)}>
          <ProductUpload setOpen={setOpen} />
        </Modal>
      </div>
    </Wrapper>
  );
};

export default Products;
