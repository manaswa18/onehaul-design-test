import Text from "./index";
import React from 'react';  

export default {
  title: "Components/Text",
  component: Text,
  argTypes: {
    variant: {  
      options: ["display","heading", "body", "caption", "OVERLINE","link"],
      control: { type: "select" },
      description: "Typography variant (maps to heading, paragraph, etc.)"
    },
    size: {
      options: ["lg", "md", "sm"],
      control: { type: "select" },
      description: "Typography size"
    },
    type: {
      options: ["default", "secondary", "success", "warning", "danger"],
      control: { type: "select" },
      description: "AntD Typography type"
    },
    weight: {
      options: ["regular", "medium", "semibold", ],
      control: { type: "select" },
      description: "AntD Typography weight"
    },
    level: {
      options: ["1", "2", "3","4","5" ],
      control: { type: "select" },
      description: "Heading level (1-5) for display/heading variants",
    },
    children: {
      control: "text",
      description: "Text content"
    }
  }
};

export const Primary = {
  args: {
    variant: "heading",
    type: "warning",
    size: "sm",
    weight: "regular",
    children: "This is a Typography atom!",
    level: "4"
  },
};