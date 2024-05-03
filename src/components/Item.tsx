import { ReactHTML } from "react";
import { ItemProps } from "../types/types";
import { useState } from "react";
import React from "react";

const checkType = (type?: string, parentType?: string): keyof ReactHTML => {
  if (parentType === undefined) {
    return "span";
  }
  if (type === undefined && parentType) {
    return parentType as keyof ReactHTML;
  }
  if (type === "block") {
    return "div";
  }
  if (type === "clause") {
    return "li";
  }
  return type as keyof ReactHTML;
};

const getMarksStyles = (
  bold?: boolean,
  underline?: boolean,
  color?: string,
  type?: string
) => {
  const fontWeight = bold ? "bold" : "normal";
  const textDecoration = underline ? "underline" : "none";
  const backgroundColor = color ? color : "white";
  const display = type === "p" ? "inline" : "";

  let styles: any = {};

  if (display === "inline") {
    styles.display = "inline";
  }

  if (backgroundColor === "white") {
    styles.fontWeight = fontWeight;
    styles.textDecoration = textDecoration;
    return styles;
  }

  return {
    fontWeight,
    textDecoration,
    backgroundColor,
    color: "white",
    display,
  };
};

export const Item = (props: ItemProps) => {
  const {
    color,
    type,
    title,
    children,
    id,
    value,
    bold,
    underline,
    variableType,
    text,
    childNumber,
    parentType,
    mentionsMap,
  } = props;

  let newParentType: string | undefined = "";

  if (type === "clause" || type === "mention") {
    newParentType = parentType;
  } else {
    newParentType = type;
  }

  let HtmlElement: keyof ReactHTML;
  HtmlElement = checkType(type, newParentType);

  const ChildElement = (
    <>
      {type === "clause" ? (
        <HtmlElement style={getMarksStyles(bold, underline, color, type)}>
          <ol type="A">
            {children ? (
              children.map((child: ItemProps, index: number) => (
                <Item
                  {...child}
                  childNumber={index}
                  key={child.title} // Assuming each child has a unique title
                  parentType={newParentType}
                  mentionsMap={mentionsMap}
                />
              ))
            ) : (
              <>{text}</>
            )}
          </ol>
        </HtmlElement>
      ) : (
        <HtmlElement style={getMarksStyles(bold, underline, color, type)}>
          {children ? (
            children.map((child: ItemProps, index: number) => (
              <Item
                {...child}
                childNumber={index}
                key={child.title} // Assuming each child has a unique title
                parentType={newParentType}
                mentionsMap={mentionsMap}
              />
            ))
          ) : (
            <>{text}</>
          )}
        </HtmlElement>
      )}
    </>
  );

  if (type === "mention" && id && !(id in mentionsMap)) {
    console.log("Adding to mentionsMap", id);
    mentionsMap[id] = ChildElement;
  }
  return <>{id && id in mentionsMap ? mentionsMap?.[id] : ChildElement}</>;
};
