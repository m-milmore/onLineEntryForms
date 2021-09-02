import React from "react";

class CardClassComp extends React.Component {
  render() {
    const {
      image,
      cardTitle,
      cardDescription,
      button: { url },
      button: { label },
    } = this.props.info;
    return (
      <div
        style={{
          width: "18rem",
          border: "1px solid rgba(0,0,0,0.125)",
          margin: "1rem",
          padding: "1rem",
        }}
      >
        <img
          alt="100%x180"
          style={{ width: "100%", display: "block" }}
          src={image}
        />
        <div style={{ textAlign: "left" }}>
          <h2> {cardTitle} </h2> <p> {cardDescription} </p>
          <a href={url} target="_blank" rel="noreferrer">
            {label}
          </a>
        </div>
      </div>
    );
  }
}

export default CardClassComp;
