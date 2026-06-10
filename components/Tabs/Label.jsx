
import Text from "../Text";
import React from "react";
import "./Label.css";
import Badge from "../Badge";

const Label = ({ prefix, children, suffix }) => (
  <div className="onehaul-tabs-level">
    {prefix && <span className="onehaul-tabs-level-prefix">{prefix}</span>}
    <Text type="secondary" size="md" variant="body" className="onehaul-tabs-level-text">{children}</Text>
    {suffix && (
      <span className="onehaul-tabs-level-suffix">
        <Badge count={suffix}/>
      </span>
)}
  </div>
);

export default Label;