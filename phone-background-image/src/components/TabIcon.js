import React from "react";
import { Badge } from "./Badge";
import { Icon } from "./Icons";

export const TabIcon = (props) => {
  if (props.visibleBadge) {
    return (
      <Badge fontSize={10}>
        <Icon name={props.iconName} size={20} color={"black"} />
      </Badge>
    );
  }

  return <Icon name={props.iconName} size={20} color={"black"} />;
};
