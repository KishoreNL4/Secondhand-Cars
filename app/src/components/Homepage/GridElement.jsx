import React from "react";
import "./GridElement.css";

function GridElement() {
  return (
    <div className="benefits">
      <b className="headlinee">Why Cars Valley ?</b>
      <div className="gridContainer">
        <div className="gridItem">
          <div className="gridImage">
            <img
              src="https://files.porsche.com/filestore/news/international-de/none/479342/headimage1/7b3970fe-1ad3-11e8-bbc5-0019999cd470/Porsche-introduces-blockchain-to-cars.jpg"
              alt="Blockchain"
            />
          </div>
          <div className="gridContent">
            <div>
              <h3>Blockchain</h3>
              <p>
                Blockchain enables decentralized car registration, ensuring
                transparency and eliminating the need for intermediaries.
              </p>
            </div>
          </div>
        </div>

        <div className="gridItem">
          <div className="gridImage">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr1QILRCTkdkzrJT5M7fM5-2_BMpY9av86WQ&usqp=CAU"
              alt="Trust"
            />
          </div>
          <div className="gridContent">
            <div>
              <h3>Trust</h3>
              <p>
                We prioritize trust by ensuring transparency, fair pricing,
                accurate information, proper documentation.
              </p>
            </div>
          </div>
        </div>

        <div className="gridItem">
          <div className="gridImage">
            <img
              src="https://img.freepik.com/free-vector/hands-holding-credit-card-mobile-phone-with-banking-app-person-paying-with-bank-card-transferring-money-shopping-online-flat-vector-illustration-payment-finance-concept_74855-24760.jpg"
              alt="Easy Financing Options"
            />
          </div>
          <div className="gridContent">
            <div>
              <h3>Easy Payment</h3>
              <p>We provide a secure payment option for your peace of mind.</p>
            </div>
          </div>
        </div>

        <div className="gridItem">
          <div className="gridImage">
            <img
              src="https://img.freepik.com/free-vector/product-quality-concept-illustration_114360-7301.jpg?w=360"
              alt="100+ Quality Checks"
            />
          </div>
          <div className="gridContent">
            <div>
              <h3>100+ Quality Checks</h3>
              <p>
                Inspected across 140 parameters and refurbished by auto-experts,
                our cars are ready for the road.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GridElement;
