import { nanoid } from "nanoid";

export const criminal_law = {
  id: nanoid(),
  title: "Criminal Law",
  isOpen: true,
  level: 0,
  children: [
    {
      id: nanoid(),
      title: "Brim Github",
      isOpen: true,
      level: 1,
      children: [
        {
          id: nanoid(),
          title: "brim/pulls",
          level: 2,
        },
        {
          id: nanoid(),
          title: "zed/pulls",
          level: 2,
        },
        {
          id: nanoid(),
          title: "brim/releases",
          level: 2,
        },
        {
          id: nanoid(),
          title: "brim/zson",
          level: 2,
        },
        {
          id: nanoid(),
          title: "Level 3",
          isOpen: true,
          level: 2,
          children: [
            { id: nanoid(), title: "amazon", level: 3, },
            { id: nanoid(), title: "apple", level: 3, },
            { id: nanoid(), title: "facebook", level: 3, },
          ],
        },
      ],
    },
    {
      id: nanoid(),
      title: "Brim Zenhub",
      isOpen: true,
      level: 1,
      children: [
        { id: nanoid(), title: "My Issues", level: 2, },
        { id: nanoid(), title: "Brim All Issues", level: 2, },
        { id: nanoid(), title: "MVP 0", level: 2, },
        { id: nanoid(), title: "Manual Brim Test Cases", level: 2, },
      ],
    },
    {
      id: nanoid(),
      title: "Meetings",
      isOpen: true,
      level: 1,
      children: [
        { id: nanoid(), title: "Thursday", level: 2, },
        { id: nanoid(), title: "Saturday", level: 2, },
      ],
    },
    {
      id: nanoid(),
      title: "Personal",
      isOpen: true,
      level: 1,
      children: [
        { id: nanoid(), title: "Imbox", level: 2, },
        { id: nanoid(), title: "Facebook Marketplace", level: 2, },
        { id: nanoid(), title: "Bank of America", level: 2, },
        { id: nanoid(), title: "Mint", level: 2, },
        { id: nanoid(), title: "Learn UI Design", level: 2, },
      ],
    },
  ],
};

export default function handler(
  req,
  res
) {
  res.status(200).json(bookmarks)
}