import { nanoid } from "nanoid";

const bookmarks = {
  id: nanoid(),
  name: "Bookmarks",
  isOpen: true,
  level: 0,
  children: [
    {
      id: nanoid(),
      name: "Brim Github",
      isOpen: true,
      level: 1,
      children: [
        {
          id: nanoid(),
          name: "brim/pulls",
          level: 2,
        },
        {
          id: nanoid(),
          name: "zed/pulls",
          level: 2,
        },
        {
          id: nanoid(),
          name: "brim/releases",
          level: 2,
        },
        {
          id: nanoid(),
          name: "brim/zson",
          level: 2,
        },
        {
          id: nanoid(),
          name: "Level 3",
          isOpen: true,
          level: 2,
          children: [
            { id: nanoid(), name: "amazon", level: 3, },
            { id: nanoid(), name: "apple", level: 3, },
            { id: nanoid(), name: "facebook", level: 3, },
          ],
        },
      ],
    },
    {
      id: nanoid(),
      name: "Brim Zenhub",
      isOpen: true,
      level: 1,
      children: [
        { id: nanoid(), name: "My Issues", level: 2, },
        { id: nanoid(), name: "Brim All Issues", level: 2, },
        { id: nanoid(), name: "MVP 0", level: 2, },
        { id: nanoid(), name: "Manual Brim Test Cases", level: 2, },
      ],
    },
    {
      id: nanoid(),
      name: "Meetings",
      isOpen: true,
      level: 1,
      children: [
        { id: nanoid(), name: "Thursday", level: 2, },
        { id: nanoid(), name: "Saturday", level: 2, },
      ],
    },
    {
      id: nanoid(),
      name: "Personal",
      isOpen: true,
      level: 1,
      children: [
        { id: nanoid(), name: "Imbox", level: 2, },
        { id: nanoid(), name: "Facebook Marketplace", level: 2, },
        { id: nanoid(), name: "Bank of America", level: 2, },
        { id: nanoid(), name: "Mint", level: 2, },
        { id: nanoid(), name: "Learn UI Design", level: 2, },
      ],
    },
  ],
};

export default bookmarks;
