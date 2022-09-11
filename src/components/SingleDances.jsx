import React from "react";

const SingleDances = () => {
  return (
    <div className="table-responsive">
      <table className="table table-hover table-sm fs-6">
        <thead>
          <tr>
            <th scope="col">NIVEAU</th>
            <th scope="col">ÂGE</th>
            <th scope="col" colSpan="5">
              SMOOTH
            </th>
            <th scope="col" colSpan="15">
              RHYTHM
            </th>
            <th scope="col" colSpan="5">
              BALLROOM
            </th>
            <th scope="col" colSpan="5">
              LATIN
            </th>
            <th scope="col">DANSE TOTAL</th>
          </tr>
        </thead>
      </table>
    </div>
  );
};

export default SingleDances;
